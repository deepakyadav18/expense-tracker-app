import React from 'react';
import DebtTable from './DebtTable';

const Debt = () => {
    return (
        <>
            <h1 className="text-center my-3">Personal Expense Tracker</h1>
            <div className="col text-center p-4">
                <h3>Manage Debt And Loan Repayments</h3>
            </div>
            <div className="container">
                <DebtTable />
            </div>
        </>
    )
}

export default Debt
