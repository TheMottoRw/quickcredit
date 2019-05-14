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
    let repayInfo = [];
    quickcredit.repayments.find((transaction) => {
      if (parseInt(transaction.loanId) === parseInt(repayParam.id)) {
        repayInfo.push(transaction);
      }
    });
    if (repayInfo === []) {
      response = {
        status: 404,
        data: {
          message: `no repayment information found for loan ${repayParam.id}`,
        },
      };
    } else {
      response = {
        status: 200,
        data: repayInfo,
      };
    }
  }
  res.json(response);
};
export const repaymentById = (req, res) => {
  const repayInfo = quickcredit.body;
  const repaymentInfo = quickcredit.repayments.find(transaction => transaction.id === repayInfo.id);
  let response = null;
  if(repaymentInfo === undefined) {
    response = {
      status: 404,
      data: {
        message: `no repayment information found repayment id ${repayInfo.id}`,
      },
    };
  } else {
    response = {
      status: 200,
      data: repaymentInfo,
    };
  }
  res.status(response.status).json(response);
};
export const repay = (req, res) => {
  const repayment = req.params;
  let response = null;
  // increment repayment id for the next repayment
  repayment.repayid = quickcredit.repayments.length + 1;
  if (repayment.id === undefined) {
    response = {
      status: 400,
      data: {
        message: 'bad request, loan id must defined',
      },
    };
  } else if (req.body.amount === undefined) {
    response = {
      status: 400,
      data: {
        message: 'bad request,repayment amount must defined',
      },
    };
  } else {
  // get loan information and index based on loan id passed
    const loanInfo = quickcredit.loans.find(loan => loan.id === parseInt(repayment.id));
    const loanIndex = quickcredit.loans.findIndex(loan => loan.id === parseInt(repayment.id));
    if (loanIndex === -1) {
      response = {
        status: 404,
        data: {
          message: 'loan specified not exist',
        },
      };
    } else if (loanInfo.status === 'pending') {
      response = {
        status: 403,
        data: {
          message: 'sorry loan application not yet approved',
        },
      };
    } else if (loanInfo.repaid === true && loanInfo.balance === 0) {
      response = {
        status: 406,
        data: {
          message: 'sorry loan already repaid',
        },
      };
    } else if (parseFloat(loanInfo.paymentInstallement) !== parseFloat(req.body.amount)) {
      response = {
        status: 200,
        data: {
          message: `amount paid does not match to installement payment paid ${req.body.amount} installement payment must be ${loanInfo.paymentInstallement}`,
        },
      };
    } else {
      // set up repayment parameters to be pushed int repayments array entity
      const nwBalance = parseFloat(loanInfo.balance) - parseFloat(req.body.amount);
      const repayInfo = {
        id: repayment.repayid,
        loanId: parseInt(repayment.id),
        amount: req.body.amount,
        oldBalance: parseFloat(loanInfo.balance),
        newBalance: nwBalance,
        createdOn: new Date(),
      };
      // pushing repayment transaction into entity
      quickcredit.repayments.push(repayInfo);
      // update loan as repayment done
      quickcredit.loans[loanIndex].balance = nwBalance;
      // check new balance become  zero change loan statu to repaid
      if (nwBalance === 0) {
        quickcredit.loans[loanIndex].repaid = true;
      }
      // response generate
      response = {
        status: 200,
        data: {
          id: repayment.repayid,
          loanId: repayment.id,
          amount: loanInfo.amount,
          createdOn: loanInfo.createdOn,
          interest: loanInfo.interest,
          monthlyInstallement: loanInfo.paymentInstallement,
          paidAmount: req.body.amount,
          balance: loanInfo.balance,
        },
      };
    }
  }
  res.status(response.status).json(response);
};