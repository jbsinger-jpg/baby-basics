import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, Input, useColorModeValue } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { cardBackground } from '../../defaultStyle';
import { auth, storage } from '../../firebaseConfig';

export default function BabyImagesModal({ babyImagesModalIsOpen, setBabyImagesModalIsOpen }) {
    const _cardBackground = useColorModeValue(cardBackground.light, cardBackground.dark);
    const [files, setFiles] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const currentUser = auth?.currentUser?.uid;
    const [submitButtonIsLoading, setSubmitButtonIsLoading] = useState(false);
    const [deleteButtonIsLoading, setDeleteButtonIsLoading] = useState(false);

    const getUpdatedURLList = () => {
        setSubmitButtonIsLoading(true);
        setDeleteButtonIsLoading(true);

        if (currentUser) {
            const userFilesRef = storage.ref(`files/${currentUser}/`);
            userFilesRef.list().then(async (result) => {
                const urlResults = result.items.map((item) => item.getDownloadURL());
                const fileInformation = result.items.map((item) => item.name);
                console.log("File name information: ", fileInformation);

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
        const currentUser = auth.currentUser.uid;

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
        getUpdatedURLList();
        // eslint-disable-next-line
    }, [auth?.currentUser?.uid]);

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
                        <div>
                            <h1>Files</h1>
                            <ul>
                                {files && files.map((file) => (
                                    <li key={file.url}>{file.name}</li>
                                ))}
                            </ul>
                        </div>
                    </AlertDialogBody>
                    <AlertDialogFooter display={"flex"} w="100%" justifyContent="space-between">
                        <Button
                            onClick={handleSubmitPicture}
                            isLoading={submitButtonIsLoading}
                        >
                            Submit
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
