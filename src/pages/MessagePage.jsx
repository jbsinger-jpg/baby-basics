import React, { useState, useRef, useEffect } from 'react';
import { auth, firestore, serverTimestamp } from '../firebaseConfig';
import { Avatar, Box, Button, HStack, Textarea } from '@chakra-ui/react';

function MessagePage() {
    const [text, setText] = useState();
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



    const handleUserChange = (event) => {
        setSelectedUser(event.target.value);
    };

    const handleTextAreaChange = (e) => {
        setText(e.target.value);
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
        <Box w="100vw" h="100vh">
            <div ref={scrollRef}>
                {messages &&
                    messages.map((msg) => (
                        <ChatMessage key={msg.id} message={msg} />
                    ))}
            </div>
            <form onSubmit={sendMessage}>
                <Box position="absolute" bottom="10" w="100vw" paddingRight="10" paddingLeft="10">
                    <HStack>
                        <Textarea
                            value={text}
                            onChange={handleTextAreaChange}
                            placeholder="Type your message here..."
                        />
                        <Button type="submit" disabled={!text}>
                            Send
                        </Button>
                    </HStack>
                </Box>
            </form>
        </Box>
    );
}

function ChatMessage({ message }) {
    const { text, uid, photoURL } = message;
    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

    return (
        <div style={{ display: "flex", justifyContent: messageClass === 'sent' ? "flex-start" : 'flex-end', padding: "10px" }}>
            <div style={{ display: 'flex', flexDirection: "row", alignItems: "center", gap: "10px" }}>
                <Avatar src={photoURL || 'https://i.imgur.com/rFbS5ms.png'} alt="Avatar" />
                <Box whiteSpace="pre-wrap">
                    {text}
                </Box>
            </div>
        </div>
    );
}

export default MessagePage;
