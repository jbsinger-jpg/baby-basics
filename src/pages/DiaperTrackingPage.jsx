import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, FormLabel, HStack, Icon, IconButton, Input, Radio, RadioGroup, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Text, Textarea, VStack, useColorModeValue } from '@chakra-ui/react';
import React, { useState } from 'react';

import { screenBackground } from '../defaultStyle';
import FloatingActionButtonsDiaperTracking from '../components/floatingActionButtons/FloatingActionButtonsDiaperTracking';
import WaterDropIcon from '@mui/icons-material/Water';
import DoDisturbAltIcon from '@mui/icons-material/DoDisturbAlt';
import VolcanoIcon from '@mui/icons-material/Volcano';
import PeeTabPanel from '../components/tabPanels/PeeTabPanel';
import PooTabPanel from '../components/tabPanels/PooTabPanel';
import DryTabPanel from '../components/tabPanels/DryTabPanel';

const babyPoopColorData = [
    { color: "yellow", description: "Usual coloration for babies that are breast-fed, during the meconium stage." },
    { color: "brown", description: "Coloration usually found within formula fed babies." },
    { color: "black", description: "Coloration can be considered normal for babies in the meconium stage. Should consider contacting doctor." },
    { color: "red", description: "Coloration can be caused from sudden change in diet. Red streaks could be blood should consider contacting doctor." },
    { color: "green", description: "Coloration can be caused from either bacterial infection or sudden change in diet. Should consider contacting doctor." },
    { color: "orange", description: "Coloration can be caused by certain medications that the baby was given, and/or diet related." },
];

const babyPoopConsistencyData = [
    { consistency: "sticky", description: "Baby's first bowel movements are considered to be sticky/tar-like" },
    { consistency: "mushy", description: "Is the consistency of baby's first bowel movements and is a good indication that they are breast-fed." },
    { consistency: "well-formed", description: "This is normal once babies start to eat solid foods." },
    { consistency: "watery", description: "Good indication that the baby has diarrhea." },
    { consistency: "hard", description: "Good indication that the baby is constipated." },
    { consistency: "chalky", description: "Could be an indicator for potential liver problems. Should consider contacting a doctor." },
    { consistency: "soft", description: "Formula-fed babies usually have poop that is soft, with a similar texture to peanut butter." },
];

export default function DiaperTrackingPage() {
    const _screenBackground = useColorModeValue(screenBackground.light, screenBackground.dark);
    const [colorationDialogIsVisible, setColorationDialogIsVisible] = useState(false);
    const [tabIndex, setTabIndex] = useState(0);
    const [colorValue, setColorValue] = useState('none');
    const [consistencyValue, setConsistencyValue] = useState('none');

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

    const addRowEntry = () => {
        if (tabIndex === 0) {
            setPeeTabData([...peeTabData, { alias: peeTabAlias, notes: peeTabNotes, timeStamp: new Date().toLocaleTimeString() }]);
        }
        else if (tabIndex === 1) {
            let newEntry = {
                alias: pooTabAlias,
                color: colorValue,
                consistency: consistencyValue,
                notes: pooTabNotes,
                timeStamp: new Date().toLocaleTimeString()
            };
            setPooTabData([...pooTabData, newEntry]);
        }
        else if (tabIndex === 2) {
            setDryTabData([...dryTabData, { alias: dryTabAlias, notes: dryTabNotes, timeStamp: new Date().toLocaleTimeString() }]);
        }
    };

    return (
        <>
            <Box
                bg={_screenBackground}
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
                                    {pooTabData && pooTabData.length && pooTabData.map(pooRow => {
                                        return (
                                            <PooTabPanel
                                                notes={pooRow.notes}
                                                color={pooRow.color}
                                                consistency={pooRow.consistency}
                                                timeStamp={pooRow.timeStamp}
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
                                    disabled
                                    value={formatColorConsistencyValue()}
                                    id='selected-options'
                                />
                                <FormLabel htmlFor='description'>
                                    Description
                                </FormLabel>
                                <Textarea
                                    disabled
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
            <VStack
                pl="2"
                pr="2"
                position="fixed"
                bottom="0"
                w="100vw"
                alignItems="start"
                bg={_screenBackground}
            >
                <FormLabel htmlFor='alias'>Alias</FormLabel>
                <Input value={getTabAlias()} onChange={handleTabAliasChange} />
                <FormLabel htmlFor='notes'>Notes</FormLabel>
                <Textarea id='notes' placeholder='Notes' value={getTabNotes()} onChange={handleTabNotesChange} />
                <HStack>
                    <Button onClick={addRowEntry}>Save</Button>
                    <Button onClick={handleClearNotes}>Clear</Button>
                </HStack>
            </VStack>
        </>
    );
}
