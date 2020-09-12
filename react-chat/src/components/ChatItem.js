import React from 'react'
import ReactMarkdown from 'react-markdown';

export default function ChatItem(props) {
    return (
        <div className={`d-flex mb-4 ${props.index % 2 === 0 ? "justify-content-end" : "justify-content-start"}`}>
            <div className="img_cont_msg">
                <p className="rounded-circle user_img_msg"> {props.name.slice(0, 2).toUpperCase()}</p>
            </div>
            <div>
                <h6 className='name'>{props.name}</h6>
                <div className=' msg_cotainer'>
                    <p> <ReactMarkdown
                        source={props.message}
                        escapeHtml={false}
                    /> </p>
                </div>
                <div className='row'>
                <span className="msg_time">{props.time}</span>
                {props.sent && <button className='btn btn danger' onClick={props.delete}><i className='cg-cl-del fas fa-trash-alt fa-xs'></i></button>}
                </div>
            </div>
            {/* {!props.sent && <p style={{ color: 'red', 'font-size': '8pt' }}>network failed</p>}
            <button className="btn btn-outline-danger" onClick={props.sent ? props.delete : props.resend}>{props.sent ? 'hapus' : 'kirim ulang'}</button> */}

        </div>
    )
}