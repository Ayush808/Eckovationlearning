import React, { useState, useEffect } from "react";
import Model from 'react-awesome-modal'
import { Link, Redirect } from "react-router-dom";
import Home from "../cores/Home";
import signup from "../auth/index.js";


const Signup = () => {

    const [visible, setVisible] = useState()


    const [values, setValues] = useState({
        name: '',
        mobile: '',
        email: '',
        password: '',
        error: '',
        success: false
    })

    const { name, mobile, email, password, success, error } = values

    useEffect(() => {
        openModal()
    }, [])

    var openModal = () => {
        setVisible(true)
    }

    var closeModal = () => {
        setVisible(false)
    }

    // higher order function is the function that return the another function
    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value })
    }

    const clickSubmit = e => {
        e.preventDefault()
        signup({ name, mobile, email, password }) // here key and value are same so dont need of name: name , password: password , etc: etc
            .then(data => {

                if (data.error) {
                    setValues({ ...values, error: data.error, success: false })
                } else {
                    setValues({
                        ...values,
                        name: '',
                        mobile: '',
                        email: '',
                        password: '',
                        error: '',
                        success: true
                    })
                }
            })
    }



    var SignupForm = () => (
        <form className="mx-3">
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input
                    type="name"
                    value={name}
                    placeholder="Enter your name"
                    className="form-control"
                    onChange={handleChange('name')}
                    required="true"
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input
                    type="email"
                    value={email}
                    placeholder="i.e. xyz@gmail.com"
                    className="form-control"
                    onChange={handleChange('email')}
                    required="true"
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Mobile</label>
                <input
                    type="text"
                    value={mobile}
                    placeholder="10 Digit Mobile Number"
                    className="form-control"
                    onChange={handleChange('mobile')}
                    required="true"
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input
                    type="password"
                    value={password}
                    placeholder="Enter your Secret Key"
                    className="form-control"
                    onChange={handleChange('password')}
                    required="true"
                />
            </div>
            <button className="btn btn-primary btn-block" onClick={clickSubmit}>
                Register
            </button>
        </form>
    )

    const showError = () => {
        return (
            <div className="alert alert-danger text-center" style={{ display: error ? "" : "none" }}>
                {error}
            </div>
        )
    }

    const showSuccess = () => {
        return (
            <div className="alert alert-info text-center" style={{ display: success ? "" : "none" }}>
                New Account is created.
            </div>
        )
    }

    return (
        <div className="popbg" >
            {showSuccess()}
            {showError()}
            <div className="popup">
                <Model visible={visible} width="600" height="500" effect="fadeInUp" >
                    <div className="row">
                        <div className="col-8" >
                            <h3 style={{ fontFamily: "cursive", marginLeft: "30px" }}><b>Sign Up</b></h3>
                        </div>
                        <div className="col-3">
                            <Link to='/' type="button" class="close" onClick={() => closeModal()} data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true" style={{ fontSize: "30px" }}>&times;</span>
                            </Link>
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-6">
                            {SignupForm()}
                        </div>
                        <div className="col-5" style={{
                            backgroundImage: "url(https://cdn.eckovation.com/homepage/bluebg-learnerreview.svg)", width: "250px", height: "360px", borderRadius: "5px"
                        }}>
                            <h3 className="text-center"><b style={{ color: "white" }}>Welcome Back</b></h3><br />
                            <h4 className="text-center" style={{ color: "white" }}>Already have an account?</h4>
                            <br />
                            <div className="text-center">
                                <Link to='/signin' className="btn btn-warning" style={{ paddingRight: "40px", paddingLeft: "40px" }}><i className="fa fa-user"></i>  SignIn</Link>
                            </div>
                            <br /><br /><br />
                            <div className="text-center">
                                <Link to='/' className="btn btn-info"><i className="fa fa-book"></i> Explore Course</Link>
                            </div>
                        </div>
                    </div>
                </Model>
            </div>
        </div>
    )
}

export default Signup;