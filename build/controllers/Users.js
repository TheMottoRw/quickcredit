"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resetPassword = exports.toggleVerification = exports.login = exports.createUser = exports.loadUser = void 0;

var _database = _interopRequireDefault(require("../models/database"));

var _userAccount = require("../helpers/userAccount");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import nodemailer from 'nodemailer';
var loadUser = function loadUser(req, res) {
  res.send(_database["default"].users);
};

exports.loadUser = loadUser;

var createUser = function createUser(req, res) {
  var user = req.body;
  var response = {};

  if (!user.firstName || !user.lastName || !user.email || !user.password) {
    response = {
      status: 400,
      data: {
        error: 'Bad request,all information are required'
      }
    };
  } else if ((0, _userAccount.isEmailExist)(user.email)) {
    response = {
      status: 200,
      data: {
        message: 'email already exist to other account'
      }
    };
  } else {
    // increment user id for the next user
    user.id = _database["default"].users.length + 1;
    user.token = (0, _userAccount.generateToken)();
    user.status = 'unverfied';
    user.createdOn = new Date();
    user.isAdmin = false; // push or add user to an array of users

    _database["default"].users.push(user); // response generate


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
        createdOn: user.createdOn
      }
    };
  }

  res.status(response.status).json(response);
};

exports.createUser = createUser;

var login = function login(req, res) {
  var response = {};
  var credentials = req.body;

  if (credentials.email === undefined || credentials.password === undefined) {
    response = {
      status: 400,
      data: {
        error: 'Bad request,might be some missing paramaters'
      }
    };
  } else {
    // find user with provided credentials and user is verfiied
    var userInfo = _database["default"].users.find(function (user) {
      return user.email === credentials.email && user.password === credentials.password;
    });

    if (userInfo === undefined) {
      response = {
        status: 200,
        data: {
          message: 'No data found, wrong username or password'
        }
      };
    } else if (userInfo.status === 'unverified') {
      response = {
        status: 200,
        data: {
          message: 'sorry your account not yet verified,wait for a moment...!'
        }
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
          createdOn: userInfo.createdOn
        }
      };
    }
  }

  res.status(response.status).json(response);
};

exports.login = login;

var toggleVerification = function toggleVerification(req, res) {
  // getting user information from email
  var response = {};
  var userEmail = req.params.email;
  var userInfo = _database["default"].users;

  if (!req.params.email === undefined) {
    response = {
      status: 400,
      data: {
        message: 'Bad request,user email must be defined'
      }
    };
  } else {
    // load userId using account number
    var userIndex = userInfo.findIndex(function (user) {
      return user.email === userEmail;
    });

    if (userIndex === -1) {
      response = {
        status: 200,
        data: {
          message: "No data related to ".concat(userEmail, " found")
        }
      };
    } else {
      // updating account based on account index
      userInfo[userIndex].status = 'verified'; // response object

      response = {
        status: 200,
        data: {
          id: userInfo[userIndex].id,
          token: userInfo[userIndex].token,
          firstName: userInfo[userIndex].firstName,
          lastName: userInfo[userIndex].lastName,
          email: userInfo[userIndex].email,
          status: userInfo[userIndex].status
        }
      };
    }
  }

  res.status(response.status).json(response);
};

exports.toggleVerification = toggleVerification;

var resetPassword = function resetPassword(req, res) {
  // getting user information from url
  var response = {};
  var userParams = req.body;
  var userInfo = _database["default"].users;

  if (!userParams.oldpassword || !userParams.newpassword || !req.params.token) {
    response = {
      status: 400,
      data: {
        message: 'Bad request, there might be some missing parameters'
      }
    };
  } else {
    // load userId using token and password
    var userIndex = userInfo.findIndex(function (user) {
      return user.token === req.params.token && user.password === userParams.oldpassword;
    });

    if (userIndex === -1) {
      response = {
        status: 200,
        data: {
          message: 'No data related to your token found'
        }
      };
    } else if (userInfo[userIndex].status === 'unverified') {
      response = {
        status: 200,
        data: {
          message: 'sorry your account not yet verified, wait for a moment...!'
        }
      };
    } else {
      // updating account based on account index
      userInfo[userIndex].password = userParams.newpassword; // response object

      response = {
        status: 200,
        data: userInfo[userIndex]
      };
    }
  }

  res.status(response.status).json(response);
};

exports.resetPassword = resetPassword;
//# sourceMappingURL=Users.js.map