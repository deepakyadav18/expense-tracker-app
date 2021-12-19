const {hashPassword,comparePassword} = require("../helpers/auth")
const User=require("../models/user")
const jwt=require('jsonwebtoken')
const Budget=require("../models/Budget");
const {defaultBudget}=require('./budget');
const register =async(req,res)=>{
    // console.log("Register endpoint =>",req.body);
    const {name,email,password}=req.body;

    // validation
    if(!name) return res.status(400).send("Name is required");
    if(!password || password.length<6) return res.status(400).send("Password is required and length should be atleast 6 characters long");
    const exist=await User.findOne({email});
    if(exist) return res.status(400).send("Email is taken")

    // hash password
    const hashedPassword=await hashPassword(password);

    const user=new User({name,email,password:hashedPassword});
    const budget=new Budget({
                    email,
                    saves:20,
                    needs:50,
                    wants:30,
                });


    try{
        await user.save();
        await budget.save();
        console.log("Registered user=>",user)
        return res.json({
            ok:true,
        })
    } catch(err){
        console.log("Register failed");
        return res.status(400).send("Error.Try Again.")
    }
};

const login = async(req,res)=>{
    try{
        const {email,password}=req.body;
        // checking if our db has user with that email
        const user=await User.findOne({email});
        if(!user) return res.status(400).send("No user found");

        // check password
        const match=await comparePassword(password,user.password);
        if(!match) return res.status(400).send("Wrong password or Wrong Email");

        // creating signed token
        const token=jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"}) 

        user.password=undefined;
        user.secret=undefined;
        res.json({
            token,
            user,
        })
    } catch(err){
        return res.status(400).send("Error.Try again")
    }
}

const currentUser=async(req,res)=>{
    try{
        const user = await User.findById(req.user._id);
        // res.json(user);
        res.json({ok:true});

    } catch(err){
        res.status(400).send(err);
    }
}

module.exports={register,login,currentUser}
