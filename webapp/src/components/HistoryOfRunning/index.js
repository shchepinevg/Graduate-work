import React, { Component } from 'react'

import HistoryOptimFunc from './HistoryOptimFunc'

import axios from "axios"

import { Tabs } from "antd";
const { TabPane } = Tabs;

var data1 = [
    {
        "optimization_meth": "CE",
        "N": 1200,
        "parameters": {
            "N_pop": 600,
            "rho": 0.1
        },
        "min_or_max": 1,
        "value": 0.01,
        "coordinates": [1,2,3,4,5,6,7,8,9]
    },
    
    {
        "optimization_meth": "GA",
        "N": 800,
        "parameters": {
            "N_pop": 120,
            "rho": 0.3
        },
        "min_or_max": 2,
        "value": 0,
        "coordinates": [1,2,3,4,5,6.06,7,8,9]
    },

    {
        "optimization_meth": "DE",
        "N": 1000,
        "parameters": {
            "N_pop": 700,
            "rho": 0
        },
        "min_or_max": 1,
        "value": 0.01678,
        "coordinates": [1,2,3.2331,4,5,6,7,8,9]
    }
]

class HistoryOfRunning extends Component {
    state = {
        optimFunc: [],
        optimParam: data1
    }

    async componentDidMount() {
        const data_func = await axios.get("http://127.0.0.1:8000/api/get/optim-func")
        // const data_param = await axios.get("http://127.0.0.1:8000/api/get/optim-param")

        this.setState({
            optimFunc: data_func.data,
            // optimParam: data_param.data
        })
    }

    render() {
        if (this.state.optimFunc.length == 0 || this.state.optimParam.length ==0) {
            return (
                <h2 className="loading" >Loading...</h2>
              )
        }

        return (
            <div>
                <Tabs defaultActiveKey="1" size="large" className="tabs">
                    <TabPane tab="Оптимизация целевой функции" key="1" >
                        <HistoryOptimFunc data={this.state.optimFunc} nameFunc={this.props.data[this.props.match.params.id].name} /> 
                    </TabPane>
                    <TabPane tab="Оптимизация параметров метода оптимизации" key="2">
                        <HistoryOptimFunc data={this.state.optimParam} nameFunc={this.props.data[this.props.match.params.id].name} /> 
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}

export default HistoryOfRunning
