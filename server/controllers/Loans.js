import quickcredit from '../models/database';
import { isVerified } from '../helpers/userAccount';
import { hasLoan, installementCalculator, interestCalculator } from '../helpers/Loans';

export const toggleStatus = (req, res) => {
  const loanParam = req.params;
  let response = null;
  let loanInfo = null;
  // response generate
  if( req.body.status === undefined) {
    response = {
      status: 400,
      data: {
        message: "status must be defined",
      },
    };  
  }else {
      loanInfo = quickcredit.loans.find(loan => loan.id === parseInt(loanParam.id));
    if(loanInfo === undefined) {
      response = {
        status: 200,
        data: {
          message: `no data found for loan id ${loanParam.id}`,
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
