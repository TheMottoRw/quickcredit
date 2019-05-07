import quickcredit from '../models/database';

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
        status: 200,
        data: {
          message: 'loan specified not exist',
        },
      };
    } else if (loanInfo.status === 'pending') {
      response = {
        status: 200,
        data: {
          message: 'sorry loan application not yet approved',
        },
      };
    } else if (parseFloat(loanInfo.paymentInstallment) !== parseFloat(repayment.amount)) {
      response = {
        status: 200,
        data: {
          message: `amount paid does not match to installement payment paid ${repayment.amount} installement payment must be ${loanInfo.paymentInstallment}`,
        },
      };
    } else {
      // set up repayment parameters to be pushed int repayments array entity
      const nwBalance = parseFloat(loanInfo.balance) - parseFloat(repayment.amount);
      const repayInfo = {
        id: repayment.repayid,
        loanId: parseInt(repayment.id),
        amount: repayment.amount,
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
          monthlyInstallement: loanInfo.paymentInstallment,
          paidAmount: repayment.amount,
          balance: loanInfo.balance,
        },
      };
    }
  }
  res.status(response.status).json(response);
};
