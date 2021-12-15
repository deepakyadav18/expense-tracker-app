import React from 'react'
import { useState , useContext , useEffect } from 'react';
import {userContext} from "../context/index";
import axios from 'axios';
import {toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import UserRoute from './routes/UserRoute';
import { useHistory } from 'react-router-dom';
import Expense from './Expense';
const Body = () => {

    const [state,setState]=useContext(userContext);
    const [type, setType] = useState("");
    const [InterestType, setInterestType] = useState("");
    const [desc, setDesc] = useState("");
    const [amount, setAmount] = useState("0");
    const [percentage, setPercentage] = useState("0");
    const [cat, setCat] = useState("");
    const [date, setDate] = useState(Date.now());

    const[expenses,setExpenses]=useState([]);
    const history=useHistory();

    const AddTransaction=async(e)=>{
        e.preventDefault();
          
        try{
            const {data}=await axios.post("http://localhost:8000/api/addexpense",{type,desc,amount,cat,date},{
                headers:{
                    Authorization:'Bearer '+state.token
                }
            });
            console.log("res=>",data);
            if(data.error){
                toast.error(data.error)
            }
            else{
                fetchUserExpenses();
                toast.success("Expense added");
            }
            
        } catch(err){
            console.log(err);
        }

        setType("");
                setInterestType("");
                setAmount("");
                setPercentage("");
                setCat("");
                setDate(Date.now());
                setDesc("");
    }

    useEffect(() => {
        if(state && state.token)  fetchUserExpenses();
    }, [state && state.token])

    const fetchUserExpenses=async()=>{
        try{
            const {data}=await axios.get("http://localhost:8000/api/showexpenses",{
                headers:{
                    Authorization:'Bearer '+state.token
                }
            })
            setExpenses(data);
            console.log("user expenses=>",data);
        } catch(err){
            console.log(err);
        }
    }

    return (
        <UserRoute>
            <h1 className="text-center my-3">Personal Expense Tracker</h1>
            <div className="container">
                <button type="button" className="btn btn-primary mx-3" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Add Expense
                </button>
                <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog modal-xl">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="staticBackdropLabel">Add Transaction</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="d-flex flex-column bd-highlight mb-3" >
                                    <div class="p-2 bd-highlight">
                                        <div class="d-flex justify-content-around">
                                            <div class="row g-3 align-items-center">
                                                <div class="col-auto">
                                                    <label class="col-form-label">Transaction Type</label>
                                                </div>
                                                <div class="col-auto">
                                                    <select value={type} onChange={(e) => { setType(e.target.value) }} class="form-select form-select-sm" aria-label=".form-select-sm example">
                                                        <option selected>Select Transaction Type</option>
                                                        <option value="Debit">Debit</option>
                                                        <option value="Credit">Credit</option>
                                                        <option value="Debt/Loan">Debt/Loan</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="row g-3 align-items-center">
                                                <div class="col-auto">
                                                    <label class="col-form-label">Description</label>
                                                </div>
                                                <div class="col-auto">
                                                    <input type="text" class="form-control" placeholder='Enter Description' value={desc} onChange={(e) => { setDesc(e.target.value) }} />
                                                </div>
                                            </div>
                                            <div class="row g-3 align-items-center">
                                                <div class="col-auto">
                                                    <label class="col-form-label">Transaction Amount</label>
                                                </div>
                                                <div class="col-auto">
                                                    <input type="text" class="form-control" placeholder='Enter Transaction Amount' value={amount} onChange={(e) => { setAmount(e.target.value) }} />
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div class="p-2 bd-highlight">
                                        <div class="d-flex justify-content-around">
                                            <div class="row g-3 align-items-center">
                                                <div class="col-auto">
                                                    <label class="col-form-label">Transaction Date</label>
                                                </div>
                                                <div class="col-auto">
                                                    <input type="date" class="form-control" value={date} onChange={(e) => { setDate(e.target.value) }}/>
                                                </div>
                                            </div>
                                            {type=='Debt/Loan'?<><div class="row g-3 align-items-center">
                                                <div class="col-auto">
                                                    <label class="col-form-label">Interest Type</label>
                                                </div>
                                                <div class="col-auto">
                                                    <select value={InterestType} onChange={(e) => { setInterestType(e.target.value) }} class="form-select form-select-sm" aria-label=".form-select-sm example">
                                                        <option selected value="Simple">Simple Interest</option>
                                                        <option value="Compound">Compound Interest</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="row g-3 align-items-center">
                                            <div class="col-auto">
                                                <label class="col-form-label">Interest In Percentage</label>
                                            </div>
                                            <div class="col-auto">
                                                <input type="text" class="form-control" placeholder='Enter Interest Percentage' value={percentage} onChange={(e) => { setPercentage(e.target.value) }} />
                                            </div>
                                        </div></>:<></>}
                                            <div class="row g-3 align-items-center">
                                                <div class="col-auto">
                                                    <label class="col-form-label">Transaction Catergory</label>
                                                </div>
                                                <div class="col-auto">

                                                    {type === 'Credit' ?
                                                        <select value={cat} onChange={(e) => { setCat(e.target.value) }} class="form-select form-select-sm" aria-label=".form-select-sm example">
                                                            <option selected>Select Credit Option</option>
                                                            <option value="Salary">Salary</option>
                                                            <option value="Other Income">Other Income</option>
                                                        </select> : (type === 'Debit' ?
                                                            <select value={cat} onChange={(e) => { setCat(e.target.value) }} class="form-select form-select-sm" aria-label=".form-select-sm example">
                                                                <option selected>Select Debit Option </option>
                                                                <option value="Food And Beverage">Food And Beverage</option>
                                                                <option value="Transportation">Transportation</option>
                                                                <option value="Rentals">Rentals</option>
                                                                <option value="Water And Electricity">Water And Electricty</option>
                                                                <option value="Phone and Internet">Phone and Internet</option>
                                                                <option value="Gas/LPG">Gas/LPG</option>
                                                                <option value="Streaming Services">Streaming Services</option>
                                                                <option value="Home Maintainence">Home Maintainence</option>
                                                                <option value="Vehicle Maintainence">Vehicle Maintainence</option>
                                                                <option value="Medical Checkup">Medical Checkup</option>
                                                                <option value="Insurance">Insurance</option>
                                                                <option value="Education">Education</option>
                                                                <option value="Personal Expense">Personal Expense</option>
                                                                <option value="Pets">Pets</option>
                                                                <option value="Fitness">Fitness</option>
                                                                <option value="Gifts And Donations">Gifts And Donations</option>
                                                                <option value="Investments">Investments</option>
                                                                <option value="Loan Interest">Loan Interest</option>
                                                                <option value="Other Expenses">Other Expense</option>
                                                            </select> : (type === 'Debt/Loan' ?
                                                                <select value={cat} onChange={(e) => { setCat(e.target.value) }} class="form-select form-select-sm" aria-label=".form-select-sm example">
                                                                    <option selected>Select Debt/Loan Option</option>
                                                                    <option value="Debt Collection">Debt Collection</option>
                                                                    <option value="Debt">Debt</option>
                                                                    <option value="Loan">Loan</option>
                                                                    <option value="Repayment">Repayment</option>
                                                                </select> :
                                                                <select class="form-select form-select-sm" aria-label=".form-select-sm example">
                                                                    <option selected>Select Type First</option>
                                                                </select>))}

                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div class="modal-footer">
                                <button data-bs-toggle="modal" data-bs-target="#staticBackdrop" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Dismiss Transaction</button>
                                <button onClick={AddTransaction} data-bs-toggle="modal" data-bs-target="#staticBackdrop" type="button" class="btn btn-primary">Add Transaction</button>
                            </div>
                        </div>
                    </div>
                </div>
                <button type="button" className="btn btn-success mx-3">Expense Report</button>
            </div>
            <div className="container">
                <table class="table my-5">
                    <thead>
                        <tr>
                            <th scope="col">Transaction Id</th>
                            <th scope="col">Item Name</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Expense Date</th>
                            <th scope="col">Category</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <Expense expenses={expenses} setExpenses={setExpenses} />
                    </tbody>
                </table>
            </div>

        </UserRoute>
    )
}

export default Body
