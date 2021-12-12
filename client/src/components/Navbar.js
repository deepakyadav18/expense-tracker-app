import React from 'react'
import { useContext } from 'react'
import { Link ,useHistory } from 'react-router-dom'
import { userContext } from '../context'
const Navbar = () => {
  const history=useHistory();
  const [state,setState]=useContext(userContext);

  const logout=()=>{
    window.localStorage.removeItem('auth')
    setState(null);
    history.push('/login');
  }



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
                <a className="nav-link active" aria-current="page" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Budget</a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Loan/Debt Management</a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/manage">Manage Account</a>
              </li>
            </ul>


            {state!==null ? (
              <ul className="nav navbar-nav navbar-right">
                <li>
                    <div className="btn-nav">
                      <h5><span className="badge bg-light text-dark ">Hello, {state.user.name}</span></h5>
                    </div>
                </li>
                <li>
                    <div className="btn-nav">
                      <Link onClick={logout} className="btn btn-primary btn-sm navbar-btn" to="/login">Logout</Link>
                    </div>
                </li>
              </ul>
            ) : (
              <ul className="nav navbar-nav navbar-right">
                <li>
                    <div className="btn-nav">
                      <Link className="btn btn-primary btn-sm navbar-btn mx-2 my-1" to="/register">Register</Link>
                    </div>
                </li>
                <li>
                    <div className="btn-nav">
                      <Link className="btn btn-primary btn-sm navbar-btn mx-2 my-1" to="/login">Login</Link>
                    </div>
                </li>
            </ul>
            )}

            
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
