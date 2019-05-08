"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _Users = require("../controllers/Users");

var _Loans = require("../controllers/Loans");

var _Repayments = require("../controllers/Repayments");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable object-curly-newline */
var router = _express["default"].Router(); // API URL init


var version = 'v1';
var baseUrl = "/api/".concat(version);
router.get("".concat(baseUrl, "/"), function (req, res) {
  res.send('Welcome to Quickcredit App');
});
router.post("".concat(baseUrl, "/auth/signup"), _Users.createUser);
router.post("".concat(baseUrl, "/auth/signin"), _Users.login);
router.get("".concat(baseUrl, "/users"), _Users.loadUser);
router.patch("".concat(baseUrl, "/users/:email/verify"), _Users.toggleVerification);
router.patch("".concat(baseUrl, "/users/:token/reset"), _Users.resetPassword);
router.get("".concat(baseUrl, "/loans"), _Loans.applications);
router.get("".concat(baseUrl, "/loans/:id"), _Loans.loanById);
router.post("".concat(baseUrl, "/loans"), _Loans.apply);
router.patch("".concat(baseUrl, "/loans/:id"), _Loans.toggleStatus); // Repayment Transactions

router.post("".concat(baseUrl, "/loans/:id/repayment"), _Repayments.repay);
router.get("".concat(baseUrl, "/loans/:id/repayments"), _Repayments.loadRepayment); // Sending an email
// router.post(` ${baseUrl}/send', users.emailSend);

var _default = router;
exports["default"] = _default;
//# sourceMappingURL=routes.js.map