import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, HStack, Input, Select, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { firestore } from './firebaseConfig';

export default function SearchBarAlertDialog({ searchBarIsOpen, setSearchBarIsOpen, setFoodData, setClothingData, setDiaperData }) {
    const [stageOption, setStageOption] = useState(null);
    const [price, setPrice] = useState(null);

    const handleSearch = () => {
        let options = [];
        // make an option to be inclusive or exclusive with the querying system
        // might want to filter by price OR stage, alternatively filter by price AND stage

        if (stageOption) {
            firestore.collection('food').where("stage", "==", stageOption.toString())
                .get()
                .then(snapshot => {
                    snapshot.docs.forEach(doc => {
                        options.push({ ...doc.data() });
                    });

                    const uniqueArray = [...new Set(options.map(obj => JSON.stringify(obj)))].map(str => JSON.parse(str));
                    setFoodData(uniqueArray);
                });
        }

        if (price && price > 0) {
            firestore.collection('food').where("price", "<=", price)
                .get()
                .then(snapshot => {
                    snapshot.docs.forEach(doc => {
                        options.push({ ...doc.data() });
                    });
                    const uniqueArray = [...new Set(options.map(obj => JSON.stringify(obj)))].map(str => JSON.parse(str));
                    setFoodData(uniqueArray);
                });
        }

        // on the case that we do not have query filters then
        // we would want to reset teh food data options... later we are going to have to 
        // add in !var2 && !var3 and so on...
        if (!stageOption && !price) {
            firestore.collection('food')
                .get()
                .then(snapshot => {
                    snapshot.docs.forEach(doc => {
                        options.push({ ...doc.data() });
                    });

                    setFoodData(new Set(options));
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
                                <VStack display="flex" alignItems={"start"}>
                                    <HStack>
                                        <Text>Stage</Text>
                                        <Select placeholder='Select option' value={stageOption} onChange={(event) => { setStageOption(event.target.value); }}>
                                            <option value='1'>1</option>
                                            <option value='2'>2</option>
                                            <option value='3'>3</option>
                                        </Select>
                                    </HStack>
                                    <HStack>
                                        <Text>Price</Text>
                                        <Input placeholder="price no more than..." value={price} onChange={(event) => setPrice(event.target.value)} />
                                    </HStack>
                                </VStack>
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
