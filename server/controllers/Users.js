// import nodemailer from 'nodemailer';
import quickcredit from '../models/database';
import { isEmailExist, generateToken, missingParameter } from '../helpers/userAccount';

export const loadUser = (req, res) => {
  res.json({status: 200, data: quickcredit.users });
};

export const createUser = (req, res) => {
  const {body: { firstName, lastName, email, password } } = req;
  let response = {};
  if (!firstName || !lastName || !email || !password) {
    response = {
      status: 400,
      data: {
        error: ` ${missingParameter(['firstName','lastName','email','password'],req.body)} must be provided`,
      },
    };
  } else if (isEmailExist(email)) {
    response = {
      status: 409,
      data: {
        message: 'Email already exist to other account',
      },
    };
  } else {
    const id = quickcredit.users.length + 1;
    const token = generateToken();
    const status = 'unverified';
    const createdOn = new Date();
    const isAdmin = false;
    
    quickcredit.users.push({
      'id': id,
      'token': token,
      'firstName': firstName,
      'lastName': lastName,
      'email': email,
      'password': password,
      'status': status,
      'createdOn': createdOn,
      'isAdmin': isAdmin
    });
    
    response = {
      status: 201,
      data: {
        id: id,
        token: token,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        status: status,
        createdOn: createdOn,
        isAdmin: isAdmin,
      },
    };
  }
  res.status(response.status).json(response);
};
export const login = (req, res) => {
  let response = {};
  const { email, password }  = req.body;
  if (email === undefined || password === undefined) {
    response = {
      status: 400,
      data: {
        error: `${missingParameter(['email', 'password'], req.body )} must be provided`,
      },
    };
  } else {
    const userInfo = quickcredit.users.find(user => user.email === email && user.password === password);
    if (userInfo === undefined) {
      response = {
        status: 401,
        data: {
          message: 'Wrong username or password',
        },
      };
    } else if (userInfo.status === 'unverified') {
      response = {
        status: 403,
        data: {
          message: 'Sorry your account not yet verified,contact admin...!',
        },
      };
    } else {
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
export const toggleVerification = (req, res) => {
  let response = {};
  const { email } = req.params;
  const userInfo = quickcredit.users;
  if (email === undefined) {
    response = {
      status: 400,
      data: {
        message: 'Email must be provided',
      },
    };
  } else {
    const userIndex = userInfo.findIndex(user => user.email === email);
    if (userIndex === -1) {
      response = {
        status: 404,
        data: {
          message: `No record found for this email ${email}`,
        },
      };
    } else {
      userInfo[userIndex].status = 'verified';
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
export const resetPassword = (req, res) => {
  let response = {};
  const { body: { oldpassword, newpassword }, params: { token } } = req;
  const userInfo = quickcredit.users;
  if (!oldpassword || !newpassword || !token) {
    response = {
      status: 400,
      data: {
        message: `${missingParameter(['token'],req.params)} ${missingParameter(['oldpassword','newpassword'], req.body)} must be provided`,
      },
    };
  } else {
    const userIndex = userInfo.findIndex(user => (user.token === token && user.password === oldpassword));
    if (userIndex === -1) {
      response = {
        status: 404,
        data: {
          message: `No user record found for token ${token}`,
        },
      };
    } else if (userInfo[userIndex].status === 'unverified') {
      response = {
        status: 403,
        data: {
          message: 'Sorry your account not yet verified,contact admin',
        },
      };
    } else {
      userInfo[userIndex].password = newpassword;
      response = {
        status: 200,
        data: userInfo[userIndex],
      };
    }
  }
  res.status(response.status).json(response);
};
