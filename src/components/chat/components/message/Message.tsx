import React from 'react'
import './Message.scss'

export type MessageProps = {
    text: string
    type: string
}

const Message = ({ text, type }: MessageProps) => {
    return (
        <>
            <p className={`messageWrap ${type}`}>{text}</p>
        </>
    )
}

export default Message
