import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom"
import { signout, isAuthenticated } from '../auth'
import LOGOIMG from '../compicon.png'


const NavBar = ({ history }) => (
    <header className="navbar">
        <div className="container" style={{ height: "auto" }}>
            <Link to='/' className="navbar-brand mb-2">
                <i><img src={LOGOIMG} width="50" height="50" alt="NA" /></i><b style={{ fontSize: "30px", margin: "auto" }}> Learn&Grow</b>
            </Link>

            <nav className="nav navbar-body">
                <ul className="nav navbar-right">

                    {!isAuthenticated() && (
                        <Fragment>
                            <Link to="/courses" className="btn btn-secondary mr-1 my-2 px-3 py-2">Courses</Link>
                            <Link to="/signin" className="btn btn-primary mr-1 my-2 px-4 py-2">Log In</Link>
                            <Link to="/signup" className="btn btn-warning mr-1 my-2 px-3 py-2">Sign Up</Link>
                        </Fragment>
                    )}

                    {isAuthenticated() && isAuthenticated().user.role === 0 && (
                        <Fragment>
                            <Link to="/" className="btn btn-primary mr-1 my-2 px-2 py-2" >
                                <i className="fa fa-home"></i> Home
                            </Link>
                            <Link to="/user/dashboard" className="btn btn-warning mr-1 my-2 px-1 py-2">
                                Dashboard
                            </Link>
                        </Fragment>
                    )}

                    {isAuthenticated() && isAuthenticated().user.role === 1 && (
                        <Fragment>
                            <Link to="/" className="btn btn-primary mr-1 my-2 px-2 py-2" >
                                <i className="fa fa-home"></i> Home
                            </Link>
                            <Link to="/admin/dashboard" className="btn btn-warning mr-1 my-2 px-1 py-2">
                                Dashboard
                            </Link>
                        </Fragment>
                    )}

                    {isAuthenticated() && (
                        <Fragment>
                            <span
                                className="btn btn-danger mr-1 my-2 px-2 py-2"
                                style={{ cursor: "pointer", color: "black" }}
                                onClick={() => signout(() => {
                                    history.push('/')
                                })}>
                                Signout
                            </span>
                        </Fragment>
                    )}
                </ul>
            </nav>
        </div>
    </header>
);

export default withRouter(NavBar);