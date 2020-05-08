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
                    <AdminRoute path='/admin/dashboard' exact component={AdminDashboard} />
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default Routes