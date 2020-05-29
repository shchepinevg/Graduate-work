import React from "react"

import { Route } from 'react-router-dom'

import FuncNameList from '../FuncNameList'
import Func from '../Func'

export const FunctionsRoute = () => (
    <div>
        <Route path='/functions' component={FuncNameList} />
        <Route exact path='/functions/:id' component={Func} />
    </div>

)
