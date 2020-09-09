import React from 'react'

export default function ChatItem(props) {
    return (
        <li>
            <h2>{props.name}</h2>
            <p>{props.message}</p>
            <button onClick={props.delete}>Delete</button>
        </li>
    )
}