/* eslint-disable object-curly-newline */
import express from 'express';
import { createUser, login, loadUser, toggleVerification, resetPassword } from '../controllers/Users';
import { applications, apply, toggleStatus, loanById } from '../controllers/Loans';
import { loadRepayment, repay } from '../controllers/Repayments';
import { isAuthenticated } from '../middlewares/auhentication';
import { validateSignin, validateVerifyUser, validateResetPassword, validateLoanApply, validateLoanByStatus, validateSpecificLoan, validateLoanToggle, validateLoanRepay, validateSignup } from '../middlewares/validator';

const router = express.Router();
// API URL init
const version = 'v1';
const baseUrl = `/api/${version}`;

router.get(`${baseUrl}/`, (req, res) => {
  res.send('Welcome to Quickcredit App');
});
router.post(`${baseUrl}/auth/signup`, createUser);
router.post(`${baseUrl}/auth/signin`, login);
router.get(`${baseUrl}/users`, isAuthenticated, loadUser);
router.patch(`${baseUrl}/users/:email/verify`, isAuthenticated, toggleVerification);
router.patch(`${baseUrl}/users/:email/reset`, resetPassword);

router.get(`${baseUrl}/loans`, isAuthenticated, applications);
router.get(`${baseUrl}/loans/:id`, isAuthenticated, loanById);
router.post(`${baseUrl}/loans`, isAuthenticated, apply);
router.patch(`${baseUrl}/loans/:id`, isAuthenticated, toggleStatus);
// Repayment Transactions
router.post(`${baseUrl}/loans/:id/repayment`, isAuthenticated, repay);
router.get(`${baseUrl}/loans/:id/repayments`, isAuthenticated, loadRepayment);
// Sending an email
// router.post(` ${baseUrl}/send', users.emailSend);
export default router;
