var express=require('express'),
users =require('../controllers/Users'),
loans =require('../controllers/Loans'),
transactions =require('../controllers/Repayments');

const router = express.Router();
//API URL init
const version = 'v1';
const base_url = '/api/'+ version;

router.post(base_url +'/auth/signup', users.create);
router.post(base_url +'/auth/signin', users.login);
router.get(base_url +'/users', users.load);
router.patch(base_url +'/users/:email/verify',users.toggleVerification);

router.get(base_url +"/loans", loans.applications);
router.get(base_url +'/loans/:id', loans.loadById);
router.post(base_url +'/loans', loans.apply);
router.patch(base_url +'/loans/:id', loans.toggleStatus);
//Repayment Transactions
router.get(base_url +'/loans/:id/repayments', transactions.load);

module.exports=router;