import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, FormControl, FormLabel, HStack, Icon, IconButton, Input, Radio, RadioGroup, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Text, Textarea, VStack, useColorModeValue, useToast } from '@chakra-ui/react';
import React, { useState } from 'react';

import { screenBackground } from '../defaultStyle';
import FloatingActionButtonsDiaperTracking from '../components/floatingActionButtons/FloatingActionButtonsDiaperTracking';
import WaterDropIcon from '@mui/icons-material/Water';
import DoDisturbAltIcon from '@mui/icons-material/DoDisturbAlt';
import VolcanoIcon from '@mui/icons-material/Volcano';
import PeeTabPanel from '../components/tabPanels/PeeTabPanel';
import PooTabPanel from '../components/tabPanels/PooTabPanel';
import DryTabPanel from '../components/tabPanels/DryTabPanel';
import { babyPoopColorData, babyPoopConsistencyData } from '../components/staticPageData/baby-color-consistency-info';

export default function DiaperTrackingPage() {
    const _screenBackground = useColorModeValue(screenBackground.light, screenBackground.dark);
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

    const peeTabAliasDuplicateFound = () => {
        return peeTabData.some(tab => tab.alias === peeTabAlias);
    };

    const pooTabAliasDuplicateFound = () => {
        return pooTabData.some(tab => tab.alias === pooTabAlias);
    };

    const dryTabAliasDuplicateFound = () => {
        return dryTabData.some(tab => tab.alias === dryTabAlias);

    };

    const addRowEntry = (event) => {
        event.preventDefault();

        if (tabIndex === 0) {
            if (!peeTabAliasDuplicateFound())
                setPeeTabData(
                    [...peeTabData, {
                        alias: peeTabAlias,
                        notes: peeTabNotes,
                        timeStamp: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`
                    }]
                );
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
            if (!pooTabAliasDuplicateFound()) {
                let newEntry = {
                    alias: pooTabAlias,
                    color: colorValue,
                    consistency: consistencyValue,
                    notes: pooTabNotes,
                    timeStamp: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
                    description: getDescriptionForColorAndConsistency()
                };
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
            if (!dryTabAliasDuplicateFound()) {
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
                <FloatingActionButtonsDiaperTracking />
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
                                    {peeTabData && peeTabData.length && peeTabData.map(peeRow => {
                                        return (
                                            <PeeTabPanel
                                                alias={peeRow.alias}
                                                notes={peeRow.notes}
                                                timeStamp={peeRow.timeStamp}
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
                                                tempData={pooTabData}
                                                setTempData={setPooTabData}
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
                                    {dryTabData && dryTabData.length && dryTabData.map(dryRow => {
                                        return (
                                            <DryTabPanel
                                                notes={dryRow.notes}
                                                timeStamp={dryRow.timeStamp}
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
        </Box>
    );
}
