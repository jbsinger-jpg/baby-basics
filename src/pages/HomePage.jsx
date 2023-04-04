import { CalendarIcon, ChatIcon, TimeIcon, WarningIcon } from '@chakra-ui/icons';
import { Avatar, AvatarBadge, AvatarGroup, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Heading, HStack, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useDisclosure, VStack } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { useCollectionDataOnce } from 'react-firebase-hooks/firestore';
import { useNavigate } from 'react-router-dom';

import { auth, firestore } from '../firebaseConfig';
import Context from '../context/Context';
import SearchBarModal from '../components/modals/SearchBarModal';
import ClothingDataTabPanel from '../components/tabPanels/ClothingDataTabPanel';
import FoodDataTabPanel from '../components/tabPanels/FoodDataTabPanel';
import DiaperDataTabPanel from '../components/tabPanels/DiaperDataTabPanel';
import MaternalDataTabPanel from '../components/tabPanels/MaternalDataTabPanel';
import GoogleMapsModal from '../components/modals/GoogleMapsModal';
import FloatingActionButtons from '../components/FloatingActionButtons';
import DisclaimerModal from '../components/modals/DisclaimerModal';
import FriendRequestModal from '../components/modals/FriendRequestModal';
import FormulaDataTabPanel from '../components/tabPanels/FormulaDataTabPanel';
import ToysDataTabPanel from '../components/tabPanels/ToysDataTabPanel';
import MonitorsDataTabPanel from '../components/tabPanels/MonitorsDataTabPanel';
import SeatsTabPanel from '../components/tabPanels/SeatsTabPanel';
import StrollersDataTabPanel from '../components/tabPanels/StrollersDataTabPanel';

