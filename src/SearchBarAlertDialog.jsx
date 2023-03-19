import { DeleteIcon } from '@chakra-ui/icons';
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, HStack, IconButton, Input, Select, Tab, TabList, TabPanel, TabPanels, Tabs, Text, Tooltip, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { firestore } from './firebaseConfig';

export default function SearchBarAlertDialog({ searchBarIsOpen, setSearchBarIsOpen, setFoodData, setClothingData, setDiaperData, tabIndex }) {
    const [stageOption, setStageOption] = useState(null);
    const [foodPrice, setFoodPrice] = useState(null);
    const [foodBrand, setFoodBrand] = useState(null);

    const [clothingBrand, setClothingBrand] = useState(null);
    const [clothingGender, setClothingGender] = useState(null);
    const [clothingPrice, setClothingPrice] = useState(null);
    const [clothingSize, setClothingSize] = useState(null);
    const [clothingType, setClothingType] = useState(null);

    const [diaperBrand, setDiaperBrand] = useState(null);
    const [diaperPrice, setDiaperPrice] = useState(null);
    const [diaperSize, setDiaperSize] = useState(null);

    const [searchTabIndex, setSearchTabIndex] = useState(tabIndex);

    const handleTabsChange = (index) => {
        setSearchTabIndex(index);
    };

    const handleFoodSearch = () => {
        let options = [];
        const formattedFoodPrice = Number(foodPrice).toFixed(2);


        if (stageOption) {
            firestore.collection('food').where("stage", "==", stageOption)
                .get()
                .then(snapshot => {
                    snapshot.docs.forEach(doc => {
                        options.push({ ...doc.data() });
                    });

                    const uniqueArray = [...new Set(options.map(obj => JSON.stringify(obj)))].map(str => JSON.parse(str));
                    setFoodData(uniqueArray);
                });
        }

        if (formattedFoodPrice && formattedFoodPrice > 0) {
            firestore.collection('food').where("price", "<=", Number(formattedFoodPrice))
                .get()
                .then(snapshot => {
                    snapshot.docs.forEach(doc => {
                        options.push({ ...doc.data() });
                    });
                    const uniqueArray = [...new Set(options.map(obj => JSON.stringify(obj)))].map(str => JSON.parse(str));
                    setFoodData(uniqueArray);
                });
        }

        if (foodBrand) {
            firestore.collection('food').where("brand", "==", foodBrand)
                .get()
                .then(snapshot => {
                    snapshot.docs.forEach(doc => {
                        options.push({ ...doc.data() });
                    });
                    const uniqueArray = [...new Set(options.map(obj => JSON.stringify(obj)))].map(str => JSON.parse(str));
                    setFoodData(uniqueArray);
                });
        }

        if (!stageOption && !foodPrice && !foodBrand) {
            firestore.collection('food')
                .get()
                .then(snapshot => {
                    snapshot.docs.forEach(doc => {
                        options.push({ ...doc.data() });
                    });

                    const uniqueArray = [...new Set(options.map(obj => JSON.stringify(obj)))].map(str => JSON.parse(str));
                    setFoodData(uniqueArray);
                });
        }
    };

    const handleClothingSearch = () => {
        let options = [];
        const formattedClothingPrice = Number(clothingPrice).toFixed(2);

        if (clothingBrand) {
            firestore.collection('clothing').where("brand", "==", clothingBrand)
                .get()
                .then(snapshot => {
                    snapshot.docs.forEach(doc => {
                        options.push({ ...doc.data() });
                    });

                    const uniqueArray = [...new Set(options.map(obj => JSON.stringify(obj)))].map(str => JSON.parse(str));
                    setClothingData(uniqueArray);
                });
        }

        if (clothingGender) {
            firestore.collection('clothing').where("gender", "==", clothingGender)
                .get()
                .then(snapshot => {
                    snapshot.docs.forEach(doc => {
                        options.push({ ...doc.data() });
                    });
                    const uniqueArray = [...new Set(options.map(obj => JSON.stringify(obj)))].map(str => JSON.parse(str));
                    setClothingData(uniqueArray);
                });
        }

        if (formattedClothingPrice && formattedClothingPrice > 0) {
            firestore.collection('clothing').where("price", "<=", Number(formattedClothingPrice))
                .get()
                .then(snapshot => {
                    snapshot.docs.forEach(doc => {
                        options.push({ ...doc.data() });
                    });
                    const uniqueArray = [...new Set(options.map(obj => JSON.stringify(obj)))].map(str => JSON.parse(str));
                    setClothingData(uniqueArray);
                });
        }

        if (clothingType) {
            firestore.collection('clothing').where("type", "==", clothingType)
                .get()
                .then(snapshot => {
                    snapshot.docs.forEach(doc => {
                        options.push({ ...doc.data() });
                    });
                    const uniqueArray = [...new Set(options.map(obj => JSON.stringify(obj)))].map(str => JSON.parse(str));
                    setClothingData(uniqueArray);
                });
        }

        if (clothingSize) {
            firestore.collection('clothing').where("size", "==", clothingSize)
                .get()
                .then(snapshot => {
                    snapshot.docs.forEach(doc => {
                        options.push({ ...doc.data() });
                    });
                    const uniqueArray = [...new Set(options.map(obj => JSON.stringify(obj)))].map(str => JSON.parse(str));
                    setClothingData(uniqueArray);
                });
        }

        if (!clothingSize && !clothingType && !clothingPrice && !clothingGender && !clothingBrand) {
            firestore.collection('clothing')
                .get()
                .then(snapshot => {
                    snapshot.docs.forEach(doc => {
                        options.push({ ...doc.data() });
                    });

                    const uniqueArray = [...new Set(options.map(obj => JSON.stringify(obj)))].map(str => JSON.parse(str));
                    setClothingData(uniqueArray);
                });
        }
    };

    const handleDiaperSearch = () => {
        let options = [];
        const formattedDiaperPrice = Number(diaperPrice).toFixed(2);

        if (diaperBrand) {
            firestore.collection('diapers').where("brand", "==", diaperBrand)
                .get()
                .then(snapshot => {
                    snapshot.docs.forEach(doc => {
                        options.push({ ...doc.data() });
                    });

                    const uniqueArray = [...new Set(options.map(obj => JSON.stringify(obj)))].map(str => JSON.parse(str));
                    setDiaperData(uniqueArray);
                });
        }

        if (formattedDiaperPrice && formattedDiaperPrice > 0) {
            firestore.collection('diapers').where("price", "<=", Number(formattedDiaperPrice))
                .get()
                .then(snapshot => {
                    snapshot.docs.forEach(doc => {
                        options.push({ ...doc.data() });
                    });
                    const uniqueArray = [...new Set(options.map(obj => JSON.stringify(obj)))].map(str => JSON.parse(str));
                    setDiaperData(uniqueArray);
                    console.log(snapshot.docs);
                });
        }

        if (diaperSize && diaperSize > 0) {
            firestore.collection('diapers').where("size", "==", diaperSize)
                .get()
                .then(snapshot => {
                    snapshot.docs.forEach(doc => {
                        options.push({ ...doc.data() });
                    });
                    const uniqueArray = [...new Set(options.map(obj => JSON.stringify(obj)))].map(str => JSON.parse(str));
                    setDiaperData(uniqueArray);
                });
        }

        // on the case that we do not have query filters then
        // we would want to reset teh food data options... later we are going to have to 
        // add in !var2 && !var3 and so on...
        if (!diaperPrice && !diaperSize && !diaperBrand) {
            firestore.collection('diapers')
                .get()
                .then(snapshot => {
                    snapshot.docs.forEach(doc => {
                        options.push({ ...doc.data() });
                    });

                    const uniqueArray = [...new Set(options.map(obj => JSON.stringify(obj)))].map(str => JSON.parse(str));
                    setDiaperData(uniqueArray);
                });
        }
    };

    useEffect(() => {
        if (searchBarIsOpen) {
            setSearchTabIndex(tabIndex);
        }
        //eslint-disable-next-line
    }, [searchBarIsOpen]);

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
                    <Tabs align='start' variant='enclosed' w="100%" h="100%" isFitted index={searchTabIndex} onChange={handleTabsChange}>
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
                                <VStack display="flex" alignItems={"start"}>
                                    <HStack>
                                        <Text>Gender</Text>
                                        <Select placeholder='Select option' value={clothingGender} onChange={(event) => { setClothingGender(event.target.value); }}>
                                            <option value='boy'>boy</option>
                                            <option value='girl'>girl</option>
                                        </Select>
                                    </HStack>
                                    <HStack>
                                        <Text>Brand</Text>
                                        <Select placeholder='Select option' value={clothingBrand} onChange={(event) => { setClothingBrand(event.target.value); }}>
                                            <option value='Carters'> Carters </option>
                                            <option value='Gerber'>Gerber</option>
                                            <option value='Renotemy'>Renotemy</option>
                                            <option value="Burt's Bees Baby">Burt's Bees Baby</option>
                                        </Select>
                                    </HStack>
                                    <HStack>
                                        <Text>Size</Text>
                                        <Input placeholder="size equal to..." value={clothingSize} onChange={(event) => setClothingSize(event.target.value)} />
                                    </HStack>
                                    <HStack>
                                        <Text>Type</Text>
                                        <Select placeholder='Select option' value={clothingType} onChange={(event) => { setClothingType(event.target.value); }}>
                                            <option value='footie'>footie</option>
                                            <option value='shirt'>shirt</option>
                                            <option value='pants'>pants</option>
                                            <option value='bodysuits'>bodysuits</option>
                                            <option value='romper'>romper</option>
                                            <option value='sunsuit'>sunsuit</option>
                                            <option value='dress'>dress</option>
                                        </Select>
                                    </HStack>
                                    <HStack>
                                        <Button onClick={handleClothingSearch}>Search</Button>
                                        <Tooltip label="Clear filters">
                                            <IconButton icon={<DeleteIcon />} onClick={() => {
                                                setClothingBrand("");
                                                setClothingGender("");
                                                setClothingPrice("");
                                                setClothingSize("");
                                                setClothingType("");
                                            }}
                                            />
                                        </Tooltip>
                                    </HStack>
                                </VStack>
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
                                        <Input placeholder="price no more than..." value={foodPrice} onChange={(event) => setFoodPrice(event.target.value.replace(/[^0-9.-]/g, ""))} />
                                    </HStack>
                                    <HStack>
                                        <Text>Brand</Text>
                                        <Select placeholder='Select option' value={foodBrand} onChange={(event) => { setFoodBrand(event.target.value); }}>
                                            <option value='Plum Organics'> Plum Organics </option>
                                            <option value='Happy Baby'>Happy Baby</option>
                                            <option value='Beech-Nut'>Beech-Nut</option>
                                            <option value='Mama Bear'>Mama Bear</option>
                                            <option value='Gerber'>Gerber</option>
                                            <option value='Sprouts'>Sprouts</option>
                                        </Select>
                                    </HStack>
                                    <HStack>
                                        <Button onClick={handleFoodSearch}>Search</Button>
                                        <Tooltip label="Clear filters">
                                            <IconButton icon={<DeleteIcon />} onClick={() => {
                                                setFoodBrand("");
                                                setFoodPrice("");
                                                setStageOption("");
                                            }}
                                            />
                                        </Tooltip>
                                    </HStack>
                                </VStack>
                            </TabPanel>
                            <TabPanel>
                                <VStack display="flex" alignItems={"start"}>
                                    <HStack>
                                        <Text>Brand</Text>
                                        <Select placeholder='Select option' value={diaperBrand} onChange={(event) => { setDiaperBrand(event.target.value); }}>
                                            <option value='Pampers'>Pampers</option>
                                            <option value='Huggies'>Huggies</option>
                                            <option value='Luvs'>Luvs</option>
                                        </Select>
                                    </HStack>
                                    <HStack>
                                        <Text>Price {diaperPrice}</Text>
                                        <Input placeholder="price no more than..." value={diaperPrice} onChange={(event) => setDiaperPrice(event.target.value.replace(/[^0-9.-]/g, ""))} />
                                    </HStack>
                                    <HStack>
                                        <Text>Size</Text>
                                        <Input placeholder="size equal to..." value={diaperSize} onChange={(event) => setDiaperSize(event.target.value)} />
                                    </HStack>
                                    <HStack>
                                        <Button onClick={handleDiaperSearch}>Search</Button>
                                        <Tooltip label="Clear filters">
                                            <IconButton icon={<DeleteIcon />} onClick={() => {
                                                setDiaperBrand("");
                                                setDiaperSize("");
                                                setDiaperPrice("");
                                            }}
                                            />
                                        </Tooltip>
                                    </HStack>
                                </VStack>
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
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
