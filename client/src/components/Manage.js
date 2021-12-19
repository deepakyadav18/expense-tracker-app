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
                                            <input type="password" class="form-control" />
                                            <label for="inputPassword5" className="form-label">Enter New Password</label>
                                            <input type="password" class="form-control" />
                                            <label for="inputPassword5" className="form-label">Confirm New Password</label>
                                            <input type="password" class="form-control" />
                                            <div className="form-text">
                                                Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Dismiss</button>
                                        <button type="button" class="btn btn-primary">Change Password</button>
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
                                        <button type="button" class="btn btn-danger">Delete Account</button>
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
