import React from 'react'
import Expense from './Expense'

const ExpenseTable = ({type,
    setType,
    InterestType,
    desc,
    amount,
    percentage,
    cat,
    date,
    setDesc,
    setInterestType,
    setAmount,
    setPercentage,
    setCat,
    setDate,
    AddTransaction}) => {
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
                    <Expense id="#123" desc={desc} amount={amount}
                    date={date}
                    category={cat}/>
                </tbody>
            </table>
        </>
    )
}

export default ExpenseTable
