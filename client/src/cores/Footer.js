import React from 'react'
import LOGOIMG from '../compicon.png'

const Footer = () => {

    return (
        <div className="container-fluid footer footimg" >
            <div className="container">
                <div className="pt-3">
                    <div className="text-center">
                        <span className="navbar-brand mb-2">
                            <i><img src={LOGOIMG} width="50" height="50" alt="NA" /></i><b style={{ fontSize: "35px" }}> Learn&Grow</b>
                        </span>
                        <br />
                    </div>
                </div>
            </div>
            <br />
            <div className="container text-center">
                <h6 className="mt-2 text-dark">© 2020 Learn&Grow Solutions Private Limited</h6>
                <h6 className="mt-2 text-dark">Terms of Service  Privacy Policy</h6>
                <br />
                <h6 className="mt-2 text-dark"><mark>Developed by Ayush Mahajan</mark></h6>
            </div><br /><br />
        </div>
    )
}

export default Footer;