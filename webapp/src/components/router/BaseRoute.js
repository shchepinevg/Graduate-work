import React from "react"

import { Switch, Route } from 'react-router-dom'

import {FunctionRoute} from './FunctionRoute'

export const BaseRoute = () => (
    <Switch>
        <Route path='/functions' component={FunctionRoute} />
    </Switch>
)

{/* <Route path='/register' component={} />
<Route path='/login' component={} />
<Route path='/logout' component={} /> */}