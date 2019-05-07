/* eslint-disable object-curly-newline */
import express from 'express';
import { createUser, login, loadUser, toggleVerification, resetPassword } from '../controllers/Users';
import { applications, apply, toggleStatus, loanById } from '../controllers/Loans';
import { loadRepayment, repay } from '../controllers/Repayments';

const router = express.Router();
// API URL init
const version = 'v1';
const baseUrl = `/api/${version}`;

router.post(`${baseUrl}/auth/signup`, createUser);
router.post(`${baseUrl}/auth/signin`, login);
router.get(`${baseUrl}/users`, loadUser);
router.patch(`${baseUrl}/users/:email/verify`, toggleVerification);
router.patch(`${baseUrl}/users/:token/reset`, resetPassword);

router.get(`${baseUrl}/loans`, applications);
router.get(`${baseUrl}/loans/:id`, loanById);
router.post(`${baseUrl}/loans`, apply);
router.patch(`${baseUrl}/loans/:id`, toggleStatus);
// Repayment Transactions
router.post(`${baseUrl}/loans/:id/repayment`, repay);
router.get(`${baseUrl}/loans/:id/repayments`, loadRepayment);
// Sending an email
// router.post(` ${baseUrl}/send', users.emailSend);
export default router;
