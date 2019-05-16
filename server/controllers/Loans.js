import quickcredit from '../models/database';
import { isVerified } from '../helpers/userAccount';
import { hasLoan, installementCalculator, interestCalculator } from '../helpers/Loans';

export const loadLoans = (req, res) => {
  if (req.body.status === undefined && req.body.repaid === undefined) {
    res.json(quickcredit.loans);
  } else {
    loadByCriteria(req, res);
  }
};

export const loanById = (req, res) => {
  const loanInfo = quickcredit.loans;
  let response = null;
  if (req.params.id === undefined) {
    response = {
      status: 400,
      data: {
        message: 'Bad request, id must be defined',
      },
    };
  } else {
    const loanid = req.params.id;
    const specificLoan = loanInfo.find(loan => loan.id === parseInt(loanid));
    if (specificLoan === undefined) {
      response = {
        status: 200,
        data: {
          message: 'No data found',
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
  const loan = req.body;
  let response = null;
  if (loan.user === undefined || loan.amount === undefined || loan.tenor === undefined) {
    response = {
      status: 400,
      data: {
        message: 'Bad request, there might be some missing parameters',
      },
    };
  } else {
  // increment loan id for the next loan
    const userInfo = quickcredit.users.find(user => user.token === loan.user);
    // push or add loan to an array of loans
    if (!isVerified(loan.user)) {
      response = {
        status: 200,
        data: {
          message: 'Sorry your account not yet verified, wait for a moment',
        },
      };
    } else if (hasLoan(loan.user)) {
      response = {
        status: 200,
        data: {
          message: 'Sorry you already have a loan',
        },
      };
    } else {
      loan.user = userInfo.email;
      loan.id = quickcredit.loans.length + 1;
      loan.repaid = false;
      loan.status = 'pending';
      loan.createdOn = new Date();
      loan.interest = interestCalculator(loan.amount);
      loan.status = 'pending';
      loan.paymentInstallement = installementCalculator(loan.amount, loan.tenor);
      loan.balance = parseFloat(loan.amount) + parseFloat(loan.interest);
      quickcredit.loans.push(loan);
      // response generate
      response = {
        status: 200,
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
  const loanParam = req.params;
  let response = null;
  let loanInfo = null;
  // response generate
  if( req.body.status === undefined) {
    response = {
      status: 400,
      data: {
        message: "Status must be defined",
      },
    };  
  }else {
      loanInfo = quickcredit.loans.find(loan => loan.id === parseInt(loanParam.id));
    if(loanInfo === undefined) {
      response = {
        status: 200,
        data: {
          message: `No data found for loan id ${loanParam.id}`,
        },
      };  
    } else {
      const loanIndex = quickcredit.loans.findIndex(loan => loan.id === parseInt(loanParam.id));
      quickcredit.loans[loanIndex].status = req.body.status;
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
  const parameters = req.query;
  let loanApplication = null;
  if (parameters.status === undefined && parameters.repaid === undefined) {
    loanApplication = quickcredit.loans;
  } else {
    loanApplication = quickcredit.loans.find(loan => loan.status === parameters.status && loan.repaid === (parameters.repaid === 'true'));
  }
  res.json(loanApplication);
};
