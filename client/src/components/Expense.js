import {React,useContext} from 'react'
import axios from 'axios';
import {userContext} from "../context/index";
import { useLocation } from 'react-router-dom';
const Expense = ({expenses,setExpenses}) => {

    const [state,setState]=useContext(userContext);

    const handleEdit= async(id)=>{
        const {data}=await axios.put(`http://localhost:8000/api/updateexpense/${id}`,{
                headers:{
                    Authorization:'Bearer '+state.token
                }
            });

    }

    const handleDelete=async(id)=>{

        const {data}=await axios.delete(`http://localhost:8000/api/deleteexpense/${id}`,{
                headers:{
                    Authorization:'Bearer '+state.token
                }
            });
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
                {/* <button onClick={()=>{handleEdit(expense._id)}} type="button" className="btn btn-primary btn-sm mx-1">Edit
                </button>
                 */}
                <button onClick={()=>{handleDelete(expense._id)}} type="button" className="btn btn-danger btn-sm mx-1">Delete
                </button>
                </td>
                </tr>
            )}
        </>
    )
}

export default Expense
