var quickcredit = require('../models/database');

class Loans {

    load(req, res) {
        res.json(quickcredit.loans);
    }
    loadById(req, res) {
        var loanInfo=quickcredit.loans,
            loanid=req.params.id,
            specificLoan=loanInfo.find((loan)=> loan.id===parseInt(loanid))
        res.json(specificLoan);
    }
    apply(req, res) {

        var loan = req.body;
        
        // increment loan id for the next loan
        loan.id = quickcredit.loans.length + 1;

        // push or add loan to an array of loans
        quickcredit.loans.push(loan);
        
        // response generate
        var response = {
            status: 200,
            data: {
                id: loan.id,
                user: loan.email,
                createdOn: new Date(),
                status:'pending',
                repaid: false,
                tenor: loan.tenor,
                amount: loan.amount,
                paymentInstallement: loan.paymentInstallement,
                balance: 0,
                interest: loan.interest,
            }
        }

        res.json(response);
    }
    toggleStatus(req,res){
        var loanParam=req.params,
        loanInfo=quickcredit.loans.find((loan)=> loan.id===parseInt(loanParam.id)),
        loanIndex=quickcredit.loans.findIndex((loan)=> loan.id===parseInt(loanParam.id));
        loanInfo.status=req.query.status;
        // response generate
        var response = {
            status: 200,
            data: {
                id: loanInfo.id,
                user: loanInfo.email,
                createdOn: loanInfo.createdOn,
                status:loanInfo.status,
                repaid: loanInfo.repaid,
                tenor: loanInfo.tenor,
                amount: loanInfo.amount,
                paymentInstallement: loanInfo.paymentInstallement,
                balance: loanInfo.balance,
                interest: loanInfo.interest,
            }
        }

        res.json(response);
    }
    applications(req,res){
        var parameters=req.query,loanApplication;
        if(parameters.status===undefined) {
            loanApplication=quickcredit.loans;
        }else{
            loanApplication=quickcredit.loans.find((loan)=>loan.status==parameters.status && loan.repaid===(parameters.repaid=='true'?true:false));
        }
        res.json(loanApplication);
    }
    loadByCriteria(req, res) {
        var criterias = req.params;

        // find loan with specific criterias 
        var loan = quickcredit.loans.find((loan) => loan.status == criterias.status 
                                                && loan.repaid == criterias.repaid);
        // specific loan loading response 
        var response = {
            status : 200,
            data : {
                id: loan.id,
                user: loan.email,
                createdOn: loan.createdOn,
                status:loan.status,
                repaid: loan.repaid,
                tenor: loan.tenor,
                amount: loan.amount,
                paymentInstallement: parseFloat(loan.paymentInstallment),
                balance: loan.balance,
                interest: loan.interest,
            }
        };

        res.json(response);
    }    
}

const loans = new Loans();
module.exports=loans;