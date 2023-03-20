import React, { useState, useRef, useEffect, useContext } from 'react';
import { auth, firestore, serverTimestamp } from '../firebaseConfig';
import { Avatar, Box, Button, HStack, IconButton, Text, Textarea, VStack } from '@chakra-ui/react';
import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import Context from '../context/Context';

function ForumMessagePage() {
    const [text, setText] = useState();
    // Data passed from StarterForumPage to here to get the messages to not have to remake a bunch of pages
    const { data: pageData } = useContext(Context);
    const [messages] = useCollectionData(
        firestore
            .collection(pageData)
            .orderBy("createdAt"),
        { idField: 'id' }
    );
    const messageBoxRef = useRef();

    useEffect(() => {
        messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
    }, [messages]);

    const handleTextAreaChange = (e) => {
        setText(e.target.value);
    };

    const sendMessage = async (e) => {
        e.preventDefault();
        const { uid, photoURL } = auth.currentUser;

        const docRef = await firestore.collection(pageData).add({
            text: text,
            createdAt: serverTimestamp(),
            uid: uid,
            photoURL: photoURL,
            sender: auth?.currentUser?.email,
            voteCount: 0,
        });

        await docRef.update({
            id: docRef.id
        });

        setText('');
    };

    return (
        <Box w="100vw" h="100vh">
            <div style={{ height: 'calc(100vh - 100px)', overflowY: 'auto' }} ref={messageBoxRef}>
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

function ChatMessage({ message }) {
    // TODO: Create an upvote system for the chat messages
    // Going to need to keep track of the following:
    // -- who previously upvoted
    // -- the entire message list
    // -- the currently selected message?? 

    const { text, uid, photoURL, voteCount, id, votedUsers } = message;
    // const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
    const { data: pageData } = useContext(Context);
    // const messageRef = await firestore.collection(pageData).doc(id);
    const [messageVoteCount, setMessageVoteCount] = useState(voteCount);
    const [upVoteButtonIsLoading, setUpVoteButtonIsLoading] = useState(false);


    const handleUpVote = async () => {
        setUpVoteButtonIsLoading(true);
        const messageRef = await firestore.collection(pageData).doc(id);
        const messageDoc = await messageRef.get().then(doc => {
            return doc.data();
        });
        console.log(messageDoc);
        if (messageDoc?.votedUsers && messageDoc?.votedUsers?.length > 0) {
            // check and see if the current user is in the votedUsers array
            for (let i = 0; i < messageDoc.votedUsers.length; i++) {
                if (auth.currentUser.email.toString() === messageDoc.votedUsers[i].toString()) {
                    console.log("match");
                    setUpVoteButtonIsLoading(false);
                    return;
                }
            }
        }
        else {
            if (votedUsers)
                await messageRef.update({
                    votedUsers: [...votedUsers, auth.currentUser.email],
                    voteCount: voteCount + 1
                });
            else
                await messageRef.update({
                    votedUsers: [auth.currentUser.email],
                    voteCount: voteCount + 1
                });
            setMessageVoteCount(messageVoteCount + 1);
        }

        setUpVoteButtonIsLoading(false);
    };

    return (
        // <div style={{ display: "flex", justifyContent: messageClass === 'sent' ? "flex-start" : 'flex-end', padding: "10px" }}>
        <div style={{ display: "flex", justifyContent: 'flex-start', padding: "10px" }}>
            <HStack alignItems="center" gap="10px">
                <VStack>
                    <IconButton
                        size="xs"
                        icon={<ArrowUpIcon />}
                        variant='outline'
                        colorScheme='teal'
                        onClick={handleUpVote}
                        isLoading={upVoteButtonIsLoading}
                    // onClick={async () => { await messageRef.update({ voteCount: voteCount + 1 }); }}
                    />
                    <Text>{messageVoteCount}</Text>
                    <IconButton
                        size="xs"
                        icon={<ArrowDownIcon />}
                        variant='outline'
                        colorScheme='teal'
                        onClick={() => setMessageVoteCount(messageVoteCount - 1)}
                    // onClick={async () => { await messageRef.update({ voteCount: voteCount - 1 }); }}
                    />
                </VStack>
                <Avatar src={photoURL || 'https://i.imgur.com/rFbS5ms.png'} alt="Avatar" />
                <Box whiteSpace="pre-wrap">
                    {text}
                </Box>
            </HStack>
        </div>
    );
}

export default ForumMessagePage;
