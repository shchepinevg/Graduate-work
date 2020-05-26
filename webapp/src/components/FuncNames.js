import React, { Component } from 'react'
import axios from 'axios'

class FuncNames extends Component {
    state = {
        data: []
    }

    async componentDidMount() {
        const fn = await axios.get("http://127.0.0.1:8000/api/get/names/2")
        console.log(fn.data)
        this.setState({
            data: fn.data
        });
    }

    render() {
        return (
            <form name="deleteupdate">
                <div>
                    <select name="funcnames"></select>
                </div>
                <div>
                    <button type="submit" name="delete">Удалить</button>
                    <button type="submit" name="update">Обновить имя</button>
                </div>
            </form>
        )
    }
}

export default FuncNames
