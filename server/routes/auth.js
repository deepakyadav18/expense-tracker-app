const express=require('express')
const router=express.Router();
const {register,login,currentUser}=require("../controllers/auth");
const { requireSignin } = require('../middlewares/auth');
router.post('/register',register);
router.post('/login',login);
router.get('/currentuser',requireSignin,currentUser);

module.exports=router;