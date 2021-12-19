const express=require('express')
const router=express.Router();
const {register,login,currentUser,deleteUser}=require("../controllers/auth");
const { requireSignin } = require('../middlewares/auth');
router.post('/register',register);
router.post('/login',login);
router.get('/currentuser',requireSignin,currentUser);
router.delete('/deleteUser',requireSignin,deleteUser);

module.exports=router;