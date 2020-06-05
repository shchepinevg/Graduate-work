import React from "react"

import { Switch, Route, Redirect } from 'react-router-dom'

import {FunctionRoute} from './FunctionRoute'
import {FunctionsRoute} from './FunctionsRoute'

import AddFunc from '../AddFunc'


export const BaseRoute = (props) => (
    <Switch>
        <Route path='/functions' render={() => <FunctionsRoute data={props.data} />} />
        <Route path='/function' component={FunctionRoute} />
        <Route path='/add' component={AddFunc} />
        <Redirect from='/' to='/functions' /> 
    </Switch>
)

{/* <Route path='/register' component={} />
<Route path='/login' component={} />
<Route path='/logout' component={} /> */}