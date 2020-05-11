import React, { useState, useEffect } from 'react'
import { isAuthenticated } from '../auth'
import { read } from './coursesApi'
import LOGOIMG from '../compicon.png'
import { Link, withRouter } from 'react-router-dom'

const AccessCourse = props => {

    const [course, setCourse] = useState({})
    const [error, setError] = useState(false)
    const courseId = props.match.params.courseId

    const loadSingleCourse = courseId => {
        read(courseId).then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setCourse(data)
                console.log(data)
            }
        })
    }

    useEffect(() => {
        const courseId = props.match.params.courseId
        loadSingleCourse(courseId)
    }, [props])

    return (
        <div>
            <div className="sidebar">
                <Link to='/' className="homebtn" style={{ width: "100%", margin: "auto" }}>
                    <span className="navbar-brand mb-2" >
                        <i><img src={LOGOIMG} width="40" height="40" alt="NA" /></i><b style={{ fontSize: "20px" }}> Learn&Grow</b>
                    </span>
                </Link>
                <br />
                <Link onClick={props.history.goBack} style={{ backgroundColor: "" }} >GO BACK</Link>
            </div>
            <div className="content">
                <div className="row">
                    <div className="col-md-2 col-sm-4 col-xs-4">
                        <img src={`/api/course/photo/${courseId}`} height="100" className="card-img" alt="..." />
                    </div>
                    <div className="col-md-10 col-sm-7 col-xs-7 mobileText">
                        <h3>{course.name}</h3>
                    </div>
                </div>
                <br /><br />
                <div id="accordion">
                    {course.curriculum && course.curriculum.map((obj, i) => (
                        <div class="ayz card mb-2">
                            <div class="card-header" id="headingOne">
                                <h5 class="mb-0">
                                    <div data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                        Section {i + 1}: {obj.topic}
                                    </div>
                                </h5>
                            </div>

                            {obj.subtopic && obj.subtopic.map((subobj, j) => (
                                <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                                    <div class="card-body">
                                        {subobj}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )

}

export default withRouter(AccessCourse)