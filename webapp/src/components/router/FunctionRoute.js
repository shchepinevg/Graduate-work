import React from "react"

import { Switch, Route } from 'react-router-dom'

import FuncNameList from '../FuncNameList'
import Func from '../Func'
import FuncInfo from '../FuncInfo'
import HistoryOfRunning from '../HistoryOfRunning'
import Optimization from '../Optimization'

export const FunctionRoute = () => (
    <Switch>
        <Route exact path='/functions' component={FuncNameList} />
        <Route exact path='/functions/add' component={FuncInfo} />
        <Route exact path='/functions/:id' component={Func} />
        <Route exact path='/functions/history/:id' component={HistoryOfRunning} />
        <Route exact path='/functions/optimization/:id' component={Optimization} />
    </Switch>
)