import React from 'react'

const Expense = (props) => {
    return (
        <>
            <tr>
                <td>{props.id}</td>
                <td>{props.name}</td>
                <td>{props.amount}</td>
                <td>{props.date}</td>
                <td>{props.category}</td>
                <td>
                <button type="button" className="btn btn-primary btn-sm mx-1">Edit
                </button>
                <button type="button" className="btn btn-danger btn-sm mx-1">Delete
                </button>
                </td>
            </tr>
        </>
    )
}

export default Expense
