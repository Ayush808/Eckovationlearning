import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'


import AdminRoute from './auth/AdminRoute'
import PrivateRoute from './auth/PrivateRoute'
import Home from './cores/Home'
import Signin from './user/Signin'
import Signup from './user/Signup'
import Courses from './cores/Courses'
import Course from './cores/Course'
import AdminDashboard from './user/AdminDashboard'
import UserDashboard from './user/UserDashboard'
import AccessCourse from './cores/AccessCourse'
import AddCourseDetails from './user/AddCourseDetails'
import AddCategory from './user/AddCategory'

const Routes = () => {
    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route path='/' exact component={Home} />
                    <Route path='/signin' exact component={Signin} />
                    <Route path='/signup' exact component={Signup} />
                    <Route path='/courses' exact component={Courses} />
                    <Route path='/course/:courseId' exact component={Course} />
                    <PrivateRoute path='/user/dashboard' exact component={UserDashboard} />
                    <PrivateRoute path='/accesscourse/:courseId' exact component={AccessCourse} />
                    <PrivateRoute path='/add/category' exact component={AddCategory} />
                    <AdminRoute path='/admin/dashboard' exact component={AdminDashboard} />
                    <AdminRoute path='/addcourse' exact component={AdminDashboard} />
                    <AdminRoute path='/addmoredetails' exact component={AddCourseDetails} />
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default Routes