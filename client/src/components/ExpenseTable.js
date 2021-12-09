import React from 'react'
import Expense from './Expense'

const ExpenseTable = () => {
    return (
        <>
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
                    <Expense id="#123" name="Goa Trip" amount="100000"
                    date="21/03/2002"
                    category="Pleasure"/>
                </tbody>
            </table>
        </>
    )
}

export default ExpenseTable
