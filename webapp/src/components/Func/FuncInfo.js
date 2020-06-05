import React, { Component } from 'react'

import { Table, Input, Button, Upload, Form, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons';


import './style.css'

const columns = [
    {
        title: "Название",
        dataIndex: "name",
        key: "name",
    },
    {
        title: "Тип",
        dataIndex: "discrete_continuous",
        key: "discrete_continuous",
    },
    {
        title: "Нижняя граница",
        dataIndex: "lower_bound",
        key: "lower_bound",
    },
    {
        title: "Верхняя граница",
        dataIndex: "upper_bound",
        key: "upper_bound",
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
                            <Input name="nameFunc" value={this.props.data[this.props.idFunc].name} />
                        </div>
                        <div className="input-blocks">
                            <input type="file" />
                        </div>
                        <div className="input-blocks">
                            Относительный путь запускаемого файла:
                            <Input name="pathFunct" value={this.props.data[this.props.idFunc].relative_path} />
                        </div>
                    </Form>
                <Table columns={columns} dataSource={this.props.data[this.props.idFunc].param} pagination = {false} />
            </div>
        )
    }
}

export default FuncInfo
