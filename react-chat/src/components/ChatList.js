import React from 'react'
import ChatItem from './ChatItem'

export default function ChatList(props) {
    const list = props.data.map(item => <ChatItem title={item.title} delete={() => props.remove(item.id)} />)

    return (
        <ol>{list}</ol>
    )
}