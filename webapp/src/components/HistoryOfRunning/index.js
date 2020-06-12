import React, { Component } from 'react'

import TabelWithParam from './TabelWithParam'

import axios from "axios"

import {runFunc1} from './functions'

class HistoryOfRunning extends Component {
    state = {
        data_func: [],
        data_param: []
    }

    async componentDidMount() {
        const get_func = await axios.get("http://127.0.0.1:8000/api/optim-func/1")
        const get_param = await axios.get("http://127.0.0.1:8000/api/optim-param/1")
        this.setState({
            data_func: get_func.data,
            data_param: get_param.data
        })
    }

    render() {
        return (
            <div>
                {runFunc1.map((value, index) => {
                    return (
                        <TabelWithParam key={index} mode={value.mode} data={value.data} min={value.min} />
                    )
                })}
            </div>
        )
    }
}

export default HistoryOfRunning
