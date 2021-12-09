import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom';
const Register = () => {
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    return (
        <div className="container-fluid">
            <h1 className="text-center my-3">Personal Expense Tracker</h1>
            <div className="col text-center p-5">
                <h1>Register</h1>
            </div>

            <div className="row py-2">
                <div className="col-md-6 offset-md-3">

                    <form>
                        <div className="form-group p-2">
                            <label className="text-muted">Your Name</label>
                            <input value={name} onChange={(e)=> setName(e.target.value)} type="text" className="form-control" placeholder="Enter Name"></input>
                        </div>

                        <div className="form-group p-2">
                            <label className="text-muted">Email Address</label>
                            <input value={email} onChange={(e)=> setEmail(e.target.value)} type="email" className="form-control" placeholder="Enter Email Address"></input>
                        </div>

                        <div className="form-group p-2">
                            <label className="text-muted">Password</label>
                            <input value={password} onChange={(e)=> setPassword(e.target.value)} type="password" className="form-control" placeholder="Enter Password"></input>
                        </div>
                        <div className="form-group p-2">
                            <button className="btn btn-primary col-12">
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <p className="text-center">
                        Already Registered?   
                        <Link to="/login">
                            <a>Login Here</a>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Register
