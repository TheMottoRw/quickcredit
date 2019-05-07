// import nodemailer from 'nodemailer';
import quickcredit from '../models/database';
//import { isEmailExist, generateToken } from '../helpers/userAccount';

export const loadUser = (req, res) => {
  res.send(quickcredit.users);
};
