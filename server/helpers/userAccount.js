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
