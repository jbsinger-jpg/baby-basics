// Module imports
import { Button, ButtonGroup, Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, FormControl, FormLabel, HStack, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack, useColorModeValue, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

// Relative imports
import BreastRowTabPanel from '../components/tabPanels/BreastRowTabPanel';
import PumpRowTabPanel from '../components/tabPanels/PumpRowTabPanel';
import BottleTabPanel from '../components/tabPanels/BottleTabPanel';
import { cardBackground, screenBackground } from '../defaultStyle';
import { auth, firestore } from '../firebaseConfig';
import FloatingActionButtonsDiaperTracking from '../components/floatingActionButtons/FloatingActionButtonsDiaperTracking';
import ProgressTabFormatter from '../components/ProgressTabFormatter';
import MotionButton from '../components/animated/MotionButton';

export default function BabyFeedTrackingPage({ setSearchBarIsOpen, selectedChildOption, setDrawerVisible, selectedDateOption, searchBarIsOpen }) {
    const [tabIndex, setTabIndex] = useState(0);
    const [breastFeedingRows, setBreastFeedingRows] = useState(null);
    const [pumpFeedingRows, setPumpFeedingRows] = useState(null);
    const [bottleFeedingRows, setBottleFeedingRows] = useState(null);
    const [bottleRowAlias, setBottleRowAlias] = useState("");
    const [bottleRowFluidOunces, setBottleRowFluidOunces] = useState(0);

    const [breastRowAlias, setBreastRowAlias] = useState("");
    const [breastFluidOunces, setBreastFluidOunces] = useState(0);
    const [pumpRowAlias, setPumpRowAlias] = useState("");
    const [pumpFluidOunces, setPumpFluidOunces] = useState(0);
    const [leftTeetTimerValue, setLeftTeetTimerValue] = useState(0);
    const [rightTeetTimerValue, setRightTeetTimerValue] = useState(0);
    const [submittingTimerValues] = useState(false);

    const _screenBackground = useColorModeValue(screenBackground.light, screenBackground.dark);
    const _cardBackground = useColorModeValue(cardBackground.light, cardBackground.dark);

    const [queryLeftBreastTime, setQueryLeftBreastTime] = useState(0);
    const [queryRightBreastTime, setQueryRightBreastTime] = useState(0);
    const [queryFluidOunces, setQueryFluidOunces] = useState(0);
    const [queryAlias, setQueryAlias] = useState(0);
    const toast = useToast();
    const [buttonIsLoading, setButtonIsLoading] = useState(false);

    const handleTabsChange = (index) => {
        setTabIndex(index);
        setLeftTeetTimerValue(0);
        setRightTeetTimerValue(0);
    };

    const breastAliasDuplicateFound = async () => {
        return await firestore.collection("users")
            .doc(auth?.currentUser?.uid)
            .collection("children")
            .doc(selectedChildOption)
            .collection("breast-feed-tracking")
            .where("alias", "==", String(breastRowAlias).trim())
            .get()
            .then((snapshot) => {
                return snapshot.docs.length;
            });
    };

    const bottleAliasDuplicateFound = async () => {
        return await firestore.collection("users")
            .doc(auth.currentUser.uid)
            .collection("children")
            .doc(selectedChildOption)
            .collection("breast-feed-tracking")
            .where("alias", "==", String(bottleRowAlias).trim())
            .get()
            .then((snapshot) => {
                return snapshot.docs.length;
            });
    };

    const pumpAliasDuplicateFound = async () => {
        return await firestore.collection("users")
            .doc(auth?.currentUser?.uid)
            .collection("children")
            .doc(selectedChildOption)
            .collection("pump-feed-tracking")
            .where("alias", "==", String(pumpRowAlias).trim())
            .get()
            .then((snapshot) => {
                return snapshot.docs.length;
            });
    };

    const addTabRow = async (event) => {
        event.preventDefault();
        setButtonIsLoading(true);

        const breastDuplicate = await breastAliasDuplicateFound();
        const bottleDuplicate = await bottleAliasDuplicateFound();
        const pumpDuplicate = await pumpAliasDuplicateFound();

        if (tabIndex === 0) {
            if (!breastDuplicate) {
                firestore.collection("users")
                    .doc(auth.currentUser.uid)
                    .collection("children")
                    .doc(selectedChildOption)
                    .collection("breast-feed-tracking")
                    .doc(breastRowAlias)
                    .set({
                        timeStamp: `${new Date().toLocaleDateString().replace(/\//g, '-')}`,
                        alias: String(breastRowAlias).trim(),
                        fluidOunces: Number(breastFluidOunces),
                        leftBreastTime: Number(leftTeetTimerValue),
                        rightBreastTime: Number(rightTeetTimerValue),
                    }).finally(() => {
                        setButtonIsLoading(false);
                    });

                setBreastFeedingRows([...breastFeedingRows, {
                    timeStamp: `${new Date().toLocaleDateString().replace(/\//g, '-')}`,
                    alias: String(breastRowAlias).trim(),
                    fluidOunces: Number(breastFluidOunces),
                    leftBreastTime: Number(leftTeetTimerValue),
                    rightBreastTime: Number(rightTeetTimerValue),
                }]);
            }
            else {
                toast({
                    title: 'Unable to add new entry!',
                    description: "Entry has a duplicate alias!",
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });

                setButtonIsLoading(false);
            }
        }
        else if (tabIndex === 1) {
            if (!bottleDuplicate) {
                firestore.collection("users")
                    .doc(auth.currentUser.uid)
                    .collection("children")
                    .doc(selectedChildOption)
                    .collection("bottle-feed-tracking")
                    .doc(String(bottleRowAlias).trim())
                    .set({
                        timeStamp: `${new Date().toLocaleDateString().replace(/\//g, '-')}`,
                        alias: String(bottleRowAlias).trim(),
                        fluidOunces: Number(bottleRowFluidOunces)
                    }).finally(() => {
                        setButtonIsLoading(false);
                    });

                setBottleFeedingRows([...bottleFeedingRows, {
                    timeStamp: `${new Date().toLocaleDateString().replace(/\//g, '-')}`,
                    alias: String(bottleRowAlias).trim(),
                    fluidOunces: Number(bottleRowFluidOunces)
                }]);
            }
            else {
                toast({
                    title: 'Unable to add new entry!',
                    description: "Entry has a duplicate alias!",
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });

                setButtonIsLoading(false);
            }
        }
        else if (tabIndex === 2) {
            if (!pumpDuplicate) {
                firestore.collection("users")
                    .doc(auth.currentUser.uid)
                    .collection("children")
                    .doc(selectedChildOption)
                    .collection("pump-feed-tracking")
                    .doc(String(pumpRowAlias).trim())
                    .set({
                        timeStamp: `${new Date().toLocaleDateString().replace(/\//g, '-')}`,
                        alias: String(pumpRowAlias).trim(),
                        fluidOunces: Number(pumpFluidOunces),
                        leftBreastTime: Number(leftTeetTimerValue),
                        rightBreastTime: Number(rightTeetTimerValue),
                    }).finally(() => {
                        setButtonIsLoading(false);
                    });

                setPumpFeedingRows([...pumpFeedingRows, {
                    timeStamp: `${new Date().toLocaleDateString().replace(/\//g, '-')}`,
                    alias: String(pumpRowAlias).trim(),
                    fluidOunces: Number(pumpFluidOunces),
                    leftBreastTime: Number(leftTeetTimerValue),
                    rightBreastTime: Number(rightTeetTimerValue),
                }]);
            }
            else {
                toast({
                    title: 'Unable to add new entry!',
                    description: "Entry has a duplicate alias!",
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });

                setButtonIsLoading(false);
            }
        }


    };

    const getTabAlias = () => {
        if (tabIndex === 0) {
            return breastRowAlias;
        }
        else if (tabIndex === 1) {
            return bottleRowAlias;
        }
        else if (tabIndex === 2) {
            return pumpRowAlias;
        }
    };

    const getTabFluidOunces = () => {
        if (tabIndex === 0) {
            return breastFluidOunces;
        }
        else if (tabIndex === 1) {
            return bottleRowFluidOunces;
        }
        else if (tabIndex === 2) {
            return pumpFluidOunces;
        }
    };

    const handleTabAliasChange = (event) => {
        if (tabIndex === 0) {
            setBreastRowAlias(event.target.value);
        }
        else if (tabIndex === 1) {
            setBottleRowAlias(event.target.value);
        }
        else if (tabIndex === 2) {
            setPumpRowAlias(event.target.value);
        }
    };

    const handleFluidOunceChange = (valueString) => {
        if (tabIndex === 0) {
            setBreastFluidOunces(valueString);
        }
        else if (tabIndex === 1) {
            setBottleRowFluidOunces(valueString);
        }
        else if (tabIndex === 2) {
            setPumpFluidOunces(valueString);
        }
    };

    const clearSearch = () => {
        setQueryFluidOunces(0);
        setQueryLeftBreastTime(0);
        setQueryRightBreastTime(0);
        setQueryAlias("");
    };

    const generateSearch = async () => {
        let searchRowOptions = [];

        if (tabIndex === 0) {
            await firestore.collection("users")
                .doc(auth.currentUser.uid)
                .collection("children")
                .doc(selectedChildOption)
                .collection("breast-feed-tracking")
                .get().then(snapshot => {
                    snapshot.docs.forEach(doc => {
                        searchRowOptions.push(doc.data());
                    });

                    // Set breast feeding data to options generated.
                    setBreastFeedingRows(searchRowOptions);
                });
        }
        else if (tabIndex === 1) {
            await firestore.collection("users")
                .doc(auth.currentUser.uid)
                .collection("children")
                .doc(selectedChildOption)
                .collection("bottle-feed-tracking")
                .get().then(snapshot => {
                    snapshot.docs.forEach(doc => {
                        searchRowOptions.push(doc.data());
                    });

                    // Set breast feeding data to options generated.
                    setBottleFeedingRows(searchRowOptions);
                });
        }
        else if (tabIndex === 2) {
            await firestore.collection("users")
                .doc(auth.currentUser.uid)
                .collection("children")
                .doc(selectedChildOption)
                .collection("pump-feed-tracking")
                .get().then(snapshot => {
                    snapshot.docs.forEach(doc => {
                        searchRowOptions.push(doc.data());
                    });

                    // Set breast feeding data to options generated.
                    setPumpFeedingRows(searchRowOptions);
                });
        }
    };

    useEffect(() => {
        if (selectedChildOption && selectedDateOption) {
            firestore.collection("users")
                .doc(auth?.currentUser?.uid)
                .collection("children")
                .doc(selectedChildOption)
                .collection("breast-feed-tracking")
                .get()
                .then(snapshot => {
                    let options = [];
                    snapshot.docs.forEach(doc => {
                        options.push({ ...doc.data() });
                    });

                    setBreastFeedingRows(options);
                    options = [];
                });

            firestore.collection("users")
                .doc(auth?.currentUser?.uid)
                .collection("children")
                .doc(selectedChildOption)
                .collection("bottle-feed-tracking")
                .get()
                .then(snapshot => {
                    let options = [];
                    snapshot.docs.forEach(doc => {
                        options.push({ ...doc.data() });
                    });

                    setBottleFeedingRows(options);
                    options = [];
                });

            firestore.collection("users")
                .doc(auth?.currentUser?.uid)
                .collection("children")
                .doc(selectedChildOption)
                .collection("pump-feed-tracking")
                .get().then(snapshot => {
                    let options = [];
                    snapshot.docs.forEach(doc => {
                        options.push({ ...doc.data() });
                    });

                    setPumpFeedingRows(options);
                    options = [];
                });
        }
        // eslint-disable-next-line
    }, [selectedChildOption, selectedDateOption]);

    const getBreastTabItems = () => {
        return (
            <VStack display="flex" alignItems="start" width="100%">
                <Text>Left Breast Time</Text>
                <NumberInput
                    min={0}
                    w="100%"
                    value={queryLeftBreastTime}
                    onChange={(valueString) => setQueryLeftBreastTime(valueString)}
                >
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
                <Text>Right Breast Time</Text>
                <NumberInput
                    min={0}
                    w="100%"
                    value={queryRightBreastTime}
                    onChange={(valueString) => setQueryRightBreastTime(valueString)}
                >
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
                <Text>Fluid Ounces</Text>
                <NumberInput
                    min={0}
                    w="100%"
                    value={queryFluidOunces}
                    onChange={(valueString) => setQueryFluidOunces(valueString)}
                >
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
                <Text>Alias</Text>
                <Input value={queryAlias} onChange={event => setQueryAlias(event.target.value)} />
            </VStack>
        );
    };

    const getBottleTabItems = () => {
        return (
            <VStack display="flex" alignItems="start" width="100%">
                <Text>Fluid Ounces</Text>
                <NumberInput
                    min={0}
                    w="100%"
                    value={queryFluidOunces}
                    onChange={(valueString) => setQueryFluidOunces(valueString)}
                >
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
                <Text>Alias</Text>
                <Input value={queryAlias} onChange={event => setQueryAlias(event.target.value)} />
            </VStack>
        );
    };

    const getPumpTabItems = () => {
        return (
            <VStack display="flex" alignItems="start" width="100%">
                <Text>Left Breast Time</Text>
                <NumberInput
                    min={0}
                    w="100%"
                    value={queryLeftBreastTime}
                    onChange={(value) => setQueryLeftBreastTime(value)}
                >
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
                <Text>Right Breast Time</Text>
                <NumberInput
                    min={0}
                    w="100%"
                    value={queryRightBreastTime}
                    onChange={(value) => setQueryRightBreastTime(value)}
                >
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
                <Text>Fluid Ounces</Text>
                <NumberInput
                    min={0}
                    w="100%"
                    value={queryFluidOunces}
                    onChange={(valueString) => setQueryFluidOunces(valueString)}
                >
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
                <Text>Alias</Text>
                <Input value={queryAlias} onChange={event => setQueryAlias(event.target.value)} />
            </VStack>
        );
    };

    return (
        <>
            <FloatingActionButtonsDiaperTracking
                setSearchBarIsOpen={setSearchBarIsOpen}
                setDrawerVisible={setDrawerVisible}
            />
            <Tabs index={tabIndex} onChange={handleTabsChange} bg={_screenBackground} orientation='vertical' isFitted h="80vh">
                <TabList>
                    <Tab>
                        <VStack spacing="-1">
                            <Text>BreastFeed</Text>
                        </VStack>
                    </Tab>
                    <Tab>
                        <VStack spacing="-1">
                            <Text>Bottle</Text>
                        </VStack>
                    </Tab>
                    <Tab>
                        <VStack spacing="-1">
                            <Text>Pump</Text>
                        </VStack>
                    </Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <ProgressTabFormatter
                            TabPanel={BreastRowTabPanel}
                            rows={breastFeedingRows}
                            setRows={setBreastFeedingRows}
                            setLeftTeetTimerValue={setLeftTeetTimerValue}
                            setRightTeetTimerValue={setRightTeetTimerValue}
                            selectedChildOption={selectedChildOption}
                            selectedDateOption={selectedDateOption}
                            tabIndex={tabIndex}
                            submittingTimerValues={submittingTimerValues}
                        />
                        <VStack
                            position="fixed"
                            bottom="0"
                            left="0"
                            pl="10"
                            w="100vw"
                        >
                            <form onSubmit={addTabRow}>
                                <HStack alignItems="end" w="100vw">
                                    <HStack alignItems="end" justifyContent="center" w="80vw">
                                        <FormControl isRequired>
                                            <FormLabel>
                                                Alias
                                            </FormLabel>
                                            <Input value={getTabAlias()} onChange={handleTabAliasChange} />
                                        </FormControl>
                                        <FormControl isRequired>
                                            <FormLabel>
                                                Fluid Ounces
                                            </FormLabel>
                                            <NumberInput
                                                min={0}
                                                value={getTabFluidOunces()}
                                                onChange={handleFluidOunceChange}
                                            >
                                                <NumberInputField />
                                                <NumberInputStepper>
                                                    <NumberIncrementStepper />
                                                    <NumberDecrementStepper />
                                                </NumberInputStepper>
                                            </NumberInput>
                                        </FormControl>
                                    </HStack>
                                    <MotionButton title="Submit" type="submit" isLoading={buttonIsLoading} />
                                </HStack>
                            </form>
                        </VStack>
                    </TabPanel>
                    <TabPanel>
                        <ProgressTabFormatter
                            TabPanel={BottleTabPanel}
                            rows={bottleFeedingRows}
                            setLeftTeetTimerValue={setLeftTeetTimerValue}
                            setRightTeetTimerValue={setRightTeetTimerValue}
                            setRows={setBottleFeedingRows}
                            selectedChildOption={selectedChildOption}
                            tabIndex={tabIndex}
                        />
                        <VStack
                            position="fixed"
                            bottom="0"
                            left="0"
                            pl="10"
                            w="100vw"
                        >
                            <form onSubmit={addTabRow}>
                                <HStack alignItems="end" w="100vw">
                                    <HStack alignItems="end" justifyContent="center" w="80vw">
                                        <FormControl isRequired>
                                            <FormLabel>
                                                Alias
                                            </FormLabel>
                                            <Input value={getTabAlias()} onChange={handleTabAliasChange} />
                                        </FormControl>
                                        <FormControl isRequired>
                                            <FormLabel>
                                                Fluid Ounces
                                            </FormLabel>
                                            <NumberInput
                                                min={0}
                                                w="100%"
                                                value={getTabFluidOunces()}
                                                onChange={handleFluidOunceChange}
                                            >
                                                <NumberInputField />
                                                <NumberInputStepper>
                                                    <NumberIncrementStepper />
                                                    <NumberDecrementStepper />
                                                </NumberInputStepper>
                                            </NumberInput>
                                        </FormControl>
                                    </HStack>
                                    <MotionButton title="Submit" type="submit" isLoading={buttonIsLoading} />
                                </HStack>
                            </form>
                        </VStack>
                    </TabPanel>
                    <TabPanel>
                        <ProgressTabFormatter
                            TabPanel={PumpRowTabPanel}
                            rows={pumpFeedingRows}
                            setRows={setPumpFeedingRows}
                            setLeftTeetTimerValue={setLeftTeetTimerValue}
                            setRightTeetTimerValue={setRightTeetTimerValue}
                            selectedChildOption={selectedChildOption}
                            selectedDateOption={selectedDateOption}
                            tabIndex={tabIndex}
                            submittingTimerValues={submittingTimerValues}
                        />
                        <VStack
                            position="fixed"
                            bottom="0"
                            left="0"
                            pl="10"
                            pb="2"
                            w="100vw"
                        >
                            <form onSubmit={addTabRow}>
                                <HStack alignItems="end" w="100vw">
                                    <HStack alignItems="end" justifyContent="center" w="80vw">
                                        <FormControl isRequired>
                                            <FormLabel>
                                                Alias
                                            </FormLabel>
                                            <Input value={getTabAlias()} onChange={handleTabAliasChange} />
                                        </FormControl>
                                        <FormControl isRequired>
                                            <FormLabel>
                                                Fluid Ounces
                                            </FormLabel>
                                            <Input value={getTabFluidOunces()} onChange={handleFluidOunceChange} />
                                        </FormControl>
                                    </HStack>
                                    <MotionButton title="Submit" type="submit" isLoading={buttonIsLoading} />
                                </HStack>
                            </form>
                        </VStack>
                    </TabPanel>
                </TabPanels>
            </Tabs >
            <Drawer
                onClose={() => setSearchBarIsOpen(false)}
                bg={_cardBackground}
                isOpen={searchBarIsOpen}
                placement='right'
                size="sm"
            >
                <DrawerOverlay />
                <DrawerContent
                    bg={_screenBackground}
                >
                    <DrawerHeader>Filter Items</DrawerHeader>
                    <DrawerBody>
                        <Tabs variant='enclosed' index={tabIndex} onChange={handleTabsChange} overflowX="hidden" align="start" isFitted>
                            <TabList>
                                <Tab>
                                    <HStack>
                                        <Text>Breast</Text>
                                    </HStack>
                                </Tab>
                                <Tab>
                                    <HStack>
                                        <Text>Bottle</Text>
                                    </HStack>
                                </Tab>
                                <Tab>
                                    <HStack>
                                        <Text>Pump</Text>
                                    </HStack>
                                </Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel>
                                    {getBreastTabItems()}
                                </TabPanel>
                                <TabPanel>
                                    {getBottleTabItems()}
                                </TabPanel>
                                <TabPanel>
                                    {getPumpTabItems()}
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </DrawerBody>
                    <DrawerFooter>
                        <ButtonGroup>
                            <Button onClick={clearSearch}>Clear</Button>
                            <Button onClick={generateSearch}>Search</Button>
                        </ButtonGroup>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
}
