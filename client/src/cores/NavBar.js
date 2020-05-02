import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom"
import { signout, isAuthenticated } from '../auth'
import LOGOIMG from '../compicon.png'

const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: "black" }
    } else {
        return { color: "black" }
    }
}

const Menu = ({ history }) => (
    <header className="navbar">
        <div className="container" style={{ height: "60px" }}>
            <a className="navbar-brand mb-2">
                <i><img src={LOGOIMG} width="50" height="50" alt="NA" /></i><b style={{ fontSize: "30px" }}> Learn&Grow</b>
            </a>

            <nav className="nav navbar-body">
                <ul className="nav navbar-right">

                    {!isAuthenticated() && (
                        <Fragment>
                            <Link
                                className="btn btn-primary mr-5 my-2 px-4 py-2"
                                style={isActive(history, "/signin")}
                                to="/signin">
                                Log In
                            </Link>
                            <Link
                                className="btn btn-warning mr-1 my-2 px-4 py-2"
                                style={isActive(history, "/signup")}
                                to="/signup">
                                Sign Up
                            </Link>
                        </Fragment>
                    )}
                    {isAuthenticated() && isAuthenticated().user.role === 0 && (
                        <Fragment>
                            <Link
                                className="btn btn-primary mr-5 my-2 px-4 py-2"
                                style={isActive(history, "/")}
                                to="/">
                                <i className="fa fa-home"></i> Home
                            </Link>
                            <Link
                                className="btn btn-warning mr-5 my-2 px-4 py-2"
                                style={isActive(history, "/user/dashboard")}
                                to="/user/dashboard">
                                Dashboard
                            </Link>
                        </Fragment>
                    )}

                    {isAuthenticated() && isAuthenticated().user.role === 1 && (
                        <Fragment>
                            <Link
                                className="btn btn-primary mr-5 my-2 px-4 py-2"
                                style={isActive(history, "/")}
                                to="/">
                                <i className="fa fa-home"></i> Home
                            </Link>
                            <Link
                                className="btn btn-warning mr-5 my-2 px-4 py-2"
                                style={isActive(history, "/admin/dashboard")}
                                to="/admin/dashboard">
                                Dashboard
                            </Link>
                        </Fragment>
                    )}

                    {isAuthenticated() && (
                        <Fragment>
                            <span
                                className="btn btn-danger mr-1 my-2 px-4 py-2"
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

export default withRouter(Menu);