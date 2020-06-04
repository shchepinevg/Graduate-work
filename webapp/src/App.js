import React, {Component} from "react"

import { Layout } from 'antd';

import DevHeader from './components/DevHeader'
import {BaseRoute} from './components/router/BaseRoute'

import axios from "axios"

import 'antd/dist/antd.css';

const {Footer, Content } = Layout;

class App extends Component {
    state = {
        func_data: []
    }

    async componentDidMount() {
        const res = await axios.get("http://127.0.0.1:8000/api/get-functions/1")
        this.setState({
          func_data: res.data
        })
        this.wrapperParam(res.data)
        console.log(res.data)
      }

    render() {
        return (
            <Layout style={{ minHeight:"100vh" }}>
                <DevHeader />
                <Content style={{ marginTop : '100px'}}><BaseRoute data={this.state.func_data} /></Content>
                <Footer style={{ textAlign: 'center', marginTop : '100px'}}>Algorithm parameter optimization ©2020 Created by Shchepin Evgeny</Footer>
            </Layout>
        )
    }

    wrapperParam = (data) => {
        data.map((val) => {
            val.param.map((value) => {
                if (value.discrete_continuous == 1) {
                    value.discrete_continuous = "Дискретный"
                } else {
                    value.discrete_continuous = "Непрерывный"
                }
            })
        })
    }
}

export default App
