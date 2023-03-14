import React, { useState, useRef, useEffect } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { auth, firestore, serverTimestamp } from '../firebaseConfig';

function ForumPage() {
    const [text, setText] = useState('');
    const [selectedUser, setSelectedUser] = useState("");
    const scrollRef = useRef();
    const [messages, setMessages] = useState(null);

    const updateChatRoom = () => {
        let options = [];

        firestore.collection('messages')
            .where("sender", "==", auth.currentUser.email)
            .where("reciever", "==", selectedUser)
            .get()
            .then(querySnapshot => {
                querySnapshot.docs.map(doc => {
                    return options.push({ ...doc.data() });
                });
            })
            .catch(error => {
                console.log(error);
            });

        firestore.collection('messages')
            .where("reciever", "==", auth.currentUser.email)
            .where("sender", "==", selectedUser)
            .get()
            .then(querySnapshot => {
                console.log(querySnapshot.docs);
                querySnapshot.docs.map(doc => {
                    return options.push({ ...doc.data() });
                });

                // sort options by the timestamp
                options.sort((a, b) => {
                    if (a.createdAt < b.createdAt) {
                        return -1;
                    }
                    if (a.createdAt > b.createdAt) {
                        return 1;
                    }
                    return 0;
                });
                setMessages(options);
            })
            .catch(error => {
                console.log(error);
            });
    };


    useEffect(() => {
        updateChatRoom();
        // eslint-disable-next-line
    }, [selectedUser]);

    const usersRef = firestore.collection('users');
    const [usersData] = useCollectionData(usersRef, { idField: 'id' });

    const handleUserChange = (event) => {
        setSelectedUser(event.target.value);
        console.log(event.target.value);
    };

    const sendMessage = async (e) => {
        e.preventDefault();
        const { uid, photoURL } = auth.currentUser;

        await firestore.collection('messages').add({
            text: text,
            createdAt: serverTimestamp(),
            uid: uid,
            photoURL: photoURL,
            sender: auth?.currentUser?.email,
            reciever: selectedUser
        });

        setText('');
        updateChatRoom();
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
                <select placeholder='Select option' onChange={handleUserChange}>
                    {usersData && usersData.map(user => <option value={user.email}>{user.first_name + " " + user.last_name}</option>)}
                </select>
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
