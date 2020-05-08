import React from 'react'
import NavBar from '../cores/NavBar'
import { Link, Redirect, withRouter } from 'react-router-dom'
import LOGOIMG from '../compicon.png'
import { isAuthenticated, signout } from '../auth'


const UserDashboard = ({ history }) => {

    const { user: { name, role } } = isAuthenticated();

    const redirectToHome = () => {
        return (
            <Redirect to='/' />
        )
    }

    const sideNav = () => (
        <div>
            <div className="sidebar">
                <Link to='/' className="homebtn" style={{ width: "100%", margin: "auto" }}>
                    <span className="navbar-brand mb-2" >
                        <i><img src={LOGOIMG} width="40" height="40" alt="NA" /></i><b style={{ fontSize: "20px" }}> Learn&Grow</b>
                    </span>
                </Link>
                <a href='' className="active">My Courses</a>
                <a href='/courses'>Explore Courses</a>
                <Link onClick={() => signout(() => {
                    history.push('/')
                })}>Sign out</Link>
            </div>
            <div class="content jumbotron">
                <br />
                <div className="container-fluid coursepart">
                    <br />
                    <h4 className="text-center"><img src="https://cdn.eckovation.com/courses/images/default_ppic.svg" /> {name}</h4>
                    <h6 className="text-center">Thanks be a part of <b>Learn&Grow</b></h6>
                    <br />
                </div>
                <br /><br />
                <div className="container-fluid coursepart">

                    <h3 className="text-warning"><b>My Courses</b></h3>
                    <br />

                    <div className="card mb-3" style={{ maxWidth: "780px" }}>
                        <div className="row no-gutters mb-2">

                            <div className="col-md-3">
                                <img src="https://cdn.eckovation.com/images/Full-Stack.png" height="200" className="card-img" alt="..." />
                            </div>

                            <div className="col-md-6">
                                <div className="card-body">
                                    <h5 className="card-title">Card title</h5>
                                    <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                    <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                                </div>
                            </div>

                            <div className="col-md-3">
                                <Link to='/' className="btn btn-primary ml-3 px-3 pt-2 pb-2" style={{ marginTop: "50%" }} >Resume Course</Link>
                            </div>

                        </div>
                        <progress value="65" max="100" style={{ width: "100%", backgroundColor: "yellow", borderRadius: "50%", height: "15" }} />
                    </div>
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

export default withRouter(UserDashboard)