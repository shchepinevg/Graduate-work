import React, { Component } from "react";

import { Form, Input, Button, Radio } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

import "./style.css";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};


class ParamForFunc extends Component {
  render() {
    return (
      <Form name="dynamic_form_item" {...formItemLayoutWithOutLabel}>
        <Form.List name="names">
          {(fields, { add, remove }) => {
            return (
              <div>
                {fields.map((field, index) => (
                  <Form.Item
                    // {...(index === 0
                    //   ? formItemLayout
                    //   : formItemLayoutWithOutLabel)}
                    // label={index === 0 ? "Параметры" : ""}
                    required={false}
                    key={field.key}
                  >
                    <Form.Item
                      {...field}
                      validateTrigger={["onChange", "onBlur"]}
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          message:
                            "Please input passenger's name or delete this field.",
                        },
                      ]}
                      noStyle
                    >
                      <Input
                        placeholder="Название параметра"
                        style={{ width: "15%" }}
                        name={"np_"+index}
                      />
                      <Radio.Group>
                        <Radio.Button value="a" >Дискретный</Radio.Button>
                        <Radio.Button value="b" >Непрерывный</Radio.Button>
                      </Radio.Group>
                      <Input
                        placeholder="Нижняя граница"
                        style={{ width: "13%" }}
                        name={"bl_"+index}
                      />
                      <Input
                        placeholder="Верхняя граница"
                        style={{ width: "13%" }}
                        name={"bu_"+index}
                      />
                    </Form.Item>
                    {fields.length > 0 ? (
                      <MinusCircleOutlined
                        className="dynamic-delete-button"
                        style={{ margin: "0 8px" }}
                        onClick={() => {
                          remove(field.name);
                        }}
                      />
                    ) : null}
                  </Form.Item>
                ))}
                <Form.Item>
                  <Button
                    name="addParam"
                    disabled={this.props.isDisabled}
                    type="dashed"
                    onClick={() => {
                      add();
                    }}
                    style={{ marginLeft: '170px', width: '300px'}}
                  >
                    <PlusOutlined /> Добавить параметр
                  </Button>
                </Form.Item>
              </div>
            );
          }}
        </Form.List>
      </Form>
    );
  }
}

export default ParamForFunc;
