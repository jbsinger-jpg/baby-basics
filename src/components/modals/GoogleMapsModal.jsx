import { Button, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select } from '@chakra-ui/react';
import React, { useState } from 'react';

const locations = [
    { key: 0, value: "OBGYN", label: "OBGYN" },
    { key: 1, value: "hospital+for+pregnancy", label: "Hospital" },
    { key: 2, value: "daycare+centers", label: "Daycare" },
    { key: 3, value: "playground", label: "Playgrounds" },
    { key: 4, value: "birthing+classes", label: "Birthing Classes" },
    { key: 5, value: "genetic+counseling", label: "Genetic Counseling" },
    { key: 6, value: "children's+amusement+center", label: "Children's Amusement Centers" },
];

export default function GoogleMapsModal({ searchPlaces, setSearchPlaces }) {
    // Searching Logic
    const [selectedLocation, setSelectedLocation] = useState(null);

    // TODO: Make sure the city and state are in acceptable formats for search
    // TODO: Make sure the fields you are searching get formatted via a form component instead of onChange event
    const [state, setState] = useState(null);
    const [city, setCity] = useState(null);

    const formatLocationEntry = (option) => {
        if (city && state) {
            return `${option}+near+${city}+${state}`;
        }
        else if (city && !state) {
            return `${option}+near+${city}`;
        }
        else if (!city && state) {
            return `${option}+near+${state}`;
        }
        else {
            return option;
        }
    };
    return (
        <Modal isOpen={searchPlaces} onClose={() => setSearchPlaces(false)}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Search Places Near You!</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Select
                        placeholder='Select a place'
                        onChange={(event) => {
                            const formattedEntry = formatLocationEntry(event.target.value);
                            setSelectedLocation(formattedEntry);
                        }}
                    >
                        {locations && locations.length > 0 && locations.map((location) => {
                            return (<option value={location.value} key={location.key}>{location.label}</option>);
                        })}
                    </Select>
                    <Heading size="md">City</Heading>
                    <Input value={city} onChange={event => setCity(event.target.value)} />
                    <Heading size="md">State</Heading>
                    <Input value={state} onChange={event => setState(event.target.value)} />
                </ModalBody>
                <ModalFooter>
                    <Button mr={3} onClick={() => setSearchPlaces(false)}>
                        Close
                    </Button>
                    <Button
                        as="a"
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`https://www.google.com/maps/search/${selectedLocation}`}
                    >
                        Search
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
