import React, { Component } from 'react'

import TabelWithParam from './TabelWithParam'

import {GA, CE, DE} from '../Optimization/methods'
import {runFunc1} from './functions'

class HistoryOfRunning extends Component {
    render() {
        return (
            <div>
                {runFunc1.map((value) => {
                    return (
                        <TabelWithParam mode={value.mode} data={value.data} min={value.min} />
                    )
                })}
            </div>
        )
    }
}

export default HistoryOfRunning
