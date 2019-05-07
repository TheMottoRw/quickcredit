import quickcredit from '../models/database';

export const loadRepayment = (req, res) => {
  const repayParam = req.params;
  let response = null;
  if (repayParam.id === undefined) {
    response = {
      status: 400,
      data: {
        message: 'bad request, there might be some missing parameters',
      },
    };
  } else {
    response = {
      status: 200,
      data: quickcredit.repayments.find(transaction => parseInt(transaction.loanId) === parseInt(repayParam.id)),
    };
  }
  res.json(response);
};
export const repaymentById = (req, res) => {
  const repayInfo = quickcredit.body;
  const repaymentInfo = quickcredit.repayments.find(transaction => transaction.id === repayInfo.id);
  res.json(repaymentInfo);
}
