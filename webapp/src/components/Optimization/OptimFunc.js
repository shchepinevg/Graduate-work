import React, { Component } from "react";

import { GA, DE, CE } from "./methods";

import { Select, Input, Radio, Button, Checkbox } from "antd";
const { Option } = Select;

class OptimFunc extends Component {
  state = {
    focusMethod: "GA",
    isParamRecomend: true,
    isMinimization: true
  };

  render() {
    return (
      <div>
        <h1 style={{marginBottom: "30px"}}>{this.props.func_name}</h1>
        <div>
            <b>Метод оптимизации:</b>
            <Select defaultValue="GA" onChange={this.onChangeMethods} className="select-meth">
                <Option value="GA">Генетический алгоритм</Option>
                <Option value="CE">Кросс-энтропия</Option>
                <Option value="DE">Дифференциальная эволюция</Option>
            </Select>
        </div>
        <div style={{ marginTop: "20px" }}>
            <b>Количество запусков целевой функции:</b>
            <Input id="N" className="inputN" />
        </div>

        <div className="radio">
            <Radio.Group onChange={this.onChangeMin} value={this.state.isMinimization}>
            <Radio value={true}>Найти минимум</Radio>
            <Radio value={false}>Найти максимум</Radio>
            </Radio.Group>
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
        <div>{this.paramsMethod(this.state.focusMethod)}</div>

        <Button type="primary" style={{width: "260px"}} onClick={this.runOptim} block>Запустить</Button>

      </div>
    );
  }

  runOptim = () => {
    // Заменить на пользователя
    const data = {
      "user_function": 1,
      "is_function": 1,
      "optimization_meth": this.state.focusMethod,
      "N": document.getElementById("N").value,
      "min_or_max": this.state.isMinimization ? 1 : 2,
      "isRecomend": this.state.isParamRecomend ? 1 : 2,
      "parameters": this.getUserValue(this.state.focusMethod)
    }

    console.log(data)
  }

  getUserValue = (focusMeth) => {
    let meth = null
    if (focusMeth === "GA") {
      meth = GA
    } else if (focusMeth === "CE") {
      meth = CE
    } else if (focusMeth === "DE") {
      meth = DE
    }

    if (this.state.isParamRecomend) {
      return(meth.recomParam)
    }

    let methCopy = JSON.parse(JSON.stringify(meth))
    methCopy.recomParam.map((val, index) => {
      val.value = document.getElementById("f_"+index).value
    })

    return(methCopy.recomParam)
  }

  onChangeParam = (e) => {
    this.setState({
        isParamRecomend: e.target.value,
    })
  }

  onChangeMin = (e) => {
    this.setState({
      isMinimization: e.target.value
    })
  }

  onChangeMethods = (value) => {
    this.setState({
      focusMethod: value,
    });
  };

  paramsMethod = (value) => {
    if (value === "GA") {
      return (
        <div id="methParam">
          {GA.recomParam.map((val, index) => {
            return (
              <div key={index}>
                <div className="name-param">
                  {val.name}, {val.discrete_continuous}, {val.lower_bound}, {val.upper_bound}
                </div>
                <div className="input-param">
                  <Input id={"f_" + index} defaultValue={val.value} disabled={this.state.isParamRecomend}/>
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    if (value === "CE") {
      return (
        <div id="methParam">
          {CE.recomParam.map((val, index) => {
            return (
              <div key={index}>
                <div className="name-param">
                  {val.name}, {val.discrete_continuous}, {val.lower_bound}, {val.upper_bound}
                </div>
                <div className="input-param">
                  <Input id={"f_" + index} defaultValue={val.value} disabled={this.state.isParamRecomend}/>
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    if (value === "DE") {
      return (
        <div id="methParam">
          {DE.recomParam.map((val, index) => {
            return (
              <div key={index}>
                <div className="name-param">
                  {val.name}, {val.discrete_continuous}, {val.lower_bound}, {val.upper_bound}
                </div>
                <div className="input-param">
                  <Input id={"f_" + index} defaultValue={val.value} disabled={this.state.isParamRecomend}/>
                </div>
              </div>
            );
          })}
        </div>
      );
    }
  };
}

export default OptimFunc;
