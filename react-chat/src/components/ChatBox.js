import React from 'react'
import ChatForm from './ChatForm'
import ChatList from './ChatList'

export default class ChatBox extends React.Component {
    constructor(props){
        super(props)
        this.state = {data: [{title : "belajar coding"}]}
    }
    render() {
        return (
            <div>
                <ChatForm />
                <ChatList data={this.state.data} />
            </div>
        )
    } 
}