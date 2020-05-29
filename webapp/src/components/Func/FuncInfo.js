import React, { Component } from 'react'

import { Table, Input, Button, Upload, Form, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons';

import { data, data2, data3 } from './data'

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
    }
]

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

class FuncInfo extends Component {
    render() {
        return (
            <div className="table-block">
                    <Form name="funcInfo" >
                        <div className="input-blocks">
                            Название функции:
                            <Input name="nameFunc" />
                        </div>
                        <div className="input-blocks">
                            <Upload name="fileFunc" {...props}>
                                <Button><UploadOutlined /> Загрузить файл</Button>
                            </Upload>
                        </div>
                        <div className="input-blocks">
                            Относительный путь запускаемого файла:
                            <Input name="pathFunct"/>
                        </div>
                    </Form>
                <Table columns={columns} dataSource={data.param} pagination = {false} />
            </div>
        )
    }
}

export default FuncInfo
