import React from 'react'
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Expense Tracker</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Budget</a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Loan/Debt Management</a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Manage Account</a>
              </li>
            </ul>

            <ul class="nav navbar-nav navbar-right">
                <li>
                    <div class="btn-nav">
                      <Link class="btn btn-primary btn-sm navbar-btn mx-2" to="/register">Register</Link>
                    </div>
                </li>
                <li>
                    <div class="btn-nav">
                      <Link class="btn btn-primary btn-sm navbar-btn" to="/login">Login</Link>
                    </div>
                </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
