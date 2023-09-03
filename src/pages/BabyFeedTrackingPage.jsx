import { Box, Button, FormControl, FormLabel, HStack, Input, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack, useColorModeValue, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import BreastRowTabPanel from '../components/tabPanels/BreastRowTabPanel';
import PumpRowTabPanel from '../components/tabPanels/PumpRowTabPanel';
import BottleTabPanel from '../components/tabPanels/BottleTabPanel';
import { screenBackground } from '../defaultStyle';
import { auth, firestore } from '../firebaseConfig';
import FloatingActionButtonsDiaperTracking from '../components/floatingActionButtons/FloatingActionButtonsDiaperTracking';
import Timer from '../components/Timer';

export default function BabyFeedTrackingPage({ searchBarIsOpen, setSearchBarIsOpen }) {
    const [tabIndex, setTabIndex] = useState(0);
    const [breastFeedingRows, setBreastFeedingRows] = useState([]);
    const [pumpFeedingRows, setPumpFeedingRows] = useState([]);
    const [bottleFeedingRows, setBottleFeedingRows] = useState([]);

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
            .collection("pump-feed-tracking")
            .where("alias", "==", String(pumpRowAlias).trim())
            .get()
            .then((snapshot) => {
                return snapshot.docs.length;
            });
    };

    const generateBottleRow = async (event) => {
        event.preventDefault();
        const breastDuplicate = await breastAliasDuplicateFound();
        const bottleDuplicate = await bottleAliasDuplicateFound();
        const pumpDuplicate = await pumpAliasDuplicateFound();

        if (tabIndex === 0) {
            if (!breastDuplicate) {
                firestore.collection("users").doc(auth.currentUser.uid).collection("breast-feed-tracking").doc(String(breastRowAlias).trim()).set({
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
                firestore.collection("users").doc(auth.currentUser.uid).collection("bottle-feed-tracking").doc(String(bottleRowAlias).trim()).set({
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
                firestore.collection("users").doc(auth.currentUser.uid).collection("pump-feed-tracking").doc(String(pumpRowAlias).trim()).set({
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

    return (
        <>
            <FloatingActionButtonsDiaperTracking
                setSearchBarIsOpen={setSearchBarIsOpen}
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
                        <HStack
                            alignItems="start"
                            justifyContent="space-evenly"
                            pl="2"
                            pr="2"
                            w="100vw"
                        >
                            <Timer title="L" setValue={setLeftTeetTimerValue} pauseTimer={submittingTimerValues} tabIndex={tabIndex} />
                            <Timer title="R" setValue={setRightTeetTimerValue} pauseTimer={submittingTimerValues} tabIndex={tabIndex} />
                        </HStack>
                        {breastFeedingRows && breastFeedingRows.map((breastRow, index) => {
                            return (
                                <BreastRowTabPanel
                                    leftBreastTime={leftTeetTimerValue}
                                    rightBreastTime={rightTeetTimerValue}
                                    alias={breastRow.alias}
                                    index={index}
                                    timeStamp={breastRow.alias}
                                    data={breastFeedingRows}
                                    setData={setBreastFeedingRows}
                                />
                            );
                        })}
                        <VStack
                            alignItems="start"
                            pl="2"
                            pr="2"
                            position="fixed"
                            bottom="0"
                            w="100vw"
                        >
                            <form onSubmit={generateBottleRow}>
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
                        <Box overflowX="hidden">
                            {bottleFeedingRows && bottleFeedingRows.map((bottleRow, index) => {
                                return (
                                    <BottleTabPanel
                                        data={bottleFeedingRows}
                                        setData={setBottleFeedingRows}
                                        index={index}
                                        alias={bottleRow.alias}
                                        timeStamp={bottleRow.timeStamp}
                                        fluidOunces={bottleRow.fluidOunces}
                                    />
                                );
                            })}
                            <VStack
                                alignItems="start"
                                pl="2"
                                pr="2"
                                position="fixed"
                                bottom="0"
                                w="100vw"
                            >
                                <form onSubmit={generateBottleRow}>
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
                        </Box>
                    </TabPanel>
                    <TabPanel>
                        <HStack
                            alignItems="start"
                            justifyContent="space-evenly"
                            pl="2"
                            pr="2"
                            w="100vw"
                        >
                            <Timer title="L" setValue={setLeftTeetTimerValue} pauseTimer={submittingTimerValues} tabIndex={tabIndex} />
                            <Timer title="R" setValue={setRightTeetTimerValue} pauseTimer={submittingTimerValues} tabIndex={tabIndex} />
                        </HStack>
                        {pumpFeedingRows && pumpFeedingRows.map((pumpRow, index) => {
                            return (
                                <PumpRowTabPanel
                                    alias={pumpRow.alias}
                                    index={index}
                                    timeStamp={pumpRow.timeStamp}
                                    leftBreastTime={pumpRow.leftBreastTime}
                                    rightBreastTime={pumpRow.rightBreastTime}
                                    data={pumpFeedingRows}
                                    setData={setPumpFeedingRows}
                                    fluidOunces={pumpRow.fluidOunces}
                                />
                            );
                        })}
                        <VStack
                            alignItems="start"
                            pl="2"
                            pr="2"
                            position="fixed"
                            bottom="0"
                            w="100vw"
                        >
                            <form onSubmit={generateBottleRow}>
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
