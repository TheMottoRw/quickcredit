import quickcredit from '../models/database';

export const loanById = (req, res) => {
  const loanInfo = quickcredit.loans;
  let response = null;
  if (req.params.id === undefined) {
    response = {
      status: 400,
      data: {
        message: 'bad request, id must be defined',
      },
    };
  } else {
    const loanid = req.params.id;
    const specificLoan = loanInfo.find(loan => loan.id === parseInt(loanid));
    if (specificLoan === undefined) {
      response = {
        status: 200,
        data: {
          message: 'no data found',
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
