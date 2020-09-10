import React from 'react'

export default function ChatItem(props) {
    return (
        <li>
            <h2>{props.name}</h2>
            <p>{props.message}</p>
            {!props.sent && <p style ={{color: 'red', 'font-size': '8pt'}}>network failed</p>}
            <button className="btn btn-outline-danger" onClick={props.sent ? props.delete : props.resend}>{props.sent ? 'hapus' : 'kirim ulang'}</button>
        </li>
    )
}