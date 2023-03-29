import React, { useState, useRef, useEffect, useContext } from 'react';
import { auth, firestore, serverTimestamp } from '../firebaseConfig';
import { Box, Button, HStack, IconButton, Input, Textarea, Tooltip } from '@chakra-ui/react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import Context from '../context/Context';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import ChatMessage from '../components/ChatMessage';
import { SearchIcon } from '@chakra-ui/icons';

function ForumMessagePage() {
    const [text, setText] = useState();
    const [searchTerm, setSearchTerm] = useState("");
    const [searchButtonLoading, setSearchButtonLoading] = useState(false);

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
            text: text,
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

    return (
        <Box w="100vw" h="100vh">
            <Box w="100vw" justifyContent="space-between" display="flex" padding="3">
                {orderByVoteCount ?
                    <Button onClick={() => setOrderByVoteCount(!orderByVoteCount)}>
                        Order By Created
                    </Button>
                    :
                    <Button onClick={() => setOrderByVoteCount(!orderByVoteCount)}>
                        Order By Vote
                    </Button>
                }
                <HStack>
                    <Input placeholder='Search...' value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} />
                    <Tooltip label="Search">
                        <IconButton icon={<SearchIcon />} onClick={handleSearch} isLoading={searchButtonLoading} />
                    </Tooltip>
                </HStack>

            </Box>
            <div style={{ height: 'calc(100vh - 175px)', overflowY: 'auto' }} ref={messageBoxRef}>
                {(messages) &&
                    messages
                        .map((msg) => {
                            return (<ChatMessage key={msg.id} message={msg} />);
                        })
                }
            </div>
            <form onSubmit={sendMessage}>
                <Box w="100vw" padding="5" bottom="0" position="fixed">
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

export default ForumMessagePage;
