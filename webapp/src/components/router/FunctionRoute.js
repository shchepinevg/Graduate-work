import React from "react"

import { Switch, Route } from 'react-router-dom'

import HistoryOfRunning from '../HistoryOfRunning'
import Optimization from '../Optimization'

export const FunctionRoute = (props) => (
    <Switch>
        <Route exact path='/function/history/:id' render={({match}) => <HistoryOfRunning match={match} data={props.data} />} />
        <Route exact path='/function/optimization/:id' render={({match}) => <Optimization match={match} data={props.data} />} />
    </Switch>
)