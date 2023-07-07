import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, FormControl, FormLabel, HStack, Icon, Input, Radio, RadioGroup, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Text, Textarea, VStack, useColorModeValue, useToast } from '@chakra-ui/react';
import React, { useState } from 'react';

import { cardBackground, screenBackground } from '../defaultStyle';
import FloatingActionButtonsDiaperTracking from '../components/floatingActionButtons/FloatingActionButtonsDiaperTracking';
import WaterDropIcon from '@mui/icons-material/Water';
import DoDisturbAltIcon from '@mui/icons-material/DoDisturbAlt';
import VolcanoIcon from '@mui/icons-material/Volcano';
import GenericDiaperTrackingTabPanel from '../components/tabPanels/GenericDiaperTrackingTabPanel';
import PooTabPanel from '../components/tabPanels/PooTabPanel';
import { babyPoopColorData, babyPoopConsistencyData } from '../components/staticPageData/baby-color-consistency-info';
import { auth, firestore } from '../firebaseConfig';
import { useEffect } from 'react';

export default function DiaperTrackingPage() {
    const _screenBackground = useColorModeValue(screenBackground.light, screenBackground.dark);
    const _cardBackground = useColorModeValue(cardBackground.light, cardBackground.dark);

    const [colorationDialogIsVisible, setColorationDialogIsVisible] = useState(false);
    const [tabIndex, setTabIndex] = useState(0);
    const [colorValue, setColorValue] = useState('none');
    const [consistencyValue, setConsistencyValue] = useState('none');
    const toast = useToast();

    const [peeTabNotes, setPeeTabNotes] = useState("");
    const [pooTabNotes, setPooTabNotes] = useState("");
    const [dryTabNotes, setDryTabNotes] = useState("");

    const [peeTabAlias, setPeeTabAlias] = useState("");
    const [pooTabAlias, setPooTabAlias] = useState("");
    const [dryTabAlias, setDryTabAlias] = useState("");

    const [peeTabData, setPeeTabData] = useState([]);
    const [pooTabData, setPooTabData] = useState([]);
    const [dryTabData, setDryTabData] = useState([]);

    const [searchBarIsOpen, setSearchBarIsOpen] = useState(false);

    const handleTabsChange = (index) => {
        setTabIndex(index);
    };

    const showColorationDialog = () => {
        setColorationDialogIsVisible(true);
    };

    const formatColorConsistencyValue = () => {
        if (colorValue && consistencyValue) {
            return `${colorValue} & ${consistencyValue}`;
        }
        else if (colorValue) {
            return colorValue;
        }
        else if (consistencyValue) {
            return consistencyValue;
        }
        else {
            return '';
        }
    };

    const getDescriptionForColorAndConsistency = () => {
        let formattedDescription = "";

        for (let i = 0; i < babyPoopColorData.length; i++) {
            if (babyPoopColorData[i].color === colorValue) {
                formattedDescription += babyPoopColorData[i].description;
            }
        }

        if (formattedDescription)
            formattedDescription += "\n\n";

        for (let i = 0; i < babyPoopConsistencyData.length; i++) {
            if (babyPoopConsistencyData[i].consistency === consistencyValue) {
                formattedDescription += babyPoopConsistencyData[i].description;
            }
        }

        return formattedDescription;
    };

    const handleClearDialogEntries = () => {
        setColorValue("");
        setConsistencyValue("");
    };

    const getTabNotes = () => {
        if (tabIndex === 0) {
            return peeTabNotes;
        }
        else if (tabIndex === 1) {
            return pooTabNotes;
        }
        else if (tabIndex === 2) {
            return dryTabNotes;
        }
        else {
            return null;
        }
    };

    const handleTabNotesChange = (event) => {
        if (tabIndex === 0) {
            setPeeTabNotes(event.target.value);
        }
        else if (tabIndex === 1) {
            setPooTabNotes(event.target.value);
        }
        else if (tabIndex === 2) {
            setDryTabNotes(event.target.value);
        }
    };

    const handleTabAliasChange = (event) => {
        if (tabIndex === 0) {
            setPeeTabAlias(event.target.value);
        }
        else if (tabIndex === 1) {
            setPooTabAlias(event.target.value);
        }
        else if (tabIndex === 2) {
            setDryTabAlias(event.target.value);
        }
    };

    const getTabAlias = () => {
        if (tabIndex === 0) {
            return peeTabAlias;
        }
        else if (tabIndex === 1) {
            return pooTabAlias;
        }
        else if (tabIndex === 2) {
            return dryTabAlias;
        }
        else {
            return null;
        }
    };

    const handleClearNotes = () => {
        if (tabIndex === 0) {
            setPeeTabNotes("");
            setPeeTabAlias("");
        }
        else if (tabIndex === 1) {
            setPooTabNotes("");
            setPooTabAlias("");
        }
        else if (tabIndex === 2) {
            setDryTabNotes("");
            setDryTabAlias("");
        }
    };

    const peeTabAliasDuplicateFound = async () => {
        return await firestore.collection("users")
            .doc(auth?.currentUser?.uid)
            .collection("pee-tracking")
            .where("alias", "==", String(peeTabAlias).trim())
            .get()
            .then((snapshot) => {
                return snapshot.docs.length;
            });
    };

    const pooTabAliasDuplicateFound = async () => {
        return await firestore.collection("users")
            .doc(auth?.currentUser?.uid)
            .collection("poo-tracking")
            .where("alias", "==", String(pooTabAlias).trim())
            .get()
            .then((snapshot) => {
                return snapshot.docs.length;
            });
    };

    const dryTabAliasDuplicateFound = async () => {
        return await firestore.collection("users")
            .doc(auth?.currentUser?.uid)
            .collection("dry-tracking")
            .where("alias", "==", String(dryTabAlias).trim())
            .get()
            .then((snapshot) => {
                return snapshot.docs.length;
            });
    };

    const addRowEntry = async (event) => {
        event.preventDefault();
        const peeDuplicate = await peeTabAliasDuplicateFound();
        const pooDuplicate = await pooTabAliasDuplicateFound();
        const dryDuplicate = await dryTabAliasDuplicateFound();

        if (tabIndex === 0) {
            if (!peeDuplicate) {
                firestore.collection("users").doc(auth.currentUser.uid).collection("pee-tracking").doc(String(peeTabAlias).trim()).set({
                    alias: String(peeTabAlias).trim(),
                    notes: peeTabNotes,
                    timeStamp: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`
                });

                setPeeTabData(
                    [...peeTabData, {
                        alias: String(peeTabAlias).trim(),
                        notes: peeTabNotes,
                        timeStamp: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`
                    }]
                );
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
            let newEntry = {
                alias: String(pooTabAlias).trim(),
                color: colorValue,
                consistency: consistencyValue,
                notes: pooTabNotes,
                timeStamp: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
                description: getDescriptionForColorAndConsistency()
            };

            if (!pooDuplicate) {
                firestore.collection("users").doc(auth.currentUser.uid).collection("poo-tracking").doc(String(pooTabAlias).trim()).set({
                    ...newEntry
                });

                setPooTabData([...pooTabData, newEntry]);
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
            if (!dryDuplicate) {
                firestore.collection("users").doc(auth.currentUser.uid).collection("dry-tracking").doc(String(dryTabAlias).trim()).set({
                    alias: String(dryTabAlias).trim(),
                    notes: dryTabNotes,
                    timeStamp: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`
                });

                setDryTabData(
                    [...dryTabData, {
                        alias: dryTabAlias,
                        notes: dryTabNotes,
                        timeStamp: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`
                    }]
                );
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

    useEffect(() => {
        firestore.collection("users").doc(auth?.currentUser?.uid).collection("pee-tracking").get().then((snapshot) => {
            let initialData = [];
            snapshot.docs.forEach(doc => {
                initialData.push(doc.data());
            });
            setPeeTabData(initialData);
        });

        firestore.collection("users").doc(auth?.currentUser?.uid).collection("poo-tracking").get().then((snapshot) => {
            let initialData = [];
            snapshot.docs.forEach(doc => {
                initialData.push(doc.data());
            });
            setPooTabData(initialData);
        });

        firestore.collection("users").doc(auth?.currentUser?.uid).collection("dry-tracking").get().then((snapshot) => {
            let initialData = [];
            snapshot.docs.forEach(doc => {
                initialData.push(doc.data());
            });
            setDryTabData(initialData);
        });
    }, []);

    const handleDeletePeeRow = (index) => {
        firestore.collection("users").doc(auth?.currentUser?.uid).collection("pee-tracking").doc(String(peeTabAlias).trim()).delete();
        const updatedArray = [...peeTabData];
        updatedArray.splice(index, 1);
        setPeeTabData(updatedArray);
    };

    const handleDeleteDryRow = (index) => {
        firestore.collection("users").doc(auth?.currentUser?.uid).collection("dry-tracking").doc(String(dryTabAlias).trim()).delete();
        const updatedArray = [...dryTabData];
        updatedArray.splice(index, 1);
        setDryTabData(updatedArray);
    };

    const getPeeTabSearchItems = () => {
        return (
            <VStack>
                <VStack alignItems="start">
                    <FormLabel htmlFor="date">Date</FormLabel>
                    <Input id="date" />
                </VStack>
                <VStack alignItems="start">
                    <FormLabel htmlFor="time">Time</FormLabel>
                    <Input id="time" />
                </VStack>
                <VStack alignItems="start">
                    <FormLabel htmlFor="alias">Alias</FormLabel>
                    <Input id="alias" />
                </VStack>
            </VStack>
        );
    };

    const getPooTabSearchItems = () => {
        return (
            <VStack>
                <VStack alignItems="start">
                    <FormLabel htmlFor="date">Date</FormLabel>
                    <Input id="date" />
                </VStack>
                <VStack alignItems="start">
                    <FormLabel htmlFor="time">Time</FormLabel>
                    <Input id="time" />
                </VStack>
                <VStack alignItems="start">
                    <FormLabel htmlFor="alias">Alias</FormLabel>
                    <Input id="alias" />
                </VStack>
                <VStack alignItems="start">
                    <FormLabel htmlFor="consistency">Consistency</FormLabel>
                    <Input id="consistency" />
                </VStack>
                <VStack alignItems="start">
                    <FormLabel htmlFor="color">Color</FormLabel>
                    <Input id="color" />
                </VStack>
            </VStack>
        );
    };

    const getDryTabSearchItems = () => {
        return (
            <VStack>
                <VStack alignItems="start">
                    <FormLabel htmlFor="date">Date</FormLabel>
                    <Input id="date" />
                </VStack>
                <VStack alignItems="start">
                    <FormLabel htmlFor="time">Time</FormLabel>
                    <Input id="time" />
                </VStack>
                <VStack alignItems="start">
                    <FormLabel htmlFor="alias">Alias</FormLabel>
                    <Input id="alias" />
                </VStack>
            </VStack>
        );
    };

    return (
        <Box
            bg={_screenBackground}
            h="100vh"
        >
            <Box
                height={`calc(100vh - 240px)`}
                width="100vw"
                overflowX="hidden"
            >
                <FloatingActionButtonsDiaperTracking
                    setSearchBarIsOpen={setSearchBarIsOpen}
                />
                <HStack
                    alignItems='start'
                >
                    <Tabs variant='enclosed' index={tabIndex} onChange={handleTabsChange} width="100vw">
                        <TabList>
                            <Tab>
                                <VStack spacing="-1">
                                    <Icon as={WaterDropIcon} />
                                    <Text>Pee</Text>
                                </VStack>
                            </Tab>
                            <Tab>
                                <VStack spacing="-1">
                                    <Icon as={VolcanoIcon} />
                                    <Text>Poo</Text>
                                </VStack>
                            </Tab>
                            <Tab>
                                <VStack spacing="-1">
                                    <Icon as={DoDisturbAltIcon} />
                                    <Text>Dry</Text>
                                </VStack>
                            </Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <VStack
                                    alignItems="start"
                                    pl="2"
                                    pr="2"
                                    overflowY="auto"
                                >
                                    {peeTabData && peeTabData.length && peeTabData.map((peeRow, index) => {
                                        return (
                                            <GenericDiaperTrackingTabPanel
                                                alias={peeRow.alias}
                                                notes={peeRow.notes}
                                                timeStamp={peeRow.timeStamp}
                                                handleDeleteRow={handleDeletePeeRow}
                                                index={index}
                                            />
                                        );
                                    })}
                                </VStack>
                            </TabPanel>
                            <TabPanel>
                                <VStack
                                    alignItems="start"
                                    pl="2"
                                    pr="2"
                                >
                                    <Button onClick={showColorationDialog}>Color and/or Consistency</Button>
                                    {pooTabData && pooTabData.length && pooTabData.map((pooRow, index) => {
                                        return (
                                            <PooTabPanel
                                                alias={pooRow.alias}
                                                color={pooRow.color}
                                                consistency={pooRow.consistency}
                                                description={pooRow.description}
                                                notes={pooRow.notes}
                                                timeStamp={pooRow.timeStamp}
                                                data={pooTabData}
                                                setData={setPooTabData}
                                                index={index}
                                            />
                                        );
                                    })}
                                </VStack>
                            </TabPanel>
                            <TabPanel>
                                <VStack
                                    alignItems="start"
                                    pl="2"
                                    pr="2"
                                >
                                    {dryTabData && dryTabData.length && dryTabData.map((dryRow, index) => {
                                        return (
                                            <GenericDiaperTrackingTabPanel
                                                alias={dryRow.alias}
                                                notes={dryRow.notes}
                                                timeStamp={dryRow.timeStamp}
                                                handleDeleteRow={handleDeleteDryRow}
                                                index={index}
                                            />
                                        );
                                    })}
                                </VStack>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </HStack>
                <AlertDialog
                    isOpen={colorationDialogIsVisible}
                    onClose={() => setColorationDialogIsVisible(false)}
                >
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                                Document Coloration
                            </AlertDialogHeader>
                            <AlertDialogBody>
                                <FormLabel htmlFor='color'>Color</FormLabel>
                                <RadioGroup id='color' value={colorValue} onChange={setColorValue}>
                                    <Stack direction='row'>
                                        <Radio value='yellow'>yellow</Radio>
                                        <Radio value='brown'>brown</Radio>
                                        <Radio value='black'>black</Radio>
                                    </Stack>
                                    <Stack direction='row'>
                                        <Radio value='green'>green</Radio>
                                        <Radio value='orange'>orange</Radio>
                                        <Radio value='red'>red</Radio>
                                        <Radio value='white'>white</Radio>
                                    </Stack>
                                </RadioGroup>
                                <FormLabel htmlFor='consistency'>Consistency</FormLabel>
                                <RadioGroup id='consistency' value={consistencyValue} onChange={setConsistencyValue}>
                                    <Stack direction='row'>
                                        <Radio value='sticky'>sticky</Radio>
                                        <Radio value='mushy'>mushy</Radio>
                                        <Radio value='well-formed'>well-formed</Radio>
                                    </Stack>
                                    <Stack direction='row'>
                                        <Radio value='watery'>watery</Radio>
                                        <Radio value='hard'>hard</Radio>
                                        <Radio value='chalky'>chalky</Radio>
                                        <Radio value='soft'>soft</Radio>
                                    </Stack>
                                </RadioGroup>
                                <FormLabel htmlFor='selected-options'>
                                    Selected Options
                                </FormLabel>
                                <Input
                                    readOnly
                                    value={formatColorConsistencyValue()}
                                    id='selected-options'
                                />
                                <FormLabel htmlFor='description'>
                                    Description
                                </FormLabel>
                                <Textarea
                                    readOnly
                                    value={getDescriptionForColorAndConsistency()}
                                    id='description'
                                />
                            </AlertDialogBody>
                            <AlertDialogFooter>
                                <Button onClick={handleClearDialogEntries}>
                                    Clear
                                </Button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog>
            </Box>
            <form onSubmit={addRowEntry}>
                <VStack
                    pl="2"
                    pr="2"
                    position="fixed"
                    bottom="0"
                    w="100vw"
                    alignItems="start"
                >
                    <FormControl isRequired>
                        <FormLabel htmlFor='alias'>Alias</FormLabel>
                        <Input value={getTabAlias()} onChange={handleTabAliasChange} />
                    </FormControl>
                    <FormLabel htmlFor='notes'>Notes</FormLabel>
                    <Textarea id='notes' placeholder='Notes' value={getTabNotes()} onChange={handleTabNotesChange} />
                    <HStack>
                        <Button type='submit'>Save</Button>
                        <Button onClick={handleClearNotes}>Clear</Button>
                    </HStack>
                </VStack>
            </form>
            <Drawer
                onClose={() => setSearchBarIsOpen(false)}
                bg={_cardBackground}
                w="250px"
                isOpen={searchBarIsOpen}
                placement='right'
            >
                <DrawerOverlay />
                <DrawerContent
                    bg={_screenBackground}
                >
                    <DrawerHeader>Filter Items</DrawerHeader>
                    <DrawerBody>
                        <Tabs index={tabIndex}>
                            <TabPanels>
                                <TabPanel>
                                    {getPeeTabSearchItems()}
                                </TabPanel>
                                <TabPanel>
                                    {getPooTabSearchItems()}
                                </TabPanel>
                                <TabPanel>
                                    {getDryTabSearchItems()}
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </Box>
    );
}
