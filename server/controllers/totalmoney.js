const Expense=require("../models/expense");

const totalMoney=async(req,res)=>{
    try{
        const expenses=await Expense.find({user:req.user._id});
        const total=0;
        expenses.forEach(expense => {
           if(expense.type==="Debit"){
                total-=Number(expense.amount);
           }
           else if(expense.type==="Credit"){
               total+=Number(expense.amount);
           }
        });
        res.json(total);
    } catch(err){
        console.log(err);
    }
}

module.exports={totalMoney};