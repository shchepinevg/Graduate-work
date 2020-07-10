import React, { Component } from 'react'

import { Input, Button } from 'antd'

import "./style.css"

class Auth extends Component {
    render() {
        return (
            <div className="block-auth">
                <h2 style={{marginLeft: "70px"}} >Toap</h2>
                <div className="block-login">
                    <Input placeholder="Логин" />
                </div>
                <div className="block-password">
                    <Input placeholder="Пароль" />
                </div>
                <div className="btn-login">
                    <Button type="primary" block>Войти</Button>
                </div>
            </div>
        )
    }
}

export default Auth
