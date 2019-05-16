import quickcredit from '../models/database';
import { isVerified } from '../helpers/userAccount';
import { hasLoan, installementCalculator, interestCalculator, missingParameter } from '../helpers/Loans';

export const loadLoans = (req, res) => {
  const { status, repaid } = req.body;
  if (status === undefined && repaid === undefined) {
    res.json(quickcredit.loans);
  } else {
    loadByCriteria(req, res);
  }
};
export const loadByCriteria = (req, res) => {
let {status, repaid } = req.query;
let loanInfo = [];
let response = null;
quickcredit.loans.find((loan) => {
  if (loan.status === status && loan.repaid === repaid) {
    loanInfo.push(loan);
  }
});
if (loanInfo === []) {
  response = {
    status: 404,
    data: {
      message: `No loan record found for status ${status} and repaid ${repaid} specifications`,
    },
  };
} else {
  response = {
    status: 200,
    data: loanInfo,
  };
};
res.status(response.status).json(response);
}

export const loanById = (req, res) => {
  const loanInfo = quickcredit.loans;
  let response = null;
  const { id } = req.params;
  if (id === undefined) {
    response = {
      status: 400,
      data: {
        message: 'Bad request, id must be defined',
      },
    };
  } else {
    const specificLoan = loanInfo.find(loan => loan.id === parseInt(id));
    if (specificLoan === undefined) {
      response = {
        status: 404,
        data: {
          message: `No loan record found for id ${id}`,
        },
      };
    } else {
      response = {
        status: 200,
        data: specificLoan,
      };
    }
  }
  res.status(response.status).json(response);
};

export const apply = (req, res) => {
  const { user, amount, tenor } = req.body;
  let response = null;
  if (user === undefined || amount === undefined || tenor === undefined) {
    response = {
      status: 400,
      data: {
        message: ` ${missingParameter(['user','amount','tenor'], req.body)} must be provided`,
      },
    };
  } else {
    const userInfo = quickcredit.users.find(usr => usr.token === user);
    if (!isVerified(user)) {
      response = {
        status: 403,
        data: {
          message: 'Sorry your account not yet verified, contact admin',
        },
      };
    } else if (hasLoan(user)) {
      response = {
        status: 403,
        data: {
          message: 'Sorry you already have a loan',
        },
      };
    } else {
      const interest = interestCalculator(amount);
      const loan={
        'id': quickcredit.loans.length + 1,
        'user': userInfo.email,
        'repaid': false,
        'status': 'pending',
        'createdOn': new Date(),
        'amount': amount,
        'tenor': tenor,
        'paymentInstallement': installementCalculator(amount, tenor),
        'balance': parseFloat(amount) + parseFloat(interest),
        'interest': interest
      }
      quickcredit.loans.push(loan);
      response = {
        status: 201,
        data: {
          id: loan.id,
          user: loan.email,
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          createdOn: new Date(),
          status: 'pending',
          repaid: false,
          tenor: loan.tenor,
          amount: loan.amount,
          paymentInstallement: loan.paymentInstallement,
          balance: loan.balance,
          interest: loan.interest,
        },
      };
    }
  }
  res.status(response.status).json(response);
};

export const toggleStatus = (req, res) => {
  const { body: { status }, params: { id } } = req;
  let response = null;
  let loanInfo = null;
  if( status === undefined) {
    response = {
      status: 400,
      data: {
        message: "Status must be provided",
      },
    };  
  }else {
      loanInfo = quickcredit.loans.find(loan => loan.id === parseInt(id));
    if(loanInfo === undefined) {
      response = {
        status: 404,
        data: {
          message: `No record found for loan id ${id}`,
        },
      };  
    } else {
      const loanIndex = quickcredit.loans.findIndex(loan => loan.id === parseInt(id));
      quickcredit.loans[loanIndex].status = status;
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
          interest: loanInfo.interest,
        },
      };
    }
}
  res.status(response.status).json(response);
};

export const applications = (req, res) => {
  const {status, repaid} = req.query;
  let loanApplication = null;
  if (status === undefined && repaid === undefined) {
    loanApplication = quickcredit.loans;
  } else {
    loanApplication = quickcredit.loans.find(loan => loan.status === status && loan.repaid === (repaid === 'true'));
  }
  res.json(loanApplication);
};
