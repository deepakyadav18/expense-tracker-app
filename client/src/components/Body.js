import React from 'react'
import ExpenseTable from './ExpenseTable'

const Body = () => {
    return (
        <>
        <h1 className="text-center my-3">Personal Expense Tracker</h1>
        <div className="container">
        <button type="button" className="btn btn-primary mx-3">Add Expense
        </button>
        <button type="button" className="btn btn-success mx-3">Expense Report</button>
        </div>
        <div className="container">
            <ExpenseTable/>
        </div>
        
        </>
    )
}

export default Body
