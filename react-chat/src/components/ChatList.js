import React from 'react'
import ChatItem from './ChatItem'

export default function ChatList(props) {
    const list = props.data.map(item => <ChatItem title={item.title} />)

    return (
        <ol>{list}</ol>
    )
}