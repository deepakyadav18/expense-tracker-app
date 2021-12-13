const express=require('express')
const router=express.Router();

const { requireSignin } = require('../middlewares/auth');

const {addExpense, showExpenses,updateExpense,deleteExpense} = require('../controllers/expense');

router.post('/addexpense',requireSignin,addExpense);
router.get('/showexpenses',requireSignin,showExpenses);
router.put('/updateexpense/:id',requireSignin,updateExpense);
router.delete('/deleteexpense/:id',requireSignin,deleteExpense);
module.exports=router;