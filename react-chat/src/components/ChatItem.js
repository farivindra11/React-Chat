import React from 'react'

export default function ChatItem(props) {
    return (
        <li>{props.title} 
            <button onClick={props.delete}>Delete</button>
        </li>
    )
}