import React from 'react'
import ChatForm from './ChatForm'
import ChatList from './ChatList'
import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://localhost:3001/api/',
    timeout: 1000,
    headers: {'token': 'foobar'}
  });

export default class ChatBox extends React.Component {
    constructor(props) {
        super(props)
        this.state = { data: [] }
        this.addChat = this.addChat.bind(this)
        this.removeChat = this.removeChat.bind(this)
    }

    addChat(name, message) {
        const id = Date.now()
        this.setState((state, props) => ({
            data: [{id, name, message }, ...state.data]
        }));
        request.post('chat', {
            id,
            name,
            message})
        .then(data=> {
            console.log(data);
        }).catch(err=> {
            console.log(err);
        })
    }

    removeChat(id){
        this.setState((state, props) => ({
            data: state.data.filter(item => item.id !=id)
          }));
    }

    render() {
        return (
            <div>
                <ChatList data={this.state.data}  remove={this.removeChat} />
                <ChatForm add={this.addChat} />
            </div>
        )
    }
}