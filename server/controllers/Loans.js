import quickcredit from '../models/database';
import { isVierified } from '../helpers/userAccount';
import { hasLoan, installementCalculator, interestCalculator } from '../helpers/Loans';

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
    loan.id = quickcredit.loans.length + 1;
    loan.balance = loan.amount;
    loan.repaid = false;
    loan.status = 'pending';
    loan.createdOn = new Date();
    // push or add loan to an array of loans
    if (!isVierified(loan.user)) {
      response = {
        status: 200,
        data: {
          message: 'sorry your account not yet verified, wait for a moment',
        },
      };
    } else if (hasLoan(loan.user)) {
      response = {
        status: 200,
        data: {
          message: 'sorry you already have a loan',
        },
      };
    } else {
      quickcredit.loans.push(loan);
      // response generate
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
          paymentInstallement: installementCalculator(loan.amount, loan.tenor),
          balance: parseFloat(loan.amount),
          interest: interestCalculator(loan.interest),
        },
      };
    }
  }
  res.status(response.status).json(response);
};
