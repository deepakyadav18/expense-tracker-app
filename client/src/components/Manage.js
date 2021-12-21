import {React,useState} from 'react';
import { Link,useHistory } from 'react-router-dom';
import {useContext,useEffect} from 'react'
import {userContext} from "../context/index";
import axios from 'axios';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"

const Manage = () => {
    var auth=JSON.parse(localStorage.getItem('auth'));

    const history=useHistory();
    const [state,setState]=useContext(userContext);
    const [oldp,setOldp]=useState("");
    const [newp,setNewp]=useState("");
    const [name,setName]=useState(auth.user.name);
    const [email,setEmail]=useState(auth.user.email);

    const deleteAccount=async()=>{
        try{
            const {data}=await axios.delete("http://localhost:8000/api/deleteUser",{
                headers:{
                    Authorization:'Bearer '+state.token
                },
                data:{
                    email:state.user.email
                }
            })
            setState(null);
            history.push('/login');
            history.go(0);
            window.localStorage.removeItem('auth');
        } catch(err){
            console.log(err);
        }
    }

    const changePassword=async()=>{
        try{
            const {data}=await axios.put("http://localhost:8000/api/changePassword",{
                email:state.user.email,
                name:state.user.name,
                newp:newp,
                oldp:oldp
            },{
                headers:{
                    Authorization:'Bearer '+state.token
                },
            })
            if(data.error){
                toast.error(data.error);
            }
            else{
                toast.success("Password changed successfully.")
            }
            
            setNewp("");
            setOldp("");

        } catch(err){
            console.log(err);
        }

    }

    const editUser=async(e)=>{

        e.preventDefault();

        try{
            const {data}=await axios.put("http://localhost:8000/api/editUser",{
                email:email,
                name:name,
            },{
                headers:{
                    Authorization:'Bearer '+state.token
                },
            })
            
            if(data.error){
                toast.error(data.error);
            }
            else{
                
                var auth=JSON.parse(localStorage.getItem('auth'));
                auth.user.name=name;
                auth.user.email=email;
                localStorage.setItem('auth',JSON.stringify(auth));
                history.go(0);
            }
            

        } catch(err){
            console.log(err);
        }
        
    }


    return (
        <div className="container-fluid">
            <h1 className="text-center my-3">Personal Expense Tracker</h1>
            <div className="col text-center p-4">
                <h3>Manage Account Settings</h3>
            </div>

            <div className="row py-2">
                <div className="col-md-6 offset-md-3">

                    <form>
                        <div className="form-group p-2">
                            <label className="text-muted">Your Name</label>
                            <input value={name} onChange={(e)=>setName(e.target.value)} type="text" className="form-control" placeholder="Enter Name"></input>
                        </div>

                        <div className="form-group p-2">
                            <label className="text-muted">Email Address</label>
                            <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" className="form-control" placeholder="Enter Email Address"></input>
                        </div>

                        <div className="form-group p-2">
                            <button onClick={editUser} className="btn btn-primary col-12">
                                Apply Changes
                            </button>
                        </div>
                    </form>
                    <div class="d-flex justify-content-between my-4">
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                            Change Password
                        </button>

                        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="#staticBackdropLabel">Change Password</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <div class="d-flex flex-column bd-highlight mb-3">
                                            <label for="inputPassword5" className="form-label">Enter Old Password</label>
                                            <input value={oldp} onChange={(e)=>setOldp(e.target.value)} type="password" class="form-control" />
                                            <label for="inputPassword5" className="form-label">Enter New Password</label>
                                            <input value={newp} onChange={(e)=>setNewp(e.target.value)} type="password" class="form-control" />
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Dismiss</button>
                                        <button onClick={changePassword} type="button" class="btn btn-primary" data-bs-dismiss="modal">Change Password</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#staticBackdrop1">
                            Delete Account
                        </button>

                        <div class="modal fade" id="staticBackdrop1" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"  aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="#staticBackdropLabel">Delete Account</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                       <h4>Are you sure you want to delete your account?</h4>
                                       <span>You will lose all your Expenses Data.</span>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Dismiss</button>
                                        <button onClick={state&& state.token && deleteAccount} type="button" class="btn btn-danger">Delete Account</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Manage
