// module imports
import { Box, HStack, Heading, Text, Textarea, VStack, useColorModeValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React, { useState, useRef, useContext, useEffect } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';

// relative imports
import DMChatMessage from '../components/messaging/DMChatMessage';
import { wordFilter } from '../components/messaging/wordFilter';
import StyledSelect from '../components/StyledSelect';
import Context from "../context/Context";
import { screenBackground } from '../defaultStyle';
import { auth, firestore, serverTimestamp } from '../firebaseConfig';

function DirectMessagePage() {
    const { data: selectedUser } = useContext(Context);
    const [text, setText] = useState();
    const [fontSize, setFontSize] = useState("md");
    const messageBoxRef = useRef();

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
            text: wordFilter.clean(text),
            createdAt: serverTimestamp(),
            uid: uid,
            photoURL: photoURL,
            sender: auth?.currentUser?.email,
            reciever: selectedUser
        });

        setText('');

        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
    }, [chatRoomMessagesSent]);

    const _screenBackground = useColorModeValue(screenBackground.light, screenBackground.dark);
    const handleFontSizeChange = (event) => {
        setFontSize(event.target.value);
    };

    const options = [
        { value: 'sm', label: "Small", key: 0 },
        { value: 'md', label: "Medium", key: 1 },
        { value: 'lg', label: "Large", key: 2 },
        { value: 'xl', label: "XL", key: 3 },
        { value: '2xl', label: "2XL", key: 4 },
        { value: '3xl', label: "3XL", key: 5 },
        { value: '4xl', label: "4XL", key: 6 },
        { value: '5xl', label: "5XL", key: 7 },
        { value: '6xl', label: "6XL", key: 8 },
    ];

    return (
        <Box w="100vw" h="100vh" bg={_screenBackground}>
            <Box w="100vw" justifyContent="space-between" display="flex" padding="3">
                <VStack spacing="4" w={"15vw"} alignItems={"start"}>
                    <Heading size="sm">Font Size</Heading>
                    <StyledSelect
                        value={fontSize}
                        onChange={handleFontSizeChange}
                        options={options}
                    />
                </VStack>
            </Box>
            <div style={{ height: `calc(100vh - 240px)`, overflowY: 'auto' }} ref={messageBoxRef}>
                {(chatRoomMessagesRecieved && chatRoomMessagesSent) &&
                    generateMessages()
                        .map((msg) => {
                            return (
                                <DMChatMessage
                                    key={msg.id}
                                    message={msg}
                                    fontSize={fontSize}
                                />
                            );
                        })
                }
            </div>
            <form onSubmit={sendMessage}>
                <Box w="100vw" padding="5" bottom="-5" position="fixed">
                    <HStack>
                        <Textarea
                            value={text}
                            onChange={handleTextAreaChange}
                            placeholder="Type your message here..."
                        />
                        <motion.button
                            type="submit"
                            disabled={!text}
                            style={{ backgroundColor: useColorModeValue("#E2E8F0", "#2D3748"), padding: 10, borderRadius: "5%" }}
                            whileTap={{
                                scale: 0.8,
                                borderRadius: "100%",
                            }}
                            whileHover={{ scale: 1.2 }}
                            whileFocus={{ scale: 1.2 }}
                        >
                            <Text as="b">
                                Send
                            </Text>
                        </motion.button>
                    </HStack>
                </Box>
            </form>
        </Box >
    );
}

export default DirectMessagePage;
