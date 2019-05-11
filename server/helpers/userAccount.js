import shortid from 'shortid';
import quickcredit from '../models/database';
export const generateToken = () => {
  const token = shortid.generate();
  const isExist = quickcredit.users.find(user => user.token === token);
  if (isExist !== undefined) {
    generateToken();
  }
  return token;
};
export const isEmailExist = (email) => {
  const index = quickcredit.users.findIndex(user => user.email === email);
  // is a doesnot equivalent to undefined means doesnot exist,email exist otherwise does not exist account can be created
  return index !== -1;
};
export const isVerified = (token) => {
  const userInfo = quickcredit.users.find(user => user.token === token);
  // is a doesnot equivalent to undefined means doesnot exist,email exist otherwise does not exist account can be created
  return userInfo!== undefined && userInfo.status === 'verified';
};
