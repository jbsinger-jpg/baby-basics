import { Avatar, AvatarBadge, AvatarGroup, Badge, Button, HStack, Heading, Spinner, Tab, TabList, TabPanel, TabPanels, Tabs, Text, Tooltip, VStack } from '@chakra-ui/react';
import { auth, firestore } from '../firebaseConfig';
import { useCollectionDataOnce } from 'react-firebase-hooks/firestore';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function ChatPage() {
    const currentUser = auth.currentUser;
    const [userDataPendingFriends] = useCollectionDataOnce(firestore.collection('users').doc(currentUser?.uid).collection("pendingFriends"), { idField: 'id' });
    const [userDataConfirmedFriends] = useCollectionDataOnce(firestore.collection('users').doc(currentUser?.uid).collection("confirmedFriends"), { idField: 'id' });
    const [groups] = useCollectionDataOnce(firestore.collection('groups'), { idField: 'id' });
    const navigate = useNavigate();

    const [, setAlertDialogUser] = useState(null);
    const [, setAlertDialogVisible] = useState(false);

    const handleGroupStatus = (groupUsers) => {
        const userExists = groupUsers.some((user) => user.id === auth?.currentUser?.uid);

        if (userExists) {
            return (
                <Tooltip label="In Group">
                    <Badge colorScheme='green'>
                        <CheckIcon />
                    </Badge>
                </Tooltip>
            );
        }

        return (
            <Tooltip label="Not In Group">
                <Badge colorScheme='red'>
                    <CloseIcon />
                </Badge>
            </Tooltip>
        );
    };

    const handleDMPress = (user) => {
        navigate("/message");
    };

    const handleFriendConfirmation = (user) => {
        setAlertDialogUser(user);
        setAlertDialogVisible(true);
    };

    const handleForumButtonPress = (groupAlias, groupId) => {
        localStorage.setItem("gid", groupId);
        localStorage.setItem("pageData", groupAlias);

        if (groupAlias)
            navigate(`/forum_${groupAlias}`);
    };

    return (
        <Tabs
            align='start'
            variant='enclosed'
            h="85vh"
            isFitted
            orientation='vertical'
        >
            <TabList>
                <Tab _selected={{ color: 'white', bg: 'blackAlpha.400' }}>
                    Forums
                </Tab>
                <Tab _selected={{ color: 'white', bg: 'blackAlpha.400' }}>
                    DM
                </Tab>
            </TabList>
            <TabPanels>
                {!groups || !userDataConfirmedFriends || !userDataPendingFriends ?
                    <TabPanel
                        alignItems="center"
                        w="100%"
                        h="100%"
                        display="flex"
                        justifyContent="center"
                    >
                        <Spinner size="xl" />
                    </TabPanel>
                    :
                    <TabPanel>
                        <VStack
                            h="60vh"
                            alignItems="start"
                            justifyContent="space-between"
                        >
                            <HStack
                                justifyContent="space-between"
                                w="80vw"
                            >
                                {groups && groups.slice(0, 2).map(group => {
                                    return (
                                        <Button variant="unstyled" onClick={() => handleForumButtonPress(group.alias, group.id)} key={group.name}>
                                            <Text>{group.name}</Text>
                                            <HStack justifyContent="space-between" w="250px">
                                                <AvatarGroup size='md' max={3}>
                                                    {group.users && group.users.map(user => {
                                                        return (<Avatar key={user.id} name={user.full_name} />);
                                                    })}
                                                </AvatarGroup>
                                                {handleGroupStatus(group.users)}
                                            </HStack>
                                        </Button>
                                    );
                                })}
                            </HStack>
                            <HStack
                                justifyContent="space-between"
                                w="80vw"
                            >
                                {groups && groups.slice(-2).map(group => {
                                    return (
                                        <Button variant="unstyled" onClick={() => handleForumButtonPress(group.alias, group.id)} key={group.name}>
                                            <Text>{group.name}</Text>
                                            <HStack justifyContent="space-between" w="250px">
                                                <AvatarGroup size='md' max={3}>
                                                    {group.users && group.users.map(user => {
                                                        return (<Avatar key={user.id} name={user.full_name} />);
                                                    })}
                                                </AvatarGroup>
                                                {handleGroupStatus(group.users)}
                                            </HStack>
                                        </Button>
                                    );
                                })}
                            </HStack>
                        </VStack>
                    </TabPanel>
                }
                {!groups || !userDataConfirmedFriends || !userDataPendingFriends ?
                    <TabPanel
                        alignItems="center"
                        w="100%"
                        h="100%"
                        display="flex"
                        justifyContent="center"
                    >
                        <Spinner size="xl" />
                    </TabPanel>
                    :
                    <TabPanel>
                        <HStack
                            h="80vh"
                            alignItems="start"
                            justifyContent="space-evenly"
                        >
                            <VStack>
                                <Heading size="small">Pending Friends</Heading>
                                {userDataPendingFriends && userDataPendingFriends.map(user => {
                                    return (
                                        <Button variant="unstyled" onClick={() => handleFriendConfirmation(user)} key={user.id}>
                                            <HStack>
                                                <Avatar name={user.full_name} bg="orange">
                                                    <AvatarBadge boxSize='1.25em' bg='green.500' />
                                                </Avatar>
                                                <VStack spacing="-0.5" alignItems="start">
                                                    <Text>{user.full_name}</Text>
                                                    <Text>Online</Text>
                                                </VStack>
                                            </HStack>
                                        </Button>

                                    );
                                })}
                            </VStack>
                            <VStack>
                                <Heading size="small">Confirmed Friends</Heading>
                                {userDataConfirmedFriends && userDataConfirmedFriends.map(user => {
                                    return (
                                        <Button variant="unstyled" onClick={() => handleDMPress(user)} key={user.id}>
                                            <HStack>
                                                <Avatar name={user.full_name} bg="orange">
                                                    <AvatarBadge boxSize='1.25em' bg='green.500' />
                                                </Avatar>
                                                <VStack spacing="-0.5" alignItems="start">
                                                    <Text>{user.full_name}</Text>
                                                    <Text>Online</Text>
                                                </VStack>
                                            </HStack>
                                        </Button>
                                    );
                                })}
                            </VStack>
                        </HStack>
                    </TabPanel>
                }
            </TabPanels>
        </Tabs>
    );
}
