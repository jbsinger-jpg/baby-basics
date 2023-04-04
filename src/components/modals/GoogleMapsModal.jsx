import { Button, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select } from '@chakra-ui/react';
import React, { useState } from 'react';

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

    // TODO: Make sure the city and state are in acceptable formats for search
    // TODO: Make sure the fields you are searching get formatted via a form component instead of onChange event
    const [state, setState] = useState(null);
    const [city, setCity] = useState(null);

    const formatLocationEntry = () => {
        if (city && state) {
            return `${selectedLocation}+near+${city}+${state}`;
        }
        else if (city && !state) {
            return `${selectedLocation}+near+${city}`;
        }
        else if (!city && state) {
            return `${selectedLocation}+near+${state}`;
        }
        else {
            // if options are not filled assume that they meant near them
            return `${selectedLocation}+near+me`;
        }
    };

    const redirectUser = (event) => {
        event.preventDefault();

        const formattedEntry = formatLocationEntry();
        window.open(`https://www.google.com/maps/search/${formattedEntry}`, '_blank');
    };

    return (
        <Modal isOpen={searchPlaces} onClose={() => setSearchPlaces(false)}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Search Places!</ModalHeader>
                <ModalCloseButton />
                <form onSubmit={redirectUser}>
                    <ModalBody>
                        <Select
                            placeholder='Select a place'
                            onChange={(event) => {
                                setSelectedLocation(event.target.value);
                            }}
                        >
                            {locations && locations.length > 0 && locations.map((location) => {
                                return (<option value={location.value} key={location.key}>{location.label}</option>);
                            })}
                        </Select>
                        <Heading size="md">City</Heading>
                        <Input value={city} onChange={event => setCity(event.target.value)} placeholder='leave blank for near you' />
                        <Heading size="md">State</Heading>
                        <Input value={state} onChange={event => setState(event.target.value)} placeholder='leave blank for near you' />
                    </ModalBody>
                    <ModalFooter>
                        <Button mr={3} onClick={() => setSearchPlaces(false)}>
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
        </Modal>
    );
}
