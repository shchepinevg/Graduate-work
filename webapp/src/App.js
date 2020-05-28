import React, {Component} from "react"

import { Layout } from 'antd';

import DevHeader from './components/DevHeader'
import {BaseRoute} from './components/router/BaseRoute'

import 'antd/dist/antd.css';

const {Footer, Content } = Layout;

class App extends Component {
    render() {
        return (
            <Layout style={{ minHeight:"100vh" }}>
                <DevHeader />
                <Content style={{ marginTop : '100px'}}><BaseRoute /></Content>
                <Footer style={{ textAlign: 'center' }}>Algorithm parameter optimization ©2020 Created by Shchepin Evgeny</Footer>
            </Layout>
        )
    }
}

export default App
