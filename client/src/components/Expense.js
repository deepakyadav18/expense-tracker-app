import React from 'react'
import { useLocation } from 'react-router-dom';
const Expense = ({expenses,setExpenses}) => {

    const handleEdit=(e)=>{
        e.preventDefault();

    }

    const handleDelete=(id)=>{
        const newExpenses=expenses.filter((expense)=> {return expense._id!==id});
        setExpenses(newExpenses);
    }


    return (
        <>
            {expenses && expenses.map((expense)=>
                <tr key={(expense._id)}>
                <td>{(expense._id).slice(expense._id.length-5,expense._id.length)}</td>
                <td>{expense.desc}</td>
                <td>{expense.amount}</td>
                <td>{expense.date}</td>
                <td>{expense.cat}</td>
                <td>
                <button onClick={handleEdit} type="button" className="btn btn-primary btn-sm mx-1">Edit
                </button>
                <button onClick={handleDelete} type="button" className="btn btn-danger btn-sm mx-1">Delete
                </button>
                </td>
                </tr>
            )}
        </>
    )
}

export default Expense
