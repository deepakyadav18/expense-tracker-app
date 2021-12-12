import React from 'react';
import { Link } from 'react-router-dom';

const Manage = () => {
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
                            <input type="text" className="form-control" placeholder="Enter Name"></input>
                        </div>

                        <div className="form-group p-2">
                            <label className="text-muted">Email Address</label>
                            <input type="email" className="form-control" placeholder="Enter Email Address"></input>
                        </div>

                        <div className="form-group p-2">
                            <button className="btn btn-primary col-12">
                                Apply Changes
                            </button>
                        </div>
                    </form>
                    <div class="d-flex justify-content-between my-4">
                        <button type="button" class="btn btn-info btn-lg col-4">Change Password</button>
                        <button type="button" class="btn btn-danger btn-lg col-4">Delete Account</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Manage
