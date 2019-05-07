import quickcredit from '../models/database';

export const repaymentById = (req, res) => {
  const repayInfo = quickcredit.body;
  const repaymentInfo = quickcredit.repayments.find(transaction => transaction.id === repayInfo.id);
  res.json(repaymentInfo);
};
