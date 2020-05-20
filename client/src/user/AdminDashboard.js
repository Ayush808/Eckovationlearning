import React, { useState, useEffect } from 'react'
import { Link, withRouter, Redirect } from 'react-router-dom'
import LOGOIMG from '../compicon.png'
import { isAuthenticated, signout } from '../auth'
import Courses from '../cores/Courses'
import { getAllCategories } from '../cores/coursesApi'
import { createCourse } from './adminApi'

const AdminDashboard = ({ history }) => {

    const { token, user } = isAuthenticated()
    const [categoryId, setCategoryId] = useState('');

    const [values, setValues] = useState({
        name: "",
        description: "",
        price: "",
        duration: "",
        categories: [],
        category: "",
        photo: "",
        loading: false,
        error: "",
        createdCourse: '',
        redirectToIntermidiate: false,
        formData: ""
    })

    const {
        name,
        description,
        price,
        duration,
        categories,
        category,
        photo,
        loading,
        error,
        createdCourse,
        redirectToIntermidiate,
        formData } = values

    const getCategories = () => {
        getAllCategories().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error })
            } else {
                setValues({ ...values, categories: data, formData: new FormData() })
                //console.log(data)
            }
        })
    }

    useEffect(() => {
        getCategories()
    }, [])

    const handleChange = name => event => {
        const value = name === "photo" ? event.target.files[0] : event.target.value
        if (name === "category") {
            setCategoryId(event.target.value)
        }
        formData.set(name, value)
        setValues({ ...values, [name]: value })
    }

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? "" : 'none' }}>
            {error}
        </div>
    )

    const showSuccess = () => {
        {

        }
        return (
            <div className="alert alert-info" style={{ display: createdCourse ? '' : 'none' }}>

                <h2>{`${createdCourse}`} is created!</h2>
            </div>
        )
    }

    const showLoading = () => (
        loading && (
            <div className="alert alert-success">
                <h2>Loading...</h2>
            </div>)
    )

    const redirectUser = () => {
        if (redirectToIntermidiate) {
            if (!error) {
                return <Redirect to={`/addmoredetails`} />
            }
        }
    }

    const clickSubmit = (event) => {
        event.preventDefault()
        setValues({ ...values, error: "", loading: true })
        createCourse(user._id, token, formData)
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error })
                }
                else {
                    setValues({
                        ...values,
                        name: "",
                        description: "",
                        duration: "",
                        photo: "",
                        price: "",
                        loading: false,
                        redirectToIntermidiate: true,
                        createdCourse: data.name
                    })
                }
            })
    }


    const newPostForm = () => (

        <div className="form-style-5">
            <form onSubmit={clickSubmit}>
                <fieldset>
                    <legend><span class="number">1</span>Course</legend>
                    <input type="text" onChange={handleChange('name')} value={name} placeholder="Course *" required />
                    <input type="text" onChange={handleChange('description')} value={description} placeholder="Course Description*" required />
                    <legend><span class="number">2</span>Course Icon</legend>
                    <input type="file" onChange={handleChange('photo')} placeholder="Course_Image *" accept="image/*" required />
                    <legend><span class="number">3</span>Choose Category</legend>
                    <select id="job" onChange={handleChange('category')} >
                        {categories && categories.map((c, i) => (
                            <option key={i} value={c._id}>{c.name}</option>
                        ))
                        }
                    </select>
                    <legend><span class="number">4</span>Extra Info</legend>
                    <input type="text" onChange={handleChange('duration')} value={duration} placeholder="Course Duration*" required />
                    <input type="number" onChange={handleChange('price')} value={price} placeholder="Course Price (Price without comma)*" required />
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
                <a href='/courses'>Existing Courses</a>
                <Link onClick={() => signout(() => {
                    history.push('/')
                })}>Sign out</Link>
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
                {showLoading()}
                {showError()}
                {showSuccess()}
                <div className="container-fluid coursepart">
                    <h2 className="text-center text-warning bg-secondary" style={{ padding: "10px", borderRadius: "5px", }}>Add Course</h2>
                    <br />
                    {newPostForm()}
                    {redirectUser()}
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

export default withRouter(AdminDashboard)