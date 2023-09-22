// Module imports
import { Button, Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, FormControl, FormLabel, HStack, Input, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack, useColorModeValue, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

// Relative imports
import BreastRowTabPanel from '../components/tabPanels/BreastRowTabPanel';
import PumpRowTabPanel from '../components/tabPanels/PumpRowTabPanel';
import BottleTabPanel from '../components/tabPanels/BottleTabPanel';
import { cardBackground, screenBackground } from '../defaultStyle';
import { auth, firestore } from '../firebaseConfig';
import FloatingActionButtonsDiaperTracking from '../components/floatingActionButtons/FloatingActionButtonsDiaperTracking';
import ProgressTabFormatter from '../components/ProgressTabFormatter';

export default function BabyFeedTrackingPage({ setSearchBarIsOpen, selectedChildOption, setDrawerVisible }) {
    const [tabIndex, setTabIndex] = useState(0);
    const [breastFeedingRows, setBreastFeedingRows] = useState(null);
    const [pumpFeedingRows, setPumpFeedingRows] = useState(null);
    const [bottleFeedingRows, setBottleFeedingRows] = useState(null);

    const [bottleRowAlias, setBottleRowAlias] = useState("");
    const [bottleRowFluidOunces, setBottleRowFluidOunces] = useState(0);

    const [breastRowAlias, setBreastRowAlias] = useState("");

    const [pumpRowAlias, setPumpRowAlias] = useState("");
    const [pumpFluidOunces, setPumpFluidOunces] = useState(0);
    const [leftTeetTimerValue, setLeftTeetTimerValue] = useState(0);
    const [rightTeetTimerValue, setRightTeetTimerValue] = useState(0);

    const [submittingTimerValues] = useState(false);

    const _screenBackground = useColorModeValue(screenBackground.light, screenBackground.dark);
    const toast = useToast();

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
            .doc(auth?.currentUser?.uid)
            .collection("children")
            .doc(selectedChildOption)
            .collection("bottle-feed-tracking")
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
                    .doc(String(breastRowAlias).trim())
                    .set({
                        timeStamp: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
                        alias: String(breastRowAlias).trim(),
                    });

                setBreastFeedingRows([...breastFeedingRows, {
                    timeStamp: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
                    alias: String(breastRowAlias).trim(),
                    leftBreastTime: leftTeetTimerValue,
                    rightBreastTime: rightTeetTimerValue,
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
                        timeStamp: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
                        alias: String(bottleRowAlias).trim(),
                        fluidOunces: Number(bottleRowFluidOunces)
                    });

                setBottleFeedingRows([...bottleFeedingRows, {
                    timeStamp: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
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
                        timeStamp: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
                        alias: String(pumpRowAlias).trim(),
                        fluidOunces: Number(pumpFluidOunces)
                    });

                setPumpFeedingRows([...pumpFeedingRows, {
                    timeStamp: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
                    alias: String(pumpRowAlias).trim(),
                    fluidOunces: Number(pumpFluidOunces),
                    leftBreastTime: leftTeetTimerValue,
                    rightBreastTime: rightTeetTimerValue,
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
        if (tabIndex === 1) {
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

    const handleFluidOunceChange = (event) => {
        if (tabIndex === 1) {
            setBottleRowFluidOunces(event.target.value);
        }
        else if (tabIndex === 2) {
            setPumpFluidOunces(event.target.value);
        }
    };

    useEffect(() => {
        if (selectedChildOption) {
            firestore.collection("users")
                .doc(auth?.currentUser?.uid)
                .collection("children")
                .doc(selectedChildOption)
                .collection("breast-feed-tracking").get()
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
                .collection("bottle-feed-tracking").get()
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
    }, [selectedChildOption]);

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
                                            <Input value={getTabFluidOunces()} onChange={handleFluidOunceChange} />
                                        </FormControl>
                                    </HStack>
                                    <Button type="submit">Submit</Button>
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
                                            <Input value={getTabFluidOunces()} onChange={handleFluidOunceChange} />
                                        </FormControl>
                                    </HStack>
                                    <Button type="submit">Submit</Button>
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
                                            <Input value={getTabFluidOunces()} onChange={handleFluidOunceChange} />
                                        </FormControl>
                                    </HStack>
                                    <Button type="submit">Submit</Button>
                                </HStack>
                            </form>
                        </VStack>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </>
    );
}
