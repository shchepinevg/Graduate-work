import React, { Component } from 'react'

import { List, Button, Checkbox  } from 'antd'

import './style.css'

const data = [
    {
      id: '1',
      title: 'Func1',
    },
    {
      title: 'Func2',
      id: '2'
    },
    {
      title: 'Func3',
      id: '3'
    },
    {
      title: 'Func4',
      id: '4'
    },
  ];

class FuncNameList extends Component {
    state = {
        isList: true
    }  

    render() {
        return (
            <div className="main-block">
                <List
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={item => (
                    <List.Item >
                        <List.Item.Meta
                        title={
                            this.state.isList ? <a href="https://ant.design/components/checkbox/">{item.title}</a>: 
                            <Checkbox key={item.id}>{item.title}</Checkbox>
                        }
                        />
                    </List.Item>
                    )}
                />
                <Button type="primary" className="btn">Добавить</Button>
                <Button type="default" className="btn" onClick={this.choiceClick}>{this.state.isList ? 'Выбрать': 'Отменить'}</Button>
                {!this.state.isList && <Button type="primary" danger>Удалить</Button>}

                
            </div>
        )
    }

    choiceClick = () => {
        this.setState({
            isList: !this.state.isList
        })
    }
}

export default FuncNameList

