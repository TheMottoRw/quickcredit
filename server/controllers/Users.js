// import nodemailer from 'nodemailer';
import quickcredit from '../models/database';

export const toggleVerification = (req, res) => {
  // getting user information from email
  let response = {};
  const userEmail = req.params.email;
  const userInfo = quickcredit.users;
  if (!req.params.email === undefined) {
    response = {
      status: 400,
      data: {
        message: 'Bad request,user email must be defined',
      },
    };
  } else {
  // load userId using account number
    const userIndex = userInfo.findIndex(user => user.email === userEmail);
    if (userIndex === -1) {
      response = {
        status: 200,
        data: {
          message: `No data related to ${userEmail} found`,
        },
      };
    } else {
    // updating account based on account index
      userInfo[userIndex].status = 'verified';
      // response object
      response = {
        status: 200,
        data: {
          id: userInfo[userIndex].id,
          token: userInfo[userIndex].token,
          firstName: userInfo[userIndex].firstName,
          lastName: userInfo[userIndex].lastName,
          email: userInfo[userIndex].email,
          status: userInfo[userIndex].status,
        },
      };
    }
  }
  res.status(response.status).json(response);
};
