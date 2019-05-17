import shortid from 'shortid';
import quickcredit from '../models/database';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { APP_KEY } from './config';

export const generateToken = () => {
  const token = shortid.generate();
  const isExist = quickcredit.users.find(user => user.token === token);
  if (isExist !== undefined) {
    generateToken();
  }
  return token;
};

export const generateJwtToken = (str) => {
  const token = jwt.sign( {user: str}, APP_KEY, {
    expiresIn: '8h'
  });
  return `Quick${token}`;
}

export const isEmailExist = (email) => {
  const index = quickcredit.users.findIndex(user => user.email === email);
  return index !== -1;
};

export const isVerified = (token) => {
  const userInfo = quickcredit.users.find(user => user.token === token);
  return userInfo!== undefined && userInfo.status === 'verified';
};

export const missingParameter = (requiredParameterArray, passedParameterObj) => {
  let missing = "";
  for(let d of requiredParameterArray) {
    if (!passedParameterObj.hasOwnProperty(d)) {
      if(missing === "") {
        missing+=d.toString();
      } else {
        missing += " and "+d.toString();
      }
    };
  }
  return missing;
}

export const encryptPassword = pwdstr => bcrypt.hashSync(pwdstr, bcrypt.genSaltSync(10));

export const isEncryptedEqualPlainPassword = (plainPassword, hash) => bcrypt.compareSync(plainPassword, hash);
