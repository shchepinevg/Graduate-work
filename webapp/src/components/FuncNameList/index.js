import React, { Component } from "react";

import { List, Button, Checkbox, Menu } from "antd";

import "./style.css";

const data = [
  {
    id: "1",
    title: "Func1",
  },
  {
    title: "Func2",
    id: "2",
  },
  {
    title: "Func3",
    id: "3",
  },
  {
    title: "Func4",
    id: "4",
  },
];

class FuncNameList extends Component {
  state = {
    isList: true,
  };

  render() {
    return (
      <div>
        {this.renderFunc(data)}
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

  renderFunc = (value) => {
    return (
      <Menu mode="inline" className="main-block">
        {data.map((val, index) => {
            if (this.state.isList) {
                return <Menu.Item key={index}>{val.title}</Menu.Item>;
            } else {
                return <Menu.Item key={index}><Checkbox key={index}>{val.title}</Checkbox></Menu.Item>;
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
