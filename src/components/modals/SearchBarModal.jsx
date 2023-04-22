import { DeleteIcon } from '@chakra-ui/icons';
import { Button, Card, CardBody, CardFooter, CardHeader, HStack, IconButton, Input, Tab, TabList, TabPanel, TabPanels, Tabs, Text, Tooltip, VStack, useColorModeValue } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { firestore } from '../../firebaseConfig';
import { cardBackground } from '../../defaultStyle';
import StyledSelect from '../StyledSelect';

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
    const options = [
        { key: 0, value: "Clothing", label: "Clothing" },
        { key: 1, value: "Food", label: "Food" },
        { key: 2, value: "Diapers", label: "Diapers" },
    ];
    const [selectedCategory, setSelectedCategory] = useState(options[tabIndex]?.value);

    const [searchTabIndex, setSearchTabIndex] = useState(tabIndex);
    const _cardBackground = useColorModeValue(cardBackground.light, cardBackground.dark);

    const handleTabsChange = (event) => {
        let matchedValue = null;

        for (const option of options) {
            if (option.value === event.target.value) {
                matchedValue = option;
            }
        }

        setSearchTabIndex(matchedValue.key);
        setTabIndex(matchedValue.key);
        setSelectedCategory(event.target.value);
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

    const genderOptions = [
        { value: "boy", label: "boy", key: 0 },
        { value: "girl", label: "girl", key: 1 },
    ];

    const brandOptions = [
        { value: "Carters", label: "Carters", key: 0 },
        { value: "Gender", label: "Gerber", key: 1 },
        { value: "Renotemy", label: "Renotemy", key: 2 },
        { value: "Burt's Bees Baby", label: "Burt's Bees Baby", key: 3 },
    ];

    const clothingOptions = [
        { value: "footie", label: "footie", key: 0 },
        { value: "shirt", label: "shirt", key: 1 },
        { value: "pants", label: "pants", key: 2 },
        { value: "bodysuits", label: "bodysuits", key: 3 },
        { value: "romper", label: "romper", key: 4 },
        { value: "sunsuit", label: "sunsuit", key: 5 },
        { value: "dress", label: "dress", key: 6 },
    ];

    const stageOptions = [
        { value: "1", label: "1", key: 0 },
        { value: "2", label: "2", key: 1 },
        { value: "3", label: "3", key: 2 },
    ];

    const foodOptions = [
        { value: "Plum Organics", label: "Plum Organics", key: 0 },
        { value: "Happy Baby", label: "Happy Baby", key: 1 },
        { value: "Beech-Nut", label: "Beech-Nut", key: 2 },
        { value: "Mama Bear", label: "Mama Bear", key: 3 },
        { value: "Gerber", label: "Gerber", key: 4 },
        { value: "Sprouts", label: "Sprouts", key: 5 },
    ];

    const diaperOptions = [
        { value: "Pampers", label: "Pampers", key: 0 },
        { value: "Huggies", label: "Huggies", key: 1 },
        { value: "Luvs", label: "Luvs", key: 2 },
    ];

    const ClothingSearchBarItems = () => {
        return (
            <VStack display="flex" alignItems={"start"} width="100%">
                <Text>Gender</Text>
                <HStack width="100%">
                    <StyledSelect
                        options={genderOptions}
                        value={clothingGender}
                        onChange={(event) => { setClothingGender(event.target.value); }}
                    />
                </HStack>
                <Text>Brand</Text>
                <HStack width="100%">
                    <StyledSelect
                        options={brandOptions}
                        value={clothingBrand}
                        onChange={(event) => { setClothingBrand(event.target.value); }}
                    />
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
                    <StyledSelect
                        options={clothingOptions}
                        value={clothingType}
                        onChange={(event) => { setClothingType(event.target.value); }}
                    />
                </HStack>
            </VStack>
        );
    };

    const FoodSearchBarItems = () => {
        return (
            <VStack display="flex" alignItems={"start"}>
                <Text>Stage</Text>
                <HStack width="100%">
                    <StyledSelect
                        options={stageOptions}
                        value={stageOption}
                        onChange={(event) => { setStageOption(event.target.value); }}
                    />
                </HStack>
                <Text>Price</Text>
                <HStack width="100%">
                    <Input placeholder="price no more than..." value={foodPrice} onChange={(event) => setFoodPrice(event.target.value.replace(/[^0-9.-]/g, ""))} />
                </HStack>
                <Text>Brand</Text>
                <HStack width="100%">
                    <StyledSelect
                        options={foodOptions}
                        value={foodBrand}
                        onChange={(event) => { setFoodBrand(event.target.value); }}
                    />
                </HStack>
            </VStack>
        );
    };

    const DiaperSearchBarItems = () => {
        return (
            <VStack display="flex" alignItems={"start"}>
                <Text>Brand</Text>
                <HStack width="100%">
                    <StyledSelect
                        options={diaperOptions}
                        value={diaperBrand}
                        onChange={(event) => { setFoodBrand(event.target.value); }}
                    />
                </HStack>
                <Text>Price</Text>
                <HStack width="100%">
                    <Input placeholder="price no more than..." value={diaperPrice} onChange={(event) => setDiaperPrice(event.target.value.replace(/[^0-9.-]/g, ""))} />
                </HStack>
                <Text>Size</Text>
                <HStack width="100%">
                    <Input placeholder="size equal to..." value={diaperSize} onChange={(event) => setDiaperSize(event.target.value)} />
                </HStack>
            </VStack>
        );
    };

    return (
        <Card
            onClose={() => setSearchBarIsOpen(false)}
            bg={_cardBackground}
            w="250px"
        >
            <CardHeader>Filter Items</CardHeader>
            <CardBody>
                <StyledSelect
                    value={selectedCategory}
                    options={options}
                    onChange={handleTabsChange}
                />
                <Tabs align='start' variant='enclosed' w="100%" h="100%" isFitted index={searchTabIndex}>
                    <TabPanels>
                        <TabPanel>
                            <ClothingSearchBarItems />
                            <HStack justifyContent="space-between" mt="3">
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
                                <Button variant='outline' onClick={() => setSearchBarIsOpen(false)}>
                                    Close
                                </Button>
                            </HStack>
                        </TabPanel>
                        <TabPanel>
                            <FoodSearchBarItems />
                            <HStack justifyContent="space-between" mt="3">
                                <Button onClick={handleFoodSearch}>Search</Button>
                                <Tooltip label="Clear filters">
                                    <IconButton icon={<DeleteIcon />} onClick={() => {
                                        setFoodBrand("");
                                        setFoodPrice("");
                                        setStageOption("");
                                    }}
                                    />
                                </Tooltip>
                                <Button variant='outline' onClick={() => setSearchBarIsOpen(false)}>
                                    Close
                                </Button>
                            </HStack>
                        </TabPanel>
                        <TabPanel>
                            <DiaperSearchBarItems />
                            <HStack justifyContent="space-between" mt="3">
                                <Button onClick={handleDiaperSearch}>Search</Button>
                                <Tooltip label="Clear filters">
                                    <IconButton icon={<DeleteIcon />} onClick={() => {
                                        setDiaperBrand("");
                                        setDiaperSize("");
                                        setDiaperPrice("");
                                    }}
                                    />
                                </Tooltip>
                                <Button variant='outline' onClick={() => setSearchBarIsOpen(false)}>
                                    Close
                                </Button>
                            </HStack>
                        </TabPanel>
                        <TabPanel>
                            Utilities
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </CardBody>
        </Card >
    );
}
