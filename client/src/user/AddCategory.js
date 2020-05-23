import React, { Fragment, useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import LOGOIMG from '../compicon.png'
import { isAuthenticated, signout } from '../auth'
import { withRouter } from 'react-router-dom'
import { getAllCategories } from '../cores/coursesApi'
import { addCategory } from './adminApi'

const AddCategory = ({ history }) => {

    const { user, token } = isAuthenticated()

    const [categories, setCategories] = useState([])
    const [err, setErr] = useState(false)

    const [values, setValues] = useState({
        name: "",
        loading: false,
        error: "",
        createdCategory: '',
        redirectToDashboard: false
    })

    const {
        name,
        loading,
        error,
        createdCategory,
        redirectToDashboard
    } = values

    const getCategories = () => {
        getAllCategories().then(data => {
            if (data.error) {
                setErr(data.error)
            } else {
                setCategories(data)
                //console.log(data)
            }
        })
    }

    useEffect(() => {
        getCategories()
    }, [])


    const newPostForm = () => (

        <div class="form-style-5">
            <form onSubmit={clickSubmit}>
                <legend><span className="number">1</span>Course</legend>
                <input type="text" onChange={handleChange('name')} value={name} placeholder="Course Name*" required />
                <div class="button-section" style={{ textAlign: "center" }}>
                    <button value="Apply">Create Category</button>
                </div>
            </form>
        </div>

    )

    const handleChange = name => event => {
        const value = event.target.value

        setValues({ ...values, [name]: value })
    }

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? "" : 'none' }}>
            {error}
        </div>
    )

    const showSuccess = () => {
        return (
            <div className="alert alert-info" style={{ display: createdCategory ? '' : 'none' }}>

                <h2>{`${createdCategory}`} is created!</h2>
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
        if (redirectToDashboard) {
            if (!error) {
                return <Redirect to={'/admin/dashboard'} />
            }
        }
    }

    const clickSubmit = (event) => {
        event.preventDefault()

        setValues({ ...values, error: "", loading: true })
        addCategory({ name }, user._id, token)
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error })
                }
                else {
                    setValues({
                        ...values,
                        name: "",
                        loading: false,
                        redirectToDashboard: true,
                        createdCategory: data.name
                    })
                }
            })
    }

    return (

        <Fragment>

            <div className="sidebar">
                <Link to='/' className="homebtn" style={{ width: "100%", margin: "auto" }}>
                    <span className="navbar-brand mb-2" >
                        <i><img src={LOGOIMG} width="40" height="40" alt="NA" /></i><b style={{ fontSize: "20px" }}> Learn&Grow</b>
                    </span>
                </Link>
                <a href='/addcourse'>Add Course</a>
                <a href='/add/category' className="active">Add Category</a>
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

                <h2 className="text-center text-warning bg-secondary" style={{ padding: "10px", borderRadius: "5px", }}>Available Category</h2><br />
                {
                    categories && categories.map((c, i) => (
                        <div className="section mb-4"><legend><span className="number">{i + 1}</span>{c.name}</legend></div>
                    ))
                }
            </div>
        </Fragment >
    )

}

export default withRouter(AddCategory)