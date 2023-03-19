import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, HStack, Select, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { firestore } from './firebaseConfig';

export default function SearchBarAlertDialog({ searchBarIsOpen, setSearchBarIsOpen, setFoodData }) {
    const [stageOption, setStageOption] = useState(null);

    const handleSearch = () => {
        let options = [];
        if (stageOption) {
            console.log("Add a stage option!", stageOption);
            firestore.collection('food').where("stage", "==", stageOption.toString())
                .get()
                .then(snapshot => {
                    snapshot.docs.forEach(doc => {
                        options.push({ ...doc.data() });
                        console.log(doc.data());
                    });

                    setFoodData(options);
                    console.log(options);
                });
        }
        // on the case that we do not have query filters then
        // we would want to reset teh food data options
        if (!stageOption) {
            firestore.collection('food')
                .get()
                .then(snapshot => {
                    snapshot.docs.forEach(doc => {
                        options.push({ ...doc.data() });
                        console.log(doc.data());
                    });

                    setFoodData(options);
                    console.log(options);
                });
        }
    };

    return (
        <AlertDialog
            isOpen={searchBarIsOpen}
            placement='right'
            onClose={() => setSearchBarIsOpen(false)}
            size="md"
        >
            <AlertDialogOverlay />
            <AlertDialogContent>
                <AlertDialogHeader>Filter Items</AlertDialogHeader>
                <AlertDialogBody>
                    <Tabs align='start' variant='enclosed' w="100%" h="100%" isFitted>
                        <TabList>
                            <Tab _selected={{ color: 'white', bg: 'blackAlpha.400' }}>
                                Clothes
                            </Tab>
                            <Tab _selected={{ color: 'white', bg: 'blackAlpha.400' }}>
                                Food
                            </Tab>
                            <Tab _selected={{ color: 'white', bg: 'blackAlpha.400' }}>
                                Diapers
                            </Tab>
                            <Tab _selected={{ color: 'white', bg: 'blackAlpha.400' }}>
                                Utilities
                            </Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                Clothing
                            </TabPanel>
                            <TabPanel>
                                <HStack>
                                    <Text>Stage</Text>
                                    <Select placeholder='Select option' value={stageOption} onChange={(event) => {
                                        setStageOption(event.target.value);
                                        console.log(event.target.value);
                                    }}>
                                        <option value='1'>1</option>
                                        <option value='2'>2</option>
                                        <option value='3'>3</option>
                                    </Select>
                                </HStack>
                            </TabPanel>
                            <TabPanel>
                                Diapers
                            </TabPanel>
                            <TabPanel>
                                Utilities
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </AlertDialogBody>
                <AlertDialogFooter>
                    <Button variant='outline' mr={3} onClick={() => setSearchBarIsOpen(false)}>
                        Close
                    </Button>
                    <Button onClick={handleSearch}>Search</Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>);
}
