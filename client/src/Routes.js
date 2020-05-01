import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

// import Signup from './user/Signup'
// import Signin from './user/Signin'
import Home from './cores/Home'
import Signin from './user/Signin'
import Signup from './user/Signup'
import PrivateRoute from './auth/PrivateRoute'

const Routes = () => {
    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route path='/' exact component={Home} />
                    <Route path='/signin' exact component={Signin} />
                    <Route path='/signup' exact component={Signup} />
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default Routes