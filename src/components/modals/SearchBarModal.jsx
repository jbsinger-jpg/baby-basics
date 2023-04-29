// module imports
import { DeleteIcon } from '@chakra-ui/icons';
import { Button, Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, HStack, IconButton, Input, TabPanel, TabPanels, Tabs, Text, Tooltip, VStack, useColorModeValue } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

// relative imports
import { firestore } from '../../firebaseConfig';
import { cardBackground, screenBackground } from '../../defaultStyle';
import StyledSelect from '../StyledSelect';

export default function SearchBarAlertDialog({
    searchBarIsOpen,
    setSearchBarIsOpen,
    setFoodData,
    setClothingData,
    setDiaperData,
    setMaternalData,
    setFormulaData,
    setToyData,
    setMonitorData,
    setSeatData,
    setStrollerData,
    tabIndex,
    setTabIndex
}) {
    // food
    const [stageOption, setStageOption] = useState(null);
    const [foodPrice, setFoodPrice] = useState(null);
    const [foodBrand, setFoodBrand] = useState(null);
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
    const getFoodSearchBarItems = () => {
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

    // clothing
    const [clothingBrand, setClothingBrand] = useState(null);
    const [clothingGender, setClothingGender] = useState(null);
    const [clothingPrice, setClothingPrice] = useState(null);
    const [clothingSize, setClothingSize] = useState(null);
    const [clothingType, setClothingType] = useState(null);
    const genderOptions = [
        { value: "boy", label: "boy", key: 0 },
        { value: "girl", label: "girl", key: 1 },
    ];
    const brandOptions = [
        { value: "Carters", label: "Carters", key: 0 },
        { value: "Gerber", label: "Gerber", key: 1 },
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
    const getClothingSearchBarItems = () => {
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

    // diaper
    const [diaperBrand, setDiaperBrand] = useState(null);
    const [diaperPrice, setDiaperPrice] = useState(null);
    const [diaperSize, setDiaperSize] = useState(null);
    const diaperOptions = [
        { value: "Pampers", label: "Pampers", key: 0 },
        { value: "Huggies", label: "Huggies", key: 1 },
        { value: "Luvs", label: "Luvs", key: 2 },
    ];
    const getDiaperSearchBarItems = () => {
        return (
            <VStack display="flex" alignItems={"start"}>
                <Text>Brand</Text>
                <HStack width="100%">
                    <StyledSelect
                        options={diaperOptions}
                        value={diaperBrand}
                        onChange={(event) => { setDiaperBrand(event.target.value); }}
                    />
                </HStack>
                <Text>Price</Text>
                <HStack width="100%">
                    <Input
                        placeholder="price no more than..."
                        value={diaperPrice}
                        onChange={(event) => setDiaperPrice(event.target.value.replace(/[^0-9.-]/g, ""))}
                    />
                </HStack>
                <Text>Size</Text>
                <HStack width="100%">
                    <Input
                        placeholder="size equal to..."
                        value={diaperSize}
                        onChange={(event) => setDiaperSize(event.target.value)}
                    />
                </HStack>
            </VStack>
        );
    };
    // maternal
    const [maternalBrand, setMaternalBrand] = useState(null);
    const [maternalPrice, setMaternalPrice] = useState(null);
    const maternalOptions = [
        { value: "Ekouaer", label: "Ekouaer", key: 0 },
        { value: "Bearsland", label: "Bearsland", key: 1 },
        { value: "Floerns", label: "Floerns", key: 2 },
        { value: "One A Day", label: "One A Day", key: 3 },
        { value: "AZMED", label: "AZMED", key: 4 },
        { value: "FridaBaby", label: "FridaBaby", key: 5 },
        { value: "POSHDIVAH", label: "POSHDIVAH", key: 6 },
        { value: "VONQA", label: "VONQA", key: 7 },
        { value: "Frida", label: "Frida", key: 8 },
        { value: "Medela", label: "Medela", key: 9 },
        { value: "Bellababy", label: "Bellababy", key: 10 },
    ];
    const getMaternalSearchBarItems = () => {
        return (
            <VStack display="flex" alignItems={"start"}>
                <Text>Brand</Text>
                <HStack width="100%">
                    <StyledSelect
                        options={maternalOptions}
                        value={maternalBrand}
                        onChange={(event) => { setMaternalBrand(event.target.value); }}
                    />
                </HStack>
                <Text>Price</Text>
                <HStack width="100%">
                    <Input
                        placeholder="price no more than..."
                        value={maternalPrice}
                        onChange={(event) => setMaternalPrice(event.target.value.replace(/[^0-9.-]/g, ""))}
                    />
                </HStack>
            </VStack>
        );
    };
    // formula
    const [formulaPrice, setFormulaPrice] = useState(null);
    const [formulaBrand, setFormulaBrand] = useState(null);
    const formulaOptions = [
        { value: "Similac", label: "Similac", key: 0 },
        { value: "Enfamil", label: "Enfamil", key: 1 },
        { value: "Nutramigen", label: "Nutramigen", key: 2 },
        { value: "HeyValue", label: "HeyValue", key: 3 },
    ];
    const getFormulaSearchBarItems = () => {
        return (
            <VStack display="flex" alignItems={"start"}>
                <Text>Brand</Text>
                <HStack width="100%">
                    <StyledSelect
                        options={formulaOptions}
                        value={formulaBrand}
                        onChange={(event) => { setFormulaBrand(event.target.value); }}
                    />
                </HStack>
                <Text>Price</Text>
                <HStack width="100%">
                    <Input
                        placeholder="price no more than..."
                        value={formulaPrice}
                        onChange={(event) => setFormulaPrice(event.target.value.replace(/[^0-9.-]/g, ""))}
                    />
                </HStack>
            </VStack>
        );
    };
    // toy
    const [toyBrand, setToyBrand] = useState(null);
    const [toyPrice, setToyPrice] = useState(null);
    const toyOptions = [
        { value: "toytoy", label: "toytoy", key: 0 },
        { value: "TOY Life", label: "TOY Life", key: 1 },
        { value: "STEAM", label: "STEAM", key: 2 },
        { value: "fisher-price", label: "fisher-price", key: 3 },
        { value: "SSK", label: "SSK", key: 4 },
        { value: "beetoy", label: "beetoy", key: 5 },
    ];
    const getToySearchBarItems = () => {
        return (
            <VStack display="flex" alignItems={"start"}>
                <Text>Brand</Text>
                <HStack width="100%">
                    <StyledSelect
                        options={toyOptions}
                        value={toyBrand}
                        onChange={(event) => { setToyBrand(event.target.value); }}
                    />
                </HStack>
                <Text>Price</Text>
                <HStack width="100%">
                    <Input
                        placeholder="price no more than..."
                        value={toyPrice}
                        onChange={(event) => setToyPrice(event.target.value.replace(/[^0-9.-]/g, ""))}
                    />
                </HStack>
            </VStack>
        );
    };
    // monitor
    const [monitorBrand, setMonitorBrand] = useState(null);
    const [monitorPrice, setMonitorPrice] = useState(null);
    const monitorOptions = [
        { value: "Sekery", label: "Sekery", key: 0 },
        { value: "VTech", label: "VTech", key: 1 },
        { value: "Momcozy", label: "Momcozy", key: 2 },
        { value: "Owlet", label: "Owlet", key: 3 },
        { value: "Infant Optics", label: "Infant Optics", key: 4 },
        { value: "Nanit", label: "Nanit", key: 5 },
        { value: "IFamily", label: "IFamily", key: 6 },
    ];
    const getMonitorSearchBarItems = () => {
        return (
            <VStack display="flex" alignItems={"start"}>
                <Text>Brand</Text>
                <HStack width="100%">
                    <StyledSelect
                        options={monitorOptions}
                        value={monitorBrand}
                        onChange={(event) => { setMonitorBrand(event.target.value); }}
                    />
                </HStack>
                <Text>Price</Text>
                <HStack width="100%">
                    <Input
                        placeholder="price no more than..."
                        value={monitorPrice}
                        onChange={(event) => setMonitorPrice(event.target.value.replace(/[^0-9.-]/g, ""))}
                    />
                </HStack>
            </VStack>
        );
    };
    // seat
    const [seatBrand, setSeatBrand] = useState(null);
    const [seatPrice, setSeatPrice] = useState(null);
    const seatOptions = [
        { value: "Graco", label: "Graco", key: 0 },
        { value: "Evenflo", label: "Evenflo", key: 1 },
        { value: "MESA", label: "MESA", key: 2 },
        { value: "Chicco", label: "Chicco", key: 3 },
    ];
    const getSeatSearchBarItems = () => {
        return (
            <VStack display="flex" alignItems={"start"}>
                <Text>Brand</Text>
                <HStack width="100%">
                    <StyledSelect
                        options={seatOptions}
                        value={seatBrand}
                        onChange={(event) => { setSeatBrand(event.target.value); }}
                    />
                </HStack>
                <Text>Price</Text>
                <HStack width="100%">
                    <Input
                        placeholder="price no more than..."
                        value={seatPrice}
                        onChange={(event) => setSeatPrice(event.target.value.replace(/[^0-9.-]/g, ""))}
                    />
                </HStack>
            </VStack>
        );
    };
    // stroller
    const [strollerBrand, setStrollerBrand] = useState(null);
    const [strollerPrice, setStrollerPrice] = useState(null);
    const strollerOptions = [
        { value: "Graco", label: "Graco", key: 0 },
        { value: "Baby Trend", label: "Baby Trend", key: 1 },
        { value: "Chicco", label: "Chicco", key: 2 },
        { value: "Blahoo", label: "Blahoo", key: 3 },
        { value: "Doona", label: "Doona", key: 4 },
        { value: "BOB Gear", label: "BOB Gear", key: 5 },
        { value: "Joolz", label: "Joolz", key: 6 },
    ];
    const getStrollerSearchBarItems = () => {
        return (
            <VStack display="flex" alignItems={"start"}>
                <Text>Brand</Text>
                <HStack width="100%">
                    <StyledSelect
                        options={strollerOptions}
                        value={strollerBrand}
                        onChange={(event) => { setStrollerBrand(event.target.value); }}
                    />
                </HStack>
                <Text>Price</Text>
                <HStack width="100%">
                    <Input
                        placeholder="price no more than..."
                        value={strollerPrice}
                        onChange={(event) => setStrollerPrice(event.target.value.replace(/[^0-9.-]/g, ""))}
                    />
                </HStack>
            </VStack>
        );
    };
    const options = [
        { key: 0, value: "Clothing", label: "Clothing" },
        { key: 1, value: "Food", label: "Food" },
        { key: 2, value: "Diapers", label: "Diapers" },
        { key: 3, value: "Baby Hygiene", label: "Baby Hygiene" },
        { key: 4, value: "Maternal", label: "Maternal" },
        { key: 5, value: "Formula", label: "Formula" },
        { key: 6, value: "Toys", label: "Toys" },
        { key: 7, value: "Monitors", label: "Monitors" },
        { key: 8, value: "Seats", label: "Seats" },
        { key: 9, value: "Strollers", label: "Strollers" },
    ];
    const [selectedCategory, setSelectedCategory] = useState(options[tabIndex]?.value);
    const [searchTabIndex, setSearchTabIndex] = useState(tabIndex);
    const _cardBackground = useColorModeValue(cardBackground.light, cardBackground.dark);
    const _screenBackground = useColorModeValue(screenBackground.light, screenBackground.dark);

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

    const handleMaternalSearch = async () => {
        let maternalOptions = [];
        let maternalData = [];

        const formattedMaternalPrice = Number(maternalPrice).toFixed(2);
        let maternalRef = await firestore.collection('maternal_clothes');

        if (maternalBrand) {
            maternalOptions.push({ dbField: "brand", operator: "==", operand: maternalBrand });
        }

        if (formattedMaternalPrice && formattedMaternalPrice > 0) {
            maternalOptions.push({ dbField: "price", operator: "<=", operand: Number(formattedMaternalPrice) });
        }

        for (let i = 0; i < maternalOptions.length; i++) {
            maternalRef = await maternalRef.where(maternalOptions[i].dbField, maternalOptions[i].operator, maternalOptions[i].operand);
        }

        maternalRef.get().then((querySnapshot => {
            querySnapshot.docs.forEach(doc => {
                maternalData.push({ ...doc.data() });
            });

            setMaternalData(maternalData);
        }));

        if (!maternalBrand && !maternalPrice) {
            firestore.collection('maternal_clothes')
                .get()
                .then(snapshot => {
                    snapshot.docs.forEach(doc => {
                        maternalData.push({ ...doc.data() });
                    });

                    const uniqueArray = [...new Set(maternalData.map(obj => JSON.stringify(obj)))].map(str => JSON.parse(str));
                    setMaternalData(uniqueArray);
                });
        }

    };

    const handleFormulaSearch = async () => {
        let formulaOptions = [];
        let formulaData = [];

        const formattedFormulaPrice = Number(formulaPrice).toFixed(2);
        let formulaRef = await firestore.collection('formula');

        if (formulaBrand) {
            formulaOptions.push({ dbField: "brand", operator: "==", operand: formulaBrand });
        }

        if (formattedFormulaPrice && formattedFormulaPrice > 0) {
            formulaOptions.push({ dbField: "price", operator: "<=", operand: Number(formattedFormulaPrice) });
        }

        for (let i = 0; i < formulaOptions.length; i++) {
            formulaRef = await formulaRef.where(formulaOptions[i].dbField, formulaOptions[i].operator, formulaOptions[i].operand);
        }

        formulaRef.get().then((querySnapshot => {
            querySnapshot.docs.forEach(doc => {
                formulaData.push({ ...doc.data() });
            });

            setFormulaData(formulaData);
        }));

        if (!formulaBrand && !formulaPrice) {
            firestore.collection('formula')
                .get()
                .then(snapshot => {
                    snapshot.docs.forEach(doc => {
                        formulaData.push({ ...doc.data() });
                    });

                    const uniqueArray = [...new Set(formulaData.map(obj => JSON.stringify(obj)))].map(str => JSON.parse(str));
                    setFormulaData(uniqueArray);
                });
        }

    };

    const handleToySearch = async () => {
        let toyOptions = [];
        let toyData = [];

        const formattedToyPrice = Number(toyPrice).toFixed(2);
        let toyRef = await firestore.collection('toys');

        if (toyBrand) {
            toyOptions.push({ dbField: "brand", operator: "==", operand: toyBrand });
        }

        if (formattedToyPrice && formattedToyPrice > 0) {
            toyOptions.push({ dbField: "price", operator: "<=", operand: Number(formattedToyPrice) });
        }

        for (let i = 0; i < toyOptions.length; i++) {
            toyRef = await toyRef.where(toyOptions[i].dbField, toyOptions[i].operator, toyOptions[i].operand);
        }

        toyRef.get().then((querySnapshot => {
            querySnapshot.docs.forEach(doc => {
                toyData.push({ ...doc.data() });
            });

            setToyData(toyData);
        }));

        if (!toyBrand && !toyPrice) {
            firestore.collection('toys')
                .get()
                .then(snapshot => {
                    snapshot.docs.forEach(doc => {
                        toyData.push({ ...doc.data() });
                    });

                    const uniqueArray = [...new Set(toyData.map(obj => JSON.stringify(obj)))].map(str => JSON.parse(str));
                    setToyData(uniqueArray);
                });
        }
    };

    const handleMonitorSearch = async () => {
        let monitorOptions = [];
        let monitorData = [];

        const formattedMonitorPrice = Number(monitorPrice).toFixed(2);
        let monitorRef = await firestore.collection('monitors');

        if (monitorBrand) {
            monitorOptions.push({ dbField: "brand", operator: "==", operand: monitorBrand });
        }

        if (formattedMonitorPrice && formattedMonitorPrice > 0) {
            monitorOptions.push({ dbField: "price", operator: "<=", operand: Number(formattedMonitorPrice) });
        }

        for (let i = 0; i < monitorOptions.length; i++) {
            monitorRef = await monitorRef.where(monitorOptions[i].dbField, monitorOptions[i].operator, monitorOptions[i].operand);
        }

        monitorRef.get().then((querySnapshot => {
            querySnapshot.docs.forEach(doc => {
                monitorData.push({ ...doc.data() });
            });

            setMonitorData(monitorData);
        }));

        if (!monitorBrand && !monitorPrice) {
            firestore.collection('monitors')
                .get()
                .then(snapshot => {
                    snapshot.docs.forEach(doc => {
                        monitorData.push({ ...doc.data() });
                    });

                    const uniqueArray = [...new Set(monitorData.map(obj => JSON.stringify(obj)))].map(str => JSON.parse(str));
                    setMonitorData(uniqueArray);
                });
        }
    };

    const handleStrollerSearch = async () => {
        let strollerOptions = [];
        let strollerData = [];

        const formattedStrollerPrice = Number(strollerPrice).toFixed(2);
        let strollerRef = await firestore.collection('strollers');

        if (strollerBrand) {
            strollerOptions.push({ dbField: "brand", operator: "==", operand: strollerBrand });
        }

        if (formattedStrollerPrice && formattedStrollerPrice > 0) {
            strollerOptions.push({ dbField: "price", operator: "<=", operand: Number(formattedStrollerPrice) });
        }

        for (let i = 0; i < strollerOptions.length; i++) {
            strollerRef = await strollerRef.where(strollerOptions[i].dbField, strollerOptions[i].operator, strollerOptions[i].operand);
        }

        strollerRef.get().then((querySnapshot => {
            querySnapshot.docs.forEach(doc => {
                strollerData.push({ ...doc.data() });
            });

            setStrollerData(strollerData);
        }));

        if (!strollerBrand && !strollerPrice) {
            firestore.collection('strollers')
                .get()
                .then(snapshot => {
                    snapshot.docs.forEach(doc => {
                        strollerData.push({ ...doc.data() });
                    });

                    const uniqueArray = [...new Set(strollerData.map(obj => JSON.stringify(obj)))].map(str => JSON.parse(str));
                    setStrollerData(uniqueArray);
                });
        }
    };

    const handleSeatSearch = async () => {
        let seatOptions = [];
        let seatData = [];

        const formattedSeatPrice = Number(seatPrice).toFixed(2);
        let seatRef = await firestore.collection('car_seats');

        if (formulaBrand) {
            seatOptions.push({ dbField: "brand", operator: "==", operand: seatBrand });
        }

        if (formattedSeatPrice && formattedSeatPrice > 0) {
            seatOptions.push({ dbField: "price", operator: "<=", operand: Number(formattedSeatPrice) });
        }

        for (let i = 0; i < seatOptions.length; i++) {
            seatRef = await seatRef.where(seatOptions[i].dbField, seatOptions[i].operator, seatOptions[i].operand);
        }

        seatRef.get().then((querySnapshot => {
            querySnapshot.docs.forEach(doc => {
                seatData.push({ ...doc.data() });
            });

            setSeatData(seatData);
        }));

        if (!seatBrand && !seatPrice) {
            firestore.collection('car_seats')
                .get()
                .then(snapshot => {
                    snapshot.docs.forEach(doc => {
                        seatData.push({ ...doc.data() });
                    });

                    const uniqueArray = [...new Set(seatData.map(obj => JSON.stringify(obj)))].map(str => JSON.parse(str));
                    setSeatData(uniqueArray);
                });
        }
    };

    useEffect(() => {
        if (searchBarIsOpen) {
            setSearchTabIndex(tabIndex);
            setSelectedCategory(options[tabIndex]?.value);
        }
        //eslint-disable-next-line
    }, [searchBarIsOpen, tabIndex]);

    const handleClearSearch = () => {
        if (searchTabIndex === 0) {
            // clear clothing entry
            setClothingBrand("");
            setClothingGender("");
            setClothingPrice("");
            setClothingSize("");
            setClothingType("");
        }
        else if (searchTabIndex === 1) {
            // clear food entry
            setFoodBrand("");
            setFoodPrice("");
            setStageOption("");
        }
        else if (searchTabIndex === 2) {
            // clear diaper entry
            setDiaperBrand("");
            setDiaperPrice("");
            setDiaperSize("");
        }
        else if (searchTabIndex === 4) {
            // clear maternal entry
            setMaternalBrand("");
            setMaternalPrice("");
        }
        else if (searchTabIndex === 5) {
            setFormulaBrand("");
            setFormulaPrice("");
        }
        else if (searchTabIndex === 6) {
            setToyBrand("");
            setToyPrice("");
        }
        else if (searchTabIndex === 7) {
            setMonitorBrand("");
            setMonitorPrice("");
        }
        else if (searchTabIndex === 8) {
            setSeatBrand("");
            setSeatPrice("");
        }
        else if (searchTabIndex === 9) {
            setStrollerBrand("");
            setStrollerPrice("");
        }
    };

    const handleGenericSearch = () => {
        if (searchTabIndex === 0) {
            return handleClothingSearch();
        }
        else if (searchTabIndex === 1) {
            return handleFoodSearch();
        }
        else if (searchTabIndex === 2) {
            return handleDiaperSearch();
        }
        else if (searchTabIndex === 4) {
            return handleMaternalSearch();
        }
        else if (searchTabIndex === 5) {
            return handleFormulaSearch();
        }
        else if (searchTabIndex === 4) {
            return handleToySearch();
        }
        else if (searchTabIndex === 5) {
            return handleMonitorSearch();
        }
        else if (searchTabIndex === 6) {
            return handleToySearch();
        }
        else if (searchTabIndex === 7) {
            return handleMonitorSearch();
        }
        else if (searchTabIndex === 8) {
            return handleSeatSearch();
        }
        else if (searchTabIndex === 9) {
            return handleStrollerSearch();
        }
    };

    return (
        <Drawer
            onClose={() => setSearchBarIsOpen(false)}
            bg={_cardBackground}
            w="250px"
            isOpen={searchBarIsOpen}
            placement='right'
        >
            <DrawerOverlay />
            <DrawerContent bg={_screenBackground}>
                <DrawerHeader>Filter Items</DrawerHeader>
                <DrawerBody>
                    <StyledSelect
                        value={selectedCategory}
                        options={options}
                        onChange={handleTabsChange}
                    />
                    <Tabs align='start' variant='enclosed' w="100%" h="90%" isFitted index={searchTabIndex}>
                        <TabPanels>
                            <TabPanel>
                                {getClothingSearchBarItems()}
                            </TabPanel>
                            <TabPanel>
                                {getFoodSearchBarItems()}
                            </TabPanel>
                            <TabPanel>
                                {getDiaperSearchBarItems()}
                            </TabPanel>
                            <TabPanel>
                                Hygiene
                            </TabPanel>
                            <TabPanel>
                                {getMaternalSearchBarItems()}
                            </TabPanel>
                            <TabPanel>
                                {getFormulaSearchBarItems()}
                            </TabPanel>
                            <TabPanel>
                                {getToySearchBarItems()}
                            </TabPanel>
                            <TabPanel>
                                {getMonitorSearchBarItems()}
                            </TabPanel>
                            <TabPanel>
                                {getSeatSearchBarItems()}
                            </TabPanel>
                            <TabPanel>
                                {getStrollerSearchBarItems()}
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </DrawerBody>
                <DrawerFooter justifyContent="space-between">
                    <Button onClick={handleGenericSearch}>Search</Button>
                    <Tooltip label="Clear filters">
                        <IconButton
                            icon={<DeleteIcon />}
                            onClick={handleClearSearch}
                        />
                    </Tooltip>
                    <Button variant='outline' onClick={() => setSearchBarIsOpen(false)}>
                        Close
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
