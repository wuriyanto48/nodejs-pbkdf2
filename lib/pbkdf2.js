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
      let bufSalt = Buffer.from(salt).toString('base64');
      crypto.pbkdf2(Buffer.from(password, 'utf8'), Buffer.from(bufSalt, 'utf8'), config.iterations, config.keyLen, config.digestAlgorithm,
        (err, hash) => {

          if (err) {
            cb(err, null, null);
          }

          let cipherText = Buffer.from(hash).toString('base64');
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
      crypto.pbkdf2(Buffer.from(password, 'utf8'), saltBuf, iterations, config.keyLen, config.digestAlgorithm, (err, dk) => {
        if(err){
          reject(err);
        }else{
          let isValidPassword = equalBit(dk, cipher);
          resolve(isValidPassword);
        }
      });
    });
  }

}

const equalBit = (dk, cipher) => {
  let diff = dk.length ^ cipher.length
  for (let i = 0; i < dk.length && i < cipher.length; i++) {
    diff |= dk[i] ^ cipher[i];
  }

  return diff === 0;
}

module.exports = Pbkdf2;
