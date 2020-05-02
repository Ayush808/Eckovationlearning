import React, { useState, useEffect } from 'react'
import NavBar from './NavBar'


const Home = () => {

    const carousel = () => (
        <div id="demo" class="carousel slide" data-ride="carousel">

            <ul class="carousel-indicators">
                <li data-target="#demo" data-slide-to="0" class="active"></li>
                <li data-target="#demo" data-slide-to="1"></li>
                <li data-target="#demo" data-slide-to="2"></li>
            </ul>

            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img src="https://cdn.eckovation.com/homepage/hm-pg-slider1.png " alt="Slider 1" />
                </div>
                <div class="carousel-item">
                    <img src="https://cdn.eckovation.com/homepage/hm-pg-slider2.png " alt="Slider 2" />
                </div>
                <div class="carousel-item">
                    <img src="https://cdn.eckovation.com/homepage/hm-pg-slider3.png " alt="Slider 3" />
                </div>
            </div>


            <a class="carousel-control-prev" href="#demo" data-slide="prev">
                <span class="carousel-control-prev-icon"></span>
            </a>
            <a class="carousel-control-next" href="#demo" data-slide="next">
                <span class="carousel-control-next-icon"></span>
            </a>

        </div>
    )

    return (
        <div>
            <NavBar />
            {carousel()}
        </div>
    )
}

export default Home