import React, { useState, useRef, useEffect, useContext } from 'react';
import { auth, firestore, serverTimestamp } from '../firebaseConfig';
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Avatar, Box, Button, HStack, IconButton, Text, Textarea, useToast, VStack } from '@chakra-ui/react';
import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import Context from '../context/Context';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { motion } from "framer-motion";

function ForumMessagePage() {
    const [text, setText] = useState();

    // Data passed from StarterForumPage to here to get the messages to not have to remake a bunch of pages
    const { data: pageData } = useContext(Context);
    const [createdOrderMessages] = useCollectionData(
        firestore
            .collection(pageData)
            .orderBy("createdAt"),
        { idField: 'id' }
    );
    const [voteOrderMessages] = useCollectionData(
        firestore
            .collection(pageData)
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
            <Box w="100vw" justifyContent="flex-end" display="flex" padding="5">
                {orderByVoteCount ?
                    <Button onClick={() => setOrderByVoteCount(!orderByVoteCount)}>
                        Order By Created
                    </Button>
                    :
                    <Button onClick={() => setOrderByVoteCount(!orderByVoteCount)}>
                        Order By Vote
                    </Button>
                }
            </Box>
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

    const { text, photoURL, voteCount, id, sender } = message;
    const toast = useToast();
    const { data: pageData } = useContext(Context);
    const [messageVoteCount, setMessageVoteCount] = useState(voteCount);
    const [upVoteButtonIsLoading, setUpVoteButtonIsLoading] = useState(false);
    const [downVoteButtonIsLoading, setDownVoteButtonIsLoading] = useState(false);
    const [alertDialogVisible, setAlertDialogVisible] = useState(false);
    const [alertDialogData, setAlertDialogData] = useState({});
    const [friendButtonIsLoading, setFriendButtonIsLoading] = useState(false);

    const handleUpVote = async () => {
        setUpVoteButtonIsLoading(true);
        const messageRef = await firestore.collection(pageData).doc(id);
        const upVotedUsersRef = await messageRef.collection("upVotedUsers");
        const downVotedUsersRef = await messageRef.collection("downVotedUsers");
        const pendingVoteUsersRef = await messageRef.collection("pendingVoteUsers");

        const upVotedUsersExists = (await upVotedUsersRef.doc(auth.currentUser.uid).get()).exists;
        const downVotedUsersExists = (await downVotedUsersRef.doc(auth.currentUser.uid).get()).exists;
        const pendingVoteUsersExists = (await pendingVoteUsersRef.doc(auth.currentUser.uid).get()).exists;

        const messageDoc = await messageRef.get().then(doc => {
            return doc.data();
        });

        // check and see if the current user is in the upvoted users array if so do nothing, return
        if (upVotedUsersExists) {
            setUpVoteButtonIsLoading(false);
            return;
        }

        // check if the user is in the opposing array put in pending
        if (downVotedUsersExists) {
            await pendingVoteUsersRef.doc(auth.currentUser.uid).set({ user: auth.currentUser.email });
            await downVotedUsersRef.doc(auth.currentUser.uid).delete();
            await messageRef.update({
                voteCount: messageDoc.voteCount + 1
            });

            // update frontend, if a match is found then we want to decrement the vote still
            setMessageVoteCount(messageDoc.voteCount + 1);
            setUpVoteButtonIsLoading(false);
            return;
        }

        if (pendingVoteUsersExists) {
            await pendingVoteUsersRef.doc(auth.currentUser.uid).delete();
            await upVotedUsersRef.doc(auth.currentUser.uid).set({ user: auth.currentUser.email });
            await messageRef.update({
                voteCount: messageDoc.voteCount + 1
            });

            // update frontend, if a match is found then we want to decrement the vote still
            setMessageVoteCount(messageDoc.voteCount + 1);
            setUpVoteButtonIsLoading(false);
            return;
        }

        // if the user just pressed on the downvote button then place them in the subcollection
        if (!upVotedUsersExists) {
            await upVotedUsersRef.doc(auth.currentUser.uid).set({ user: auth.currentUser.email });
            await messageRef.update({
                voteCount: messageDoc.voteCount + 1
            });

            // update frontend, if a match is found then we want to decrement the vote still
            setMessageVoteCount(messageDoc.voteCount + 1);
            setUpVoteButtonIsLoading(false);
            return;
        }
    };

    const handleDownVote = async () => {
        setDownVoteButtonIsLoading(true);
        const messageRef = await firestore.collection(pageData).doc(id);
        const upVotedUsersRef = await messageRef.collection("upVotedUsers");
        const downVotedUsersRef = await messageRef.collection("downVotedUsers");
        const pendingVoteUsersRef = await messageRef.collection("pendingVoteUsers");

        const upVotedUsersExists = (await upVotedUsersRef.doc(auth.currentUser.uid).get()).exists;
        const downVotedUsersExists = (await downVotedUsersRef.doc(auth.currentUser.uid).get()).exists;
        const pendingVoteUsersExists = (await pendingVoteUsersRef.doc(auth.currentUser.uid).get()).exists;

        const messageDoc = await messageRef.get().then(doc => {
            return doc.data();
        });
        // check and see if the current user is in the downvoted users array if so do nothing, return
        if (downVotedUsersExists) {
            setDownVoteButtonIsLoading(false);
            return;
        }

        // check if the user is in the opposing array put in pending
        if (upVotedUsersExists) {
            await pendingVoteUsersRef.doc(auth.currentUser.uid).set({ user: auth.currentUser.email });
            await upVotedUsersRef.doc(auth.currentUser.uid).delete();
            await messageRef.update({
                voteCount: messageDoc.voteCount - 1
            });

            // update frontend, if a match is found then we want to decrement the vote still
            setMessageVoteCount(messageDoc.voteCount - 1);
            setDownVoteButtonIsLoading(false);
            return;
        }

        // check if the user is in the pending array if not then place in downvote array
        if (pendingVoteUsersExists) {
            await pendingVoteUsersRef.doc(auth.currentUser.uid).delete();
            await downVotedUsersRef.doc(auth.currentUser.uid).set({ user: auth.currentUser.email });
            await messageRef.update({
                voteCount: messageDoc.voteCount - 1
            });

            // update frontend, if a match is found then we want to decrement the vote still
            setMessageVoteCount(messageDoc.voteCount - 1);
            setDownVoteButtonIsLoading(false);
            return;
        }

        // if the user just pressed on the downvote button then place them in the subcollection
        if (!downVotedUsersExists) {
            await downVotedUsersRef.doc(auth.currentUser.uid).set({ user: auth.currentUser.email });
            await messageRef.update({
                voteCount: messageDoc.voteCount - 1
            });

            // update frontend, if a match is found then we want to decrement the vote still
            setMessageVoteCount(messageDoc.voteCount - 1);
            setDownVoteButtonIsLoading(false);
            return;
        }
    };

    const handleShowUserInfo = async () => {
        if (sender !== auth.currentUser.email) {
            const userRef = await firestore.collection("users");
            const userQuery = userRef.where("email", "==", sender);
            userQuery.get()
                .then(snapshot => {
                    snapshot.docs.forEach(doc => {
                        console.log("doc data: ", doc.data());
                        setAlertDialogData({ ...doc.data() });
                    });

                    setAlertDialogVisible(true);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    };

    const handleFriendRequest = async () => {
        setFriendButtonIsLoading(true);
        let recieverDoc = {};
        const usersRef = await firestore.collection("users");
        const senderDoc = usersRef.doc(auth.currentUser.uid);
        const senderUser = await (await senderDoc.get()).data();
        console.log("Sender information: ", senderUser);

        // search for the user that is the sender of the message.
        // email should always be a unique entry no need to get more than one entry from this array
        const recieverQuery = await usersRef.where("email", "==", sender);
        await recieverQuery.get()
            .then(snapshot => {
                snapshot.docs.forEach(doc => {
                    recieverDoc = { ...doc.data() };
                });
            })
            .catch(error => { console.log(error); });
        console.log("reciever doc: ", recieverDoc);

        // update the pending friend requests with the sender of the friend request.
        const pendingFriendRef = usersRef.doc(recieverDoc.id).collection("pendingFriends");
        await pendingFriendRef.doc(senderUser.id).set({
            ...senderUser
        })
            .then(() => {
                toast({
                    title: 'Friend Request Sent!',
                    description: "Just gotta wait for them to friend you back!",
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                });
            })
            .catch(error => {
                toast({
                    title: 'Friend Request Failed!',
                    description: JSON.stringify(error),
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                });
            })
            .finally(() => {
                setFriendButtonIsLoading(false);
            });
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
                    />
                    <Text>{messageVoteCount}</Text>
                    <IconButton
                        size="xs"
                        icon={<ArrowDownIcon />}
                        variant='outline'
                        colorScheme='teal'
                        onClick={handleDownVote}
                        isLoading={downVoteButtonIsLoading}
                    />
                </VStack>
                <motion.button
                    onClick={handleShowUserInfo}
                    whileTap={{
                        scale: 0.8,
                        borderRadius: "100%",
                    }}
                    // When the user uses their mouse
                    whileHover={{ scale: 1.2 }}
                    // When the user tabs
                    whileFocus={{ scale: 1.2 }}
                >
                    <Avatar src={photoURL || 'https://i.imgur.com/rFbS5ms.png'} alt="Avatar" />
                </motion.button>
                <Box whiteSpace="pre-wrap">
                    {text}
                </Box>
            </HStack>
            <AlertDialog
                isOpen={alertDialogVisible}
                onClose={() => setAlertDialogVisible(false)}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            User Demographic
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            {alertDialogData.children_total || alertDialogData.children_simultaneous || alertDialogData.marital || alertDialogData.ethnicity ?
                                <>
                                    {alertDialogData?.full_name &&
                                        <Text>
                                            {"Name " + alertDialogData?.full_name}
                                        </Text>
                                    }
                                    {alertDialogData?.children_total &&
                                        <Text>
                                            {"Children total " + alertDialogData?.children_total}
                                        </Text>
                                    }
                                    {alertDialogData?.children_simultaneous &&
                                        <Text>
                                            {"Children simultaneous " + alertDialogData?.children_simultaneous}
                                        </Text>
                                    }
                                    {alertDialogData?.marital &&
                                        <Text>
                                            {"Marital Status " + alertDialogData?.marital}
                                        </Text>
                                    }
                                    {alertDialogData?.ethnicity &&
                                        <Text>
                                            {"Ethinicity " + alertDialogData?.ethnicity}
                                        </Text>
                                    }
                                </>
                                :
                                <>
                                    {alertDialogData?.full_name &&
                                        <Text>
                                            {"Name " + alertDialogData?.full_name}
                                        </Text>
                                    }
                                    <Text>
                                        None
                                    </Text>
                                </>

                            }
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button onClick={() => setAlertDialogVisible(false)}>
                                Cancel
                            </Button>
                            <Button isLoading={friendButtonIsLoading} onClick={handleFriendRequest} ml={3}>
                                Friend
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </div >
    );
}

export default ForumMessagePage;
