import React from "react"

import { Switch, Route, Redirect } from 'react-router-dom'

import {FunctionRoute} from './FunctionRoute'
import {FunctionsRoute} from './FunctionsRoute'

import AddFunc from '../AddFunc'
import FAQ from '../FAQ'
import Authorization from '../Authorization'


export const BaseRoute = (props) => (
    <Switch>
        <Route path='/functions' render={() => <FunctionsRoute data={props.data} />} />
        <Route path='/function' render={() => <FunctionRoute data={props.data} />} />
        <Route path='/add' component={AddFunc} />
        <Route path='/faq' component={FAQ} />
        <Route path='/login' component={Authorization}/>
        <Redirect from='/' to='/functions' /> 
    </Switch>
)

{/* <Route path='/register' component={} />
<Route path='/login' component={} />
<Route path='/logout' component={} /> */}