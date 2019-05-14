/* eslint-disable no-mixed-operators */
import quickcredit from '../models/database';

export const hasLoan = (token) => {
  const userInfo = quickcredit.users.find(user => user.token === token);
  const loanIndex = quickcredit.loans.findIndex(loan => loan.user === userInfo.email && (loan.status === 'pending' || (loan.status === 'approved' && loan.repaid === false)));
  return loanIndex !== -1;
};
export const interestCalculator = (amount => ((parseFloat(amount) * 5) / 100).toFixed(1));
export const installementCalculator = (amount, tenor) => parseFloat(((parseFloat(amount) + parseFloat(interestCalculator(amount))) / parseInt(tenor)).toFixed(2));
