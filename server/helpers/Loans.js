/* eslint-disable no-mixed-operators */
import quickcredit from '../models/database';

export const hasLoan = (token) => {
  const loanIndex = quickcredit.loans.findIndex(loan => loan.user === token && (loan.status === 'pending') || (loan.status === 'approved' && loan.repaid === false));
  return loanIndex !== -1;
};
export const interestCalculator = (amount => parseFloat(amount + (amount * 5) / 100).toFixed(1));
export const installementCalculator = (amount, tenor) => parseFloat(((amount + interestCalculator(amount)) / tenor).toFixed(2));