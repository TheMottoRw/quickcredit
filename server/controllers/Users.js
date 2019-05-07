// import nodemailer from 'nodemailer';
import quickcredit from '../models/database';
export const resetPassword = (req, res) => {
  // getting user information from url
  let response = {};
  const userParams = req.body;
  const userInfo = quickcredit.users;
  if (!userParams.oldpassword || !userParams.newpassword || !req.params.token) {
    response = {
      status: 400,
      data: {
        message: 'Bad request, there might be some missing parameters',
      },
    };
  } else {
  // load userId using token and password
    const userIndex = userInfo.findIndex(user => (user.token === req.params.token && user.password === userParams.oldpassword));
    if (userIndex === -1) {
      response = {
        status: 200,
        data: {
          message: 'No data related to your token found',
        },
      };
    } else if (userInfo[userIndex].status === 'unverified') {
      response = {
        status: 200,
        data: {
          message: 'sorry your account not yet verified, wait for a moment...!',
        },
      };
    } else {
    // updating account based on account index
      userInfo[userIndex].password = userParams.newpassword;
      // response object
      response = {
        status: 200,
        data: userInfo[userIndex],
      };
    }
  }
  res.status(response.status).json(response);
};
