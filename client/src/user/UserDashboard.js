import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import LOGOIMG from '../compicon.png'
import { isAuthenticated, signout } from '../auth'
import { getUserEnrolledCourses, read } from '../cores/coursesApi'



const UserDashboard = ({ history }) => {

    const { token, user: { _id, name } } = isAuthenticated();

    const [userEnrolledCourses, setUserEnrolledCoures] = useState([''])
    const [error, setError] = useState('')
    const [bool, setBool] = useState(false)

    const getAllUserCourses = () => {
        getUserEnrolledCourses(token, _id).then((data) => {
            if (data.error) {
                setError(data.error)
            } else {
                setUserEnrolledCoures(data)
                //console.log(userEnrolledCourses)
                setBool(true)
            }
        })
    }

    useEffect(() => {
        getAllUserCourses()
        //window.location.reload(true);
    }, [])

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

                    {bool === true && userEnrolledCourses && userEnrolledCourses.map((course, i) => (
                        <div className="card mb-3" style={{ maxWidth: "780px" }}>

                            <div className="row no-gutters mb-2" style={{ height: "max-content" }}>

                                <div className="col-md-3">
                                    <img src={`/api/course/photo/${course[0]._id}`} height="200" className="card-img" alt="..." />
                                </div>

                                <div className="col-md-6">
                                    <div className="card-body">
                                        <h5 className="card-title">{JSON.stringify(course[0].name)}</h5>
                                        <p className="card-text">{JSON.stringify(course[0].description.substring(0, 100))}</p>
                                    </div>
                                </div>

                                <div className="col-md-3">
                                    <div className="pause">
                                        <Link to={`/accesscourse/${course[0]._id}`} className="btn btn-primary ml-3 px-3 pt-2 pb-2" style={{ marginTop: "50%" }} >Resume Course</Link>
                                    </div>
                                </div>

                            </div>
                            <progress className="pro" value="65" max="100" style={{ width: "100%", backgroundColor: "yellow", borderRadius: "50%", height: "15" }} />
                        </div>
                    ))}
                    <br /><br />
                </div>

            </div>
        </div >
    )

    return (
        <div>
            {sideNav()}
        </div>
    )
}

export default withRouter(UserDashboard)