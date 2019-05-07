var quickcredit =require( '../models/database');

class Repayment {

    load(req, res) {
        var repayParam=req.params;
        let repaymentInfo=quickcredit.repayments.find((transaction)=> transaction.loanId==parseInt(repayParam.id));
        res.send(repaymentInfo);
    }
    loadById(req, res) {
          var repayInfo=quickcredit.body;
        let repaymentInfo=quickcredit.transactions.find((id)=> quickcredit.transactions.id==repayInfo.id);
        res.send(repaymentInfo);
    }

    repay(req, res) {

        var repayment = req.body;
        
        // increment repayment id for the next repayment
        repayment.id = quickcredit.transactions.length + 1;

        // push or add repayment to an array of repayments
        quickcredit.transactions.push(repayment);
        
        // response generate
        var response = {
            status: 200,
            data: {
                id: repayment.id,
                createdOn: timezone.now,
                loanId:repayment.id,
                amount: repayment.amount,
                oldBalance: quickcredit.transactions.oldBalance,
                newBalance: repayment.balance,
                interest: repayment.interest,
            }
        }

        res.json(response);
    }    
}

const transactions = new Repayment();
module.exports=transactions;