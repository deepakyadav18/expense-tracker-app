const express=require('express')
const router=express.Router();
const formidable=require('express-formidable')
const { requireSignin } = require('../middlewares/auth');
const {addExpense, showExpenses,updateExpense,deleteExpense,uploadReceipt} = require('../controllers/expense');

router.post('/addexpense',requireSignin,addExpense);
router.get('/showexpenses',requireSignin,showExpenses);
router.put('/updateexpense/:id',requireSignin,updateExpense);
router.delete('/deleteexpense/:id',requireSignin,deleteExpense);
router.post('/uploadReceipt',requireSignin,formidable({maxFileSize:5*1024*1024}),uploadReceipt);
module.exports=router;