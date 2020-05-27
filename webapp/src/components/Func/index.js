import React, { Component } from 'react'

import { Button } from 'antd'

import FuncInfo from '../FuncInfo'

import './style.css'

class Func extends Component {
    state = {
        isDisabled: true
    }

    render() {
        return (
            <div >
                <FuncInfo isDisabled = {this.state.isDisabled}/>
                <div className="btn-block">
                    <Button type="primary" shape="round" className="btn" onClick={this.changeClick}>Изменить</Button>
                    <Button type="primary" shape="round" className="btn">Оптимизировать</Button>
                </div>
                <div className="btn-history">
                    <Button type="dashed" block>Просмотреть историю запусков</Button>
                </div>
            </div>
        )
    }

    changeClick = () => {
        this.setState({
            isDisabled: !this.state.isDisabled
        })
    }
}

export default Func
