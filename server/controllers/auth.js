const {hashPassword,comparePassword} = require("../helpers/auth")
const User=require("../models/user")
const jwt=require('jsonwebtoken')
const Expense=require("../models/expense");
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

const deleteUser=async(req,res)=>{
    const {_id}=req.user;
    const {email}=req.body.email;
    try{

        const expense=await Expense.deleteMany({"user":_id});
        const budget=await Budget.deleteOne(email);
        const user=await User.findByIdAndDelete(_id);
        res.json("Deleted")
    } catch(err){
        console.log(err);
    }
}

const changePassword=async(req,res)=>{
    
    const {name,email,oldp,newp}=req.body;

    try {

         if(!oldp ||!newp ) return res.json({
            error:'Fill All The Given Blanks.',
        })
        //return res.status(400).send("Fill All The Given Blanks Correctly.");

        var user=await User.findOne({email});
        
        const match=await comparePassword(oldp,user.password);
        if(!match) return res.json({
            error:'Wrong Old Password.',
        })

        const hashedPassword=await hashPassword(newp);

        const newUser={
            name:name,
            email:email,
            password:hashedPassword
        };

        user=await User.findOneAndUpdate({email},{$set:newUser},{new:true});
        
        res.json(user);
    } catch (error) {
        console.log(error);
    }

    
}

const editUser=async(req,res)=>{
    const {name,email}=req.body;
    const {_id}=req.user;
    try {

        if(!name ||!email ) return res.json({
           error:'Fill All The Given Blanks.',
        })
       //return res.status(400).send("Fill All The Given Blanks Correctly.");

       var user=await User.findOne({_id});

        const newUser={
            name:name,
            email:email
        };

       user=await User.findByIdAndUpdate(_id,{$set:newUser},{new:true});
       
       res.json(user);
   } catch (error) {
       console.log(error);
   }
}

module.exports={register,login,currentUser,deleteUser,changePassword,editUser}
