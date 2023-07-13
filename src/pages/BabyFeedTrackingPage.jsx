import { Box, Button, FormControl, FormLabel, HStack, Input, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack, useColorModeValue, useToast } from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react';
import BreastRowTabPanel from '../components/tabPanels/BreastRowTabPanel';
import BabyFeedTrackingTemplate from '../components/BabyFeedTrackingTemplate';
import PumpRowTabPanel from '../components/tabPanels/PumpRowTabPanel';
import BottleTabPanel from '../components/tabPanels/BottleTabPanel';
import { screenBackground } from '../defaultStyle';
import { auth, firestore } from '../firebaseConfig';

export default function BabyFeedTrackingPage() {
    const [tabIndex, setTabIndex] = useState(0);
    const [breastFeedingRows, setBreastFeedingRows] = useState([]);
    const [pumpFeedingRows, setPumpFeedingRows] = useState([]);
    const [bottleFeedingRows, setBottleFeedingRows] = useState([]);

    const [bottleRowAlias, setBottleRowAlias] = useState("");
    const [bottleRowFluidOunces, setBottleRowFluidOunces] = useState(0);

    const [breastRowAlias, setBreastRowAlias] = useState("");

    const [pumpRowAlias, setPumpRowAlias] = useState("");
    const [pumpFluidOunces, setPumpFluidOunces] = useState(0);

    const _screenBackground = useColorModeValue(screenBackground.light, screenBackground.dark);
    const toast = useToast();

    const handleTabsChange = (index) => {
        setTabIndex(index);
    };

    const getAdditionalPumpChildren = () => {
        return (
            <VStack alignItems="start">
                <FormControl isRequired>
                    <FormLabel>Fluid Ounces</FormLabel>
                </FormControl>
                <Input value={pumpFluidOunces} onChange={(event) => setPumpFluidOunces(event.target.value)} />
            </VStack>
        );
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
                    fluidOunces: Number(pumpFluidOunces)
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
        <Tabs variant='enclosed' index={tabIndex} onChange={handleTabsChange} bg={_screenBackground} h="100vh">
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
                    <BabyFeedTrackingTemplate
                        ComponentTabPanel={BreastRowTabPanel}
                        componentData={breastFeedingRows}
                        setComponentData={setBreastFeedingRows}
                    />
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
                                <HStack alignItems="end">
                                    <HStack alignItems="end" justifyContent="center">
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
                    <BabyFeedTrackingTemplate
                        ComponentTabPanel={PumpRowTabPanel}
                        componentData={pumpFeedingRows}
                        setComponentData={setPumpFeedingRows}
                        additionalFooterChildren={getAdditionalPumpChildren()}
                        additionalComponentData={{ fluidOunces: pumpFluidOunces }}
                    />
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
}
