'use strict';

const crypto = require('crypto');

class Pbkdf2 {

  constructor(config){
    this.config = config;
  }

  hashPassword(password, cb){
    const config = this.config;
    crypto.randomBytes(config.saltSize, (err, salt) => {
      if (err) {
        cb(err, null, null);
      }
      let bufSalt = new Buffer(salt).toString('base64');
      crypto.pbkdf2(Buffer.from(password, 'utf8'), Buffer.from(bufSalt, 'utf8'), config.iterations, config.keyLen, config.digestAlgorithm,
        (err, hash) => {

          if (err) {
            cb(err, null, null);
          }

          let cipherText = new Buffer(hash).toString('base64');
          cb(null, cipherText, bufSalt);
        });
    });
  }

  isValidPassword(password, cipherText, saltParam){
    return new Promise((resolve, reject) => {
      let config = this.config;
      let iterations = config.iterations;
      let saltBuf = Buffer.from(saltParam, 'utf8');
      let cipher = Buffer.from(cipherText, 'base64');
      crypto.pbkdf2(Buffer.from(password, 'utf8'), saltBuf, iterations, config.keyLen, config.digestAlgorithm, (err, verify) => {
        if(err){
          reject(err);
        }else{
          let isValidPassword = verify.toString('base64') === cipher.toString('base64');
          resolve(isValidPassword);
        }
      });
    });
  }

}

module.exports = Pbkdf2;
