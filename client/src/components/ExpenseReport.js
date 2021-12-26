import React from 'react'
import { useState,useContext } from 'react'
import { Bar, Pie } from 'react-chartjs-2';
import { userContext } from "../context/index";
import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import axios from 'axios';
import UserRoute from './routes/UserRoute';

const ExpenseReport = () => {

    const [type, setType] = useState('');
    const [state, setState] = useContext(userContext);
    const [cat, setCat] = useState('');
    const [year, setYear] = useState('');
    const [comp, setComp] = useState('');
    const [show, setShow] = useState(false);
    const [monthReport, setMonthReport] = useState({});
    const [yearReport,setYearReport]=useState({});

    const monthlyReport=async()=>
    {
        const { data } = await axios.post("http://localhost:8000/api/monthReport", {cat,year}, {
                headers: {
                    Authorization: 'Bearer ' + state.token
                }
            });
            if(data.error) toast.error(data.error);
            else setMonthReport(data);
    }

    const yearlyReport=async()=>
    {
        const { data } = await axios.post("http://localhost:8000/api/yearReport", {cat,year}, {
                headers: {
                    Authorization: 'Bearer ' + state.token
                }
            });
            if(data.error) toast.error(data.error);
            else setYearReport(data);
    }

    const getReport=()=>
    {
        setShow(true);
        if(comp==="month") monthlyReport();
        else if(comp==="year") yearlyReport();
    }


    return (
        <>
            <button type="button" className="btn btn-success mx-3" data-bs-toggle="modal" data-bs-target="#staticBackdrop1">Expense Report</button>
            <div class="modal fade" id="staticBackdrop1" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel1" aria-hidden="true">
                <div class="modal-dialog modal-fullscreen modal-dialog-scrollable">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel1">Expense Report</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="d-flex flex-column bd-highlight mb-3" >
                                <div class="p-2 bd-highlight">
                                    < div class="d-flex justify-content-around">
                                        <div class="row g-3 align-items-center">
                                            <div class="col-auto">
                                                <label class="col-form-label">Transaction Type</label>
                                            </div>
                                            <div class="col-auto">
                                                <select value={type} onChange={(e) => { setType(e.target.value) }} class="form-select form-select-sm" aria-label=".form-select-sm example">
                                                    <option selected>Select Transaction Type</option>
                                                    <option value="Debit">Debit</option>
                                                    <option value="Credit">Credit</option>
                                                </select>
                                            </div>
                                        </div>
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
                                                            <select value={cat} onChange={(e) => { setCat(e.target.value) }} class="form-select form-select-sm" aria-label=".form-select-sm example">
                                                                <option selected>Select Type First</option>
                                                            </select>))}

                                            </div>
                                        </div>
                                        <div class="row g-3 align-items-center">
                                            <div class="col-auto" onChange={(e) => { setComp(e.target.value) }}>
                                                <div class="form-check">
                                                    <input class="form-check-input" value="month" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                                    <label class="form-check-label" for="flexRadioDefault1">
                                                        Monthwise Comparison
                                                    </label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" value="year" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                                                    <label class="form-check-label" for="flexRadioDefault2">
                                                        Yearwise Comparion (2 Year Comparison)
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row g-3 align-items-center">
                                            <div class="col-auto">
                                                <label class="col-form-label">Year</label>
                                            </div>
                                            <div class="col-auto">
                                                <input value={year} onChange={(e) => { setYear(e.target.value) }} type="text" class="form-control" placeholder='Enter Year' />
                                            </div>
                                        </div>
                                        <div class="row g-3 align-items-center">
                                            <button type="button" class="btn btn-success" onClick={getReport}>Generate Report</button>
                                        </div>
                                    </div>
                                </div>
                                <hr />

                                {comp=='month' && show===true?<div class="d-flex justify-content-around">
                                    <div>
                                        <Pie
                                            data={
                                                {
                                                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                                                    datasets: [
                                                        {
                                                            data: [monthReport.Jan, monthReport.Feb, monthReport.Mar, monthReport.Apr, monthReport.May, monthReport.Jun, monthReport.Jul, monthReport.Aug, monthReport.Sep, monthReport.Oct, monthReport.Nov, monthReport.Dec],
                                                            backgroundColor: [
                                                                'rgba(255, 99, 132, 0.2)',
                                                                'rgba(54, 162, 235, 0.2)',
                                                                'rgba(255, 206, 86, 0.2)',
                                                                'rgba(75, 192, 192, 0.2)',
                                                                'rgba(153, 102, 255, 0.2)',
                                                                'rgba(255, 159, 64, 0.2)',
                                                                'rgba(255, 99, 132, 0.2)',
                                                                'rgba(54, 162, 235, 0.2)',
                                                                'rgba(255, 206, 86, 0.2)',
                                                                'rgba(75, 192, 192, 0.2)',
                                                                'rgba(153, 102, 255, 0.2)',
                                                                'rgba(255, 159, 64, 0.2)'


                                                            ],
                                                            borderColor: [
                                                                'rgba(255, 99, 132, 1)',
                                                                'rgba(54, 162, 235, 1)',
                                                                'rgba(255, 206, 86, 1)',
                                                                'rgba(75, 192, 192, 1)',
                                                                'rgba(153, 102, 255, 1)',
                                                                'rgba(255, 159, 64, 1)',
                                                                'rgba(255, 99, 132, 1)',
                                                                'rgba(54, 162, 235, 1)',
                                                                'rgba(255, 206, 86, 1)',
                                                                'rgba(75, 192, 192, 1)',
                                                                'rgba(153, 102, 255, 1)',
                                                                'rgba(255, 159, 64, 1)'
                                                            ],
                                                        }
                                                    ]
                                                }
                                            }
                                            height={400}
                                            width={600}
                                        />
                                        <h3 class="text-center">Monthwise Category Pie Chart</h3>
                                    </div>
                                    <div>
                                        <Bar
                                            data={
                                                {
                                                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                                                    datasets: [
                                                        {
                                                            label:"Expenditure",
                                                            data: [monthReport.Jan, monthReport.Feb, monthReport.Mar, monthReport.Apr, monthReport.May, monthReport.Jun, monthReport.Jul, monthReport.Aug, monthReport.Sep, monthReport.Oct, monthReport.Nov, monthReport.Dec],
                                                            backgroundColor: [
                                                                'rgba(255, 99, 132, 0.2)',
                                                                'rgba(54, 162, 235, 0.2)',
                                                                'rgba(255, 206, 86, 0.2)',
                                                                'rgba(75, 192, 192, 0.2)',
                                                                'rgba(153, 102, 255, 0.2)',
                                                                'rgba(255, 159, 64, 0.2)',
                                                                'rgba(255, 99, 132, 0.2)',
                                                                'rgba(54, 162, 235, 0.2)',
                                                                'rgba(255, 206, 86, 0.2)',
                                                                'rgba(75, 192, 192, 0.2)',
                                                                'rgba(153, 102, 255, 0.2)',
                                                                'rgba(255, 159, 64, 0.2)'


                                                            ],
                                                            borderColor: [
                                                                'rgba(255, 99, 132, 1)',
                                                                'rgba(54, 162, 235, 1)',
                                                                'rgba(255, 206, 86, 1)',
                                                                'rgba(75, 192, 192, 1)',
                                                                'rgba(153, 102, 255, 1)',
                                                                'rgba(255, 159, 64, 1)',
                                                                'rgba(255, 99, 132, 1)',
                                                                'rgba(54, 162, 235, 1)',
                                                                'rgba(255, 206, 86, 1)',
                                                                'rgba(75, 192, 192, 1)',
                                                                'rgba(153, 102, 255, 1)',
                                                                'rgba(255, 159, 64, 1)'
                                                            ],
                                                        }
                                                    ],

                                                }
                                            }
                                            options={{
                                                scales: {
                                                    yAxes: [{ ticks: { beginAtZero: true } }]
                                                }
                                            }}
                                            height={400}
                                            width={600}
                                        />
                                        <h3 class="text-center">Monthwise Category Bar Graph</h3>
                                    </div>
                                </div>:(comp=='year' && show===true?<div class="d-flex justify-content-around">
                                    <div>
                                        <Pie
                                            data={
                                                {
                                                    labels: ['Previous Year', 'Current Year'],
                                                    datasets: [
                                                        {
                                                            data: [yearReport.year0,yearReport.year1],
                                                            backgroundColor: [
                                                                'rgba(255, 99, 132, 0.2)',
                                                                'rgba(54, 162, 235, 0.2)'
                                                            ],
                                                            borderColor: [
                                                                'rgba(255, 99, 132, 1)',
                                                                'rgba(54, 162, 235, 1)'
                                                            ],
                                                        }
                                                    ]
                                                }
                                            }
                                            height={400}
                                            width={600}
                                        />
                                        <h3 class="text-center">Yearwise Category Pie Chart</h3>
                                    </div>
                                    <div>
                                        <Bar
                                            data={
                                                {
                                                    labels: ['Previous Year', 'Current Year'],
                                                    datasets: [
                                                        {
                                                            label:cat,
                                                            data: [yearReport.year0,yearReport.year1],
                                                            backgroundColor: [
                                                                'rgba(255, 99, 132, 0.2)',
                                                                'rgba(54, 162, 235, 0.2)'
                                                            ],
                                                            borderColor: [
                                                                'rgba(255, 99, 132, 1)',
                                                                'rgba(54, 162, 235, 1)'
                                                            ],
                                                        }
                                                    ],

                                                }
                                            }
                                            options={{
                                                scales: {
                                                    yAxes: [{ ticks: { beginAtZero: true } }]
                                                }
                                            }}
                                            height={400}
                                            width={600}
                                        />
                                        <h3 class="text-center">Yearwise Category Bar Graph</h3>
                                    </div>
                                </div>:<></>)}






                                



                            </div>

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={()=>{setShow(false);
                            setType("");
                            setYear("");
                            setCat("");}}>Close</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default ExpenseReport
