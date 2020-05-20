import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import LOGOIMG from '../compicon.png'
import { isAuthenticated, signout } from '../auth'
import { addCourseDetails, getSingleCourseJustAdded } from './adminApi'

const AddCourseDetails = () => {

    const { token, user } = isAuthenticated()
    const [course, setCourse] = useState([])
    const [err, setErr] = useState([])

    const loadCourseJustAdded = () => {
        getSingleCourseJustAdded('enrolled').then(data => {
            if (data.error) {
                setErr(data.error)
            } else {
                setCourse(data)
                console.log(data)
            }
        })
    }

    useEffect(() => {
        loadCourseJustAdded()
    }, [])


    const [values, setValues] = useState({
        curriculum: [{
            topic: '',
            subtopic: []
        }],
        instructor: [{
            name: '',
            qualification: '',
            about: ''
        }],
        loading: false,
        error: "",
        createdCourse: "",
        redirectToCourse: false,
        formData: ""
    })

    const {
        curriculum,
        topic,
        subtopic,
        instructor,
        name,
        qualification,
        about,
        loading,
        error,
        createdCourse,
        redirectToCourse
    } = values

    const handleChange = name => event => {
        const value = name === "subtopic" ? event.target.value.split(',') : event.target.value
        console.log(value)
        setValues({ ...values, [name]: value })
    }

    const clickSubmit = (event) => {
        event.preventDefault()
        curriculum[0].topic = topic
        curriculum[0].subtopic = subtopic
        instructor[0].name = name
        instructor[0].qualification = qualification
        instructor[0].about = about

        console.log(curriculum + " " + instructor)

        setValues({ ...values, error: "", loading: true })
        addCourseDetails(course[0]._id, user._id, token, { curriculum, instructor })
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error })
                }
                else {
                    setValues({
                        ...values,
                        curriculum: [{
                            topic: '',
                            subtopic: []
                        }],
                        instructor: [{
                            name: '',
                            qualification: '',
                            about: ''
                        }],
                        loading: false,
                        redirectToCourse: true,
                        createdCourse: data.name
                    })
                }
            })
    }

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? "" : 'none' }}>
            {error}
        </div>
    )

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: createdCourse ? '' : 'none' }}>
            <h2>{`${createdCourse}`} is created!</h2>
        </div>
    )

    const showLoading = () => (
        loading && (
            <div className="alert alert-success">
                <h2>Loading...</h2>
            </div>)
    )

    const redirectUser = () => {
        if (redirectToCourse) {
            if (!error) {
                return <Redirect to={`/addmoredetails`} />
            }
        }
    }

    const newPostForm = () => (

        <div className="form-style-5">
            <form onSubmit={clickSubmit}>
                <fieldset>
                    <legend><span class="number">1</span>Course Curriculum</legend>
                    <input type="text" onChange={handleChange('topic')} value={topic} placeholder="Topic for Curriculum Section" required />
                    <br />
                    <input type="text" onChange={handleChange('subtopic')} value={subtopic} placeholder="Sub-Topic for Curriculum(Use Comma i.e. sub1,sub2,sub3)" required />
                    <legend><span class="number">1</span>Course Instructor</legend>
                    <input type="text" onChange={handleChange('name')} value={name} placeholder="Instructor Name" required />
                    <input type="text" onChange={handleChange('qualification')} value={qualification} placeholder="Instructor Qualification" required />
                    <input type="text" onChange={handleChange('about')} value={about} placeholder="More About Instructor" required />
                </fieldset>
                <button value="Apply">Create Course</button>
            </form>
        </div>
    )

    const sideNav = () => (
        <div>
            <div className="sidebar">
                <Link to='/' className="homebtn" style={{ width: "100%", margin: "auto" }}>
                    <span className="navbar-brand mb-2" >
                        <i><img src={LOGOIMG} width="40" height="40" alt="NA" /></i><b style={{ fontSize: "20px" }}> Learn&Grow</b>
                    </span>
                </Link>
                <a href='/addcourse' className="active">Add Course</a>
                <a href='/courses'>Existing Courses
                0</a>
            </div>

            <div class="content jumbotron">
                <br />
                <div className="container-fluid coursepart">
                    <br />
                    <h4 className="text-center"><img src="https://cdn.eckovation.com/courses/images/default_ppic.svg" /> {user.name}</h4>
                    <h6 className="text-center">Thanks Admin to maintain <b>Learn&Grow</b></h6>
                    <br />
                </div>

                <br /><br />
                <div className="container-fluid coursepart">
                    <h2 className="text-center text-warning bg-secondary" style={{ padding: "10px", borderRadius: "5px", }}>More Course Details</h2>
                    <br />
                    {newPostForm()}
                    <br /><br />
                    {showLoading()}
                    {showError()}
                    {showSuccess()}
                    {redirectUser()}
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

export default AddCourseDetails