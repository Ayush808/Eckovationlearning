import React from 'react'
import { Link } from 'react-router-dom'

const CardView = ({ course }) => {

    const courseId = course._id

    return (
        <Link to={`/course/${courseId}`} className="card" style={{ width: "18rem", height: "100%" }} >
            <img className="card-img-top" src={`/api/course/photo/${course._id}`} alt="course" style={{ maxHeight: "100%", maxWidth: "100% " }} />
            <div className="card-img-overlay">
                <h5 className="card-title" style={{ color: "white", fontWeight: "bold" }}>{course.name}</h5>
            </div>
            <div className="card-body">
                <p className="card-text">{course.description.substring(0, 60)}... </p>
                <p><i className="fa fa-clock-o"></i> {course.duration}</p>
                <p><i className="fa fa-graduation-cap"></i> {course.enrolled} Learners</p>
                <Link to='/' style={{ float: "right" }}>Learn More</Link>
            </div>
        </Link>
    )
}

export default CardView