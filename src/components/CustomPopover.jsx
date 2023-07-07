// module imports
import { CalendarIcon } from '@chakra-ui/icons';
import { Box, Button, FormLabel, HStack, Input, InputGroup, InputRightAddon, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, Tag, TagCloseButton, TagLabel, VStack, useColorModeValue } from '@chakra-ui/react';
import React, { useState } from 'react';

// relative imports
import { cardBackground } from '../defaultStyle';
import StyledSelect from './StyledSelect';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { auth, firestore } from '../firebaseConfig';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';

export default function CustomPopOver() {
    const [selectedFrequency, setSelectedFrequency] = useState("");
    const [emailHost, setEmailHost] = useState("");
    const [emailBody, setEmailBody] = useState("");
    const [calendarEventTitle, setCalendarEventTitle] = useState("");
    const [calendarEventLocation, setCalendarEventLocation] = useState("");
    const [addedPeople, setAddedPeople] = useState([]);
    const _cardBackground = useColorModeValue(cardBackground.light, cardBackground.dark);
    const [selectedAgeOption, setSelectedAgeOption] = useState(null);
    const [userTagData] = useCollectionData(firestore.collection("users").doc(auth?.currentUser?.uid).collection("baby_progress").where("age", "==", selectedAgeOption), { idField: "id" });
    const [selectedProgressNoteOption, setSelectedProgressNoteOption] = useState(null);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [selectedStartTime, setSelectedStartTime] = useState("");
    const [selectedEndTime, setSelectedEndTime] = useState("");

    const handleStartTimeChange = (time) => {
        setSelectedStartTime(time);
        const formattedTime = time.split(":");
        startDate.setHours(Number(formattedTime[0]), Number(formattedTime[1]));
    };

    const handleEndTimeChange = (time) => {
        setSelectedEndTime(time);
        const formattedTime = time.split(":");
        endDate.setHours(Number(formattedTime[0]), Number(formattedTime[1]));
    };

    const handleEndDateChange = (date) => {
        if (selectedEndTime) {
            const formattedTime = selectedEndTime.split(":");
            date.setHours(Number(formattedTime[0]), Number(formattedTime[1]));
        }
        setEndDate(date);
    };

    const handleStartDateChange = (date) => {
        if (selectedStartTime) {
            const formattedTime = selectedStartTime.split(":");
            date.setHours(Number(formattedTime[0]), Number(formattedTime[1]));
        }
        setStartDate(date);
    };

    const formatDateTime = () => {
        let dates = "";
        if (startDate && endDate) {
            dates = startDate.toISOString().replace(/-|:|\.\d+/g, '') + '/' + endDate.toISOString().replace(/-|:|\.\d+/g, '');
        }
        else if (startDate) {
            dates = startDate.toISOString().replace(/-|:|\.\d+/g, '');
        }
        else if (endDate) {
            endDate.toISOString().replace(/-|:|\.\d+/g, '');
        }

        return dates;
    };

    const formatAddPeople = () => {
        let options = [];

        if (addedPeople && addedPeople.length > 0) {
            options = addedPeople.join(",");
        }

        return options;
    };

    const formatFrequency = () => {
        if (selectedFrequency) {
            return `RRULE:FREQ%3D${selectedFrequency}`;
        }

        return "";
    };

    const formatEventTitle = () => {
        const calendarEventTitleArray = calendarEventTitle.split(" ");
        return calendarEventTitleArray.join("+");
    };

    const formatEventLocation = () => {
        const calendarEventLocationArray = calendarEventLocation.split(" ");
        return calendarEventLocationArray.join("+");
    };

    const handleAddGuest = () => {
        const newPerson = `${emailBody}@${emailHost}.com`;

        if (!addedPeople.includes(newPerson))
            setAddedPeople([...addedPeople, newPerson]);
    };

    const handleTagDelete = (tagToDelete) => {
        setAddedPeople(addedPeople.filter((tag) => tag !== tagToDelete));
    };

    const formatDescription = () => {
        if (selectedProgressNoteOption) {
            const selectedProgressArray = selectedProgressNoteOption.split(" ");
            return selectedProgressArray.join("+");
        }

        return "";
    };

    const options = [
        { value: "", label: "Never", key: 0 },
        { value: "DAILY", label: "daily", key: 1 },
        { value: "WEEKLY", label: "weekly", key: 2 },
        { value: "MONTHLY", label: "monthly", key: 3 },
        { value: "YEARLY", label: "yearly", key: 4 },
    ];

    const getTagOptions = () => {
        // TODO: Generate tag options that the user has inputted
        let options = [];

        if (selectedAgeOption && userTagData) {
            for (let i = 0; i < userTagData.length; i++) {
                options.push({
                    value: userTagData[i].description,
                    label: userTagData[i].name,
                    key: i,
                });
            }
        }

        return options;
    };

    const ageOptions = [
        { value: "0-3M", label: "0-3M", key: 0 },
        { value: "4-6M", label: "4-6M", key: 1 },
        { value: "7-9M", label: "7-9M", key: 2 },
        { value: "10-12M", label: "10-12M", key: 3 },
        { value: "13-18M", label: "13-18M", key: 4 },
        { value: "19-24M", label: "19-24M", key: 5 },
    ];

    return (
        <Popover>
            <PopoverTrigger>
                <Button
                    leftIcon={<CalendarIcon />}
                >
                    Set Google Calendar Event
                </Button>
            </PopoverTrigger>
            <PopoverContent bg={_cardBackground}>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader> Confirmation of Event! </PopoverHeader>
                <PopoverBody>
                    <HStack>
                        <VStack alignItems="start" spacing="-0.5">
                            <FormLabel htmlFor='eventTitle'>Title</FormLabel>
                            <Input
                                id="eventTitle"
                                value={calendarEventTitle}
                                onChange={(event) => setCalendarEventTitle(event.target.value)}
                            />
                        </VStack>
                        <VStack alignItems="start" spacing="-0.5">
                            <FormLabel htmlFor='eventLocation'>Location</FormLabel>
                            <Input
                                id="eventLocation"
                                value={calendarEventLocation}
                                onChange={(event) => setCalendarEventLocation(event.target.value)}
                            />
                        </VStack>
                    </HStack>
                    <HStack>
                        <VStack alignItems="start" spacing="-0.5">
                            <FormLabel>Start Date</FormLabel>
                            <VStack alignItems="start" spacing="1.5">
                                <DatePicker
                                    customInput={<Input />}
                                    selected={startDate}
                                    onChange={handleStartDateChange}
                                />
                                {(startDate && endDate) &&
                                    <TimePicker
                                        onChange={handleStartTimeChange}
                                        value={selectedStartTime}
                                        disableClock
                                    />
                                }
                            </VStack>
                        </VStack>
                        <VStack alignItems="start" spacing="-0.5">
                            <FormLabel>End Date</FormLabel>
                            <VStack alignItems="start" spacing="1.5">
                                <DatePicker
                                    label="End Date"
                                    customInput={<Input />}
                                    selected={endDate}
                                    onChange={handleEndDateChange}
                                />
                                {(startDate && endDate) &&
                                    <TimePicker
                                        onChange={handleEndTimeChange}
                                        value={selectedEndTime}
                                        disableClock
                                    />
                                }
                            </VStack>
                        </VStack>
                    </HStack>
                    <FormLabel htmlFor='email'>Guests</FormLabel>
                    <VStack alignItems="start" spacing="5" paddingBottom="3">
                        <InputGroup>
                            <Input id='email' value={emailBody} onChange={(event) => setEmailBody(event.target.value)} />
                            <InputRightAddon>@</InputRightAddon>
                            <Input value={emailHost} onChange={(event) => setEmailHost(event.target.value)} />
                            <InputRightAddon>.com</InputRightAddon>
                        </InputGroup>
                        <Button onClick={handleAddGuest}> Add Guest </Button>
                        <Box
                            value={addedPeople.join(",")}
                            border="1px solid black"
                            borderRadius="5%"
                            p="4"
                            w="100%"
                            h="80px"
                            overflowY="auto"
                        >
                            {addedPeople.map((tag) => (
                                <Tag key={tag} m="1" variant="solid" colorScheme="blue" size="sm">
                                    <TagLabel>{tag}</TagLabel>
                                    <TagCloseButton onClick={() => handleTagDelete(tag)} />
                                </Tag>
                            ))}
                        </Box>
                    </VStack>
                    <FormLabel htmlFor='frequency'>Repeat</FormLabel>
                    <StyledSelect
                        value={selectedFrequency}
                        onChange={(event) => setSelectedFrequency(event.target.value)}
                        options={options}
                    />
                </PopoverBody>
                <PopoverFooter w="100%" justifyContent="space-between" display="flex">
                    <Button
                        type="submit"
                        onClick={() => window.open(`https://www.google.com/calendar/render?action=TEMPLATE&dates=${formatDateTime()}&recur=${formatFrequency()}&add=${formatAddPeople()}&text=${formatEventTitle()}&location=${formatEventLocation()}&details=${formatDescription()}`)}
                    >
                        Create Event
                    </Button>
                    <Popover>
                        <PopoverTrigger>
                            <Button>
                                Add Progress
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent bg={_cardBackground}>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverHeader> Select Age and Name of Progression Note </PopoverHeader>
                            <PopoverBody>
                                <HStack>
                                    <StyledSelect
                                        value={selectedAgeOption}
                                        onChange={event => setSelectedAgeOption(event.target.value)}
                                        options={ageOptions}
                                    />
                                    <StyledSelect
                                        options={getTagOptions()}
                                        value={selectedProgressNoteOption}
                                        onChange={event => {
                                            setSelectedProgressNoteOption(event.target.value);
                                        }}
                                    />
                                </HStack>
                            </PopoverBody>
                        </PopoverContent>
                    </Popover>
                </PopoverFooter>
            </PopoverContent>
        </Popover>
    );
};

