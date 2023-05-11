import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, FormControl, FormHelperText, FormLabel, HStack, Input, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Textarea, VStack, useColorModeValue } from '@chakra-ui/react';
import React, { useState } from 'react';
import { cardBackground, screenBackground } from '../../defaultStyle';
import StyledSelect from '../StyledSelect';
import { auth, firestore } from '../../firebaseConfig';
import { useCollectionData } from 'react-firebase-hooks/firestore';

export default function BabyProgressModal({ progressModalVisible, setProgressModalVisible }) {
    const _cardBackground = useColorModeValue(cardBackground.light, cardBackground.dark);
    const _screenBackground = useColorModeValue(screenBackground.light, screenBackground.dark);
    const [eventName, setEventName] = useState(null);
    const [tag, setTag] = useState(null);
    const [eventDescription, setEventDescription] = useState(null);
    const [progressButtonLoading, setProgressButtonLoading] = useState(false);
    const [selectedAgeOption, setSelectedAgeOption] = useState(null);
    const [selectedTagOption, setSelectedTagOption] = useState(null);
    const [userTagData] = useCollectionData(firestore.collection("users").doc(auth?.currentUser?.uid).collection("baby_progress").where("age", "==", selectedAgeOption), { idField: "id" });

    const clearEntries = () => {
        setTag("");
        setSelectedTagOption("");
        setEventDescription("");
        setSelectedTagOption("");
        setEventName("");
    };

    const handleProgressSubmission = async () => {
        setProgressButtonLoading(true);
        const babyProgressRef = await firestore.collection("users").doc(auth?.currentUser?.uid).collection("baby_progress");

        // delete the entry in case we update it
        if (selectedTagOption)
            await babyProgressRef.doc(selectedTagOption).delete();

        await babyProgressRef.doc(eventName).set({
            description: eventDescription,
            name: eventName,
            tag: tag,
            age: selectedAgeOption
        });

        setSelectedTagOption(eventName);
        setProgressButtonLoading(false);
    };

    const handleProgressDeletion = async () => {
        setProgressButtonLoading(true);

        const babyProgressRef = await firestore.collection("users").doc(auth?.currentUser?.uid).collection("baby_progress");

        if (selectedTagOption) {
            await babyProgressRef.doc(selectedTagOption).delete();
            clearEntries();
        }
        else {
            // TODO: Display a message to the user saying that they cannot delete an event

        }

        setProgressButtonLoading(false);
    };

    const getTagOptions = () => {
        // TODO: Generate tag options that the user has inputted
        let options = [];

        if (selectedAgeOption && userTagData) {
            for (let i = 0; i < userTagData.length; i++) {
                options.push({
                    value: userTagData[i].name,
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

    const tagOptions = [
        { value: "Warning", label: "Warning", key: 0 },
        { value: "Good", label: "Good", key: 1 },
        { value: "Neutral", label: "Neutral", key: 2 },
        { value: "Pediatrist", label: "Pediatrist", key: 3 },
    ];

    return (
        <AlertDialog
            isOpen={progressModalVisible}
            onClose={() => setProgressModalVisible(false)}
        >
            <AlertDialogOverlay>
                <AlertDialogContent bg={_cardBackground}>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                        Make Progress Note for Google Calendar Event
                    </AlertDialogHeader>
                    <AlertDialogBody>
                        <VStack spacing="2">
                            <HStack w="100%">
                                <FormControl>
                                    <FormLabel>Baby Age</FormLabel>
                                    <StyledSelect
                                        options={ageOptions}
                                        value={selectedAgeOption}
                                        onChange={(event) => {
                                            setSelectedAgeOption(event.target.value);
                                            clearEntries();
                                        }}
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Selected Event</FormLabel>
                                    <StyledSelect
                                        options={getTagOptions()}
                                        value={selectedTagOption}
                                        onChange={(event) => {
                                            setSelectedTagOption(event.target.value);
                                            setEventName(event.target.value);
                                            for (let i = 0; i < userTagData.length; i++) {
                                                if (userTagData[i].name === event.target.value) {
                                                    setTag(userTagData[i].tag);
                                                    setEventDescription(userTagData[i].description);
                                                }
                                            }

                                            if (event.target.value === "") {
                                                clearEntries();
                                            }
                                        }}
                                    />
                                </FormControl>
                            </HStack>
                            <FormControl>
                                <FormLabel>Event Name</FormLabel>
                                <Input value={eventName} onChange={(event) => setEventName(event.target.value)} />
                                <FormHelperText>Enter a unique name to refer to later.</FormHelperText>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Event Tag</FormLabel>
                                <StyledSelect value={tag} onChange={(event) => setTag(event.target.value)} options={tagOptions} />
                                <FormHelperText>Use the tag to simplify event description.</FormHelperText>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Event Description</FormLabel>
                                <Textarea
                                    value={eventDescription}
                                    onChange={(event) => setEventDescription(event.target.value)}
                                />
                                <FormHelperText>Put something down that you need to make note of!</FormHelperText>
                            </FormControl>
                        </VStack>
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button
                            onClick={() => setProgressModalVisible(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            isLoading={progressButtonLoading}
                            onClick={handleProgressSubmission}
                            ml={3}
                            mr={3}
                        >
                            Update
                        </Button>
                        <Popover>
                            <PopoverTrigger>
                                <Button
                                    mr={3}
                                >
                                    Delete
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent bg={_screenBackground}>
                                <PopoverArrow />
                                <PopoverHeader>Are you sure you want to delete this entry?</PopoverHeader>
                                <PopoverCloseButton />
                                <PopoverBody w="100%" justifyContent="space-between" display="flex">
                                    <Button
                                        onClick={handleProgressDeletion}
                                        isLoading={progressButtonLoading}
                                    >
                                        Delete
                                    </Button>
                                </PopoverBody>
                            </PopoverContent>
                        </Popover>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    );
}
