"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.applications = exports.toggleStatus = exports.apply = exports.loanById = exports.loadLoans = exports.loadByCriteria = void 0;

var _database = _interopRequireDefault(require("../models/database"));

var _userAccount = require("../helpers/userAccount");

var _Loans = require("../helpers/Loans");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var loadByCriteria = function loadByCriteria(req, res) {
  var response = {};
  var criterias = req.body; // find loan with specific criterias

  if (criterias.status === undefined || criterias.repaid === undefined) {
    response = {
      status: 400,
      data: {
        message: 'bad request, there might be some missing parameters'
      }
    };
  } else {
    var loan = _database["default"].loans.find(function (debt) {
      return debt.status === criterias.status && debt.repaid === criterias.repaid;
    });

    if (loan === undefined) {
      response = {
        status: 200,
        data: {
          message: 'no data found'
        }
      };
    } else {
      // specific loan loading response
      response = {
        status: 200,
        data: loan
      };
    }
  }

  res.status(response.status).json(response);
};

exports.loadByCriteria = loadByCriteria;

var loadLoans = function loadLoans(req, res) {
  if (req.body.status === undefined && req.body.repaid === undefined) {
    res.json(_database["default"].loans);
  } else {
    loadByCriteria(req, res);
  }
};

exports.loadLoans = loadLoans;

var loanById = function loanById(req, res) {
  var loanInfo = _database["default"].loans;
  var response = null;

  if (req.params.id === undefined) {
    response = {
      status: 400,
      data: {
        message: 'bad request, id must be defined'
      }
    };
  } else {
    var loanid = req.params.id;
    var specificLoan = loanInfo.find(function (loan) {
      return loan.id === parseInt(loanid);
    });

    if (specificLoan === undefined) {
      response = {
        status: 200,
        data: {
          message: 'no data found'
        }
      };
    } else {
      response = {
        status: 200,
        data: specificLoan
      };
    }
  }

  res.status(response.status).json(response);
};

exports.loanById = loanById;

var apply = function apply(req, res) {
  var loan = req.body;
  var response = null;

  if (loan.user === undefined || loan.amount === undefined || loan.tenor === undefined) {
    response = {
      status: 400,
      data: {
        message: 'Bad request, there might be some missing parameters'
      }
    };
  } else {
    // increment loan id for the next loan
    var userInfo = _database["default"].users.find(function (user) {
      return user.token === loan.user;
    });

    loan.id = _database["default"].loans.length + 1;
    loan.balance = loan.amount;
    loan.repaid = false;
    loan.status = 'pending';
    loan.createdOn = new Date(); // push or add loan to an array of loans

    if (!(0, _userAccount.isVerified)(loan.user)) {
      response = {
        status: 200,
        data: {
          message: 'sorry your account not yet verified, wait for a moment'
        }
      };
    } else if ((0, _Loans.hasLoan)(loan.user)) {
      response = {
        status: 200,
        data: {
          message: 'sorry you already have a loan'
        }
      };
    } else {
      _database["default"].loans.push(loan); // response generate


      response = {
        status: 200,
        data: {
          id: loan.id,
          user: userInfo.token,
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          email: userInfo.email,
          createdOn: new Date(),
          status: 'pending',
          repaid: false,
          tenor: loan.tenor,
          amount: parseFloat(loan.amount),
          paymentInstallement: (0, _Loans.installementCalculator)(loan.amount, loan.tenor),
          balance: parseFloat(loan.amount),
          interest: (0, _Loans.interestCalculator)(loan.interest)
        }
      };
    }
  }

  res.status(response.status).json(response);
};

exports.apply = apply;

var toggleStatus = function toggleStatus(req, res) {
  var loanParam = req.params;
  var response = null;

  var loanInfo = _database["default"].loans.find(function (loan) {
    return loan.id === parseInt(loanParam.id);
  }); // const loanIndex = quickcredit.loans.findIndex(loan => loan.id === parseInt(loanParam.id));


  loanInfo.status = req.query.status; // response generate

  response = {
    status: 200,
    data: {
      id: loanInfo.id,
      user: loanInfo.email,
      createdOn: loanInfo.createdOn,
      status: loanInfo.status,
      repaid: loanInfo.repaid,
      tenor: loanInfo.tenor,
      amount: loanInfo.amount,
      paymentInstallement: loanInfo.paymentInstallement,
      balance: loanInfo.balance,
      interest: loanInfo.interest
    }
  };
  res.status(response.status).json(response);
};

exports.toggleStatus = toggleStatus;

var applications = function applications(req, res) {
  var parameters = req.query;
  var loanApplication = null;

  if (parameters.status === undefined && parameters.repaid === undefined) {
    loanApplication = _database["default"].loans;
  } else {
    loanApplication = _database["default"].loans.find(function (loan) {
      return loan.status === parameters.status && loan.repaid === (parameters.repaid === 'true');
    });
  }

  res.json(loanApplication);
};

exports.applications = applications;
//# sourceMappingURL=Loans.js.map