import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom';
const Login = () => {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    return (
        <div className="container-fluid">
            <h1 className="text-center my-3">Personal Expense Tracker</h1>
            <div className="col text-center py-5">
                <h1>Login</h1>
            </div>

            <div className="row py-2">
                <div className="col-md-6 offset-md-3">

                    <form>

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
                                Login
                            </button>
                        </div>
                    </form>
                    

                </div>
            </div>

            <div className="row">
                <div className="col">
                    <p className="text-center">
                        Not yet registered? 
                        <Link to="/register">
                            <a>Register Here</a>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login
