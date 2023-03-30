import { CalendarIcon, ChatIcon, MoonIcon, SearchIcon, SunIcon, UnlockIcon, WarningIcon } from '@chakra-ui/icons';
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Avatar, AvatarBadge, AvatarGroup, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Heading, HStack, IconButton, Tab, TabList, TabPanel, TabPanels, Tabs, Text, Tooltip, useColorMode, useColorModeValue, useDisclosure, VStack } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useNavigate } from 'react-router-dom';

import { auth, firestore } from '../firebaseConfig';
import Context from '../context/Context';
import SearchBarAlertDialog from '../components/SearchBarAlertDialog';
import ClothingDataTabPanel from '../components/tabPanels/ClothingDataTabPanel';
import FoodDataTabPanel from '../components/tabPanels/FoodDataTabPanel';
import UtilityDataTabPanel from '../components/tabPanels/UtilityDataTabPanel';
import DiaperDataTabPanel from '../components/tabPanels/DiaperDataTabPanel';

export default function HomePage() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { setData: setUser } = useContext(Context);
    const navigate = useNavigate();
    const currentUser = auth.currentUser;
    const [userDataPendingFriends] = useCollectionData(firestore.collection('users').doc(currentUser?.uid).collection("pendingFriends"), { idField: 'id' });
    const [userDataConfirmedFriends] = useCollectionData(firestore.collection('users').doc(currentUser?.uid).collection("confirmedFriends"), { idField: 'id' });
    const [alertDialogUser, setAlertDialogUser] = useState(null);
    const [alertDialogVisible, setAlertDialogVisible] = useState(false);
    // utility data for search bar
    const [utilityData, isUtilitiesLoading] = useCollectionData(firestore.collection('utilities'), { idField: 'id' });

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
        const usersRef = await firestore.collection("users");
        const userDoc = await usersRef.doc(currentUser.uid);
        const userDocConfirmedFriends = await userDoc.collection("confirmedFriends");
        const userDocPendingFriends = await userDoc.collection("pendingFriends");

        if (alertDialogUser.id) {
            await userDocConfirmedFriends.doc(alertDialogUser.id).set({
                ...alertDialogUser
            });

            await userDocPendingFriends.doc(alertDialogUser.id).delete();

            // update sending user friends list as well
            const sendingUserDoc = await firestore.collection("users").doc(alertDialogUser.id);
            const sendingUserDocConfirmedFriends = await sendingUserDoc.collection("confirmedFriends");
            const sendingUserDocPendingFriends = await sendingUserDoc.collection("pendingFriends");

            await sendingUserDocConfirmedFriends.doc(currentUser?.uid)
                .set({
                    ...(await userDoc.get()).data()
                });

            await sendingUserDocPendingFriends.doc(currentUser.uid).delete();
        }

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

    return (
        <>
            <SearchBarAlertDialog
                searchBarIsOpen={searchBarIsOpen}
                setSearchBarIsOpen={setSearchBarIsOpen}
                setFoodData={setFoodData}
                setClothingData={setClothingData}
                setDiaperData={setDiaperData}
                tabIndex={tabIndex}
                setTabIndex={setTabIndex}
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
                                </TabPanel>
                                <TabPanel>
                                    <VStack w="100%" alignItems="start" spacing="12">
                                        {starterGroup && starterGroup.map(group => {
                                            return (
                                                <Button variant="unstyled" onClick={handleForumButtonPress} key={group.name}>
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
                        <Tooltip label="Search">
                            <IconButton icon={<SearchIcon />} onClick={() => setSearchBarIsOpen(true)} />
                        </Tooltip>
                        {currentUser ?
                            <>
                                <Tooltip label="Chat with peeps">
                                    <IconButton icon={<ChatIcon />} onClick={onOpen} />
                                </Tooltip>
                                <Tooltip label="Schedule Google Calendar Event">
                                    <IconButton
                                        as="a"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href={`https://calendar.google.com/calendar/r?authuser=${auth.currentUser.email}&pli=1`}
                                        icon={<CalendarIcon />}
                                    />
                                </Tooltip>
                                <Tooltip label="About you">
                                    <IconButton
                                        icon={<WarningIcon />}
                                        onClick={() => setScreeningAlertDialogVisibile(true)}
                                    />
                                </Tooltip>
                            </>
                            :
                            null
                        }
                        <Tooltip label="Log in">
                            <IconButton icon={<UnlockIcon />} onClick={handleLogin} />
                        </Tooltip>
                        <ColorModeToggleButton />
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
                        <DiaperDataTabPanel diaperData={diaperData} isDiapersLoading={isDiapersLoading} tabIndex={tabIndex} />
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
