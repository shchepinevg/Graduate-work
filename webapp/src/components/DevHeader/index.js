import React, { Component } from 'react'

import { Link } from 'react-router-dom'

import { Menu } from 'antd'

import './style.css'

class DevHeader extends Component {
    
    render() {
        return (
            <Menu mode="horizontal" className="menu">
                <Menu.Item key="function">
                    <Link to={`/functions`}>Функции</Link>
                </Menu.Item>
                <Menu.Item key="signUp" className="menu-item">
                    Зарегестрироваться
                </Menu.Item>
                <Menu.Item key="signIn" className="menu-item">
                    <Link to={'/login'}>Войти</Link>
                </Menu.Item>
                <Menu.Item key="faq" className="menu-item">
                    <Link to={`/faq`}>FAQ</Link>
                </Menu.Item>
            </ Menu>
        )
    }
}

export default DevHeader