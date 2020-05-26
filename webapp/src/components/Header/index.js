import React, { Component } from 'react'

import { Menu } from 'antd'

import './style.css'

class Header extends Component {
    
    render() {
        return (
            <Menu mode="horizontal" className="menu-block">
                <Menu.Item key="function">
                    Функции
                </Menu.Item>
                <Menu.Item key="signUp" className="menu-item">
                    Зарегестрироваться
                </Menu.Item>
                <Menu.Item key="signIn" className="menu-item">
                    Войти
                </Menu.Item>
            </ Menu>
        )
    }
}

export default Header