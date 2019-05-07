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
