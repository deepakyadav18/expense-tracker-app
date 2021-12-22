const Expense=require("../models/expense");
const cloudinary=require('cloudinary');

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_KEY,
    secret:process.env.CLOUDINARY_SECRET,
})
const addExpense= async(req,res)=>{
    
    const {type,
        InterestType,
        desc,
        amount,
        percentage,
        cat,
        date,}=req.body;

    const {_id}=req.user;
    var flag=true;
    
    for(var i=0;i<amount.length;i++){
        if((amount[i]-'0')<0 || (amount[i]-'0')>9){
            flag=false;
            break;
        }
    }

    if(!desc.length || !amount.length || !flag || !type.length || !cat.length){
        return res.json({
            error:'Fill All The Required Details Correcty.',
        })
    };
    try{
        const expense=await Expense.create({
            user:_id,
            type,
            InterestType,
            desc,
            amount,
            percentage,
            cat,
            date,
        });
        console.log("transaction=>",req.body);
        res.send(expense);

    } catch(err){
        console.log(err);
        res.status(400);
    }
}

const showExpenses=async(req,res)=>{
    try{
        const expenses=await Expense.find({user:req.user._id})
        res.json(expenses);
    } catch(err){
        console.log(err);
    }
}

const updateExpense=async(req,res)=>{
    const {_id}=req.user;
    try{
        const {type,
        InterestType,
        desc,
        amount,
        percentage,
        cat,
        date,}=req.body;

        const newExpense={};
        if(type){
            newExpense.type=type;
        }
        if(cat){
            newExpense.cat=cat;
        }
        if(amount){
            newExpense.amount=amount;
        }
        if(desc){
            newExpense.desc=desc;
        }
        if(InterestType){
            newExpense.InterestType=InterestType;
        }
        if(percentage){
            newExpense.percentage=percentage;
        }
        if(date){
            newExpense.date=date;
        }

        let expense=await Expense.findById(req.params.id);
        if(!expense){
            return res.status(404).send("Not Found");
        }
        if(expense.user.toString()!==_id){
            return res.status(401).send("Not Allowed");
        }

        expense=await Expense.findByIdAndUpdate(req.params.id,{$set:newExpense},{new:true});
        res.json({expense});
        
    } catch(err){
        console.log(err);
    }
}

const deleteExpense=async(req,res)=>{
    const {_id}=req.user;
    try{

        // Finding the expense to be deleted
        let expense=await Expense.findById(req.params.id);
        if(!expense){
            return res.status(404).send("Not Found");
        }
        if(expense.user.toString()!==_id){
            return res.status(401).send("Not Allowed");
        }

        expense=await Expense.findByIdAndDelete(req.params.id);
        res.json({"Success":"Expense has been deleted",expense:expense});
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
}

const uploadReceipt=async(req,res)=>{
    // console.log("req files=>",req.files);
    const result=await cloudinary.uploader(req.files.image.path);
    console.log("uploaded image url=>",result);
    res.json({
        url:result.secure_url,
        public_id:result.public_id
    })
}

module.exports={addExpense,showExpenses,updateExpense,deleteExpense,uploadReceipt};