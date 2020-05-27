import React, { Component } from "react";

import { Tabs } from "antd";

import OptimFunc from './OptimFunc'
import OptimParam from './OptimParam'


import './style.css'

const { TabPane } = Tabs;

class Optimization extends Component {
  render() {
    return (
      <div>
        <Tabs defaultActiveKey="1" size="large" className="tabs" >
          <TabPane tab="Оптимизация целевой функции" key="1">
            <OptimFunc nameFunc="Func1" />
          </TabPane>
          <TabPane tab="Оптимизация параметров метода оптимизации" key="2">
            <OptimParam nameFunc="Func1" />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default Optimization;
