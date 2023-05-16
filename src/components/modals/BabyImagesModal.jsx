import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, FormControl, FormHelperText, FormLabel, Heading, Input, ListItem, UnorderedList, VStack, useColorModeValue } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { cardBackground, screenBackground } from '../../defaultStyle';
import { auth, storage } from '../../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import StyledSelect from '../StyledSelect';

export default function BabyImagesModal({ babyImagesModalIsOpen, setBabyImagesModalIsOpen, onPage }) {
    const _cardBackground = useColorModeValue(cardBackground.light, cardBackground.dark);
    const navigate = useNavigate();
    const [files, setFiles] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [submitButtonIsLoading, setSubmitButtonIsLoading] = useState(false);
    const [selectedAgeOption, setSelectedAgeOption] = useState(null);
    const [selectedTagOption, setSelectedTagOption] = useState(null);

    const ageOptions = [
        { value: "0-3M", label: "0-3M", key: 0 },
        { value: "4-6M", label: "4-6M", key: 1 },
        { value: "7-9M", label: "7-9M", key: 2 },
        { value: "10-12M", label: "10-12M", key: 3 },
        { value: "13-18M", label: "13-18M", key: 4 },
        { value: "19-24M", label: "19-24M", key: 5 },
    ];

    const tagOptions = [
        { value: "Doctor's Visit", label: "Doctor's Visit", key: 0 },
        { value: "Growth and Development", label: "Growth and Development", key: 1 },
        { value: "Social Media", label: "Social Media", key: 2 },
        { value: "Various", label: "Various", key: 3 },
    ];

    const getUpdatedURLList = () => {
        const currentUser = auth?.currentUser?.uid;

        setSubmitButtonIsLoading(true);

        if (currentUser) {
            const userFilesRef = storage.ref(`files/${currentUser}/`);

            userFilesRef.list().then(async (result) => {
                const urlResults = result.items.map((item) => item.getDownloadURL());
                const fileInformation = result.items.map((item) => item.name);

                Promise.all(urlResults)
                    .then((urls) => {
                        console.log('Download URLs:', urls);
                        let options = [];

                        // match a url with a name for better UX
                        for (let i = 0; i < urls.length; i++) {
                            options.push({ url: urls[i], name: fileInformation[i] });
                        }
                        setFiles(options);
                    })
                    .catch((error) => {
                        console.error('Error getting download URLs:', error);
                    })
                    .finally(() => {
                        setSubmitButtonIsLoading(false);
                    });
            });
        }
    };

    const handleSelectedFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmitPicture = (event) => {
        event.preventDefault();
        const currentUser = auth?.currentUser?.uid;

        if (currentUser && selectedFile) {
            const storageRef = storage.ref(`files`);
            const userRef = storageRef.child(currentUser);
            const ageRef = userRef.child(selectedAgeOption);
            const fileTagRef = ageRef.child(selectedTagOption);
            const fileRef = fileTagRef.child(selectedFile.name);

            fileRef.put(selectedFile).then(() => {
                console.log('File uploaded successfully!');
                getUpdatedURLList();
            });
        }
    };

    const handleSelectedAgeOption = (event) => {
        setSelectedAgeOption(event.target.value);
    };

    const handleSelectedTagOption = (event) => {
        setSelectedTagOption(event.target.value);
    };

    useEffect(() => {
        const currentUser = auth?.currentUser?.uid;

        if (currentUser)
            getUpdatedURLList();
        console.log("current_user", auth.currentUser);
        // eslint-disable-next-line
    }, [auth?.currentUser]);

    return (
        <AlertDialog
            isOpen={babyImagesModalIsOpen}
            onClose={() => setBabyImagesModalIsOpen(false)}
        >
            <form onSubmit={handleSubmitPicture}>
                <AlertDialogOverlay>
                    <AlertDialogContent bg={_cardBackground}>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Upload Images for Baby Progression!
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            <VStack spacing="5">
                                <FormControl isRequired>
                                    <FormLabel>
                                        Select a file
                                    </FormLabel>
                                    <Input
                                        type="file"
                                        onChange={handleSelectedFileChange}
                                    />
                                    <FormHelperText>
                                        Add this file with a specific age and reason
                                    </FormHelperText>
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>
                                        Select an age
                                    </FormLabel>
                                    <StyledSelect
                                        options={ageOptions}
                                        value={selectedAgeOption}
                                        onChange={handleSelectedAgeOption}
                                    />
                                    <FormHelperText>
                                        Add this to help categorize file.
                                    </FormHelperText>
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>
                                        Select a tag
                                    </FormLabel>
                                    <StyledSelect
                                        options={tagOptions}
                                        value={selectedTagOption}
                                        onChange={handleSelectedTagOption}
                                    />
                                    <FormHelperText>
                                        Add this to help categorize file.
                                    </FormHelperText>
                                </FormControl>
                            </VStack>
                        </AlertDialogBody>
                        <AlertDialogFooter display={"flex"} w="100%" justifyContent="space-between">
                            <Button
                                type="submit"
                                isLoading={submitButtonIsLoading}
                            >
                                Submit
                            </Button>
                            {!onPage &&
                                <Button
                                    onClick={() => navigate("/pictures")}
                                >
                                    View Pictures
                                </Button>
                            }
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </form>
        </AlertDialog>
    );
}
