import React, { Component } from 'react'

class CreateFunc extends Component {
    render() {
        return (
            <form name="addfunc">
                <div>
                    <input type="text" name="namefunc" />
                </div>
                <div>
                    <input type="file" name="file" />
                    <button type="submit" name="create">Добавить</button>
                </div>
            </form>
        )
    }
}

export default CreateFunc
