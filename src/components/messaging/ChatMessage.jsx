import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Avatar, Box, Button, HStack, IconButton, Tag, Text, Tooltip, useToast, VStack } from "@chakra-ui/react";
import { useContext, useState } from "react";
import Context from "../../context/Context";
import { auth, firestore } from "../../firebaseConfig";
import { motion } from "framer-motion";

export default function ChatMessage({ message, fontSize }) {
    const { text, photoURL, voteCount, id, sender, sender_full_name, uid } = message;
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
            const userDoc = await firestore.collection("users").doc(uid);
            const screeningQuestions = await userDoc.collection("screening_questions");
            const data = (await screeningQuestions.doc(uid).get()).data();

            setAlertDialogData(data);
            setAlertDialogVisible(true);
        }
        else {
            toast({
                title: "Can't friend yourself loser, get roasted!",
                position: "top-right",
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
        }
    };

    const handleFriendRequest = async () => {
        setFriendButtonIsLoading(true);
        let recieverDoc = {};
        const usersRef = await firestore.collection("users");
        const senderDoc = usersRef.doc(auth.currentUser.uid);
        const senderUser = await (await senderDoc.get()).data();

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
                    <Tooltip label={sender_full_name}>
                        <Avatar src={photoURL || 'https://i.imgur.com/rFbS5ms.png'} alt="Avatar" />
                    </Tooltip>
                </motion.button>
                <Box
                    whiteSpace="pre-wrap"
                >
                    <Tag
                        borderRadius="md"
                        size="lg"
                        variant="solid"
                        colorScheme="teal"
                    >
                        <Text
                            padding="4"
                            fontSize={fontSize}
                        >
                            {text}
                        </Text>
                    </Tag>
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
                            {alertDialogData?.children_total || alertDialogData?.children_simultaneous || alertDialogData?.marital || alertDialogData?.ethnicity ?
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