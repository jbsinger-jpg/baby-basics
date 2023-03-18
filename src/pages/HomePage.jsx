import { ChatIcon, MoonIcon, SearchIcon, SunIcon, UnlockIcon } from '@chakra-ui/icons';
import { Avatar, AvatarBadge, AvatarGroup, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, HStack, IconButton, Tab, TabList, TabPanel, TabPanels, Tabs, Text, Tooltip, useColorMode, useColorModeValue, useDisclosure, VStack } from '@chakra-ui/react';
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
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const currentUser = auth.currentUser;
    const navigate = useNavigate();
    const [userData] = useCollectionData(firestore.collection('users'), { idField: 'id' });
    const [clothingData] = useCollectionData(firestore.collection('clothing').orderBy('type'), { idField: 'id' });
    const [foodData, isFoodDataLoading] = useCollectionData(firestore.collection('food').orderBy('stage'), { idField: 'id' });
    const [diaperData, isDiapersLoading] = useCollectionData(firestore.collection('diapers').orderBy('size'), { idField: 'id' });
    const [utilityData, isUtilitiesLoading] = useCollectionData(firestore.collection('utilities'), { idField: 'id' });
    const { setData: setUser } = useContext(Context);
    const [groupUsers, setGroupUsers] = useState(null);

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

    return (
        <>
            <SearchBarAlertDialog searchBarIsOpen={searchBarIsOpen} setSearchBarIsOpen={setSearchBarIsOpen} />
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
                                        {userData && userData.map(user => {
                                            return (
                                                <Button variant="unstyled" onClick={() => handleDMPress(user)}>
                                                    <HStack>
                                                        <Avatar name={user.first_name + " " + user.last_name} bg="orange">
                                                            <AvatarBadge boxSize='1.25em' bg='green.500' />
                                                        </Avatar>
                                                        <VStack spacing="-0.5" alignItems="start">
                                                            <Text>{user.first_name + " " + user.last_name}</Text>
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
                                                                return (<Avatar name={user.first_name + " " + user.last_name} />);
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
            <Tabs align='start' variant='enclosed' w="90vw" h="100vh">
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
                        <Button onClick={() => { setIsDataLoaded(!isDataLoaded); }}>trigger skelly</Button>
                        <Tooltip label="Log in">
                            <IconButton icon={<UnlockIcon />} onClick={handleLogin} />
                        </Tooltip>
                        {currentUser ?
                            <>
                                <Tooltip label="Chat with peeps">
                                    <IconButton icon={<ChatIcon />} onClick={onOpen} />
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
                        <ClothingDataTabPanel clothingData={clothingData} clothingDataLoaded={isDataLoaded} />
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
        </>

    );
}
