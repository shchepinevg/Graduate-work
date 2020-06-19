import React, { Component } from "react";

import { GA, DE, CE } from "./methods";

import axios from "axios"

import { Select, Input, Radio, Button } from "antd";
const { Option } = Select;

class OptimParam extends Component {
  state = {
    focusMethod: "GA",
    focusMethodMeta: "GA",
    isParamRecomend: true,
    isMinimization: true,
    isLoading: false
  };

  render() {
    return (
      <div>
        <h1 style={{marginBottom: "30px"}}>{this.props.func_name}</h1>
        <div style={{marginBottom: "20px"}}>
            <b>Метод оптимизации:</b>
            <Select defaultValue="GA" onChange={this.onChangeMethods} className="select-meth">
                <Option value="GA">Генетический алгоритм</Option>
                <Option value="CE">Кросс-энтропия</Option>
                <Option value="DE">Дифференциальная эволюция</Option>
            </Select>
            <b>Метод мета-оптимизации:</b>
            <Select defaultValue="GA" onChange={this.onChangeMethodsMeta} className="select-meth">
                <Option value="GA">Генетический алгоритм</Option>
                <Option value="CE">Кросс-энтропия</Option>
                <Option value="DE">Дифференциальная эволюция</Option>
            </Select>
        </div>
        <div style={{marginRight: "35px"}}>
            <b>Количество запусков целевой функции для МО1:</b>
            <Input id="meta_N1" className="inputN" />
            <b>Количество запусков целевой функции для МО2:</b>
            <Input id="meta_N2" className="inputN" />
            <div></div>
        </div>

        <div>
            <b>Количество повторов МО1 для МФ:</b>
            <Input id="k" className="inputN"/>
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
        <div>{this.paramsMethod(this.state.focusMethodMeta)}</div>

        <Button type="primary" style={{width: "260px"}} onClick={this.runOptim} block>Запустить</Button>

      </div>
    );
  }

  runOptim = () => {
    this.setState({
      isLoading: true
    })
    this.sendOptimInfo().then((response) => {
      this.sendOptimParam(response.id)
    })
  }

  async sendOptimParam(id) {
    const optimParam = {
      "user_function": this.props.idFunc,
      "optim_info": id,
      "meta_optim_meth": this.state.focusMethodMeta,
      "meta_N": parseInt(document.getElementById("meta_N2").value, 10),
      "meta_param_optim": this.getUserValue(this.state.focusMethodMeta),
      "k": parseInt(document.getElementById("k").value, 10),
      "value": 0,
      "coordinates": {
        "is_function": 2,
        "isRecommend": this.state.isParamRecomend ? 1 : 2
      }
    }

    await axios.post("http://127.0.0.1:8000/api/create/optim-param", optimParam)
    window.location.href = `/function/history/${this.props.toHistory}`
  }

  sendOptimInfo = () => {
    const optimInfo = {
      "optimization_meth": this.state.focusMethod,
      "N": parseInt(document.getElementById("meta_N1").value, 10),
      "parameters": {"recommend": true},
      "min_or_max": this.state.isMinimization ? 1 : 2,
    }

    return axios.post("http://127.0.0.1:8000/api/create/optim-info", optimInfo)
      .then((res) => {
        return res.data
      })
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
      let res = {}
      meth.recomParam.forEach((item) => {
        res[item.name] = item.value
      })

      return res
    }

    let methCopy = JSON.parse(JSON.stringify(meth))
    methCopy.recomParam.map((val, index) => {
      val.value = document.getElementById("p_"+index).value
    })

    let res = {}
    methCopy.recomParam.forEach((item) => {
      res[item.name] = item.value
    })

    return res
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

  onChangeMethodsMeta = (value) => {
    this.setState({
      focusMethodMeta: value,
    });
  };

  paramsMethod = (value) => {
    if (value === "GA") {
      return (
        <div>
          {GA.recomParam.map((val, index) => {
            return (
              <div key={index}>
                <div className="name-param">
                  {val.name}, {val.discrete_continuous}, {val.lower_bound}, {val.upper_bound}
                </div>
                <div className="input-param">
                  <Input id={"p_" + index} defaultValue={val.value} disabled={this.state.isParamRecomend}/>
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    if (value === "CE") {
      return (
        <div>
          {CE.recomParam.map((val, index) => {
            return (
              <div key={index}>
                <div className="name-param">
                  {val.name}, {val.discrete_continuous}, {val.lower_bound}, {val.upper_bound}
                </div>
                <div className="input-param">
                  <Input id={"p_" + index} defaultValue={val.value} disabled={this.state.isParamRecomend}/>
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    if (value === "DE") {
      return (
        <div>
          {DE.recomParam.map((val, index) => {
            return (
              <div key={index}>
                <div className="name-param">
                  {val.name}, {val.discrete_continuous}, {val.lower_bound}, {val.upper_bound}
                </div>
                <div className="input-param">
                  <Input id={"p_" + index} defaultValue={val.value} disabled={this.state.isParamRecomend}/>
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
