'use strict';

const chai = require('chai');
chai.should();
const sinon = require('sinon');

const Pbkdf2 = require('../index');

describe('Hashing Password and Verify password', () => {
  let pbkdf2 = null;
  const validPassword = '12345';
  const invalidPassword = '1234';
  const invalidSalt = 'ehehuhe83783&3p80$#@';

  before(() => {

    const config = {
      digestAlgorithm: 'sha1',
      keyLen: 64,
      saltSize: 64,
      iterations: 15000
    };

    pbkdf2 = new Pbkdf2(config);

  });

  it('should return hashed password', (done) => {
    pbkdf2.hashPassword(validPassword, (err, cipherText, salt) => {
      cipherText.should.not.be.null;
      salt.should.not.be.null;
      done();
    });
  });

  it('should return true if password is valid', (done) => {
    pbkdf2.hashPassword(validPassword, (err, cipherText, salt) => {
      pbkdf2.isValidPassword(validPassword, cipherText, salt).then((isValid) => {
        console.log(isValid);
        isValid.should.be.true;
        done();
      });
    });
  });

  it('should return false if password is invalid', (done) => {
    pbkdf2.hashPassword(validPassword, (err, cipherText, salt) => {
      pbkdf2.isValidPassword(invalidPassword, cipherText, salt).then((isValid) => {
        console.log(isValid);
        isValid.should.be.false;
        done();
      });
    });
  });

});
