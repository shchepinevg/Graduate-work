import React from "react"

import { Route } from 'react-router-dom'

import FuncNameList from '../FuncNameList'
import Func from '../Func'
import AddFunc from "../AddFunc"

export const FunctionsRoute = (props) => (
    <div>
        <Route path='/functions' render={() => <FuncNameList data={props.data} />} />
        <Route exact path='/functions/:id' render={({match}) => <Func match={match} data={props.data} />} />
    </div>

)
