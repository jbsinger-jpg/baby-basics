import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, ButtonGroup, Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, FormControl, FormLabel, HStack, Input, InputGroup, InputRightAddon, Radio, RadioGroup, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Text, Textarea, VStack, useColorModeValue, useToast } from '@chakra-ui/react';
import React, { useState } from 'react';

import { cardBackground, screenBackground } from '../defaultStyle';
import FloatingActionButtonsDiaperTracking from '../components/floatingActionButtons/FloatingActionButtonsDiaperTracking';
import GenericDiaperTrackingTabPanel from '../components/tabPanels/GenericDiaperTrackingTabPanel';
import PooTabPanel from '../components/tabPanels/PooTabPanel';
import { STATUS, babyPoopColorData, babyPoopConsistencyData } from '../components/staticPageData/baby-color-consistency-info';
import { auth, firestore } from '../firebaseConfig';
import { useEffect } from 'react';
import WaterDropIcon from '../components/staticPageData/WaterDropIcon';
import PoopIcon from '../components/staticPageData/PoopIcon';
import { CloseIcon, Icon } from '@chakra-ui/icons';

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

    // Search bar useStates
    const [peeSearchDateMonth, setPeeSearchDateMonth] = useState("");
    const [peeSearchDateDay, setPeeSearchDateDay] = useState("");
    const [peeSearchDateYear, setPeeSearchDateYear] = useState("");

    const [peeSearchAlias, setPeeSearchAlias] = useState("");

    const [pooSearchDateMonth, setPooSearchDateMonth] = useState("");
    const [pooSearchDateDay, setPooSearchDateDay] = useState("");
    const [pooSearchDateYear, setPooSearchDateYear] = useState("");

    const [pooSearchAlias, setPooSearchAlias] = useState("");
    const [pooSearchConsistency, setPooSearchConsistency] = useState("");
    const [pooSearchColor, setPooSearchColor] = useState("");


    const [drySearchDateMonth, setDrySearchDateMonth] = useState("");
    const [drySearchDateDay, setDrySearchDateDay] = useState("");
    const [drySearchDateYear, setDrySearchDateYear] = useState("");
    const [drySearchAlias, setDrySearchAlias] = useState("");

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

    const getStatusForColor = () => {
        for (let i = 0; i < babyPoopColorData.length; i++) {
            if (babyPoopColorData[i].color === colorValue) {
                return { description: babyPoopColorData[i].description, status: babyPoopColorData[i].status };
            }
        }

        return { description: STATUS.NONE, status: STATUS.NONE };
    };

    const getStatusForConsistency = () => {
        for (let i = 0; i < babyPoopConsistencyData.length; i++) {
            if (babyPoopConsistencyData[i].consistency === consistencyValue) {
                console.log("Match! ", babyPoopConsistencyData[i].status);
                return { description: babyPoopConsistencyData[i].description, status: babyPoopConsistencyData[i].status, };
            }
        }

        return { description: STATUS.NONE, status: STATUS.NONE };
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
                    timeStampDate: new Date().toLocaleDateString(),
                });

                setPeeTabData(
                    [...peeTabData, {
                        alias: String(peeTabAlias).trim(),
                        notes: peeTabNotes,
                        timeStampDate: new Date().toLocaleDateString(),
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
                timeStampDate: new Date().toLocaleDateString(),
                colorStatus: getStatusForColor(),
                consistencyStatus: getStatusForConsistency(),
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
                    timeStampDate: new Date().toLocaleDateString(),
                });

                setDryTabData(
                    [...dryTabData, {
                        alias: dryTabAlias,
                        notes: dryTabNotes,
                        timeStampDate: new Date().toLocaleDateString(),
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
        firestore.collection("users").doc(auth?.currentUser?.uid).collection("pee-tracking")
            .get()
            .then((snapshot) => {
                let initialData = [];
                snapshot.docs.forEach(doc => {
                    initialData.push(doc.data());
                });
                setPeeTabData(initialData);
            });

        firestore.collection("users").doc(auth?.currentUser?.uid).collection("poo-tracking")
            .get()
            .then((snapshot) => {
                let initialData = [];
                snapshot.docs.forEach(doc => {
                    initialData.push(doc.data());
                });
                setPooTabData(initialData);
            });

        firestore.collection("users").doc(auth?.currentUser?.uid).collection("dry-tracking")
            .get()
            .then((snapshot) => {
                let initialData = [];
                snapshot.docs.forEach(doc => {
                    initialData.push(doc.data());
                });
                setDryTabData(initialData);
            });
        //eslint-disable-next-line
    }, [auth?.currentUser?.uid]);

    const handleDeletePeeRow = (index, alias) => {
        firestore.collection("users").doc(auth?.currentUser?.uid).collection("pee-tracking").doc(alias).delete();
        const updatedArray = [...peeTabData];
        updatedArray.splice(index, 1);
        setPeeTabData(updatedArray);
    };

    const handleDeleteDryRow = (index, alias) => {
        firestore.collection("users").doc(auth?.currentUser?.uid).collection("dry-tracking").doc(alias).delete();
        const updatedArray = [...dryTabData];
        updatedArray.splice(index, 1);
        setDryTabData(updatedArray);
    };

    const getPeeTabSearchItems = () => {
        return (
            <VStack w="100%" alignItems="start">
                <VStack alignItems="start">
                    <FormLabel htmlFor="date">Date</FormLabel>
                    <InputGroup>
                        <Input id="date" value={peeSearchDateMonth} onChange={(event) => setPeeSearchDateMonth(event.target.value)} />
                        <InputRightAddon>/</InputRightAddon>
                        <Input value={peeSearchDateDay} onChange={(event) => setPeeSearchDateDay(event.target.value)} />
                        <InputRightAddon>/</InputRightAddon>
                        <Input value={peeSearchDateYear} onChange={(event) => setPeeSearchDateYear(event.target.value)} />
                    </InputGroup>
                </VStack>
                <VStack alignItems="start">
                    <FormLabel htmlFor="alias">Alias</FormLabel>
                    <Input id="alias" value={peeSearchAlias} onChange={(event) => setPeeSearchAlias(event.target.value)} />
                </VStack>
            </VStack>
        );
    };

    const getPooTabSearchItems = () => {
        return (
            <VStack w="100%" alignItems="start">
                <VStack alignItems="start">
                    <FormLabel htmlFor="date">Date</FormLabel>
                    <InputGroup>
                        <Input id="date" value={pooSearchDateMonth} onChange={(event) => setPooSearchDateMonth(event.target.value)} />
                        <InputRightAddon>/</InputRightAddon>
                        <Input value={pooSearchDateDay} onChange={(event) => setPooSearchDateDay(event.target.value)} />
                        <InputRightAddon>/</InputRightAddon>
                        <Input value={pooSearchDateYear} onChange={(event) => setPooSearchDateYear(event.target.value)} />
                    </InputGroup>
                </VStack>
                <VStack alignItems="start">
                    <FormLabel htmlFor="alias">Alias</FormLabel>
                    <Input id="alias" value={pooSearchAlias} onChange={(event) => setPooSearchAlias(event.target.value)} />
                </VStack>
                <VStack alignItems="start">
                    <FormLabel htmlFor="consistency">Consistency</FormLabel>
                    <Input id="consistency" value={pooSearchConsistency} onChange={(event) => setPooSearchConsistency(event.target.value)} />
                </VStack>
                <VStack alignItems="start">
                    <FormLabel htmlFor="color">Color</FormLabel>
                    <Input id="color" value={pooSearchColor} onChange={(event) => setPooSearchColor(event.target.value)} />
                </VStack>
            </VStack>
        );
    };

    const getDryTabSearchItems = () => {
        return (
            <VStack w="100%" alignItems="start">
                <VStack alignItems="start">
                    <FormLabel htmlFor="date">Date</FormLabel>
                    <InputGroup>
                        <Input id="date" value={drySearchDateMonth} onChange={(event) => setDrySearchDateMonth(event.target.value)} />
                        <InputRightAddon>/</InputRightAddon>
                        <Input value={drySearchDateDay} onChange={(event) => setDrySearchDateDay(event.target.value)} />
                        <InputRightAddon>/</InputRightAddon>
                        <Input value={drySearchDateYear} onChange={(event) => setDrySearchDateYear(event.target.value)} />
                    </InputGroup>
                </VStack>
                <VStack alignItems="start">
                    <FormLabel htmlFor="alias">Alias</FormLabel>
                    <Input id="alias" value={drySearchAlias} onChange={(event) => setDrySearchAlias(event.target.value)} />
                </VStack>
            </VStack>
        );
    };

    const getTabPanelData = () => {
        if (tabIndex === 0) {
            return peeTabData;
        }
        else if (tabIndex === 1) {
            return pooTabData;
        }
        else if (tabIndex === 2) {
            return dryTabData;
        }
    };

    const generateSearch = async () => {
        // TODO: Double check the dbFields that are being passed in for database search. Not sure if these line up with what is supposed to be seen in firebase.
        if (tabIndex === 0) {
            let peeRef = firestore.collection("users").doc(auth?.currentUser?.uid).collection("pee-tracking");
            let peeQueryFilters = [];
            let peeData = [];

            if (peeSearchDateDay && peeSearchDateMonth && peeSearchDateYear) {
                peeQueryFilters.push({ dbField: "timeStampDate", operator: "==", operand: peeSearchDateMonth + "/" + peeSearchDateDay + "/" + peeSearchDateYear });
            }

            if (peeSearchAlias) {
                peeQueryFilters.push({ dbField: "alias", operator: "==", operand: peeSearchAlias });
            }

            for (let i = 0; i < peeQueryFilters.length; i++) {
                peeRef = await peeRef.where(peeQueryFilters[i].dbField, peeQueryFilters[i].operator, peeQueryFilters[i].operand);
            }

            peeRef.get().then((querySnapshot => {
                querySnapshot.docs.forEach(doc => {
                    peeData.push({ ...doc.data() });
                });

                setPeeTabData(peeData);
            }));
        }
        else if (tabIndex === 1) {
            let pooRef = firestore.collection("users").doc(auth?.currentUser?.uid).collection("poo-tracking");
            let pooQueryFilters = [];
            let pooData = [];

            if (pooSearchDateDay && pooSearchDateMonth && pooSearchDateYear) {
                pooQueryFilters.push({ dbField: "timeStampDate", operator: "==", operand: pooSearchDateMonth + "/" + pooSearchDateDay + "/" + pooSearchDateYear });
            }

            if (pooSearchAlias) {
                pooQueryFilters.push({ dbField: "alias", operator: "==", operand: pooSearchAlias });
            }

            if (pooSearchColor) {
                pooQueryFilters.push({ dbField: "color", operator: "==", operand: pooSearchColor });
            }

            if (pooSearchConsistency) {
                pooQueryFilters.push({ dbField: "consistency", operator: "==", operand: pooSearchConsistency });
            }


            for (let i = 0; i < pooQueryFilters.length; i++) {
                pooRef = await pooRef.where(pooQueryFilters[i].dbField, pooQueryFilters[i].operator, pooQueryFilters[i].operand);
            }

            pooRef.get().then((querySnapshot => {
                querySnapshot.docs.forEach(doc => {
                    pooData.push({ ...doc.data() });
                });

                setPooTabData(pooData);
            }));
        }
        else if (tabIndex === 2) {
            let dryRef = firestore.collection("users").doc(auth?.currentUser?.uid).collection("dry-tracking");
            let dryQueryFilters = [];
            let dryData = [];

            if (drySearchDateDay && drySearchDateMonth && drySearchDateYear) {
                dryQueryFilters.push({ dbField: "timeStampDate", operator: "==", operand: drySearchDateMonth + "/" + drySearchDateDay + "/" + drySearchDateYear });
            }

            if (drySearchAlias) {
                dryQueryFilters.push({ dbField: "alias", operator: "==", operand: drySearchAlias });
            }

            for (let i = 0; i < dryQueryFilters.length; i++) {
                dryRef = await dryRef.where(dryQueryFilters[i].dbField, dryQueryFilters[i].operator, dryQueryFilters[i].operand);
            }

            dryRef.get().then((querySnapshot => {
                querySnapshot.docs.forEach(doc => {
                    dryData.push({ ...doc.data() });
                });

                setDryTabData(dryData);
            }));
        }
    };

    const clearSearch = () => {
        if (tabIndex === 0) {
            setPeeSearchDateDay("");
            setPeeSearchDateMonth("");
            setPeeSearchDateYear("");
            setPeeSearchAlias("");
        }
        else if (tabIndex === 1) {
            setPooSearchDateDay("");
            setPooSearchDateMonth("");
            setPooSearchDateYear("");
            setPooSearchColor("");
            setPooSearchConsistency("");
            setPooSearchAlias("");
        }
        else if (tabIndex === 2) {
            setDrySearchDateDay("");
            setDrySearchDateMonth("");
            setDrySearchDateYear("");
            setDrySearchAlias("");
        }
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
                    tabPanelData={getTabPanelData()}
                />
                <HStack
                    alignItems='start'
                >
                    <Tabs variant='enclosed' index={tabIndex} onChange={handleTabsChange} width="100vw">
                        <TabList>
                            <Tab>
                                <HStack>
                                    <Text>Pee</Text>
                                    <WaterDropIcon />
                                </HStack>
                            </Tab>
                            <Tab>
                                <HStack>
                                    <Text>Poo</Text>
                                    <PoopIcon />
                                </HStack>
                            </Tab>
                            <Tab>
                                <HStack>
                                    <Text>Dry</Text>
                                    <Icon as={CloseIcon} viewBox="0 0 512 512" boxSize="35" color="white" fill="white" scale={0.5} opacity={0}>
                                        {/* Icon deliberately empty to make text consistent */}
                                    </Icon>
                                </HStack>
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
                                                color={peeRow.color}
                                                colorStatus={peeRow.colorStatus}
                                                timeStampDate={peeRow.timeStampDate}
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
                                                status={pooRow.status}
                                                timeStampDate={pooRow.timeStampDate}
                                                data={pooTabData}
                                                setData={setPooTabData}
                                                index={index}
                                                colorStatus={pooRow.colorStatus}
                                                consistencyStatus={pooRow.consistencyStatus}
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
                                                color={dryRow.color}
                                                colorStatus={dryRow.colorStatus}
                                                timeStampDate={dryRow.timeStampDate}
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
                        <Tabs variant='enclosed' index={tabIndex} onChange={handleTabsChange} overflowX="hidden" align="start">
                            <TabList>
                                <Tab>
                                    <HStack>
                                        <Text>Pee</Text>
                                        <WaterDropIcon />
                                    </HStack>
                                </Tab>
                                <Tab>
                                    <HStack>
                                        <Text>Poo</Text>
                                        <PoopIcon />
                                    </HStack>
                                </Tab>
                                <Tab>
                                    <HStack>
                                        <Text>Dry</Text>
                                        <Icon as={CloseIcon} viewBox="0 0 512 512" boxSize="35" color="white" fill="white" scale={0.5} opacity={0}>
                                            {/* Icon deliberately empty to make text consistent */}
                                        </Icon>
                                    </HStack>
                                </Tab>
                            </TabList>
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
                    <DrawerFooter>
                        <ButtonGroup>
                            <Button onClick={clearSearch}>Clear</Button>
                            <Button onClick={generateSearch}>Search</Button>
                        </ButtonGroup>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </Box>
    );
}
