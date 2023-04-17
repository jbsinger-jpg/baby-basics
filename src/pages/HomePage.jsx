import { CalendarIcon, ChatIcon, WarningIcon } from '@chakra-ui/icons';
import { Avatar, AvatarBadge, AvatarGroup, Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, FormLabel, Heading, HStack, Input, InputGroup, InputLeftAddon, InputRightAddon, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, Select, Tab, TabList, TabPanel, TabPanels, Tabs, Text, Textarea, useColorModeValue, useDisclosure, VStack } from '@chakra-ui/react';
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
import { screenBackground } from '../defaultStyle';

export default function HomePage() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { setData: setUser } = useContext(Context);
    const navigate = useNavigate();
    const currentUser = auth.currentUser;
    const [userDataPendingFriends] = useCollectionDataOnce(firestore.collection('users').doc(currentUser?.uid).collection("pendingFriends"), { idField: 'id' });
    const [userDataConfirmedFriends] = useCollectionDataOnce(firestore.collection('users').doc(currentUser?.uid).collection("confirmedFriends"), { idField: 'id' });
    const [groups] = useCollectionDataOnce(firestore.collection('groups'), { idField: 'id' });
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

    const _screenBackground = useColorModeValue(screenBackground.light, screenBackground.dark);
    const [screenHeight, setScreenHeight] = useState(window.innerHeight);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [addedPeople, setAddedPeople] = useState([]);

    const [selectedCalendar, setSelectedCalendar] = useState("default");
    const [selectedFrequency, setSelectedFrequency] = useState("");
    const [emailHost, setEmailHost] = useState("");
    const [emailBody, setEmailBody] = useState("");


    const handleSearchPlacesDialogOpen = () => {
        setSearchPlaces(true);
    };

    const handleTabsChange = (index) => {
        setTabIndex(index);
    };

    const [searchBarIsOpen, setSearchBarIsOpen] = useState(false);

    const handleDMPress = (user) => {
        // TODO: Pass the user to the message page
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

    const formatDateTime = () => {
        const startTime = new Date();
        const endTime = new Date();

        endTime.setDate(endTime.getDate() + 1);
        const dates = startTime.toISOString().replace(/-|:|\.\d+/g, '') + '/' + endTime.toISOString().replace(/-|:|\.\d+/g, '');
        return dates;
    };

    const formatAddPeople = () => {
        let options = [];

        if (addedPeople && addedPeople.length > 0) {
            options = addedPeople.join(",");
        }

        return options;
    };

    const formatFrequency = () => {
        if (selectedFrequency) {
            return `RRULE:FREQ%3D${selectedFrequency}`;
        }

        return "";
    };

    const handleAddGuest = () => {
        const newPerson = `${emailBody}@${emailHost}.com`;

        if (!addedPeople.includes(newPerson))
            setAddedPeople([...addedPeople, newPerson]);
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
                            <Button leftIcon={<ChatIcon />} onClick={onOpen} >
                                Chat with Peeps
                            </Button>
                            <Popover>
                                <PopoverTrigger>
                                    <Button
                                        leftIcon={<CalendarIcon />}
                                    >
                                        Set Google Calendar Event
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <PopoverArrow />
                                    <PopoverCloseButton />
                                    <PopoverHeader >Confirmation!</PopoverHeader>
                                    <PopoverBody>
                                        <FormLabel htmlFor='email'>Guests</FormLabel>
                                        <VStack alignItems="start" spacing="5" paddingBottom="3">
                                            <InputGroup>
                                                <Input id='email' value={emailBody} onChange={(event) => setEmailBody(event.target.value)} />
                                                <InputRightAddon>@</InputRightAddon>
                                                <Input value={emailHost} onChange={(event) => setEmailHost(event.target.value)} />
                                                <InputRightAddon>.com</InputRightAddon>
                                            </InputGroup>
                                            <Button onClick={handleAddGuest}> Add Guest </Button>
                                            <Textarea readOnly placeholder='Guests...' value={addedPeople}></Textarea>
                                        </VStack>
                                        <FormLabel htmlFor='calendar'>Calendar</FormLabel>
                                        <Select onChange={(event) => setSelectedCalendar(event.target.value)} value={selectedCalendar} id="calendar">
                                            <option value="default"> default </option>
                                            <option value="c068f1e23834e64cff97c8c0f0b824bfd77db21e7e184a603a03b65fb9ed18e6@group.calendar.google.com"> baby-basics </option>
                                        </Select>
                                        <FormLabel htmlFor='frequency'>Repeat</FormLabel>
                                        <Select onChange={(event) => setSelectedFrequency(event.target.value)} value={selectedFrequency} id="frequency">
                                            <option value=""> Never </option>
                                            <option value="DAILY"> daily </option>
                                            <option value="WEEKLY"> weekly </option>
                                            <option value="MONTHLY"> monthly </option>
                                            <option value="YEARLY"> yearly </option>
                                        </Select>
                                    </PopoverBody>
                                    <PopoverFooter>
                                        <Button
                                            as="a"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            href={`https://www.google.com/calendar/render?action=TEMPLATE&dates=${formatDateTime()}&recur=${formatFrequency()}&add=${formatAddPeople()}&src=${selectedCalendar}`}
                                        >
                                            Create Event
                                        </Button>
                                    </PopoverFooter>
                                </PopoverContent>
                            </Popover>
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
        </Box>
    );
}
