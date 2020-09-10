import React from 'react'
import ChatForm from './ChatForm'
import ChatList from './ChatList'
import axios from 'axios';
import io from 'socket.io-client';
import moment from 'moment'

const socket = io('http://localhost:3001');
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
        this.resendChat = this.resendChat.bind(this)
    }

    componentDidMount() {
        request.get('chats').then(data => {
            const completedData = data.data.map(item => {
                item.sent = true;
                return item
            })
            this.setState({ data: completedData })
        }).catch(err => {
            console.log(err);
        })

        socket.on('chat', (data) => {
            const time = moment().format('h:mm a')

            this.setState((state, props) => ({
                data: [...state.data, {...data, time, sent: true}]
            }))
        })

        socket.on('delete-frontEnd', (id) => {
            console.log(id)
            this.setState((state, props) => ({
                data: state.data.filter(item => {
                    return item.id !== id.id
                })
            }))
        })
    }

    addChat(name, message) {
        const id = Date.now()
        const time = moment().format('h:mm a')

        this.setState((state, props) => ({
            data: [...state.data, { id, name, message, time, sent: true }]
        }));

        socket.emit('chat', {
            id,
            name,
            message
        })

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
                        if (item.id === id) {
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
        request.delete(`chats/${id}`).then(data => {
            console.log(data);
        }).catch(err => {
            console.log(err);
        })
    }

    resendChat(id, name, message) {
        request.post('chats', {
            id,
            name,
            message
        }).then(data => {
            this.setState((state, props) => ({
                data: state.data.map(item => {
                    if (item.id === id) {
                        item.sent = true;
                    }
                    return item;
                })
            }));
        }).catch(err => {
            console.log(err);
        })
    }

    render() {
        return (
            <div>
                <ChatList data={this.state.data} remove={this.removeChat} resend={this.resendChat} />
                <ChatForm add={this.addChat} />
            </div>
        )
    }
}