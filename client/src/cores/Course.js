import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import NavBar from './NavBar'
import { read } from './coursesApi'
import { isAuthenticated } from '../auth'
import FAQ from './FAQ'

const Course = props => {

    const [course, setCourse] = useState({})
    const [error, setError] = useState(false)

    const loadSingleCourse = courseId => {
        read(courseId).then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setCourse(data)
            }
        })
    }

    useEffect(() => {
        const courseId = props.match.params.courseId
        loadSingleCourse(courseId)
    }, [props])  // when there is change in the url the useEffect also chnages

    return (
        <div>
            <NavBar />
            <div className="jumbotron mb-3">
                <div className=" container courseoverview">
                    <br /><br />
                    {
                        course.name && <h2 className="text-center text-warning">{course.name}</h2>
                    }
                    <br />
                    {
                        course.description && <h5 className="text-center text-white">{course.description.substring(0, 290)}...</h5>
                    }<br /><br />
                    {course.instructor && <h5 className="text-center text-white"><b>Created By: </b>
                        {course.instructor[0].name}, Niranjan Kumar and 1 more
                </h5>}<br />
                    {course.duration && <h5 className="text-center text-white"><b>Course Duration: </b>
                        {course.duration} (Lifetime Content Access)
                </h5>}<br />
                    {course.price && <h1 className="text-center text-warning">
                        <b>₹ </b>{course.price}
                    </h1>}<br />
                    {
                        course.enrolled != 0 && <h5 className="text-center text-white">{course.enrolled} Enrollement</h5>
                    }
                    <br /><br />
                    <div className="enrollbtn text-center">
                        {isAuthenticated() && <Link to='/enroll' className="btn btn-warning px-5 pt-2 pb-2 text-white">Enroll</Link>}
                        {!isAuthenticated() && <Link to='/signin' className="btn btn-warning px-5 pt-2 pb-2 text-white">Enroll</Link>}
                    </div><br /><br /><br />
                </div><br /><br />
                <div className="container navi">
                    <ul>
                        <li><a href="#description" className="text-white">Description</a></li>
                        <li><a href="#curriculum" className="text-white">Curriculum</a></li>
                        <li><a href="#instructor" className="text-white">Instructor</a></li>
                        <li><a href="#faq" className="text-white">FAQ</a></li>
                    </ul>
                </div>
                <div className="container coursepart">
                    <br />
                    <h1 className="text-center text-warning bg-secondary">Includes</h1>
                    <br />
                    <h6 className="text-left text-dark ml-4"><i className="fa fa-check"></i>Lifetime access to the content provided in the course</h6>
                    <h6 className="text-left text-dark ml-4"><i className="fa fa-check"></i>Access to experts 24X7 to answer your queries</h6>
                    <h6 className="text-left text-dark ml-4"><i className="fa fa-check"></i>Certificate of Completion</h6>
                    <h6 className="text-left text-dark ml-4"><i className="fa fa-check"></i>Assured Internship!</h6>
                    <br />
                </div>
                <br /><br />
                <div id="decription" className="container coursepart">
                    <br />
                    <h1 className="text-center text-warning bg-secondary">Description</h1>
                    <br />
                    <h5 className="text-center text-dark" style={{ margin: "auto", lineHeight: "30px" }}>{course.description}</h5>
                    <br />
                </div>
                <br /><br />
                <div id="curriculum" className="container coursepart">
                    <br />
                    <h1 className="text-center text-warning bg-secondary">Curriculum</h1>
                    <br />
                    {
                        course.curriculum && course.curriculum.map((part, i) => (
                            <div className="card mb-3">
                                <div className="card-header"><b>Section {i + 1}:</b> {part.topic}</div>
                                {
                                    part.subtopic && part.subtopic.map(s => (
                                        <div className="card-body border-bottom">{s}</div>
                                    ))
                                }
                            </div>
                        ))
                    }
                    <br />
                </div>
                <br /><br />
                <div id="instructor" className="container coursepart">
                    <br />
                    <h1 className="text-center text-warning bg-secondary">About Instructor</h1>
                    {
                        course.instructor && course.instructor.map(i => (
                            <div>
                                <div className="row">
                                    <div className="col-3">
                                        <img src="https://cdn.eckovation.com/courses/images/teacher-empty-state.svg" height="61" width="61" />
                                    </div>
                                    <div className="col-9">
                                        <h3>{i.name}</h3>
                                        <h5>{i.qualification}</h5>
                                    </div>
                                </div>
                                <div style={{ margin: "auto" }}>
                                    {i.about}
                                </div>
                                <hr />
                            </div>
                        ))
                    }

                </div>
                <br /><br />
                <div id="faq" className="container coursepart">
                    <br />
                    <h1 className="text-center text-warning bg-secondary">FAQ</h1>
                    {
                        FAQ && FAQ.map(bundle => (
                            <div className="jumbotron mb-3">
                                <h5 className="text-dark mb-2"><b>{bundle.que}</b></h5>
                                <h5 className="text-secondary mb-2">{bundle.ans}</h5>
                            </div>
                        ))
                    }
                    <br />
                </div>
                <br /><br />
            </div>
        </div>
    )

}

export default Course