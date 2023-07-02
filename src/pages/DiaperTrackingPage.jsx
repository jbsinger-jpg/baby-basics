import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, FormLabel, HStack, Icon, IconButton, Input, Radio, RadioGroup, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Text, Textarea, VStack, useColorModeValue } from '@chakra-ui/react';
import React, { useState } from 'react';

import { screenBackground } from '../defaultStyle';
import FloatingActionButtonsDiaperTracking from '../components/floatingActionButtons/FloatingActionButtonsDiaperTracking';
import WaterDropIcon from '@mui/icons-material/Water';
import DoDisturbAltIcon from '@mui/icons-material/DoDisturbAlt';
import VolcanoIcon from '@mui/icons-material/Volcano';

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

    return (
        <Box
            bg={_screenBackground}
            height="100vh"
            width="100vw"
        >
            <FloatingActionButtonsDiaperTracking />
            <HStack
                alignItems='start'
                width="100vw"
            >
                <Tabs variant='enclosed' index={tabIndex} onChange={handleTabsChange}>
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
                            Pee stuff...
                        </TabPanel>
                        <TabPanel>
                            <VStack
                                alignItems="start"
                                pl="2"
                                pr="2"
                            >
                                <Button onClick={showColorationDialog}>Color and/or Consistency</Button>
                            </VStack>
                        </TabPanel>
                        <TabPanel>
                            Dry stuff...
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </HStack>
            <VStack
                pl="2"
                pr="2"
                position="absolute"
                bottom="10"
                w="100vw"
                alignItems="start"
            >
                <FormLabel htmlFor='notes'>Notes</FormLabel>
                <Textarea id='notes' placeholder='Notes' />
                <Button alignSelf='center'>Save</Button>
            </VStack>
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
    );
}
