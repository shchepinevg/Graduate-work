import React, { Component } from 'react'

import {Form, Input, Upload, Button, message} from 'antd'
import { UploadOutlined } from '@ant-design/icons';

import ParamForFunc from './ParamForFunc'

import axios from "axios"

import "./style.css"

const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

class AddFunc extends Component {
    state = {
      lengthPamar: 0,
      isLoading: false
    }

    render() {
        return (
          <div>
            <Button className="btn-back" href="/functions" type='primary'>Назад</Button>
            <Button className="btn-add" loading={this.state.isLoading} onClick={this.addFunc} type='primary'>Добавить функцию</Button>
            <Form id="funcInfo" >
                <div className="input-block">
                    Название функции:
                    <Input name="name" />
                </div>
                <div className="input-block">
                    <input type="file" name="hash" />
                </div>
                <div className="input-block">
                    Относительный путь запускаемого файла:
                    <Input name="relative_path" />
                </div>
            </Form>

            <div style={{marginLeft: '150px'}}>
              <ParamForFunc incLengthParam={this.incLengthParam} decLengthParam={this.decLengthParam} />
            </div>
          
          </div>
        )
    }

     addFunc = () => {
      this.setState({
        isLoading: true
      })
      this.getResponseFunc().then((response) => {
        this.sendParam(0, response.id)
      }) 
    }

      getResponseFunc = () => {
        const formData1 = new FormData(document.getElementById("funcInfo"))
        // Заменить на текущего пользователя
        formData1.append("user", "1")
        
        return axios.post("http://127.0.0.1:8000/api/create/function", formData1)
                .then((res) => {
                  return res.data
                })
      }

    sendParam = (i, id) => {
      if (i >= this.state.lengthPamar) {
        window.location.href = "/functions"
        return
      }

      let param = {
        "user_function": id,
        "name": document.getElementById("np_"+i).value,
        "discrete_continuous": parseFloat(document.getElementById("dc_"+i).value),
        "lower_bound": parseFloat(document.getElementById("bl_"+i).value),
        "upper_bound": parseFloat(document.getElementById("bu_"+i).value)
      }

      axios.post("http://127.0.0.1:8000/api/create/parameters", param)
        .then( res => {
          this.sendParam(i+1, id)
        })
    }

    incLengthParam = () => {
      this.setState({
        lengthPamar: this.state.lengthPamar+1
      })
    }

    decLengthParam = () => {
      this.setState({
        lengthPamar: this.state.lengthPamar-1
      })
    }
}

export default AddFunc

