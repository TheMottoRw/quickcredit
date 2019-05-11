"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isVerified = exports.isEmailExist = exports.generateToken = void 0;

var _shortid = _interopRequireDefault(require("shortid"));

var _database = _interopRequireDefault(require("../models/database"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var generateToken = function generateToken() {
  var token = _shortid["default"].generate();

  var isExist = _database["default"].users.find(function (user) {
    return user.token === token;
  });

  if (isExist !== undefined) {
    generateToken();
  }

  return token;
};

exports.generateToken = generateToken;

var isEmailExist = function isEmailExist(email) {
  var index = _database["default"].users.findIndex(function (user) {
    return user.email === email;
  }); // is a doesnot equivalent to undefined means doesnot exist,email exist otherwise does not exist account can be created


  return index !== -1;
};

exports.isEmailExist = isEmailExist;

var isVerified = function isVerified(token) {
  var userInfo = _database["default"].users.find(function (user) {
    return user.token === token;
  }); // is a doesnot equivalent to undefined means doesnot exist,email exist otherwise does not exist account can be created


  return userInfo.status === 'verified';
};

exports.isVerified = isVerified;
//# sourceMappingURL=userAccount.js.map