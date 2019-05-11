import quickcredit from '../models/database';
import { isVerified } from '../helpers/userAccount';
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
    // push or add loan to an array of loans
    if (!isVerified(loan.user)) {
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
