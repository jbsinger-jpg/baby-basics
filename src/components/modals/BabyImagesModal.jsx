import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Heading, Input, ListItem, UnorderedList, useColorModeValue } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { cardBackground, screenBackground } from '../../defaultStyle';
import { auth, storage } from '../../firebaseConfig';
import { useNavigate } from 'react-router-dom';

export default function BabyImagesModal({ babyImagesModalIsOpen, setBabyImagesModalIsOpen }) {
    const _cardBackground = useColorModeValue(cardBackground.light, cardBackground.dark);
    const navigate = useNavigate();
    const [files, setFiles] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [submitButtonIsLoading, setSubmitButtonIsLoading] = useState(false);
    const [deleteButtonIsLoading, setDeleteButtonIsLoading] = useState(false);

    const getUpdatedURLList = () => {
        const currentUser = auth?.currentUser?.uid;

        setSubmitButtonIsLoading(true);
        setDeleteButtonIsLoading(true);

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
                        setDeleteButtonIsLoading(false);
                    });
            });
        }
    };

    const handleSelectedFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmitPicture = async () => {
        const currentUser = auth?.currentUser?.uid;

        if (currentUser && selectedFile) {
            const storageRef = storage.ref(`files/${currentUser}/${selectedFile.name}`);

            storageRef.put(selectedFile).then(() => {
                console.log('File uploaded successfully!');
                getUpdatedURLList();
            });
        }
    };

    const handleDeletePicture = () => {
        const currentUser = auth?.currentUser?.uid;

        if (currentUser && selectedFile) {
            const storageRef = storage.ref(`files/${currentUser}/${selectedFile.name}`);

            storageRef.delete(selectedFile).then(() => {
                console.log('File deleted successfully!');
                getUpdatedURLList();
            });
        }
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
            <AlertDialogOverlay>
                <AlertDialogContent bg={_cardBackground}>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                        Upload Images for Baby Progression!
                    </AlertDialogHeader>
                    <AlertDialogBody>
                        <Input
                            type="file"
                            onChange={handleSelectedFileChange}
                        />
                        <Box>
                            <Heading>Files</Heading>
                            <UnorderedList>
                                {files && files.map((file) => (
                                    <ListItem
                                        key={file.url}
                                        _hover={{
                                            cursor: "pointer",
                                            backgroundColor: screenBackground.dark
                                        }}
                                        onClick={() => setSelectedFile(file)}
                                    >
                                        {file.name}
                                    </ListItem>
                                ))}
                            </UnorderedList>
                        </Box>
                    </AlertDialogBody>
                    <AlertDialogFooter display={"flex"} w="100%" justifyContent="space-evenly">
                        <Button
                            onClick={handleSubmitPicture}
                            isLoading={submitButtonIsLoading}
                        >
                            Submit
                        </Button>
                        <Button
                            onClick={() => navigate("/pictures")}
                        >
                            View Pictures
                        </Button>
                        <Button
                            onClick={handleDeletePicture}
                            isLoading={deleteButtonIsLoading}
                        >
                            Delete
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    );
}
