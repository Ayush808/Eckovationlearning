import React, { useState, useEffect } from "react";
import Model from 'react-awesome-modal'
import { Link, Redirect } from "react-router-dom";
import { signin, authenticate, isAuthenticated } from "../auth/index";


const Signin = () => {

    const [visible, setVisible] = useState()

    useEffect(() => {
        openModal()
    }, [])

    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        loading: false,
        redirectToReferrer: false
    })



    const { email, password, loading, error, redirectToReferrer } = values;
    const { user } = isAuthenticated()

    var openModal = () => {
        setVisible(true)
    }

    var closeModal = () => {
        setVisible(false)
    }

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault()
        setValues({ ...values, error: false, loading: true })
        signin({ email, password }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, loading: false })
            } else {
                authenticate(
                    data,
                    () => {
                        setValues({
                            ...values,
                            redirectToReferrer: true
                        })
                    }
                )
            }
        })
    }

    const showError = () => (
        <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
        >
            {error}
        </div>
    );

    const showLoading = () =>
        loading && (
            <div className="alert alert-info">
                <h2>Loading...</h2>
            </div>
        );

    const redirectUser = () => {
        if (redirectToReferrer) {
            if (user && user.role === 1) {
                return <Redirect to="/admin/dashboard" />
            } else {
                return <Redirect to="/user/dashboard" />
            }
        }
        if (isAuthenticated()) {
            return <Redirect to='/' />
        }

    };

    var SigninForm = () => (
        <form className="mx-3">
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input
                    type="email"
                    value={email}
                    placeholder="i.e. xyz@gmail.com"
                    className="form-control"
                    onChange={handleChange("email")}
                    required="true"
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Password</label>
                <input
                    type="password"
                    value={password}
                    placeholder="Enter your secret Key"
                    className="form-control"
                    onChange={handleChange("password")}
                    required="true"
                />
            </div>
            <button className="btn btn-primary btn-block" onClick={clickSubmit}>
                Log In
            </button>
        </form>
    )

    return (
        <div className="popbg">
            <Model visible={visible} width="600" height="500" effect="fadeInDown" >
                <div className="row">
                    <div className="col-8">
                        <h3 style={{ fontFamily: "cursive", marginLeft: "30px", marginTop: "15px" }}><b>Log In</b></h3>
                    </div>
                    <div className="col-3" style={{ position: "relative", marginTop: "15px" }}>
                        <Link to='/' type="button" class="close" onClick={() => closeModal()} data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true" style={{ fontSize: "30px" }}>&times;</span>
                        </Link>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-6">
                        {showLoading()}
                        {showError()}
                        {SigninForm()}
                        {redirectUser()}
                    </div>
                    <div className="col-5" style={{
                        backgroundImage: "url(https://cdn.eckovation.com/homepage/bluebg-learnerreview.svg)", width: "250px", height: "360px", borderRadius: "5px"
                    }}>
                        <h3 className="text-center text-light"><b style={{ color: "white" }}>Hi, Learner</b></h3><br />
                        <h4 className="text-center" style={{ color: "white" }}>Looking to create an account?</h4>
                        <div className="text-center">
                            <Link to='/signup' className="btn btn-warning" style={{ paddingRight: "40px", paddingLeft: "40px" }}><i className="fa fa-user"></i>  SignUp</Link>
                        </div>
                        <br /><br /><br />
                        <div className="text-center">
                            <Link to='/courses' className="btn btn-info"><i className="fa fa-book"></i>  Explore Course</Link>
                        </div>
                    </div>
                </div>
            </Model>
        </div>
    )
}

export default Signin;