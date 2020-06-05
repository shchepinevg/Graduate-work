import React, { Component } from "react";

import { Link } from 'react-router-dom'

import { Button, Checkbox, Menu } from "antd";

import axios from "axios"

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
            <Button href="/add" type="primary" className="btn">Добавить</Button>
            <Button type="default" className="btn" onClick={this.choiceClick}>
                {this.state.isList ? "Выбрать" : "Отменить"}
            </Button>
            {!this.state.isList && (<Button onClick={this.deleteFuncs} type="primary" danger>Удалить</Button>)}
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
                return <Menu.Item key={index}><Checkbox id={"ch_"+index} >{val.name}</Checkbox></Menu.Item>;
            }
        })}
      </Menu>
    );
  };

  deleteFuncs = () => {
    let arrForDel = []
    let i = 0
    while(document.getElementById("ch_"+i)) {
      if (document.getElementById("ch_"+i).checked) {
        arrForDel.push(i)
      }
      i = i + 1
    }

    this.sendForDel(arrForDel, 0)
  }

  sendForDel = (arrForDel, i) => {
    if (i >= arrForDel.length) {
      window.location.reload()
      return
    }

    let forDel = this.props.data[arrForDel[i]].id

    axios.delete(`http://127.0.0.1:8000/api/delete/function/${forDel}`)
      .then( res => {
        this.sendForDel(arrForDel, i+1)
      })

  }
}

export default FuncNameList;
