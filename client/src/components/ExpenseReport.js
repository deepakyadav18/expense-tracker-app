import React from 'react'
import { useState} from 'react'

const ExpenseReport = () => {

    const [type, setType] = useState('');
    const [cat,setCat]=useState('');
    const [year,setYear]=useState('');
    const [comp,setComp]=useState('');


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
                                                    <input class="form-check-input" value="month" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
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
                                            <button type="button" class="btn btn-success">Generate Report</button>
                                            </div>
                                    </div>
                                </div>
                            </div>
                            <hr/>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary">Close</button>
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    )
}

export default ExpenseReport
