import React from 'react'
import ReactMarkdown from 'react-markdown';

export default function ChatItem(props) {
    return (
        <div className='d-flex mb-4'>
            <div className="img_cont_msg">
                <p className="rounded-circle user_img_msg"> {props.name.slice(0, 2).toUpperCase()}</p>
            </div>
            <div className='boks'>
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
                {!props.sent &&
                    <div className="btn_resend">
                        <button className="btn btn-outline-success btn-sm circle"
                            onClick={() => props.resend(props.message)}>
                            <i className="fas fa-redo-alt"></i>
                        </button>
                        <p className='spinner'>network failed</p>
                    </div>}
            </div>
        </div>
    )
}