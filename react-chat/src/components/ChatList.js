import React from 'react'
import ChatItem from './ChatItem'

export default function ChatList(props) {
    const list = props.data.map(item => 
    <ChatItem
    key={item.id}
    name={item.name}
    message={item.message}
    delete={() => props.remove(item.id)} />)

    return (
        <ul>{list}</ul>
    )
}