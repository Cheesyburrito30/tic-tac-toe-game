import React, { useState, useRef, useEffect } from 'react'
import Message, { MessageProps } from './components/message/Message'
import './Chat.scss'

export type ChatProps = {
    gameWon: { gameNumber: number; winner: string }
    newGame: number
}

const Chat = ({ gameWon, newGame }: ChatProps) => {
    const [messages, setMessages] = useState<Array<MessageProps>>([]),
        [messageText, setMessageText] = useState(''),
        handleNewMessage = () => {
            fetch('https://baconipsum.com/api/?type=meat-and-filler?sentences=1&ormat=text')
                .then((res) => res.json())
                .then(
                    (result) => {
                        const response: MessageProps = {
                                text: result,
                                type: 'response',
                            },
                            newMessage: MessageProps = {
                                text: messageText,
                                type: 'message',
                            }
                        setMessages([response, newMessage, ...messages])
                        setMessageText('')
                        textArea.current.innerText = ''
                    },
                    (error) => {
                        console.log(error)
                        setMessages([...messages, { text: 'fuck you', type: 'response' }])
                    },
                )
        },
        handleMessageChange = (event: React.FormEvent) => {
            const eventTarget = event.target as HTMLDivElement
            setMessageText(eventTarget.innerText)
        },
        handleKeyPress = (event: React.KeyboardEvent) => {
            if (event.key === 'Enter') {
                event.preventDefault()
                handleNewMessage()
            }
        },
        focusTextArea = () => {
            textArea.current.focus()
        },
        textArea = useRef(document.createElement('div'))
    let firstRender = useRef(true)

    useEffect(() => {
        if (!firstRender.current) {
            setMessages((m) => [{ text: `${gameWon.winner} has won the game!`, type: 'announce' }, ...m])
        }
    }, [gameWon])

    useEffect(() => {
        if (!firstRender.current) {
            setMessages((m) => [{ text: 'New Game Started', type: 'announce' }, ...m])
        }
        firstRender.current = false // set firstRender ref bool to false after this is called to force effects to be allowed to run
    }, [newGame])

    return (
        <div className="chat">
            <div className="ChatWindow">
                <div className="messages">
                    {messages.length > 0 ? (
                        messages.map((message, i) => {
                            return <Message key={i} {...message} />
                        })
                    ) : (
                        <Message text="You can send messages here" type="message" />
                    )}
                </div>
            </div>
            <div className="textarea" onClick={focusTextArea}>
                <div contentEditable="true" ref={textArea} onInput={handleMessageChange} onKeyPress={handleKeyPress} />
            </div>
            <button onClick={handleNewMessage}>
                <img src="/paper-plane-solid.svg" alt="paper plane" height="15" />
            </button>
        </div>
    )
}

export default Chat
