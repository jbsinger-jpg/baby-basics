import React, { useState, useRef, useEffect, useContext } from 'react';
import { auth, firestore, serverTimestamp } from '../firebaseConfig';
import { Box, Button, HStack, Heading, IconButton, Input, Text, Textarea, Tooltip, VStack, useColorModeValue } from '@chakra-ui/react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import Context from '../context/Context';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import ChatMessage from '../components/ChatMessage';
import { SearchIcon } from '@chakra-ui/icons';
import { screenBackground } from '../defaultStyle';
import { wordFilter } from '../components/messaging/wordFilter';
import StyledSelect from '../components/StyledSelect';
import { motion } from "framer-motion";

function ForumMessagePage() {
    const [text, setText] = useState();
    const [searchTerm, setSearchTerm] = useState("");
    const [searchButtonLoading, setSearchButtonLoading] = useState(false);
    const [fontSize, setFontSize] = useState("md");

    // Data passed from StarterForumPage to here to get the messages to not have to remake a bunch of pages
    const { data: pageData, setData: setPageData } = useContext(Context);
    const [createdOrderMessages] = useCollectionData(
        firestore
            .collection(pageData ? pageData : localStorage.getItem("pageData"))
            .orderBy("createdAt"),
        { idField: 'id' }
    );
    const [voteOrderMessages] = useCollectionData(
        firestore
            .collection(pageData ? pageData : localStorage.getItem("pageData"))
            .orderBy("voteCount", "desc"),
        { idField: 'id' }
    );
    const [messages, setMessages] = useState(createdOrderMessages);
    const [orderByVoteCount, setOrderByVoteCount] = useState(false);
    const messageBoxRef = useRef();

    // when the order button pressed change the order of the messages and make sure that the messages useState acutally has text
    // rendered from it.
    // =========================================================================================================================
    // =========================================================================================================================
    useEffect(() => {
        if (createdOrderMessages && !orderByVoteCount) {
            setMessages(createdOrderMessages);
        }
    }, [createdOrderMessages, orderByVoteCount]);

    useEffect(() => {
        if (voteOrderMessages && orderByVoteCount) {
            setMessages(voteOrderMessages);
        }
    }, [voteOrderMessages, orderByVoteCount]);
    // =========================================================================================================================
    // =========================================================================================================================

    useEffect(() => {
        messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
    }, [messages]);

    useEffect(() => {
        if (pageData) {
            // when the user goes from the StarterForumPage to the ForumMessagePage
            // set the localstorage token before the context is lost
            localStorage.setItem("pageData", pageData);
        }
        else {
            // on refetch of the page
            setPageData(localStorage.getItem("pageData"));
        }
        // eslint-disable-next-line
    }, [pageData]);

    const handleTextAreaChange = (e) => {
        setText(e.target.value);
    };

    const handleSearch = async () => {
        setSearchButtonLoading(true);
        await firestore.collection(pageData)
            .where("text", ">=", searchTerm)
            .where("text", "<=", searchTerm + "\uf8ff")
            .get()
            .then((querySnapshot) => {
                let options = [];

                querySnapshot.forEach((doc) => {
                    options.push(doc.data());
                });

                setMessages(options);
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                setSearchButtonLoading(false);
            });
    };

    const sendMessage = async (e) => {
        e.preventDefault();
        const { uid, photoURL } = auth.currentUser;

        const userDoc = await firestore.collection("users").doc(auth.currentUser.uid);
        const userData = (await userDoc.get()).data();

        const docRef = await firestore.collection(pageData).add({
            text: wordFilter.clean(text),
            createdAt: serverTimestamp(),
            uid: uid,
            photoURL: photoURL,
            sender: userData.email,
            sender_full_name: userData.full_name,
            voteCount: 0,
        });

        await docRef.update({
            id: docRef.id,
        });

        await docRef.collection("pendingVoteUsers")
            .doc(auth?.currentUser?.uid)
            .set({
                user: auth?.currentUser?.email
            });

        setText('');
    };

    const _screenBackground = useColorModeValue(screenBackground.light, screenBackground.dark);
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

    const handleFontSizeChange = (event) => {
        setFontSize(event.target.value);
    };

    return (
        <Box w="100vw" h="100vh" bg={_screenBackground}>
            <Box w="100vw" justifyContent="space-between" display="flex" padding="3">
                <VStack spacing="4" w={"15vw"} alignItems={"start"}>
                    {orderByVoteCount ?
                        <Button onClick={() => setOrderByVoteCount(!orderByVoteCount)}>
                            Order By Created
                        </Button>
                        :
                        <Button onClick={() => setOrderByVoteCount(!orderByVoteCount)}>
                            Order By Vote
                        </Button>
                    }
                    <Heading size="sm">Font Size</Heading>
                    <StyledSelect
                        value={fontSize}
                        onChange={handleFontSizeChange}
                        options={options}
                    />
                </VStack>
                <HStack>
                    <Input placeholder='Search...' value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} />
                    <Tooltip label="Search">
                        <IconButton icon={<SearchIcon />} onClick={handleSearch} isLoading={searchButtonLoading} />
                    </Tooltip>
                </HStack>
            </Box>
            <div style={{ height: `calc(100vh - 240px)`, overflowY: 'auto' }} ref={messageBoxRef}>
                {(messages) &&
                    messages
                        .map((msg) => {
                            return (<ChatMessage key={msg.id} message={msg} fontSize={fontSize} />);
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
        </Box>
    );
}

export default ForumMessagePage;
