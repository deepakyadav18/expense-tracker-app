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
    const [amount, setAmount] = useState("");
    const [percentage, setPercentage] = useState("");
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
                setType("");
                setInterestType("");
                setAmount("");
                setPercentage("");
                setCat("");
                setDate(Date.now());
            }
            
        } catch(err){
            console.log(err);
        }
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
                                                        <option value="Debt">Debt/Loan</option>
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
                                                    <input type="date" class="form-control" placeholder='Enter Transaction Date' />
                                                </div>
                                            </div>
                                            {type=='Debt'?<><div class="row g-3 align-items-center">
                                                <div class="col-auto">
                                                    <label class="col-form-label">Interest Type</label>
                                                </div>
                                                <div class="col-auto">
                                                    <select value={InterestType} onChange={(e) => { setInterestType(e.target.value) }} class="form-select form-select-sm" aria-label=".form-select-sm example">
                                                        <option selected>Select Transaction Type</option>
                                                        <option value="Simple">Simple Interest</option>
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
                                                            <option value="salary">Salary</option>
                                                            <option value="other_income">Other Income</option>
                                                        </select> : (type === 'Debit' ?
                                                            <select value={cat} onChange={(e) => { setCat(e.target.value) }} class="form-select form-select-sm" aria-label=".form-select-sm example">
                                                                <option selected>Select Debit Option </option>
                                                                <option value="food">Food And Beverage</option>
                                                                <option value="trans">Transportation</option>
                                                                <option value="rent">Rentals</option>
                                                                <option value="water">Water And Electricty</option>
                                                                <option value="phone">Phone and Internet</option>
                                                                <option value="gas">Gas/LPG</option>
                                                                <option value="stream">Streaming Services</option>
                                                                <option value="home">Home Maintainence</option>
                                                                <option value="vehicle">Vehicle Maintainence</option>
                                                                <option value="medical">Medical Checkup</option>
                                                                <option value="insurance">Insurance</option>
                                                                <option value="education">Education</option>
                                                                <option value="personal">Personal Expense</option>
                                                                <option value="pet">Pets</option>
                                                                <option value="fitness">Fitness</option>
                                                                <option value="gifts">Gifts And Donations</option>
                                                                <option value="inv">Investments</option>
                                                                <option value="loan">Loan Interest</option>
                                                                <option value="others">Other Expense</option>
                                                            </select> : (type === 'Debt' ?
                                                                <select value={cat} onChange={(e) => { setCat(e.target.value) }} class="form-select form-select-sm" aria-label=".form-select-sm example">
                                                                    <option selected>Select Debt/Loan Option</option>
                                                                    <option value="collection">Debt Collection</option>
                                                                    <option value="debt">Debt</option>
                                                                    <option value="loan">Loan</option>
                                                                    <option value="repay">Repayment</option>
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
