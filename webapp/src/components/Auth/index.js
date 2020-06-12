import React, { Component } from 'react'

import { Input, Button } from 'antd'

import "./style.css"

class Auth extends Component {
    render() {
        return (
            <div>
                <div className="block-login">
                    <h1>Логин</h1>
                    <Input />
                </div>
                <div className="block-password">
                    <h1>Пароль</h1>
                    <Input />
                </div>
                <Button className="btn-login" type="primary" block>Войти</Button>
            </div>
        )
    }
}

export default Auth
