import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom"
//import { signout, isAuthenticated } from '../auth'


const Menu = () => (
    <div>
        <ul className="nav nav-tabs bg-dark">

            <li className="nav-item">
                <Link
                    className="nav-link"
                    to="/">
                    Home
                </Link>
            </li>

            <li className="nav-item">
                <Link
                    className="nav-link"
                    to="/signin">
                    Log In
                </Link>
            </li>
        </ul>
    </div>
);

export default withRouter(Menu);