export default function HomePage() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { setData: setUser } = useContext(Context);
    const navigate = useNavigate();
    const currentUser = auth.currentUser;
    const [userDataPendingFriends] = useCollectionDataOnce(firestore.collection('users').doc(currentUser?.uid).collection("pendingFriends"), { idField: 'id' });
    const [userDataConfirmedFriends] = useCollectionDataOnce(firestore.collection('users').doc(currentUser?.uid).collection("confirmedFriends"), { idField: 'id' });
    const [alertDialogUser, setAlertDialogUser] = useState(null);
    const [alertDialogVisible, setAlertDialogVisible] = useState(false);

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

    const [maternialData, setMaternialData] = useState(null);
    const [maternialDataIsLoading, setMaternialDataIsLoading] = useState(true);

    const [formulaData, setFormulaData] = useState(null);
    const [formulaDataIsLoading, setFormulaDataIsLoading] = useState(true);

    const [toyData, setToyData] = useState(null);
    const [toyDataIsLoading, setToyDataIsLoading] = useState(true);

    const [monitorData, setMonitorData] = useState(null);
    const [monitorDataIsLoading, setMonitorDataIsLoading] = useState(true);

    const [seatData, setSeatData] = useState(null);
    const [seatDataIsLoading, setSeatDataIsLoading] = useState(true);

    const [strollerData, setStrollerData] = useState(null);
    const [strollerDataIsLoading, setStrollerDataIsLoading] = useState(true);

    const [screeningAlertDialogVisibile, setScreeningAlertDialogVisibile] = useState(false);
    const [settingsIsOpen, setSettingsIsOpen] = useState(false);

    const [searchPlaces, setSearchPlaces] = useState(false);

    const handleSearchPlacesDialogOpen = () => {
        setSearchPlaces(true);
    };

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
    const [starterGroup] = useCollectionDataOnce(starterGroupRef, { idField: 'id' });
    //-------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------

    const [searchBarIsOpen, setSearchBarIsOpen] = useState(false);

    const handleMaternalResources = () => {
        navigate("/maternal");
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

        firestore.collection('maternal_clothes').get()
            .then(snapshot => {
                snapshot.docs.forEach(doc => {
                    options.push({ ...doc.data() });
                });

                setMaternialData(options);
                setMaternialDataIsLoading(false);
                options = [];
            });

        firestore.collection('formula').get()
            .then(snapshot => {
                snapshot.docs.forEach(doc => {
                    options.push({ ...doc.data() });
                });

                setFormulaData(options);
                setFormulaDataIsLoading(false);
                options = [];
            });

        firestore.collection('toys').get()
            .then(snapshot => {
                snapshot.docs.forEach(doc => {
                    options.push({ ...doc.data() });
                });

                setToyData(options);
                setToyDataIsLoading(false);
                options = [];
            });

        firestore.collection('monitors').get()
            .then(snapshot => {
                snapshot.docs.forEach(doc => {
                    options.push({ ...doc.data() });
                });

                setMonitorData(options);
                setMonitorDataIsLoading(false);
                options = [];
            });

        firestore.collection('car_seats').get()
            .then(snapshot => {
                snapshot.docs.forEach(doc => {
                    options.push({ ...doc.data() });
                });

                setSeatData(options);
                setSeatDataIsLoading(false);
                options = [];
            });

        firestore.collection('strollers').get()
            .then(snapshot => {
                snapshot.docs.forEach(doc => {
                    options.push({ ...doc.data() });
                });

                setStrollerData(options);
                setStrollerDataIsLoading(false);
                options = [];
            });
    }, []);

    return (
        <>
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
            <Drawer
                isOpen={settingsIsOpen}
                placement='right'
                onClose={() => setSettingsIsOpen(false)}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>User Stuff</DrawerHeader>
                    <DrawerBody>
                        <Button leftIcon={<ChatIcon />} onClick={onOpen} >
                            Chat with Peeps
                        </Button>
                        <Button
                            onClick={handleMaternalResources}
                        >
                            Maternal Resources
                        </Button>
                        <Button
                            as="a"
                            target="_blank"
                            rel="noopener noreferrer"
                            href={`https://calendar.google.com/calendar/r?authuser=${auth?.currentUser?.email}&pli=1`}
                            leftIcon={<CalendarIcon />}
                        >
                            Set Google Calendar Event
                        </Button>
                        <Button
                            leftIcon={<WarningIcon />}
                            onClick={() => setScreeningAlertDialogVisibile(true)}
                        >
                            About you
                        </Button>
                    </DrawerBody>
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
                            Baby Hygiene
                        </Tab>
                        <Tab _selected={{ color: 'white', bg: 'blackAlpha.400' }}>
                            Maternal
                        </Tab>
                        <Tab _selected={{ color: 'white', bg: 'blackAlpha.400' }}>
                            Formula
                        </Tab>
                        <Tab _selected={{ color: 'white', bg: 'blackAlpha.400' }}>
                            Toys
                        </Tab>
                        <Tab _selected={{ color: 'white', bg: 'blackAlpha.400' }}>
                            Monitors
                        </Tab>
                        <Tab _selected={{ color: 'white', bg: 'blackAlpha.400' }}>
                            Seats
                        </Tab>
                        <Tab _selected={{ color: 'white', bg: 'blackAlpha.400' }}>
                            Strollers
                        </Tab>
                    </HStack>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <ClothingDataTabPanel
                            clothingData={clothingData}
                            clothingDataLoaded={isClothingDataLoading}
                            tabIndex={tabIndex}
                        />
                    </TabPanel>
                    <TabPanel>
                        <FoodDataTabPanel
                            foodData={foodData}
                            isFoodDataLoading={isFoodDataLoading}
                            tabIndex={tabIndex}
                        />
                    </TabPanel>
                    <TabPanel>
                        <DiaperDataTabPanel
                            diaperData={diaperData}
                            isDiapersLoading={isDiapersLoading}
                            tabIndex={tabIndex}
                        />
                    </TabPanel>
                    <TabPanel>
                        Baby Hygiene
                    </TabPanel>
                    <TabPanel>
                        <MaternalDataTabPanel
                            maternialData={maternialData}
                            maternialDataLoading={maternialDataIsLoading}
                            tabIndex={tabIndex}
                        />
                    </TabPanel>
                    <TabPanel>
                        <FormulaDataTabPanel
                            formulaData={formulaData}
                            formulaDataIsLoading={formulaDataIsLoading}
                            tabIndex={tabIndex}
                        />
                    </TabPanel>
                    <TabPanel>
                        <ToysDataTabPanel
                            toyData={toyData}
                            toyDataIsLoading={toyDataIsLoading}
                            tabIndex={tabIndex}
                        />
                    </TabPanel>
                    <TabPanel>
                        <MonitorsDataTabPanel
                            monitorData={monitorData}
                            monitorDataIsLoading={monitorDataIsLoading}
                            tabIndex={tabIndex}
                        />
                    </TabPanel>
                    <TabPanel>
                        <SeatsTabPanel
                            seatData={seatData}
                            seatDataIsLoading={seatDataIsLoading}
                            tabIndex={tabIndex}
                        />
                    </TabPanel>
                    <TabPanel>
                        <StrollersDataTabPanel
                            strollerData={strollerData}
                            strollerDataIsLoading={strollerDataIsLoading}
                            tabIndex={tabIndex}
                        />
                    </TabPanel>
                </TabPanels>
            </Tabs>
            <FloatingActionButtons
                handleSearchPlacesDialogOpen={handleSearchPlacesDialogOpen}
                setSettingsIsOpen={setSettingsIsOpen}
                currentUser={currentUser}
                setSearchBarIsOpen={setSearchBarIsOpen}
            />
            <GoogleMapsModal
                searchPlaces={searchPlaces}
                setSearchPlaces={setSearchPlaces}
            />
            <DisclaimerModal
                screeningAlertDialogVisibile={screeningAlertDialogVisibile}
                setScreeningAlertDialogVisibile={setScreeningAlertDialogVisibile}
            />
            <FriendRequestModal
                alertDialogVisible={alertDialogVisible}
                setAlertDialogVisible={setAlertDialogVisible}
                alertDialogUser={alertDialogUser}
                currentUser={currentUser}
            />
            <SearchBarModal
                searchBarIsOpen={searchBarIsOpen}
                setSearchBarIsOpen={setSearchBarIsOpen}
                setFoodData={setFoodData}
                setClothingData={setClothingData}
                setDiaperData={setDiaperData}
                tabIndex={tabIndex}
                setTabIndex={setTabIndex}
            />
        </>
    );
}
