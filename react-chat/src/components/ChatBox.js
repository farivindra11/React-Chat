import React from 'react'
import ChatForm from './ChatForm'
import ChatList from './ChatList'
import axios from 'axios';
import io from 'socket.io-client';
import moment from 'moment'
import Swal from 'sweetalert2'

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

        socket.on('newChat', (data) => {
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

        socket.emit('newChat', {
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
        Swal.fire({
            title: 'Are you sure?',
            text: 'This message will be deleted !',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#08db93',
            confirmButtonText: 'Delete',
            cancelButtonText: 'No',
        }).then(result => {
            if (result.value) {
                this.setState((state, props) => ({
                    data: state.data.filter(item => item.id !== id)
                }));

                socket.emit('delete-backEnd', {
                    id
                })
                request.delete(`chats/${id}`).then(data => {
                    Swal.fire({
                        type: 'success',
                        title: 'chat has been deleted..',
                        showConfirmationButton: false,
                    })
                }).catch(err => {
                    console.log(err);
                })
            }
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
            <div className='container d-flex mx-auto mt-5 col-md-8 col-xl-6 chat' >
                <div className='card'>
                        <div className='card-header text-center'>
                            <div>
                                <h3>React Chat</h3>
                            </div>
                        </div>
                    <div className='card-body msg_card_body'>   
                        <ChatList data={this.state.data} remove={this.removeChat} resend={this.resendChat} />
                    </div>
                        <ChatForm add={this.addChat} />
                </div>
            </div>
        )
    }
}