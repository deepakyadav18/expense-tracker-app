const mongoose = require('mongoose');
const {Schema}=mongoose;
const budgetSchema = new Schema ({
    email:{
        type:String,
        required:true,
    },
    wants:{
        type:Number,
        required:true,
        default:30,
    },
    saves:{
        type:Number,
        required:true,
        default:20,
    },
    needs:{
        type:Number,
        required:true,
        default:50,
    }
},{timestamps:true})

var Budget=mongoose.model("Budget",budgetSchema)

module.exports=Budget;