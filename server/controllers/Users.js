// import nodemailer from 'nodemailer';
import quickcredit from '../models/database';
import { isEmailExist, generateToken } from '../helpers/userAccount';

export const loadUser = (req, res) => {
  res.send(quickcredit.users);
};
export const createUser = (req, res) => {
  const user = req.body;
  let response = {};
  if (!user.firstName || !user.lastName || !user.email || !user.password) {
    response = {
      status: 400,
      data: {
        error: 'Bad request,all information are required',
      },
    };
  } else if (isEmailExist) {
    response = {
      status: 200,
      data: {
        message: 'email already exist to other account',
      },
    };
  } else {
    // increment user id for the next user
    user.id = quickcredit.users.length + 1;
    user.token = generateToken();
    user.status = 'unverfied';
    user.createdOn = new Date();
    user.isAdmin = false;
    // push or add user to an array of users
    quickcredit.users.push(user);
    // response generate
    response = {
      status: 200,
      data: {
        id: user.id,
        token: user.token,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        status: user.status,
        createdOn: user.createdOn,
      },
    };
  }
  res.status(response.status).json(response);
