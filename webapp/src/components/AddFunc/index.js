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
    render() {
        return (
          <div>
            <Form id="funcInfo" >
                <div className="input-block">
                    Название функции:
                    <Input name="nameFunc" />
                </div>
                <div className="input-block">
                    <input type="file" name="fileFunc" />
                </div>
                <div className="input-block">
                    Относительный путь запускаемого файла:
                    <Input name="pathFunc" />
                </div>
                <div style={{marginLeft: '150px'}}>
                    <ParamForFunc />
                </div>
            </Form>

            <Button className="btn-add" onClick={this.addFunc} type='primary'>Добавить функцию</Button>
          </div>
        )
    }

     addFunc = () => {
      const formData = new FormData(document.getElementById("funcInfo"))
      axios.post("http://127.0.0.1:8000/api/create/function", formData)
    }
}

export default AddFunc

