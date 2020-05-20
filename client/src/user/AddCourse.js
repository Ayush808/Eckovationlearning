import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import LOGOIMG from '../compicon.png'
import { isAuthenticated, signout } from '../auth'
import Courses from '../cores/Courses'

const AddCourse = ({ history }) => {

    const { token, user: { _id, name } } = isAuthenticated();

    const sideNav = () => (
        <div>
            <div className="sidebar">
                <Link to='/' className="homebtn" style={{ width: "100%", margin: "auto" }}>
                    <span className="navbar-brand mb-2" >
                        <i><img src={LOGOIMG} width="40" height="40" alt="NA" /></i><b style={{ fontSize: "20px" }}> Learn&Grow</b>
                    </span>
                </Link>
                <a href='' className="active">Add Course</a>
                <a href='/courses'>Existing Courses</a>
                <Link onClick={() => signout(() => {
                    history.push('/')
                })}>Sign out</Link>
            </div>

            <div class="content jumbotron">
                <br />
                <div className="container-fluid coursepart">
                    <br />
                    <h4 className="text-center"><img src="https://cdn.eckovation.com/courses/images/default_ppic.svg" /> {name}</h4>
                    <h6 className="text-center">Thanks Admin to maintain <b>Learn&Grow</b></h6>
                    <br />
                </div>

                <br /><br />
                <div className="container-fluid coursepart">

                    <br /><br />
                </div>

            </div>
        </div>
    )

    return (
        <div>
            {sideNav()}
        </div>
    )
}

export default withRouter(AddCourse)