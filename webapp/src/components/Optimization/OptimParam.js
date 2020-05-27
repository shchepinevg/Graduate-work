import React, { Component } from "react";

import { GA, DE, CE } from "./methods";

import { Select, Input, Radio, Button } from "antd";
const { Option } = Select;

class OptimParam extends Component {
  state = {
    focusMethod: GA.name,
    focusMethodMeta: GA.name,
    isParamRecomend: true,
  };

  render() {
    return (
      <div>
        <h1 style={{marginBottom: "30px"}}>{this.props.nameFunc}</h1>
        <div style={{marginBottom: "20px"}}>
            <b>Метод оптимизации:</b>
            <Select defaultValue={GA.name} onChange={this.onChangeMethods} className="select-meth">
                <Option value={GA.name}>{GA.name}</Option>
                <Option value={CE.name}>{CE.name}</Option>
                <Option value={DE.name}>{DE.name}</Option>
            </Select>
            <b>Метод мета-оптимизации:</b>
            <Select defaultValue={GA.name} onChange={this.onChangeMethodsMeta} className="select-meth">
                <Option value={GA.name}>{GA.name}</Option>
                <Option value={CE.name}>{CE.name}</Option>
                <Option value={DE.name}>{DE.name}</Option>
            </Select>
        </div>
        <div style={{marginRight: "35px"}}>
            <b>Количество запусков целевой функции для МО1:</b>
            <Input className="inputN" />
            <b>Количество запусков целевой функции для МО2:</b>
            <Input className="inputN" />
            <div></div>
        </div>

        <div>
            <b>Количество повторов МО1 для МФ:</b>
            <Input className="inputN"/>
        </div>

        <div className="radio">
            <Radio.Group onChange={this.onChangeParam} value={this.state.isParamRecomend}>
            <Radio value={true}>Рекомендованные параметры</Radio>
            <Radio value={false}>Свои параметры</Radio>
            </Radio.Group>
        </div>


        <div className="name-param">
          <b>Название, тип, от до</b>
        </div>
        <div className="input-param">
          <b>Значение</b>
        </div>
        <div>{this.paramsMethod(this.state.focusMethodMeta)}</div>

        <Button type="primary" style={{width: "260px"}} block>Запустить</Button>

      </div>
    );
  }

  onChangeParam = (e) => {
    this.setState({
        isParamRecomend: e.target.value,
    })
  }

  onChangeMethods = (value) => {
    this.setState({
      focusMethod: value,
    });
  };

  onChangeMethodsMeta = (value) => {
    this.setState({
      focusMethodMeta: value,
    });
  };

  paramsMethod = (value) => {
    if (value === GA.name) {
      return (
        <div>
          {GA.recomParam.map((val, index) => {
            return (
              <div>
                <div className="name-param">
                  {val.name}, {val.type}, {val.borderLow}, {val.borderHight}
                </div>
                <div className="input-param">
                  <Input key={index} defaultValue={val.value} disabled={this.state.isParamRecomend}/>
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    if (value === CE.name) {
      return (
        <div>
          {CE.recomParam.map((val, index) => {
            return (
              <div>
                <div className="name-param">
                  {val.name}, {val.type}, {val.borderLow}, {val.borderHight}
                </div>
                <div className="input-param">
                  <Input key={index} defaultValue={val.value} disabled={this.state.isParamRecomend}/>
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    if (value === DE.name) {
      return (
        <div>
          {DE.recomParam.map((val, index) => {
            return (
              <div>
                <div className="name-param">
                  {val.name}, {val.type}, {val.borderLow}, {val.borderHight}
                </div>
                <div className="input-param">
                  <Input key={index} defaultValue={val.value} disabled={this.state.isParamRecomend}/>
                </div>
              </div>
            );
          })}
        </div>
      );
    }
  };
}

export default OptimParam;
