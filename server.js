const axios = require('axios');
const base64 = require('base-64');
const base32 = require('base32');
const utf8 = require('utf8');

const answer = 1773133250;

const { totp } = require('otplib');

const reqJSON = {
  contact_email: 'ninja@example.com',
  github_url: 'https://github.com/Bheart7/Hennge-Challenge'
};
const stringData = JSON.stringify(reqJSON);
console.log(stringData);

const URL = 'https://api.challenge.hennge.com/challenges/003';
const sharedSecret = reqJSON.contact_email + 'HENNGECHALLENGE003';
totp.options = { digits: 10, algorithm: 'sha512', epoch: 0 };

const opts = totp.allOptions();

const myTotp = totp.generate(sharedSecret);
const isValid = totp.check(myTotp, sharedSecret);

console.log('Token Info:', { myTotp, isValid });

const authStringUTF = reqJSON.contact_email + ':' + myTotp;
console.log(authStringUTF);
const bytes = utf8.encode(authStringUTF);
const encoded = base64.encode(bytes);
const decode = base64.decode('bmluamFAZXhhbXBsZS5jb206MTc3MzEzMzI1MA==');
console.log(utf8.decode(decode));

const createReq = async () => {
  try {
    // set the headers
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + encoded
      }
    };

    console.log('Making req', { URL, reqJSON, config });

    const res = await axios.post(URL, stringData, config);
    console.log(res.data);
  } catch (err) {
    console.error(err.response.data);
  }
};

createReq();
