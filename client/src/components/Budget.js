import React from 'react'
import {useState,useContext,useEffect} from 'react'
import {userContext} from "../context/index";
import axios from 'axios';

const Budget = () => {
    const [needs, setNeeds] = useState(50);
    const [wants, setWants] = useState(30);
    const [saves, setSaves] = useState(20);
    const [income,setIncome]=useState(0);
    const [state,setState]=useContext(userContext);
    const fetchTotalMoney=async()=>{
        try{
            const {data}=await axios.get("http://localhost:8000/api/totalMoney",{
                headers:{
                    Authorization:'Bearer '+state.token
                }
            })
            setIncome(data);
            console.log("Income ",data);
        } catch(err){
            console.log(err);
        }
    }
    const getBudget=async()=>{
        try{
            const {data}=await axios.get("http://localhost:8000/api/getBudget",{
                headers:{
                    Authorization:'Bearer '+state.token
                }
            })
            setSaves(data.saves);
            setWants(data.wants);
            setNeeds(data.needs);
            console.log("N, w, s ",data);
        } catch(err){
            console.log(err);
        }
    }

    const editBudget=async()=>{
        try{
            const {data}=await axios.post("http://localhost:8000/api/editBudget",{saves,needs,wants,email:state.user.email},{
                headers:{
                    Authorization:'Bearer '+state.token
                }
            })
            setSaves(data.saves);
            setWants(data.wants);
            setNeeds(data.needs);
            getBudget();
            console.log("N, w, s ",data);
        } catch(err){
            console.log(err);
        }
    }


    useEffect(() => {
        if(state&& state.token){fetchTotalMoney();
        getBudget();}
    }, [state&& state.token])
    

    return (
        <div className="container">
            <h1 className="text-center my-3">Personal Expense Tracker</h1>
            <div className="col text-center p-4">
                <h3>Manage Budget</h3>  
            </div>
            <div className="container">
                <div className="d-flex justify-content-center">
                    <div class="alert alert-success text-center" role="alert" style={{ width: "100%" }}>
                        <b>Total Income:{income}</b>
                    </div>
                </div>
                <div class="d-flex justify-content-between">
                    <div class="alert alert-secondary" role="alert" style={{ width: "40%" }}>
                        <b>Neccesities(Spent):</b>
                    </div>
                    <div class="alert alert-primary" role="alert"
                        style={{ width: "40%" }}>
                        <b>Neccesities(Calculated): {(needs*income)/100}</b>
                    </div>
                </div>
                <div class="d-flex justify-content-between">
                    <div class="alert alert-secondary" role="alert" style={{ width: "40%" }}>
                    <b>Wants(Saved):-</b>
                    </div>
                    <div class="alert alert-primary" role="alert"
                        style={{ width: "40%" }}>
                        <b>Wants(Calculated):- {(wants*income)/100}</b>
                    </div>
                </div>
                <div class="d-flex justify-content-between">
                    <div class="alert alert-secondary" role="alert" style={{ width: "40%" }}>
                    <b>Savings(Saved):-</b>
                    </div>
                    <div class="alert alert-primary" role="alert"
                        style={{ width: "40%" }}>
                        <b>Savings(Calculated): {(saves*income)/100}</b>
                    </div>
                </div>

                <button type="button" className="btn btn-primary mx-3" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Adjust Budget
                </button>
                <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="staticBackdropLabel">Adjust Budget</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <form class="d-flex justify-content-between">
                                    <div class="form-group">
                                        <label for="per_nes">Enter Neccesities Percentage</label>
                                        <input value={needs} onChange={(e) => { setNeeds(e.target.value) }} type="text" class="form-control" placeholder="Enter Percentage" v />
                                    </div>
                                    <div class="form-group">
                                        <label for="per_want">Enter Wants Percentage</label>
                                        <input value={wants} onChange={(e) => { setWants(e.target.value) }} type="text" class="form-control" placeholder="Enter Percentage" />
                                    </div>
                                    <div class="form-group">
                                        <label for="(100-per_nes-per_want)">Enter Savings Percentage</label>
                                        <input value={saves} onChange={(e) => { setSaves(e.target.value) }} type="text" class="form-control" placeholder="Percentage" />
                                    </div>

                                </form>

                            </div>
                            <div class="modal-footer">
                                <button data-bs-toggle="modal" data-bs-target="#staticBackdrop" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Dismiss</button>
                                <button data-bs-toggle="modal" data-bs-target="#staticBackdrop" type="button" class="btn btn-primary" onClick={editBudget}>Save Changes</button>
                            </div>
                        </div></div> </div>
            </div>

        </div>
    )
}

export default Budget
