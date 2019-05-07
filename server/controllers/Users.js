// import nodemailer from 'nodemailer';
import quickcredit from '../models/database';

export const login = (req, res) => {
  let response = {};
  const credentials = req.body;
  if (credentials.email === undefined || credentials.password === undefined) {
    response = {
      status: 400,
      data: {
        error: 'Bad request,might be some missing paramaters',
      },
    };
  } else {
    // find user with provided credentials and user is verfiied
    const userInfo = quickcredit.users.find(user => user.email === credentials.email && user.password === credentials.password);
    if (userInfo === undefined) {
      response = {
        status: 200,
        data: {
          message: 'No data found, wrong username or password',
        },
      };
    } else if (userInfo.status === 'unverified') {
      response = {
        status: 200,
        data: {
          message: 'sorry your account not yet verified,wait for a moment...!',
        },
      };
    } else {
      // login response specifications
      response = {
        status: 200,
        data: {
          id: userInfo.id,
          token: userInfo.token,
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          email: userInfo.email,
          address: userInfo.address,
          status: userInfo.status,
          isAdmin: userInfo.isAdmin,
          createdOn: userInfo.createdOn,
        },
      };
    }
  }
  res.status(response.status).json(response);
};
