const express=require('express');
const { editBudget , defaultBudget ,getBudget } = require('../controllers/budget');
const router=express.Router();
const { requireSignin } = require('../middlewares/auth');
router.post('/editBudget',requireSignin,editBudget);
router.get('/getBudget',requireSignin,getBudget);

module.exports=router;