// module imports
import { CalendarIcon } from '@chakra-ui/icons';
import { Box, Button, FormLabel, Input, InputGroup, InputRightAddon, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, Tag, TagCloseButton, TagLabel, VStack, useColorModeValue } from '@chakra-ui/react';
import React, { useState } from 'react';

// relative imports
import { cardBackground } from '../defaultStyle';
import StyledSelect from './StyledSelect';

export default function CustomPopOver() {
    const [selectedFrequency, setSelectedFrequency] = useState("");
    const [emailHost, setEmailHost] = useState("");
    const [emailBody, setEmailBody] = useState("");
    const [calendarEventTitle, setCalendarEventTitle] = useState("");
    const [calendarEventLocation, setCalendarEventLocation] = useState("");
    const [addedPeople, setAddedPeople] = useState([]);
    const _cardBackground = useColorModeValue(cardBackground.light, cardBackground.dark);

    const formatDateTime = () => {
        const startTime = new Date();
        const endTime = new Date();

        endTime.setDate(endTime.getDate() + 1);
        const dates = startTime.toISOString().replace(/-|:|\.\d+/g, '') + '/' + endTime.toISOString().replace(/-|:|\.\d+/g, '');
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

    const options = [
        { value: "", label: "Never", key: 0 },
        { value: "DAILY", label: "daily", key: 1 },
        { value: "WEEKLY", label: "weekly", key: 2 },
        { value: "MONTHLY", label: "monthly", key: 3 },
        { value: "YEARLY", label: "yearly", key: 4 },
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
                    <FormLabel htmlFor='eventTitle'>Event Title</FormLabel>
                    <Input
                        id="eventTitle"
                        value={calendarEventTitle}
                        onChange={(event) => setCalendarEventTitle(event.target.value)}
                    />
                    <FormLabel htmlFor='eventLocation'>Event Location</FormLabel>
                    <Input
                        id="eventLocation"
                        value={calendarEventLocation}
                        onChange={(event) => setCalendarEventLocation(event.target.value)}
                    />
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
                            h="140px"
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
                <PopoverFooter>
                    <Button
                        onClick={() => window.open(`https://www.google.com/calendar/render?action=TEMPLATE&dates=${formatDateTime()}&recur=${formatFrequency()}&add=${formatAddPeople()}&text=${formatEventTitle()}&location=${formatEventLocation()}`)}
                    >
                        Create Event
                    </Button>
                </PopoverFooter>
            </PopoverContent>
        </Popover>
    );
};

