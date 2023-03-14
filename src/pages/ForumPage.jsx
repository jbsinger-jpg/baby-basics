import React, { useState, useRef } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { auth, firestore, serverTimestamp } from '../firebaseConfig';

function ForumPage() {
    const [text, setText] = useState('');
    const scrollRef = useRef();

    const messagesRef = firestore.collection('messages');
    const query = messagesRef.orderBy('createdAt').limit(25);
    const [messages] = useCollectionData(query, { idField: 'id' });

    const sendMessage = async (e) => {
        e.preventDefault();

        const { uid, photoURL } = auth.currentUser;

        await messagesRef.add({
            text,
            createdAt: serverTimestamp(),
            uid,
            photoURL,
        });

        setText('');
    };

    return (
        <div>
            <div ref={scrollRef}>
                {messages &&
                    messages.map((msg) => (
                        <ChatMessage key={msg.id} message={msg} />
                    ))}
            </div>
            <form onSubmit={sendMessage}>
                <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type your message here..."
                />

                <button type="submit" disabled={!text}>
                    Send
                </button>
            </form>
        </div>
    );
}

function ChatMessage({ message }) {
    const { text, uid, photoURL } = message;

    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

    return (
        <div className={`message ${messageClass}`}>
            <img src={photoURL || 'https://i.imgur.com/rFbS5ms.png'} alt="Avatar" />
            <p>{text}</p>
        </div>
    );
}

export default ForumPage;
