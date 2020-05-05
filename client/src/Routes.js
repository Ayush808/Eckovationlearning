import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from './cores/Home'
import Signin from './user/Signin'
import Signup from './user/Signup'

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