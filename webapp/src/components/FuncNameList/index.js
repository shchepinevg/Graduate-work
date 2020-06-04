import React, { Component } from "react";

import { Link } from 'react-router-dom'

import { Button, Checkbox, Menu } from "antd";

import "./style.css";

class FuncNameList extends Component {
  state = {
    isList: true,
  };

  render() {
    return (
      <div className="main-block">
        {this.renderFunc(this.props.data)}
        <div style={{marginLeft: 20, marginTop: 15}}>
            <Button type="primary" className="btn">Добавить</Button>
            <Button type="default" className="btn" onClick={this.choiceClick}>
                {this.state.isList ? "Выбрать" : "Отменить"}
            </Button>
            {!this.state.isList && (<Button type="primary" danger>Удалить</Button>)}
        </div>
      </div>
    );
  }

  choiceClick = () => {
    this.setState({
      isList: !this.state.isList,
    });
  };

  renderFunc = (data) => {
    return (
      <Menu mode="inline" style={{backgroundColor: '#f0f2f5'}}>
        {data.map((val, index) => {
            if (this.state.isList) {
                return <Menu.Item key={index}><Link to={`/functions/${index}`}>{val.name}</Link></Menu.Item>;
            } else {
                return <Menu.Item key={index}><Checkbox key={index}>{val.name}</Checkbox></Menu.Item>;
            }
        })}
      </Menu>
    );
  };
}

export default FuncNameList;

// Previos list
{
  /* <div className="main-block">
<List
    itemLayout="horizontal"
    dataSource={data}
    renderItem={item => (
    <List.Item >
        <List.Item.Meta
        title={
            this.state.isList ? 
            <Button type="primary" block style={{width: '20%'}} href="https://ant.design/components/checkbox/">{item.title}</Button>: 
            <Checkbox key={item.id}>{item.title}</Checkbox>
        }
        />
    </List.Item>
    )}
/>
<Button type="primary" className="btn">Добавить</Button>
<Button type="default" className="btn" onClick={this.choiceClick}>{this.state.isList ? 'Выбрать': 'Отменить'}</Button>
{!this.state.isList && <Button type="primary" danger>Удалить</Button>}
</div> */
}

// style={{width: 300, backgroundColor: '#f0f2f5'}}
