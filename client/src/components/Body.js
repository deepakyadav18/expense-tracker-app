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
    const[curr1,setCurr1]=useState("INR");
    const[curr2,setCurr2]=useState("INR");
    const[mul,setMul]=useState(1);

    const[expenses,setExpenses]=useState([]);
    const history=useHistory();

    const currency=async()=>
    {
        let {data}=await axios.get(`https://api.fastforex.io/fetch-one?from=${curr1}&to=${curr2}&api_key=f454927b42-879011f180-r4gbj6`);

        console.log(data.result[curr2])
        setMul(data.result[curr2]);
        setCurr1(curr2);
        setCurr2(curr2);
    }

    const AddTransaction=async(e)=>{
        e.preventDefault();
          
        try{
            const {data}=await axios.post("http://localhost:8000/api/addexpense",{type,desc,amount,cat,date},{
                headers:{
                    Authorization:'Bearer '+state.token
                }
            });
            // console.log("res=>",data);
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

    useEffect(() => {
        currency();
    }, [curr2])

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
                <div style={{float:"right"}}>
                   <label>Currency:</label> <select className="form-select select-lg" value={curr2} onChange={(e) => { setCurr2(e.target.value) }}>
            <option selected>Select currency</option>
    <option value="AFN">Afghan Afghani - ؋</option>
    <option value="DZD">Algerian Dinar - دج</option>
    <option value="ARS">Argentine Peso - $</option>
    <option value="AMD">Armenian Dram - ֏</option>
    <option value="AUD">Australian Dollar - $</option>
    <option value="BSD">Bahamian Dollar - B$</option>
    <option value="BHD">Bahraini Dinar - .د.ب</option>
    <option value="BDT">Bangladeshi Taka - ৳</option>
    <option value="BRL">Brazilian Real - R$</option>
    <option value="GBP">British Pound Sterling - £</option>
    <option value="BND">Brunei Dollar - B$</option>
    <option value="CAD">Canadian Dollar - $</option>
    <option value="CNY">Chinese Yuan - ¥</option>
    <option value="COP">Colombian Peso - $</option>
    <option value="HRK">Croatian Kuna - kn</option>
    <option value="CZK">Czech Republic Koruna - Kč</option>
    <option value="EUR">Euro - €</option>
    <option value="HKD">Hong Kong Dollar - $</option>
    <option value="INR">Indian Rupee - ₹</option>
    <option value="IDR">Indonesian Rupiah - Rp</option>
    <option value="IQD">Iraqi Dinar - د.ع</option>
    <option value="ILS">Israeli New Sheqel - ₪</option>
    <option value="JMD">Jamaican Dollar - J$</option>
    <option value="JPY">Japanese Yen - ¥</option>
    <option value="JOD">Jordanian Dinar - ا.د</option>
    <option value="KWD">Kuwaiti Dinar - ك.د</option>
    <option value="LBP">Lebanese Pound - £</option>
    <option value="LYD">Libyan Dinar - د.ل</option>
    <option value="MYR">Malaysian Ringgit - RM</option>
    <option value="MUR">Mauritian Rupee - ₨</option>
    <option value="MXN">Mexican Peso - $</option>
    <option value="NPR">Nepalese Rupee - ₨</option>
    <option value="NZD">New Zealand Dollar - $</option>
    <option value="KPW">North Korean Won - ₩</option>
    <option value="OMR">Omani Rial - .ع.ر</option>
    <option value="PKR">Pakistani Rupee - ₨</option>
    <option value="PHP">Philippine Peso - ₱</option>
    <option value="PLN">Polish Zloty - zł</option>
    <option value="QAR">Qatari Rial - ق.ر</option>
    <option value="RUB">Russian Ruble - ₽</option>
    <option value="SAR">Saudi Riyal - ﷼</option>
    <option value="RSD">Serbian Dinar - din</option>
    <option value="SGD">Singapore Dollar - $</option>
    <option value="SOS">Somali Shilling - Sh.so.</option>
    <option value="KRW">South Korean Won - ₩</option>
    <option value="LKR">Sri Lankan Rupee - Rs</option>
    <option value="SEK">Swedish Krona - kr</option>
    <option value="CHF">Swiss Franc - CHf</option>
    <option value="SYP">Syrian Pound - LS</option>
    <option value="TZS">Tanzanian Shilling - TSh</option>
    <option value="TND">Tunisian Dinar - ت.د</option>
    <option value="TRY">Turkish Lira - ₺</option>
    <option value="AED">United Arab Emirates Dirham - إ.د</option>
    <option value="USD">US Dollar - $</option>
</select></div>
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
                        <Expense expenses={expenses} setExpenses={setExpenses} mul={mul} />
                    </tbody>
                </table>
            </div>

        </UserRoute>
    )
}

export default Body
