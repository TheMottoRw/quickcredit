"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.repay = exports.repaymentById = exports.loadRepayment = void 0;

var _database = _interopRequireDefault(require("../models/database"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var loadRepayment = function loadRepayment(req, res) {
  var repayParam = req.params;
  var response = null;

  if (repayParam.id === undefined) {
    response = {
      status: 400,
      data: {
        message: 'bad request, there might be some missing parameters'
      }
    };
  } else {
    response = {
      status: 200,
      data: _database["default"].repayments.find(function (transaction) {
        return parseInt(transaction.loanId) === parseInt(repayParam.id);
      })
    };
  }

  res.json(response);
};

exports.loadRepayment = loadRepayment;

var repaymentById = function repaymentById(req, res) {
  var repayInfo = _database["default"].body;

  var repaymentInfo = _database["default"].repayments.find(function (transaction) {
    return transaction.id === repayInfo.id;
  });

  res.json(repaymentInfo);
};

exports.repaymentById = repaymentById;

var repay = function repay(req, res) {
  var repayment = req.params;
  var response = null; // increment repayment id for the next repayment

  repayment.repayid = _database["default"].repayments.length + 1;

  if (repayment.id === undefined) {
    response = {
      status: 400,
      data: {
        message: 'bad request, loan id must defined'
      }
    };
  } else if (req.body.amount === undefined) {
    response = {
      status: 400,
      data: {
        message: 'bad request,repayment amount must defined'
      }
    };
  } else {
    // get loan information and index based on loan id passed
    var loanInfo = _database["default"].loans.find(function (loan) {
      return loan.id === parseInt(repayment.id);
    });

    var loanIndex = _database["default"].loans.findIndex(function (loan) {
      return loan.id === parseInt(repayment.id);
    });

    if (loanIndex === -1) {
      response = {
        status: 200,
        data: {
          message: 'loan specified not exist'
        }
      };
    } else if (loanInfo.status === 'pending') {
      response = {
        status: 200,
        data: {
          message: 'sorry loan application not yet approved'
        }
      };
    } else if (parseFloat(loanInfo.paymentInstallment) !== parseFloat(repayment.amount)) {
      response = {
        status: 200,
        data: {
          message: "amount paid does not match to installement payment paid ".concat(repayment.amount, " installement payment must be ").concat(loanInfo.paymentInstallment)
        }
      };
    } else {
      // set up repayment parameters to be pushed int repayments array entity
      var nwBalance = parseFloat(loanInfo.balance) - parseFloat(repayment.amount);
      var repayInfo = {
        id: repayment.repayid,
        loanId: parseInt(repayment.id),
        amount: repayment.amount,
        oldBalance: parseFloat(loanInfo.balance),
        newBalance: nwBalance,
        createdOn: new Date()
      }; // pushing repayment transaction into entity

      _database["default"].repayments.push(repayInfo); // update loan as repayment done


      _database["default"].loans[loanIndex].balance = nwBalance; // check new balance become  zero change loan statu to repaid

      if (nwBalance === 0) {
        _database["default"].loans[loanIndex].repaid = true;
      } // response generate


      response = {
        status: 200,
        data: {
          id: repayment.repayid,
          loanId: repayment.id,
          amount: loanInfo.amount,
          createdOn: loanInfo.createdOn,
          interest: loanInfo.interest,
          monthlyInstallement: loanInfo.paymentInstallment,
          paidAmount: repayment.amount,
          balance: loanInfo.balance
        }
      };
    }
  }

  res.status(response.status).json(response);
};

exports.repay = repay;
//# sourceMappingURL=Repayments.js.map