// Module imports
import { Box, Button, Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, FormLabel, HStack, IconButton, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, TabPanel, TabPanels, Tabs, Text, Tooltip, VStack, useColorModeValue } from '@chakra-ui/react';
import { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Relative imports
import { cardBackground, screenBackground } from '../defaultStyle';
import StyledSelect from '../components/StyledSelect';
import SleepPage from './SleepPage';
import GrowthPage from './GrowthPage';
import { DeleteIcon } from '@chakra-ui/icons';

export default function GraphPage({ childOptions, setSearchBarIsOpen, searchBarIsOpen }) {
    const _screenBackground = useColorModeValue(screenBackground.light, screenBackground.dark);
    const [selectedPageOption, setSelectedPageOption] = useState("growth");
    const _cardBackground = useColorModeValue(cardBackground.light, cardBackground.dark);
    const pageOptions = [
        { label: "Growth", value: "growth", key: 0 },
        { label: "Sleep", value: "sleep", key: 1 },
    ];
    const [tabIndex, setTabIndex] = useState(0);

    // Growth tab useStates
    const [selectedLength, setSelectedLength] = useState(1);
    const [selectedWeight, setSelectedWeight] = useState(1);
    const [selectedHeadCircumference, setSelectedHeadCircumference] = useState(1);

    // Sleep tab useStates
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [sleepHours, setSleepHours] = useState(1);

    const handleSelectedDateChange = (date) => {
        setSelectedDate(date);
    };

    const getGrowthPageSearchItems = () => {
        return (
            <VStack display="flex" alignItems="start">
                <FormLabel htmlFor='child'>Child</FormLabel>
                <StyledSelect

                />
                <FormLabel htmlFor='length'>Length</FormLabel>
                <NumberInput
                    w="100%"
                    min={1}
                    value={selectedLength}
                    onChange={value => setSelectedLength(value)}
                >
                    <NumberInputField
                        id="length"
                        placeholder="length"
                    />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
                <FormLabel htmlFor='weight'>Weight</FormLabel>
                <NumberInput
                    min={1}
                    w="100%"
                    value={selectedWeight}
                    onChange={value => setSelectedWeight(value)}
                >
                    <NumberInputField
                        id="weight"
                        placeholder="weight"
                    />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
                <FormLabel htmlFor='circumference'>Head Circumference</FormLabel>
                <NumberInput
                    min={1}
                    w="100%"
                    value={selectedHeadCircumference}
                    onChange={value => setSelectedHeadCircumference(value)}
                >
                    <NumberInputField
                        id="circumference"
                        placeholder="head circumference"
                    />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
            </VStack>
        );
    };

    const getSleepPageSearchItems = () => {
        return (
            <VStack display="flex" alignItems="start">
                <FormLabel htmlFor='date'>Date</FormLabel>
                <DatePicker
                    customInput={<Input />}
                    selected={selectedDate}
                    onChange={handleSelectedDateChange}
                />
                <FormLabel htmlFor='child'>Child</FormLabel>
                <StyledSelect

                />
                <FormLabel htmlFor='sleep'>Sleep Hours</FormLabel>
                <NumberInput
                    w="100%"
                    min={1}
                    value={sleepHours}
                    onChange={value => setSleepHours(value)}
                >
                    <NumberInputField
                        id="sleephours"
                        placeholder="sleep hours"
                    />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
            </VStack>
        );
    };

    const handleClearSearch = () => {
        if (tabIndex === 0) {
            setSelectedLength(1);
            setSelectedWeight(1);
            setSelectedHeadCircumference(1);
            // TODO: Handle child reset
        }
        else if (tabIndex === 1) {
            setSleepHours(1);
            setSelectedDate(new Date());
            // TODO: Handle child reset
        }
    };

    const handleGenericSearch = () => {
        // TODO: Set tab data to have query filters applied
        if (tabIndex === 0) {

        }
        else if (tabIndex === 1) {

        }
    };

    const handleTabsChange = (event) => {
        setSelectedPageOption(event.target.value);
        setTabIndex(Number(!tabIndex));
    };

    return (
        <Box
            bg={_screenBackground}
            height="90vh"
            width="100vw"
            overflowX="hidden"
        >
            <StyledSelect
                w="95vw"
                removeNullOption
                options={pageOptions}
                onChange={(event) => setSelectedPageOption(event.target.value)}
            />
            {selectedPageOption === "growth" &&
                <GrowthPage
                    childOptions={childOptions}
                />
            }
            {selectedPageOption === "sleep" &&
                <SleepPage
                    childOptions={childOptions}
                />
            }
            <Drawer
                onClose={() => setSearchBarIsOpen(false)}
                bg={_cardBackground}
                isOpen={searchBarIsOpen}
                placement='right'
                size="sm"
            >
                <DrawerOverlay />
                <DrawerContent bg={_screenBackground}>
                    <DrawerHeader>Filter Items</DrawerHeader>
                    <DrawerBody>
                        <StyledSelect
                            value={selectedPageOption}
                            options={pageOptions}
                            onChange={handleTabsChange}
                            removeNullOption
                        />
                        <Tabs align='start' variant='enclosed' w="100%" h="90%" isFitted index={tabIndex}>
                            <TabPanels>
                                <TabPanel>
                                    {getGrowthPageSearchItems()}
                                </TabPanel>
                                <TabPanel>
                                    {getSleepPageSearchItems()}
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
        </Box>
    );
}
