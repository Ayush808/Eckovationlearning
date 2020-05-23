import React from 'react'
import LOGOIMG from '../compicon.png'

const Footer = () => {

    return (
        <div className="container-fluid footer footimg" >
            <div className="container">
                <div className="pt-3">
                    <div className="row">
                        <div className="col-xl-4 col-md-12 col-12" style={{ textAlign: "center" }}>
                            <span className="navbar-brand mb-2">
                                <i><img src={LOGOIMG} width="50" height="50" alt="NA" /></i><b style={{ fontSize: "35px" }}> Learn&Grow</b>
                            </span>
                            <br /><br />
                        </div>
                        <div className="c1 col-xl-2 col-md-3 col-sm-6 col-xs-6">
                            <h2>COMPANY</h2><br />
                            <p style={{ fontSize: "20px" }}>About Us</p>
                            <p style={{ fontSize: "20px" }}>Contact Us</p>
                            <p style={{ fontSize: "20px" }}>Trending News</p>
                        </div>
                        <div className="c2 col-xl-2 col-md-3 col-sm-6 col-xs-6">
                            <h2>NETWORKS</h2><br />
                            <p style={{ fontSize: "20px" }}>LinkedIn</p>
                            <p style={{ fontSize: "20px" }}>Twitter</p>
                            <p style={{ fontSize: "20px" }}>Facbook</p>
                        </div>
                        <div className="c3 col-xl-2 col-md-3 col-sm-6 col-xs-6">
                            <h2 >COURSES</h2><br />
                            <p style={{ fontSize: "20px" }}>Full Stack</p>
                            <p style={{ fontSize: "20px" }}>ML and AI</p>
                            <p style={{ fontSize: "20px" }}>IoT Course</p>
                        </div>
                        <div className="c4 col-xl-2 col-md-3 col-sm-6 col-xs-6">
                            <h2>MORE</h2><br />
                            <p style={{ fontSize: "20px" }}>About Us</p>
                            <p style={{ fontSize: "20px" }}>Contact Us</p>
                            <p style={{ fontSize: "20px" }}>Trending News</p>
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <div className="container text-center">
                <h6 className="mt-2 text-dark">© 2020 Learn&Grow Solutions Private Limited</h6>
                <br />
                <h6 className="mt-2 text-dark">Terms of Service  Privacy Policy</h6>
            </div><br /><br />
        </div>
    )
}

export default Footer;