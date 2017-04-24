# PBKDF2 Node JS

[![Build Status](https://travis-ci.org/wuriyanto48/nodejs-pbkdf2.svg?branch=master)](https://travis-ci.org/wuriyanto48/nodejs-pbkdf2)

# Usage

- Install first

```shell
npm install nodejs-pbkdf2
```

- Set up the config:

```javascript
let config = {
  digestAlgorithm: 'sha1',
  keyLen: 64,
  saltSize: 64,
  iterations: 15000
};
```

- Hashing a Password

```javascript
'use strict';

const Pbkdf2 = require('nodejs-pbkdf2');


const config = {
  digestAlgorithm: 'sha1',
  keyLen: 64,
  saltSize: 64,
  iterations: 15000
};

let pbkdf2 = new Pbkdf2(config);

pbkdf2.hashPassword('12345', (err, cipherText, salt) => {
  console.log(cipherText);
  console.log(salt);
});

```

- Verify a Password

```javascript
'use strict';

const Pbkdf2 = require('nodejs-pbkdf2');


const config = {
  digestAlgorithm: 'sha1',
  keyLen: 64,
  saltSize: 64,
  iterations: 15000
};

let pbkdf2 = new Pbkdf2(config);

pbkdf2.hashPassword('12345', (err, cipherText, salt) => {
  pbkdf2.isValidPassword('12345', cipherText, salt).then((isValid) => {
    console.log(isValid);
  });
});

```
