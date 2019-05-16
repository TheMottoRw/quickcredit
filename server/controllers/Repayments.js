import quickcredit from '../models/database';
import { validateLoanRepay } from '../middlewares/validator';
export const loadRepayment = (req, res) => {
  const { id } = req.params;
  const result = validateLoanRepay(req.params);
  let response = null;
  if (id === undefined) {
    response = {
      status: 400,
      data: {
        message: 'Id must be provided',
      },
    };
  } else if (result.error !== null) {
    response = {
        status: 200,
        message:result.error.details[0].message, 
    };
} else {
    let repayInfo = [];
    quickcredit.repayments.find((transaction) => {
      if (parseInt(transaction.loanId) === parseInt(id)) {
        repayInfo.push(transaction);
      }
    });
    if (repayInfo === []) {
      response = {
        status: 404,
        data: {
          message: `No repayment information found for loan ${id}`,
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
  const { id } = quickcredit.body;
  const repaymentInfo = quickcredit.repayments.find(transaction => transaction.id === id);
  let response = null;
  if(repaymentInfo === undefined) {
    response = {
      status: 404,
      data: {
        message: `No record found for repayment id ${id}`,
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
  const { body: { amount }, params: { id } } = req;
  let response = null;
  const result = validateLoanRepay({ amount: amount, id: id });
  const repayid = quickcredit.repayments.length + 1;
  if (id === undefined) {
    response = {
      status: 400,
      data: {
        message: `Id must be provided`,
      },
    };
  } else if (amount === undefined) {
    response = {
      status: 400,
      data: {
        message: 'Amount must be provided',
      },
    };
  }else if (result.error !== null) {
    response = {
        status: 200,
        message:result.error.details[0].message, 
    };
}  else {
    const loanInfo = quickcredit.loans.find(loan => loan.id === parseInt(id));
    const loanIndex = quickcredit.loans.findIndex(loan => loan.id === parseInt(id));
    if (loanIndex === -1) {
      response = {
        status: 404,
        data: {
          message: 'Given loan id does not exist',
        },
      };
    } else if (loanInfo.status === 'pending') {
      response = {
        status: 403,
        data: {
          message: 'Sorry loan application not yet approved',
        },
      };
    } else if (loanInfo.repaid === true && loanInfo.balance === 0) {
      response = {
        status: 403,
        data: {
          message: 'Sorry loan already repaid',
        },
      };
    } else if (parseFloat(loanInfo.paymentInstallement) !== parseFloat(amount) && parseFloat(loanInfo.balance) !== parseFloat(amount)) {
      response = {
        status: 200,
        data: {
          message: `Amount paid does not match to installement payment paid ${amount} installement payment must be ${loanInfo.paymentInstallement}`,
        },
      };
    } else {
      const nwBalance = parseFloat(loanInfo.balance) - parseFloat(amount);
      const repayInfo = {
        id: repayid,
        loanId: parseInt(id),
        amount: amount,
        oldBalance: parseFloat(loanInfo.balance),
        newBalance: nwBalance,
        createdOn: new Date(),
      };
      quickcredit.repayments.push(repayInfo);
      quickcredit.loans[loanIndex].balance = nwBalance;
      if (nwBalance === 0) {
        quickcredit.loans[loanIndex].repaid = true;
      }
      response = {
        status: 201,
        data: {
          id: repayid,
          loanId: id,
          amount: loanInfo.amount,
          createdOn: loanInfo.createdOn,
          interest: loanInfo.interest,
          monthlyInstallement: loanInfo.paymentInstallement,
          paidAmount: amount,
          balance: loanInfo.balance,
        },
      };
    }
  }
  res.status(response.status).json(response);
};
