"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.installementCalculator = exports.interestCalculator = exports.hasLoan = void 0;

var _database = _interopRequireDefault(require("../models/database"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable no-mixed-operators */
var hasLoan = function hasLoan(token) {
  var loanIndex = _database["default"].loans.findIndex(function (loan) {
    return loan.user === token && loan.status === 'pending' || loan.status === 'approved' && loan.repaid === false;
  });

  return loanIndex !== -1;
};

exports.hasLoan = hasLoan;

var interestCalculator = function interestCalculator(amount) {
  return (parseFloat(amount) * 5 / 100).toFixed(1);
};

exports.interestCalculator = interestCalculator;

var installementCalculator = function installementCalculator(amount, tenor) {
  return parseFloat(((parseFloat(amount) + parseFloat(interestCalculator(amount))) / parseInt(tenor)).toFixed(2));
};

exports.installementCalculator = installementCalculator;
//# sourceMappingURL=Loans.js.map