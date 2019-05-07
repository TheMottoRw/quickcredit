import quickcredit from '../models/database';

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
