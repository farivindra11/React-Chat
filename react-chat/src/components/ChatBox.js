import React from 'react'
import ChatForm from './ChatForm'
import ChatList from './ChatList'
import axios from 'axios';

const request = axios.create({
    baseURL: 'http://localhost:3001/api/',
    timeout: 1000,
    headers: { 'token': 'dsfsfdfs' }
});

export default class ChatBox extends React.Component {
    constructor(props) {
        super(props)
        this.state = { data: [] }
        this.addChat = this.addChat.bind(this)
        this.removeChat = this.removeChat.bind(this)
    }

    componentDidMount() {
        request.get('chats').then(data => {
            const completedData = data.data.map(item=> {
                item.sent = true;
                return item
            })
            this.setState({ data: completedData })
        }).catch(err => {
            console.log(err);
        })
    }

    addChat(name, message) {
        const id = Date.now()
        this.setState((state, props) => ({
            data: [...state.data, { id, name, message,sent: true }]
        }));
        request.post('chats', {
            id,
            name,
            message
        })
        .then(data => {
            console.log(data);
        }).catch(err => {
            console.log(err);
            this.setState((state, props) => ({
                data: state.data.map(item => {
                    if(item.id === id) {
                        item.sent = false;
                    }
                    return item;
                })
            }));
        })
    }

    removeChat(id) {
        this.setState((state, props) => ({
            data: state.data.filter(item => item.id !== id)
        }));
    }

    render() {
        return (
            <div>
                <ChatList data={this.state.data} remove={this.removeChat} />
                <ChatForm add={this.addChat} />
            </div>
        )
    }
}