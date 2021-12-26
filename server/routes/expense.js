const express=require('express')
const router=express.Router();
const formidable=require('express-formidable')
const { requireSignin } = require('../middlewares/auth');
const {addExpense, showExpenses,updateExpense,deleteExpense,uploadReceipt,addEmail,deleteEmail} = require('../controllers/expense');
const { addDebtEmail, deleteDebtEmail,showDebt}=require('../controllers/loan_debt');

router.post('/addexpense',requireSignin,addExpense);
router.get('/showexpenses',requireSignin,showExpenses);
router.get('/showDebt',requireSignin,showDebt);
router.delete('/deleteexpense/:id',requireSignin,deleteExpense);
router.post('/deleteEmail/:id',requireSignin,deleteEmail);
router.post('/deleteDebtEmail/:id',requireSignin,deleteDebtEmail);
router.post('/addEmail',requireSignin,addEmail);
router.post('/addDebtEmail',requireSignin,addDebtEmail);
router.post('/uploadReceipt',requireSignin,formidable({maxFileSize:5*1024*1024}),uploadReceipt);
module.exports=router;