import { Box, Button, Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, FormControl, FormLabel, HStack, IconButton, Input, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverTrigger, Tab, TabList, TabPanel, TabPanels, Tabs, VStack, useColorModeValue, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { cardBackground, screenBackground } from '../defaultStyle';
import BabyProgressModal from '../components/modals/BabyProgressModal';
import StyledSelect from '../components/StyledSelect';
import BabyFeedTrackingPage from './BabyFeedTrackingPage';
import DiaperTrackingPage from './DiaperTrackingPage';
import FloatingActionButtonsGrowthAndSleep from '../components/floatingActionButtons/FloatingActionButtonsGrowthAndSleep';
import GraphPage from './GraphPage';
import { auth, firestore } from '../firebaseConfig';
import { childBirthOptions, childGenderOptions, childRelationshipOptions } from '../components/staticPageData/child-options';
import MissingDataMessage from '../components/MissingDataMessage';
import { CalendarIcon } from '@chakra-ui/icons';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function ProgressPage() {
    const _screenBackground = useColorModeValue(screenBackground.light, screenBackground.dark);
    const [screenHeight, setScreenHeight] = useState(window.innerHeight);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [progressModalVisible, setProgressModalVisible] = useState(false);
    const [feedingDiaperOption, setFeedingDiaperOption] = useState("feeding");
    const [searchBarIsOpen, setSearchBarIsOpen] = useState(false);
    const [childOptions, setChildOptions] = useState(null);
    const [selectedChildOption, setSelectedChildOption] = useState("");

    // child drawer properties
    const [childDrawerVisible, setChildDrawerVisible] = useState(false);
    const [childName, setChildName] = useState("");
    const [childGender, setChildGender] = useState("");
    const [childRelationship, setChildRelationship] = useState("");
    const [childBirth, setChildBirth] = useState("");

    const [drawerSubmissionButtonLoading, setDrawerSubmissionButtonLoading] = useState(false);
    const _cardBackground = useColorModeValue(cardBackground.light, cardBackground.dark);
    const toast = useToast();
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleAddChild = async () => {
        setDrawerSubmissionButtonLoading(true);

        const duplicateNameFound = await firestore.collection("users").doc(auth?.currentUser?.uid).collection("children").doc(childName).get().then((doc) => {
            if (doc.exists && !selectedChildOption) {
                toast({
                    title: 'Submission Failed',
                    description: "Child name already exists",
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                });

                setDrawerSubmissionButtonLoading(false);
                return true;
            }

            return false;
        });

        if (!duplicateNameFound && selectedChildOption && childName) {
            // updating the child list create new entry, then delete the old
            firestore.collection("users")
                .doc(auth?.currentUser?.uid)
                .collection("children")
                .doc(String(childName)).set({
                    name: childName,
                    gender: childGender,
                    relationship: childRelationship,
                    birth: childBirth,
                })
                .then(() => {
                    firestore.collection("users")
                        .doc(auth?.currentUser?.uid)
                        .collection("children")
                        .doc(String(selectedChildOption))
                        .delete().then(() => {
                            setSelectedChildOption(childName);
                        });
                });

            // get the new options from children collection
            firestore.collection("users")
                .doc(auth?.currentUser?.uid)
                .collection("children")
                .get().then((snapshot) => {
                    let options = [];
                    let index = 0;

                    snapshot.docs.forEach(doc => {
                        options.push({ key: index, value: doc.data().name, label: doc.data().name });
                        index += 1;
                    });

                    setChildOptions(options);
                }).finally(() => {
                    setDrawerSubmissionButtonLoading(false);
                });
        }
        else if (!duplicateNameFound && !selectedChildOption && childName) {
            // adding to the child list
            firestore.collection("users")
                .doc(auth?.currentUser?.uid)
                .collection("children")
                .doc(String(childName)).set({
                    name: childName,
                    gender: childGender,
                    relationship: childRelationship,
                    birth: childBirth,
                }).then(() => {
                    setSelectedChildOption(childName);
                });

            firestore.collection("users")
                .doc(auth?.currentUser?.uid)
                .collection("children")
                .get().then((snapshot) => {
                    let options = [];
                    let index = 0;

                    snapshot.docs.forEach(doc => {
                        options.push({ key: index, value: doc.data().name, label: doc.data().name });
                        index += 1;
                    });

                    setChildOptions(options);
                }).finally(() => {
                    setDrawerSubmissionButtonLoading(false);
                });
        }
        else if (!childName) {
            toast({
                title: 'Submission Failed',
                description: "Child name field is required to submit to database",
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
        }
    };

    const handleDeleteChild = () => {
        setDrawerSubmissionButtonLoading(true);
        if (selectedChildOption) {
            firestore.collection("users")
                .doc(auth?.currentUser?.uid)
                .collection("children")
                .doc(String(selectedChildOption))
                .delete().then(() => {
                    firestore.collection("users")
                        .doc(auth?.currentUser?.uid)
                        .collection("children")
                        .get().then((snapshot) => {
                            let options = [];
                            let index = 0;

                            snapshot.docs.forEach(doc => {
                                options.push({ key: index, value: doc.data().name, label: doc.data().name });
                                index += 1;
                            });

                            setChildOptions(options);
                        }).finally(() => {
                            setDrawerSubmissionButtonLoading(false);
                        });
                });

        }
        else {
            toast({
                title: 'Submission Failed',
                description: "Child name field is required to submit to database",
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
        }
    };

    const handleDrawerClose = () => {
        setChildDrawerVisible(false);
    };

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

    useEffect(() => {
        firestore.collection("users")
            .doc(auth?.currentUser?.uid)
            .collection("children")
            .get().then((snapshot) => {
                let options = [];
                let index = 0;

                snapshot.docs.forEach(doc => {
                    if (!index) {
                        setSelectedChildOption(doc.data().name);
                    }
                    options.push({ key: index, value: doc.data().name, label: doc.data().name });
                    index += 1;
                });

                setChildOptions(options);
            });
        // eslint-disable-next-line
    }, [auth?.currentUser?.uid]);

    const feedingDiaperOptions = [
        { key: 0, value: "feeding", label: "Feeding" },
        { key: 1, value: "diaper", label: "Diaper" },
    ];

    const handleFeedingDiaperOptionChange = (event) => {
        setFeedingDiaperOption(event.target.value);
    };

    const handleChildOptionChange = (event) => {
        setSelectedChildOption(event.target.value);
    };

    const handleSelectedDateChange = (date) => {
        setSelectedDate(date);
    };

    const formattedDateOption = () => {
        return selectedDate.toLocaleDateString().replace(/\//g, '-');
    };

    return (
        <Box
            bg={_screenBackground}
            h={screenHeight}
            w={screenWidth}
            overflowX="hidden"
        >
            <BabyProgressModal
                progressModalVisible={progressModalVisible}
                setProgressModalVisible={setProgressModalVisible}
            />
            <Tabs isFitted>
                <TabList>
                    <Tab>
                        Feeding and Diapers
                    </Tab>
                    <Tab>
                        Growth and Sleep
                    </Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <HStack>
                            <StyledSelect
                                options={childOptions}
                                value={selectedChildOption}
                                onChange={handleChildOptionChange}
                            />
                            <StyledSelect
                                options={feedingDiaperOptions}
                                value={feedingDiaperOption}
                                onChange={handleFeedingDiaperOptionChange}
                                removeNullOption
                            />
                            <Popover>
                                <PopoverTrigger>
                                    <IconButton icon={<CalendarIcon />} />
                                </PopoverTrigger>
                                <PopoverContent>
                                    <PopoverArrow />
                                    <PopoverCloseButton />
                                    <PopoverBody>
                                        <FormLabel>
                                            Set Date
                                        </FormLabel>
                                        <DatePicker
                                            customInput={<Input />}
                                            selected={selectedDate}
                                            onChange={handleSelectedDateChange}
                                        />
                                    </PopoverBody>
                                </PopoverContent>
                            </Popover>
                        </HStack>
                        <VStack alignItems="start">
                            {selectedChildOption ?
                                <>
                                    {feedingDiaperOption === "feeding" ?
                                        <BabyFeedTrackingPage
                                            searchBarIsOpen={searchBarIsOpen}
                                            setSearchBarIsOpen={setSearchBarIsOpen}
                                            selectedChildOption={selectedChildOption}
                                            setChildOptions={setChildOptions}
                                            setDrawerVisible={setChildDrawerVisible}
                                            selectedDateOption={formattedDateOption()}
                                        />
                                        :
                                        <DiaperTrackingPage
                                            searchBarIsOpen={searchBarIsOpen}
                                            setSearchBarIsOpen={setSearchBarIsOpen}
                                            selectedChildOption={selectedChildOption}
                                            setChildOptions={setChildOptions}
                                            setDrawerVisible={setChildDrawerVisible}
                                            selectedDateOption={formattedDateOption()}
                                        />
                                    }
                                </>
                                :
                                <Box h="80vh" w="100%" display="flex" alignItems="center">
                                    <MissingDataMessage message="No child selected, add or select one!" />
                                </Box>
                            }
                        </VStack>
                    </TabPanel>
                    <TabPanel>
                        <GraphPage />
                        <FloatingActionButtonsGrowthAndSleep
                            setSearchBarIsOpen={setSearchBarIsOpen}
                        />
                    </TabPanel>
                </TabPanels>
            </Tabs>
            <Drawer
                onClose={() => setChildDrawerVisible(false)}
                isOpen={childDrawerVisible}
                bg={_cardBackground}
                placement="left"
            >
                <DrawerOverlay />
                <DrawerContent bg={_screenBackground}>
                    <DrawerHeader>Add Child</DrawerHeader>
                    <DrawerBody>
                        <VStack>
                            <StyledSelect
                                options={childOptions}
                                value={selectedChildOption}
                                onChange={(event) => {
                                    setSelectedChildOption(event.target.value);
                                    setChildName(event.target.value);
                                }}
                            />
                            <VStack
                                alignItems="start"
                                w="100%"
                            >
                                <FormControl
                                    isRequired
                                >
                                    <FormLabel>
                                        Name
                                    </FormLabel>
                                    <Input
                                        w="100%"
                                        value={childName}
                                        onChange={(event) => setChildName(event.target.value)}
                                    />
                                </FormControl>
                            </VStack>
                            <VStack
                                alignItems="start"
                                w="100%"
                            >
                                <FormLabel>
                                    Gender
                                </FormLabel>
                                <StyledSelect
                                    w="100%"
                                    options={childGenderOptions}
                                    value={childGender}
                                    onChange={(event) => setChildGender(event.target.value)}
                                />
                            </VStack>
                            <VStack
                                alignItems="start"
                                w="100%"
                            >
                                <FormLabel>
                                    Relationship
                                </FormLabel>
                                <StyledSelect
                                    w="100%"
                                    options={childRelationshipOptions}
                                    value={childRelationship}
                                    onChange={(event) => setChildRelationship(event.target.value)}
                                />
                            </VStack>
                            <VStack
                                alignItems="start"
                                w="100%"
                            >
                                <FormLabel>
                                    Birth
                                </FormLabel>
                                <StyledSelect
                                    w="100%"
                                    options={childBirthOptions}
                                    value={childBirth}
                                    onChange={(event) => setChildBirth(event.target.value)}
                                />
                            </VStack>
                        </VStack>
                    </DrawerBody>
                    <DrawerFooter justifyContent="space-between">
                        <Button
                            onClick={handleAddChild}
                            isLoading={drawerSubmissionButtonLoading}
                        >
                            Submit
                        </Button>
                        <Button
                            onClick={handleDeleteChild}
                            isLoading={drawerSubmissionButtonLoading}
                        >
                            Delete
                        </Button>
                        <Button
                            onClick={handleDrawerClose}
                        >
                            Close
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </Box>
    );
}
