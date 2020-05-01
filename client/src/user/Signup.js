import React, { useState, useEffect } from "react";
import Model from 'react-awesome-modal'
import { Link, Redirect } from "react-router-dom";
import Home from "../cores/Home";


const Signup = () => {

    const [visible, setVisible] = useState();

    useEffect(() => {
        openModal()
    }, [])

    var openModal = () => {
        setVisible(true)
    }

    window.onclick = function (event) {
        setVisible(true)
    }

    var closeModal = () => {
        setVisible(false)
    }

    var SignupForm = () => (
        <form style={{ margin: "30px" }}>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input
                    type="name"
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input
                    type="email"
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input
                    type="password"
                    className="form-control"
                />
            </div>
            <button className="btn btn-primary btn-block">
                Register
            </button>
        </form>
    )

    return (
        <div style={{
            backgroundImage: "url(https://cdn.eckovation.com/homepage/bluebg-learnerreview.svg)", width: "1400px", height: "700px"
        }} >
            <Model visible={visible} width="600" height="500" effect="fadeInDown" >
                <div className="row">
                    <div className="col-xs-8">
                        <h3 style={{ fontFamily: "cursive", marginLeft: "30px" }}><b>Sign Up</b></h3>
                    </div>
                    <div className="col-xs-3" style={{ position: "relative", marginTop: "15px" }}>
                        <Link to='/' type="button" class="close" onClick={() => closeModal()} data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true" style={{ fontSize: "30px" }}>&times;</span>
                        </Link>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-xs-6">
                        {SignupForm()}
                    </div>
                    <div className="col-xs-3" style={{
                        backgroundImage: "url(https://cdn.eckovation.com/homepage/bluebg-learnerreview.svg)", width: "250px", height: "360px", borderRadius: "5px"
                    }}>
                        <h3 className="text-center text-light"><b>Welcome Back</b></h3><br />
                        <h4 className="text-center">Already have an account?</h4>
                        <br />
                        <div className="text-center">
                            <Link to='/signin' className="btn btn-warning">SignIn</Link>
                        </div>
                    </div>
                </div>
            </Model>
        </div>
    )
}

export default Signup;