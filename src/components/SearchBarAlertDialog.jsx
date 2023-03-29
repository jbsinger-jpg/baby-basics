import { DeleteIcon } from '@chakra-ui/icons';
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, HStack, IconButton, Input, Select, Tab, TabList, TabPanel, TabPanels, Tabs, Text, Tooltip, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { firestore } from '../firebaseConfig';

export default function SearchBarAlertDialog({ searchBarIsOpen, setSearchBarIsOpen, setFoodData, setClothingData, setDiaperData, tabIndex, setTabIndex }) {
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
        setTabIndex(index);
    };

    const handleFoodSearch = async () => {
        let options = [];
        let foodOptions = [];
        let foodData = [];

        const formattedFoodPrice = Number(foodPrice).toFixed(2);
        let foodRef = await firestore.collection('food');

        if (stageOption) {
            foodOptions.push({ dbField: "stage", operator: "==", operand: stageOption });
        }

        if (formattedFoodPrice && formattedFoodPrice > 0) {
            foodOptions.push({ dbField: "price", operator: "<=", operand: Number(formattedFoodPrice) });
        }

        if (foodBrand) {
            foodOptions.push({ dbField: "brand", operator: "==", operand: foodBrand });
        }

        for (let i = 0; i < foodOptions.length; i++) {
            foodRef = await foodRef.where(foodOptions[i].dbField, foodOptions[i].operator, foodOptions[i].operand);
        }

        foodRef.get().then((querySnapshot => {
            querySnapshot.docs.forEach(doc => {
                foodData.push({ ...doc.data() });
            });

            setFoodData(foodData);
        }));

        ////Inclusive Search
        // if (stageOption) {
        //     firestore.collection('food').where("stage", "==", stageOption)
        //         .get()
        //         .then(snapshot => {
        //             snapshot.docs.forEach(doc => {
        //                 options.push({ ...doc.data() });
        //             });

        //             const uniqueArray = [...new Set(options.map(obj => JSON.stringify(obj)))].map(str => JSON.parse(str));
        //             setFoodData(uniqueArray);
        //         });
        // }

        // if (formattedFoodPrice && formattedFoodPrice > 0) {
        //     firestore.collection('food').where("price", "<=", Number(formattedFoodPrice))
        //         .get()
        //         .then(snapshot => {
        //             snapshot.docs.forEach(doc => {
        //                 options.push({ ...doc.data() });
        //             });
        //             const uniqueArray = [...new Set(options.map(obj => JSON.stringify(obj)))].map(str => JSON.parse(str));
        //             setFoodData(uniqueArray);
        //         });
        // }

        // if (foodBrand) {
        //     firestore.collection('food').where("brand", "==", foodBrand)
        //         .get()
        //         .then(snapshot => {
        //             snapshot.docs.forEach(doc => {
        //                 options.push({ ...doc.data() });
        //             });
        //             const uniqueArray = [...new Set(options.map(obj => JSON.stringify(obj)))].map(str => JSON.parse(str));
        //             setFoodData(uniqueArray);
        //         });
        // }

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

    const handleClothingSearch = async () => {
        let options = [];
        let clothingOptions = [];
        let clothingData = [];

        const formattedClothingPrice = Number(clothingPrice).toFixed(2);
        let clothingRef = await firestore.collection('clothing');

        if (clothingBrand) {
            clothingOptions.push({ dbField: "brand", operator: "==", operand: clothingBrand });
        }

        if (clothingGender) {
            clothingOptions.push({ dbField: "gender", operator: "==", operand: clothingGender });
        }

        if (formattedClothingPrice && formattedClothingPrice > 0) {
            clothingOptions.push({ dbField: "price", operator: "<=", operand: Number(formattedClothingPrice) });
        }

        if (clothingType) {
            clothingOptions.push({ dbField: "type", operator: "==", operand: clothingType });
        }

        if (clothingSize) {
            clothingOptions.push({ dbField: "querySizes", operator: "array-contains", operand: clothingSize });
        }

        for (let i = 0; i < clothingOptions.length; i++) {
            clothingRef = await clothingRef.where(clothingOptions[i].dbField, clothingOptions[i].operator, clothingOptions[i].operand);
        }


        clothingRef.get().then((querySnapshot => {
            querySnapshot.docs.forEach(doc => {
                clothingData.push({ ...doc.data() });
            });

            setClothingData(clothingData);
        }));

        ////Inclusive Search
        // if (clothingBrand) {
        //     firestore.collection('clothing').where("brand", "==", clothingBrand)
        //         .get()
        //         .then(snapshot => {
        //             snapshot.docs.forEach(doc => {
        //                 options.push({ ...doc.data() });
        //             });

        //             const uniqueArray = [...new Set(options.map(obj => JSON.stringify(obj)))].map(str => JSON.parse(str));
        //             setClothingData(uniqueArray);
        //         });
        // }

        // if (clothingGender) {
        //     firestore.collection('clothing').where("gender", "==", clothingGender)
        //         .get()
        //         .then(snapshot => {
        //             snapshot.docs.forEach(doc => {
        //                 options.push({ ...doc.data() });
        //             });
        //             const uniqueArray = [...new Set(options.map(obj => JSON.stringify(obj)))].map(str => JSON.parse(str));
        //             setClothingData(uniqueArray);
        //         });
        // }

        // if (formattedClothingPrice && formattedClothingPrice > 0) {
        //     firestore.collection('clothing').where("price", "<=", Number(formattedClothingPrice))
        //         .get()
        //         .then(snapshot => {
        //             snapshot.docs.forEach(doc => {
        //                 options.push({ ...doc.data() });
        //             });
        //             const uniqueArray = [...new Set(options.map(obj => JSON.stringify(obj)))].map(str => JSON.parse(str));
        //             setClothingData(uniqueArray);
        //         });
        // }

        // if (clothingType) {
        //     firestore.collection('clothing').where("type", "==", clothingType)
        //         .get()
        //         .then(snapshot => {
        //             snapshot.docs.forEach(doc => {
        //                 options.push({ ...doc.data() });
        //             });
        //             const uniqueArray = [...new Set(options.map(obj => JSON.stringify(obj)))].map(str => JSON.parse(str));
        //             setClothingData(uniqueArray);
        //         });
        // }

        // if (clothingSize) {
        //     firestore.collection('clothing').where("querySizes", "array-contains", clothingSize)
        //         .get()
        //         .then(snapshot => {
        //             snapshot.docs.forEach(doc => {
        //                 options.push({ ...doc.data() });
        //             });
        //             const uniqueArray = [...new Set(options.map(obj => JSON.stringify(obj)))].map(str => JSON.parse(str));
        //             setClothingData(uniqueArray);
        //         });
        // }

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

    const handleDiaperSearch = async () => {
        let options = [];
        let diaperOptions = [];
        let diaperData = [];

        let diaperRef = await firestore.collection('diapers');
        const formattedDiaperPrice = Number(diaperPrice).toFixed(2);

        if (diaperBrand) {
            diaperOptions.push({ dbField: "brand", operator: "==", operand: diaperBrand });
        }

        if (formattedDiaperPrice && formattedDiaperPrice > 0) {
            diaperOptions.push({ dbField: "price", operator: "<=", operand: Number(formattedDiaperPrice) });
        }

        if (diaperSize) {
            diaperOptions.push({ dbField: "size", operator: "==", operand: diaperSize });
        }

        for (let i = 0; i < diaperOptions.length; i++) {
            diaperRef = await diaperRef.where(diaperOptions[i].dbField, diaperOptions[i].operator, diaperOptions[i].operand);
        }

        diaperRef.get().then((querySnapshot => {
            querySnapshot.docs.forEach(doc => {
                diaperData.push({ ...doc.data() });
            });

            setDiaperData(diaperData);
        }));

        // if (diaperBrand) {
        //     firestore.collection('diapers').where("brand", "==", diaperBrand)
        //         .get()
        //         .then(snapshot => {
        //             snapshot.docs.forEach(doc => {
        //                 options.push({ ...doc.data() });
        //             });

        //             const uniqueArray = [...new Set(options.map(obj => JSON.stringify(obj)))].map(str => JSON.parse(str));
        //             setDiaperData(uniqueArray);
        //         });
        // }

        // if (formattedDiaperPrice && formattedDiaperPrice > 0) {
        //     firestore.collection('diapers').where("price", "<=", Number(formattedDiaperPrice))
        //         .get()
        //         .then(snapshot => {
        //             snapshot.docs.forEach(doc => {
        //                 options.push({ ...doc.data() });
        //             });
        //             const uniqueArray = [...new Set(options.map(obj => JSON.stringify(obj)))].map(str => JSON.parse(str));
        //             setDiaperData(uniqueArray);
        //             console.log(snapshot.docs);
        //         });
        // }

        // if (diaperSize && diaperSize > 0) {
        //     firestore.collection('diapers').where("size", "==", diaperSize)
        //         .get()
        //         .then(snapshot => {
        //             snapshot.docs.forEach(doc => {
        //                 options.push({ ...doc.data() });
        //             });
        //             const uniqueArray = [...new Set(options.map(obj => JSON.stringify(obj)))].map(str => JSON.parse(str));
        //             setDiaperData(uniqueArray);
        //         });
        // }

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
                                <VStack display="flex" alignItems={"start"} width="100%">
                                    <Text>Gender</Text>
                                    <HStack width="100%">
                                        <Select placeholder='Select option' value={clothingGender} onChange={(event) => { setClothingGender(event.target.value); }}>
                                            <option value='boy'>boy</option>
                                            <option value='girl'>girl</option>
                                        </Select>
                                    </HStack>
                                    <Text>Brand</Text>
                                    <HStack width="100%">
                                        <Select placeholder='Select option' value={clothingBrand} onChange={(event) => { setClothingBrand(event.target.value); }}>
                                            <option value='Carters'> Carters </option>
                                            <option value='Gerber'>Gerber</option>
                                            <option value='Renotemy'>Renotemy</option>
                                            <option value="Burt's Bees Baby">Burt's Bees Baby</option>
                                        </Select>
                                    </HStack>
                                    <Text>Size</Text>
                                    <HStack width="100%">
                                        <Input placeholder="size equal to..." value={clothingSize} onChange={(event) => setClothingSize(event.target.value)} />
                                    </HStack>
                                    <Text>Price</Text>
                                    <HStack width="100%">
                                        <Input placeholder="price less than or equal to..." value={clothingPrice} onChange={(event) => setClothingPrice(event.target.value)} />
                                    </HStack>
                                    <Text>Type</Text>
                                    <HStack width="100%">
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
                                    <Text>Stage</Text>
                                    <HStack width="100%">
                                        <Select placeholder='Select option' value={stageOption} onChange={(event) => { setStageOption(event.target.value); }}>
                                            <option value='1'>1</option>
                                            <option value='2'>2</option>
                                            <option value='3'>3</option>
                                        </Select>
                                    </HStack>
                                    <Text>Price</Text>
                                    <HStack width="100%">
                                        <Input placeholder="price no more than..." value={foodPrice} onChange={(event) => setFoodPrice(event.target.value.replace(/[^0-9.-]/g, ""))} />
                                    </HStack>
                                    <Text>Brand</Text>
                                    <HStack width="100%">
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
                                    <Text>Brand</Text>
                                    <HStack width="100%">
                                        <Select placeholder='Select option' value={diaperBrand} onChange={(event) => { setDiaperBrand(event.target.value); }}>
                                            <option value='Pampers'>Pampers</option>
                                            <option value='Huggies'>Huggies</option>
                                            <option value='Luvs'>Luvs</option>
                                        </Select>
                                    </HStack>
                                    <Text>Price</Text>
                                    <HStack width="100%">
                                        <Input placeholder="price no more than..." value={diaperPrice} onChange={(event) => setDiaperPrice(event.target.value.replace(/[^0-9.-]/g, ""))} />
                                    </HStack>
                                    <Text>Size</Text>
                                    <HStack width="100%">
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