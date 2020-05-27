import React, {Component} from "react"

import Header from './components/Header'
import FuncInfo from './components/FuncInfo'
import FuncNameList from './components/FuncNameList'
import Func from './components/Func'
import Optimization from './components/Optimization'

import 'antd/dist/antd.css';

class App extends Component {
    render() {
        return (
            <div>
                <Header />
                <Optimization />
            </div>
        )
    }
}

export default App
