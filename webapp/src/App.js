import React, {Component} from "react"

import Header from './components/Header'
import FuncInfo from './components/FuncInfo'
import FuncNameList from './components/FuncNameList'

import 'antd/dist/antd.css';

class App extends Component {
    render() {
        return (
            <div>
                <Header />
                <FuncNameList />
            </div>
        )
    }
}

export default App
