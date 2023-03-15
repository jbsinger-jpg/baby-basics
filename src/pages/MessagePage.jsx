import React, { useState, useRef, useContext } from 'react';
import { auth, firestore, serverTimestamp } from '../firebaseConfig';
import { Avatar, Box, Button, HStack, Textarea } from '@chakra-ui/react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import Context from "../context/Context";

function MessagePage() {
    const { data: selectedUser } = useContext(Context);
    const [text, setText] = useState();
    const scrollRef = useRef();
    const [chatRoomMessagesRecieved] = useCollectionData(
        firestore
            .collection('messages')
            .where("reciever", "==", auth.currentUser.email)
            .where("sender", "==", selectedUser),
        { idField: 'id' }
    );

    const [chatRoomMessagesSent] = useCollectionData(
        firestore
            .collection('messages')
            .where("reciever", "==", selectedUser)
            .where("sender", "==", auth.currentUser.email),
        { idField: 'id' }
    );

    const generateMessages = () => {
        let options = [];

        for (const message of chatRoomMessagesRecieved) {
            options.push(message);
        }

        for (const message of chatRoomMessagesSent) {
            options.push(message);
        }

        options.sort((a, b) => {
            if (a.createdAt < b.createdAt) {
                return -1;
            }
            if (a.createdAt > b.createdAt) {
                return 1;
            }
            return 0;
        });

        return options;
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
    };

    return (
        <Box w="100vw" h="100vh">
            <div ref={scrollRef}>
                {(chatRoomMessagesRecieved && chatRoomMessagesSent) &&
                    generateMessages()
                        .map((msg) => {
                            return (<ChatMessage key={msg.id} message={msg} />);
                        })
                }
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
