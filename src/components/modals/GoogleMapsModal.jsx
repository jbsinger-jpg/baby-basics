// module imports
import { Button, HStack, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, VStack, useColorModeValue } from '@chakra-ui/react';
import React, { useState } from 'react';

// relative imports
import { cardBackground } from '../../defaultStyle';
import StyledSelect from '../StyledSelect';

const locations = [
    { key: 4, value: "birthing+classes", label: "Birthing Classes" },
    { key: 6, value: "children's+amusement+center", label: "Children's Amusement Centers" },
    { key: 2, value: "daycare+centers", label: "Daycare" },
    { key: 8, value: "financal+advisors", label: "Financial Advisors" },
    { key: 5, value: "genetic+counseling", label: "Genetic Counseling" },
    { key: 7, value: "health+care+providers", label: "Health Care Providers" },
    { key: 1, value: "hospital+for+pregnancy", label: "Hospital" },
    { key: 9, value: "nutritionist", label: "Nutritionist" },
    { key: 0, value: "OBGYN", label: "OBGYN" },
    { key: 3, value: "playground", label: "Playgrounds" },
];

export default function GoogleMapsModal({ searchPlaces, setSearchPlaces }) {
    // Searching Logic
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [state, setState] = useState(null);
    const [city, setCity] = useState(null);
    const [zip, setZip] = useState(null);
    const [county, setCounty] = useState(null);
    const _cardBackground = useColorModeValue(cardBackground.light, cardBackground.dark);

    const formatLocationEntry = () => {
        let formattedLocation = [];

        if (city) {
            formattedLocation.push(city);
        }

        if (state) {
            formattedLocation.push(state);
        }

        if (zip) {
            formattedLocation.push(zip);
        }

        if (county) {
            formattedLocation.push(county);
        }

        formattedLocation = formattedLocation.join("+");
        if (formattedLocation) {
            return `${selectedLocation}+near+${formattedLocation}`;
        }

        return `${selectedLocation}+near+me`;
    };

    const redirectUser = (event) => {
        event.preventDefault();

        const formattedEntry = formatLocationEntry();
        window.open(`https://www.google.com/maps/search/${formattedEntry}`, '_blank');
    };

    return (
        <Modal isOpen={searchPlaces} onClose={() => setSearchPlaces(false)}>
            <ModalOverlay />
            <ModalContent bg={_cardBackground}>
                <ModalHeader>Search Places!</ModalHeader>
                <ModalCloseButton />
                <form onSubmit={redirectUser}>
                    <ModalBody>
                        <VStack alignItems="start">
                            <Heading size="md">Locations</Heading>
                            <StyledSelect
                                value={selectedLocation}
                                onChange={(event) => setSelectedLocation(event.target.value)}
                                options={locations}
                                isRequired
                            />
                        </VStack>
                        <HStack paddingTop={2} paddingBottom={2}>
                            <VStack alignItems="start">
                                <Heading size="md">City</Heading>
                                <Input value={city} onChange={event => setCity(event.target.value)} placeholder='leave blank for near you' />
                            </VStack>
                            <VStack alignItems="start">
                                <Heading size="md">State</Heading>
                                <Input value={state} onChange={event => setState(event.target.value)} placeholder='leave blank for near you' />
                            </VStack>
                        </HStack>
                        <HStack>
                            <VStack alignItems="start">
                                <Heading size="md">County</Heading>
                                <Input
                                    whileHover={{ scale: 1.2 }}
                                    value={county}
                                    onChange={event => setCounty(event.target.value)}
                                    placeholder='leave blank for near you'
                                />
                            </VStack>
                            <VStack alignItems="start">
                                <Heading size="md">Zip</Heading>
                                <Input value={zip} onChange={event => setZip(event.target.value)} placeholder='leave blank for near you' />
                            </VStack>
                        </HStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            mr={3}
                            onClick={() => setSearchPlaces(false)}
                        >
                            Close
                        </Button>
                        <Button
                            type="submit"
                        >
                            Search
                        </Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal >
    );
}
