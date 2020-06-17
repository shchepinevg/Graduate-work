import React, { Component } from "react";

import { Tabs } from "antd";

import OptimFunc from './OptimFunc'
import OptimParam from './OptimParam'
import axios from "axios"
import './style.css'

const { TabPane } = Tabs;

class Optimization extends Component {

  state = {
    func_name: []
  }

async componentDidMount() {
    // Заменить на пользователя
    const res = await axios.get("http://127.0.0.1:8000/api/get/functions/1")
    this.setState({
      func_name: res.data
    })
  }

  render() {
    if (this.state.func_name.length == 0) {
      return (
        <h2 className="loading" >Loading...</h2>
      )
    }

    return (
      <div>
        <Tabs defaultActiveKey="1" size="large" className="tabs">
          <TabPane tab="Оптимизация целевой функции" key="1"  >
            <OptimFunc func_name={this.state.func_name[this.props.match.params.id].name}
                       idFunc={this.state.func_name[this.props.match.params.id].id}/>
          </TabPane>
          <TabPane tab="Оптимизация параметров метода оптимизации" key="2">
            <OptimParam />
          </TabPane>
        </Tabs>
        
      </div>
    )
  }
}

export default Optimization;