import quickcredit from '../models/database';

export const toggleStatus = (req, res) => {
  const loanParam = req.params;
  let response = null;
  const loanInfo = quickcredit.loans.find(loan => loan.id === parseInt(loanParam.id));
  // const loanIndex = quickcredit.loans.findIndex(loan => loan.id === parseInt(loanParam.id));
  loanInfo.status = req.query.status;
  // response generate
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
  res.status(response.status).json(response);
};
