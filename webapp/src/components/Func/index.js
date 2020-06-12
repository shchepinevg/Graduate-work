import React, { Component } from 'react'

import { Button } from 'antd'

import FuncInfo from './FuncInfo'

import './style.css'

class Func extends Component {
    state = {
        isDisabled: true,
    };

    render() {
        return (
            <div>
                <FuncInfo data={this.props.data} idFunc={this.props.match.params.id} isDisabled={this.state.isDisabled}/>
                <div className="btn-block">
                    {/* <Button type="primary" className="btn-change" onClick={this.changeClick}>Изменить</Button> */}
                    <Button href={`/function/optimization/${this.props.match.params.id}`} type="primary" shape="round" className="btn-optim">Оптимизировать</Button>
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
