import React, { Component } from 'react'

import HistoryOptimFunc from './HistoryOptimFunc'

import HistoryOptimParam from './HistoryOptimParam'

import axios from "axios"

import { Tabs } from "antd";
const { TabPane } = Tabs;

class HistoryOfRunning extends Component {
    state = {
        isRender: false,
        optimFunc: [],
        optimParam: []
    }
    
    async componentDidMount() {
        const data_func = await axios.get(`http://127.0.0.1:8000/api/get/optim-func/${this.props.data[this.props.match.params.id].id}`)
        const data_param = await axios.get(`http://127.0.0.1:8000/api/get/optim-param/${this.props.data[this.props.match.params.id].id}`)

        this.setState({
            isRender: true,
            optimFunc: data_func.data.reverse(),
            optimParam: data_param.data.reverse()
        })
    }

    render() {
        if ((this.state.optimFunc.length == 0 || this.state.optimParam.length == 0) && !this.state.isRender) {
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
                        <HistoryOptimParam data={this.state.optimParam} nameFunc={this.props.data[this.props.match.params.id].name} /> 
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}

export default HistoryOfRunning
