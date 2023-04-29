// module imports
import { ChatIcon, WarningIcon } from '@chakra-ui/icons';
import { Avatar, AvatarBadge, AvatarGroup, Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Heading, HStack, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useColorModeValue, useDisclosure, VStack } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { useCollectionDataOnce } from 'react-firebase-hooks/firestore';
import { useNavigate } from 'react-router-dom';

// relative imports
import { auth, firestore } from '../firebaseConfig';
import Context from '../context/Context';
import ClothingDataTabPanel from '../components/tabPanels/ClothingDataTabPanel';
import FoodDataTabPanel from '../components/tabPanels/FoodDataTabPanel';
import DiaperDataTabPanel from '../components/tabPanels/DiaperDataTabPanel';
import MaternalDataTabPanel from '../components/tabPanels/MaternalDataTabPanel';
import GoogleMapsModal from '../components/modals/GoogleMapsModal';
import FloatingActionButtons from '../components/floatingActionButtons/FloatingActionButtons';
import DisclaimerModal from '../components/modals/DisclaimerModal';
import FriendRequestModal from '../components/modals/FriendRequestModal';
import FormulaDataTabPanel from '../components/tabPanels/FormulaDataTabPanel';
import ToysDataTabPanel from '../components/tabPanels/ToysDataTabPanel';
import MonitorsDataTabPanel from '../components/tabPanels/MonitorsDataTabPanel';
import SeatsTabPanel from '../components/tabPanels/SeatsTabPanel';
import StrollersDataTabPanel from '../components/tabPanels/StrollersDataTabPanel';
import { screenBackground } from '../defaultStyle';
import CustomPopOver from '../components/CustomPopover';

export default function HomePage() {
    // hooks
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { setData: setUser } = useContext(Context);
    const navigate = useNavigate();
    // firebase data
    const currentUser = auth.currentUser;
    const [userDataPendingFriends] = useCollectionDataOnce(firestore.collection('users').doc(currentUser?.uid).collection("pendingFriends"), { idField: 'id' });
    const [userDataConfirmedFriends] = useCollectionDataOnce(firestore.collection('users').doc(currentUser?.uid).collection("confirmedFriends"), { idField: 'id' });
    const [groups] = useCollectionDataOnce(firestore.collection('groups'), { idField: 'id' });

    // useState variables
    const [alertDialogUser, setAlertDialogUser] = useState(null);
    const [alertDialogVisible, setAlertDialogVisible] = useState(false);
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

    // maternial data 
    const [maternialData, setMaternialData] = useState(null);
    const [maternialDataIsLoading, setMaternialDataIsLoading] = useState(true);

    // formula data
    const [formulaData, setFormulaData] = useState(null);
    const [formulaDataIsLoading, setFormulaDataIsLoading] = useState(true);

    // toy data
    const [toyData, setToyData] = useState(null);
    const [toyDataIsLoading, setToyDataIsLoading] = useState(true);

    // monitor data
    const [monitorData, setMonitorData] = useState(null);
    const [monitorDataIsLoading, setMonitorDataIsLoading] = useState(true);

    // seat data
    const [seatData, setSeatData] = useState(null);
    const [seatDataIsLoading, setSeatDataIsLoading] = useState(true);

    // stroller data
    const [strollerData, setStrollerData] = useState(null);
    const [strollerDataIsLoading, setStrollerDataIsLoading] = useState(true);

    const [screeningAlertDialogVisibile, setScreeningAlertDialogVisibile] = useState(false);
    const [settingsIsOpen, setSettingsIsOpen] = useState(false);
    const [searchPlaces, setSearchPlaces] = useState(false);

    const _screenBackground = useColorModeValue(screenBackground.light, screenBackground.dark);
    const [screenHeight, setScreenHeight] = useState(window.innerHeight);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [searchBarIsOpen, setSearchBarIsOpen] = useState(false);

    const handleSearchPlacesDialogOpen = () => {
        setSearchPlaces(true);
    };

    const handleTabsChange = (index) => {
        setTabIndex(index);
    };

    const handleDMPress = (user) => {
        setUser(user.email);
        navigate("/message");
    };

    const handleFriendConfirmation = (user) => {
        setAlertDialogUser(user);
        setAlertDialogVisible(true);
    };

    const handleForumButtonPress = (groupAlias) => {
        if (groupAlias)
            navigate(`/forum_${groupAlias}`);
        else {
            console.log("Could not redirect to the forum page wanted.");
        }
    };

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

    useEffect(() => {
        function handleResize() {
            setScreenHeight(window.innerHeight);
            setScreenWidth(window.innerWidth);
        }

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [screenHeight, screenWidth]);

    return (
        <Box bg={_screenBackground} h={screenHeight} w={screenWidth - "10px"}>
            <Drawer
                isOpen={isOpen}
                placement='left'
                onClose={onClose}
            >
                <DrawerOverlay />
                <DrawerContent bg={_screenBackground}>
                    <DrawerCloseButton />
                    <DrawerHeader>Message Other Parents!</DrawerHeader>
                    <DrawerBody>
                        <Tabs align='start' variant='enclosed' w="100%" h="100%" isFitted>
                            <TabList>
                                <Tab _selected={{ color: 'white', bg: 'blackAlpha.400' }}>
                                    Forums
                                </Tab>
                                <Tab _selected={{ color: 'white', bg: 'blackAlpha.400' }}>
                                    DM
                                </Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel>
                                    <VStack w="100%" alignItems="start" spacing="12">
                                        {groups && groups.map(group => {
                                            return (
                                                <Button variant="unstyled" onClick={() => handleForumButtonPress(group.alias)} key={group.name}>
                                                    <Text>{group.name}</Text>
                                                    <HStack>
                                                        <AvatarGroup size='md' max={3}>
                                                            {group.users && group.users.map(user => {
                                                                return (<Avatar key={user.id} name={user.full_name} />);
                                                            })}
                                                        </AvatarGroup>
                                                    </HStack>
                                                </Button>
                                            );
                                        })}
                                    </VStack>
                                </TabPanel>
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
                <DrawerContent bg={_screenBackground}>
                    <DrawerCloseButton />
                    <DrawerHeader>Stuff for You!</DrawerHeader>
                    <DrawerBody>
                        <VStack alignItems="start" spacing="5">
                            <Button leftIcon={<ChatIcon />} onClick={onOpen}>
                                Chat with Peeps
                            </Button>
                            <CustomPopOver />
                            <Button
                                leftIcon={<WarningIcon />}
                                onClick={() => setScreeningAlertDialogVisibile(true)}
                            >
                                About you
                            </Button>
                        </VStack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
            <Tabs align='start' variant='enclosed' index={tabIndex} onChange={handleTabsChange} bg={_screenBackground}>
                <TabList display="flex" justifyContent="space-between">
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
                searchBarIsOpen={searchBarIsOpen}
                setFoodData={setFoodData}
                setClothingData={setClothingData}
                setDiaperData={setDiaperData}
                setMaternalData={setMaternialData}
                setFormulaData={setFormulaData}
                setToyData={setToyData}
                setMonitorData={setMonitorData}
                setSeatData={setSeatData}
                setStrollerData={setStrollerData}
                tabIndex={tabIndex}
                setTabIndex={setTabIndex}
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
        </Box >
    );
}
