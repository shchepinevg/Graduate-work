import React, { Component } from 'react'

import './style.css'

import { Collapse, Popover } from 'antd';
const { Panel } = Collapse;

class HistoryOptimParam extends Component {
    render() {
        return (
            <div className="block-optim-func" >
                <h1 style={{marginBottom: "30px"}}>{this.props.nameFunc}</h1>
                <Collapse>
                    {this.props.data.map((val, index) => {
                        return (
                            <Panel header={"Запуск №" + (index+1)} key={index}>
                                {this.renderInfo(val)}
                            </Panel>
                        )
                    })}
                </Collapse>
            </div>
        )
    }

    renderInfo = (data) => {
        return (
            <div>
                <div>
                    <b className="main-text">Метод оптимизации: </b>
                    <nobr className="main-text">{data.optim_info.optimization_meth}</nobr>
                </div>

                <div>
                    <b className="main-text">Количество запусков целевой функции: </b>
                    <nobr className="main-text">{data.optim_info.N}</nobr>
                </div>

                <div>
                    <b className="main-text">Параметры метода оптимизации: </b>
                    <Popover content={this.renderParameters(data.optim_info.parameters)}>
                        <a className="main-text">cмотреть</a>
                    </Popover>
                </div>

                <div>
                    <b className="main-text">Тип оптимизации: </b>
                    {data.optim_info.min_or_max == 1 ? <nobr className="main-text">минимизация</nobr> : <nobr className="main-text">минимизация</nobr>}
                </div>

                <div>
                    <b className="main-text">Метод мета-оптимизации: </b>
                    <nobr className="main-text">{data.meta_optim_meth}</nobr>
                </div>

                <div>
                    <b className="main-text">Количество запусков мета-функции: </b>
                    <nobr className="main-text">{data.meta_N}</nobr>
                </div>

                <div>
                    <b className="main-text">Параметры метода мета-оптимизации: </b>
                    <Popover content={this.renderParameters(data.meta_param_optim)}>
                        <a className="main-text">cмотреть</a>
                    </Popover>
                </div>

                <div>
                    <b className="main-text">Количество запусков МО1 в МО2: </b>
                    <nobr className="main-text">{data.k}</nobr>
                </div>

                <div>
                    <b className="main-text">Найденный минимум: </b>
                    <nobr className="main-text">{data.value}</nobr>
                </div>

                <div>
                    <b className="main-text">Координаты: </b>
                    <Popover content={this.randerCoordinates(data.coordinates)}>
                        <a className="main-text">cмотреть</a>
                    </Popover>
                </div>
            </div>
        )
    }

    renderParameters = (param) => {
        return (
            <div>
                {Object.keys(param).map((index) => {
                    return (
                        <div>
                            <b>{index + " = "}</b>
                            <nobr>{param[index]}</nobr>
                        </div>
                    )
                })}
            </div>
        )
    }

    randerCoordinates = (coordinates) => {
        return (
            <div>
                {coordinates.map((val, index) => {
                    return (
                        <div>
                            <b>{"x" + (index+1) + " = "}</b>
                            <nob>{val}</nob>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default HistoryOptimParam
