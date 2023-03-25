import { CalendarIcon, ChatIcon, MoonIcon, SearchIcon, SunIcon, UnlockIcon } from '@chakra-ui/icons';
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Avatar, AvatarBadge, AvatarGroup, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Heading, HStack, IconButton, Tab, TabList, TabPanel, TabPanels, Tabs, Text, Tooltip, useColorMode, useColorModeValue, useDisclosure, useToast, VStack } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useNavigate } from 'react-router-dom';

import { auth, firestore } from '../firebaseConfig';
import Context from '../context/Context';
import SearchBarAlertDialog from '../SearchBarAlertDialog';
import ClothingDataTabPanel from '../tabPanels/ClothingDataTabPanel';
import FoodDataTabPanel from '../tabPanels/FoodDataTabPanel';
import DiaperDataTabPanel from '../tabPanels/DiaperDataTabPanel';
import UtilityDataTabPanel from '../tabPanels/UtilityDataTabPanel';

export default function HomePage() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { setData: setUser } = useContext(Context);
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [alertDialogUser, setAlertDialogUser] = useState(null);
    const [alertDialogVisible, setAlertDialogVisible] = useState(false);
    // utility data for search bar
    const [utilityData, isUtilitiesLoading] = useCollectionData(firestore.collection('utilities'), { idField: 'id' });

    const currentUser = auth.currentUser;
    const [groupUsers, setGroupUsers] = useState(null);
    const [tabIndex, setTabIndex] = useState(0);
    // clothing data for search bar
    const [clothingData, setClothingData] = useState(null);
    const [isClothingDataLoading, setIsClothingDataLoading] = useState(true);
    // food data for search bar
    const [foodData, setFoodData] = useState(null);
    const [isFoodDataLoading, setIsFoodDataLoading] = useState(true);
    // diaper data for search bar
    const [diaperData, setDiaperData] = useState(null);
    const [isDiapersLoading, setIsDiapersLoading] = useState(true);

    const toast = useToast();
    const [friendButtonIsLoading, setFriendButtonIsLoading] = useState(false);

    const [screeningAlertDialogVisibile, setScreeningAlertDialogVisibile] = useState(false);

    const handleTabsChange = (index) => {
        setTabIndex(index);
    };

    //-------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------
    // if current user email doesn't exist don't prevent
    // page from rendering
    const currentUserEmail = auth?.currentUser?.email;
    let starterGroupRef = firestore.collection('starter_group');
    if (currentUserEmail) {
        starterGroupRef = starterGroupRef.where("users", "array-contains", currentUserEmail);
    }
    const [starterGroup] = useCollectionData(starterGroupRef, { idField: 'id' });
    //-------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------

    const [searchBarIsOpen, setSearchBarIsOpen] = useState(false);

    const handleLogin = () => {
        navigate("/login");
    };

    const ColorModeToggleButton = () => {
        const { toggleColorMode } = useColorMode();

        return (
            <Tooltip label="Change color mode">
                <IconButton icon={useColorModeValue("Dark", "Light") === "Dark" ? <MoonIcon /> : <SunIcon />} onClick={toggleColorMode}>
                    {useColorModeValue("Dark", "Light")}
                </IconButton>
            </Tooltip>
        );
    };

    const handleDMPress = (user) => {
        // TODO: Pass the user to the message page
        setUser(user.email);
        navigate("/message");
    };

    const handleFriendConfirmation = (user) => {
        setAlertDialogUser(user);
        setAlertDialogVisible(true);
    };

    const handleFriendSubmission = async () => {
        setFriendButtonIsLoading(true);
        const userDoc = await firestore.collection("users").doc(currentUser.uid);

        if (currentUser && userData.confirmedFriends)
            userDoc.update({
                confirmedFriends: [...userData.confirmedFriends, alertDialogUser],
            });
        else
            userDoc.update({
                confirmedFriends: [alertDialogUser],
            });

        await userDoc.get()
            .then(doc => {
                let pendingFriends = doc.data().pendingFriends;
                let confirmedFriends = doc.data().confirmedFriends;
                let pendingArray = [];

                for (let i = 0; i < pendingFriends.length; i++) {
                    for (let j = 0; j < confirmedFriends.length; j++) {
                        if (JSON.stringify(pendingFriends[i]) === JSON.stringify(confirmedFriends[j])) {
                            let pendingIndex = i;

                            if (pendingIndex && pendingIndex > -1) {
                                pendingArray = pendingFriends.slice(0, pendingIndex);
                                pendingArray = pendingArray.concat(pendingFriends.slice(pendingIndex + 1));
                            }
                        }
                    }
                }

                userDoc.update({
                    pendingFriends: pendingArray
                })
                    .then(async () => {
                        toast({
                            title: 'Friend Request Updated!',
                            description: "Just gotta wait for them to friend you back!",
                            status: 'success',
                            duration: 9000,
                            isClosable: true,
                        });

                        // update sending user friends list as well
                        if (alertDialogUser.id) {
                            const sendingUserDoc = await firestore.collection("users").doc(alertDialogUser.id);

                            if (sendingUserDoc.confirmedFriends && userData)
                                sendingUserDoc.update({
                                    confirmedFriends: [...sendingUserDoc.confirmedFriends, userData],
                                });
                            else
                                sendingUserDoc.update({
                                    confirmedFriends: [userData],
                                });
                        }
                    })
                    .catch(error => {
                        toast({
                            title: 'Friend Request Failed!',
                            description: error,
                            status: 'error',
                            duration: 9000,
                            isClosable: true,
                        });
                    });
            })
            .catch(error => {
                toast({
                    title: 'Friend Request Failed!',
                    description: error,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                });
            });

        setUserData((await userDoc.get()).data());
        setAlertDialogVisible(false);
        setFriendButtonIsLoading(false);
    };

    const handleForumButtonPress = () => {
        navigate("/forum");
    };

    useEffect(() => {
        if (starterGroup) {
            let options = [];
            let userOptions = [];

            for (const group of starterGroup) {
                for (let i = 0; i < group.users.length; i++) {
                    options.push(group.users[i]);
                }

            }

            if (options.length > 0)
                firestore.collection('users')
                    .where("email", "in", options)
                    .get()
                    .then(snapshot => {
                        snapshot.docs.forEach(doc => {
                            userOptions.push({ ...doc.data() });
                        });

                        setGroupUsers(userOptions);
                    });

        }
    }, [starterGroup]);

    // initialize the page with the data from the data base
    useEffect(() => {
        let options = [];

        // set the data on the inital page load
        firestore.collection('food').get()
            .then(snapshot => {
                snapshot.docs.forEach(doc => {
                    options.push({ ...doc.data() });
                });

                setFoodData(options);
                setIsFoodDataLoading(false);
                options = [];
            });

        firestore.collection('diapers').get()
            .then(snapshot => {
                snapshot.docs.forEach(doc => {
                    options.push({ ...doc.data() });
                });

                setDiaperData(options);
                setIsDiapersLoading(false);
                options = [];
            });

        firestore.collection('clothing').get()
            .then(snapshot => {
                snapshot.docs.forEach(doc => {
                    options.push({ ...doc.data() });
                });

                setClothingData(options);
                setIsClothingDataLoading(false);
                options = [];
            });
    }, []);

    useEffect(() => {
        if (currentUser)
            firestore.collection("users").doc(currentUser.uid).get()
                .then(doc => {
                    setUserData(doc.data());
                })
                .catch(error => { console.log(error); });
    }, [currentUser]);

    return (
        <>
            <SearchBarAlertDialog
                searchBarIsOpen={searchBarIsOpen}
                setSearchBarIsOpen={setSearchBarIsOpen}
                setFoodData={setFoodData}
                setClothingData={setClothingData}
                setDiaperData={setDiaperData}
                tabIndex={tabIndex}
            />
            <Drawer
                isOpen={isOpen}
                placement='left'
                onClose={onClose}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Message Other Parents!</DrawerHeader>
                    <DrawerBody>
                        <Tabs align='start' variant='enclosed' w="100%" h="100%" isFitted>
                            <TabList>
                                <Tab _selected={{ color: 'white', bg: 'blackAlpha.400' }}>
                                    DM
                                </Tab>
                                <Tab _selected={{ color: 'white', bg: 'blackAlpha.400' }}>
                                    Forums
                                </Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel>
                                    <VStack w="100%" alignItems="start" spacing="5">
                                        <Heading size="small">Pending Friends</Heading>
                                        {userData && userData.pendingFriends && userData.pendingFriends.map(user => {
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
                                        <Heading size="small">Confirmed Friends</Heading>
                                        {userData && userData.confirmedFriends && userData.confirmedFriends.map(user => {
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
                                </TabPanel>
                                <TabPanel>
                                    <VStack w="100%" alignItems="start" spacing="12">
                                        {starterGroup && starterGroup.map(group => {
                                            return (
                                                <Button variant="unstyled" onClick={handleForumButtonPress}>
                                                    <HStack>
                                                        <AvatarGroup size='md' max={3}>
                                                            {groupUsers && groupUsers.map(user => {
                                                                return (<Avatar key={user.id} name={user.full_name} />);
                                                            })}
                                                        </AvatarGroup>
                                                    </HStack>
                                                    <Text>{group.name}</Text>
                                                </Button>
                                            );
                                        })
                                        }
                                    </VStack>
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </DrawerBody>
                    <DrawerFooter>
                        <Button variant='outline' mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button>
                            Message
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
            <Tabs align='start' variant='enclosed' w="90vw" h="100vh" index={tabIndex} onChange={handleTabsChange}>
                <TabList display="flex" justifyContent="space-between" w="99vw">
                    <HStack spacing="-1">
                        <Tab _selected={{ color: 'white', bg: 'blackAlpha.400' }}>
                            Clothes
                        </Tab>
                        <Tab _selected={{ color: 'white', bg: 'blackAlpha.400' }}>
                            Food
                        </Tab>
                        <Tab _selected={{ color: 'white', bg: 'blackAlpha.400' }}>
                            Diapers
                        </Tab>
                        <Tab _selected={{ color: 'white', bg: 'blackAlpha.400' }}>
                            Utilities
                        </Tab>
                    </HStack>
                    <HStack>
                        <Tooltip label="Log in">
                            <IconButton icon={<UnlockIcon />} onClick={handleLogin} />
                        </Tooltip>
                        {currentUser ?
                            <>
                                <Tooltip label="Chat with peeps">
                                    <IconButton icon={<ChatIcon />} onClick={onOpen} />
                                </Tooltip>
                                <Tooltip label="About you">
                                    <IconButton icon={<CalendarIcon />} onClick={() => setScreeningAlertDialogVisibile(true)} />
                                </Tooltip>
                            </>
                            :
                            null
                        }
                        <ColorModeToggleButton />
                        <Tooltip label="Search">
                            <IconButton icon={<SearchIcon />} onClick={() => setSearchBarIsOpen(true)} />
                        </Tooltip>
                    </HStack>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <ClothingDataTabPanel clothingData={clothingData} clothingDataLoaded={isClothingDataLoading} />
                    </TabPanel>
                    <TabPanel>
                        <FoodDataTabPanel foodData={foodData} isFoodDataLoading={isFoodDataLoading} />
                    </TabPanel>
                    <TabPanel>
                        <DiaperDataTabPanel diaperData={diaperData} isDiapersLoading={isDiapersLoading} />
                    </TabPanel>
                    <TabPanel>
                        <UtilityDataTabPanel utilityData={utilityData} isUtilitiesLoading={isUtilitiesLoading} />
                    </TabPanel>
                </TabPanels>
            </Tabs>
            <AlertDialog
                isOpen={alertDialogVisible}
                onClose={() => setAlertDialogVisible(false)}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Friend Confirmation
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            Are you sure you wanna friend this person, dawg?
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button onClick={() => setAlertDialogVisible(false)}>
                                Cancel
                            </Button>
                            <Button isLoading={friendButtonIsLoading} onClick={handleFriendSubmission} ml={3}>
                                Friend
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
            <AlertDialog
                isOpen={screeningAlertDialogVisibile}
                onClose={() => setScreeningAlertDialogVisibile(false)}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Demographic Disclaimer
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            This page asks personal questions that are in no need mandatory to answer
                            this is just to make it easier for others to reach out to you when friending, or
                            seeking opinions by people with certain characteristics.
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button onClick={() => setScreeningAlertDialogVisibile(false)}>
                                Cancel
                            </Button>
                            <Button onClick={() => navigate("/screening")} ml={3}>
                                Continue
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>

    );
}
