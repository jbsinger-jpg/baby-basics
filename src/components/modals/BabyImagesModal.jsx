import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, FormControl, FormHelperText, FormLabel, Input, VStack, useColorModeValue, useToast } from '@chakra-ui/react';
import React, { useState } from 'react';
import { cardBackground } from '../../defaultStyle';
import { auth, firestore, storage } from '../../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import StyledSelect from '../StyledSelect';

export default function BabyImagesModal({ babyImagesModalIsOpen, setBabyImagesModalIsOpen, onPage, getUploadedImages }) {
    const _cardBackground = useColorModeValue(cardBackground.light, cardBackground.dark);
    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedAgeOption, setSelectedAgeOption] = useState(null);
    const [selectedTagOption, setSelectedTagOption] = useState(null);
    const toast = useToast();

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

    const handleSelectedFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmitPicture = async (event) => {
        event.preventDefault();
        const currentUser = auth?.currentUser?.uid;

        if (currentUser && selectedFile) {
            const storageRef = storage.ref(`files`);
            const userRef = storageRef.child(currentUser);
            const fileRef = userRef.child(selectedFile.name);

            await firestore.collection("users").doc(currentUser).collection("uploaded-images").doc(selectedFile.name).get().then((doc) => {
                if (doc.exists) {
                    toast({
                        title: 'Image with name already exists.',
                        description: JSON.stringify(doc.data().name),
                        status: 'error',
                        duration: 9000,
                        isClosable: true,
                    });

                    return;
                }
            });

            fileRef.put(selectedFile).then(() => {
                userRef.list().then((result) => {
                    result.items[(result.items.length - 1)].getDownloadURL().then((url) => {
                        firestore.collection("users")
                            .doc(currentUser)
                            .collection("uploaded-images")
                            .doc(selectedFile.name)
                            .set({
                                name: selectedFile.name,
                                url: url,
                                tag: selectedTagOption,
                                age: selectedAgeOption
                            }).then(() => {
                                if (getUploadedImages) {
                                    getUploadedImages();
                                }
                            });
                    });
                });
            });
        }
    };

    const handleSelectedAgeOption = (event) => {
        setSelectedAgeOption(event.target.value);
    };

    const handleSelectedTagOption = (event) => {
        setSelectedTagOption(event.target.value);
    };

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
                                        accept=".jpg, .jpeg"
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
                            >
                                Submit
                            </Button>
                            <Button
                                onClick={() => setBabyImagesModalIsOpen(false)}
                            >
                                Close
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
