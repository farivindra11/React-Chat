import React from 'react'
import ChatForm from './ChatForm'
import ChatList from './ChatList'

export default class ChatBox extends React.Component {
    constructor(props) {
        super(props)
        this.state = { data: [] }
        this.addChat = this.addChat.bind(this)
        this.removeChat = this.removeChat.bind(this)
    }

    addChat(title) {
        const id = Date.now()
        this.setState((state, props) => ({
            data: [{id, title }, ...state.data]
        }));
    }

    removeChat(id){
        this.setState((state, props) => ({
            data: state.data.filter(item => item.id !=id)
          }));
    }

    render() {
        return (
            <div>
                <ChatForm add={this.addChat} />
                <ChatList data={this.state.data}  remove={this.removeChat} />
            </div>
        )
    }
}