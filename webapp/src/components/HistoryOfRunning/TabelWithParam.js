import React, { Component } from 'react'

import { Table, Divider } from 'antd';

import './style.css'

const columns = [
    {
        title: "Название",
        dataIndex: "name",
        key: "name",
    },
    {
        title: "Тип",
        dataIndex: "type",
        key: "type",
    },
    {
        title: "Нижняя граница",
        dataIndex: "borderL",
        key: "borderL",
    },
    {
        title: "Верхняя граница",
        dataIndex: "borderH",
        key: "borderH",
    },
    {
        title: "Значение",
        dataIndex: "value",
        key: "value",
    }
]

class TabelWithParam extends Component {
    render() {
        return (
            <div className="table-block">
                <h3>{this.props.mode}</h3>
                <Table columns={columns} dataSource={this.props.data} pagination = {false} />
                <div className="min">
                    <b style={{marginRight: '10px'}}>Найденный минимум:</b>
                    {this.props.min}
                </div>
                <Divider />
            </div>
        )
    }
}

export default TabelWithParam
