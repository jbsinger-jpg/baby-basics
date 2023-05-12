import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, Input, useColorModeValue } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { cardBackground } from '../../defaultStyle';
import { auth, storage } from '../../firebaseConfig';

export default function BabyImagesModal({ babyImagesModalIsOpen, setBabyImagesModalIsOpen }) {
    const _cardBackground = useColorModeValue(cardBackground.light, cardBackground.dark);
    const [files, setFiles] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleSelectedFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmitPicture = () => {
        const currentUser = auth.currentUser.uid;

        if (currentUser && selectedFile) {
            console.log("Current User: ", currentUser);
            console.log("Selected File: ", selectedFile);

            const storageRef = storage.ref(`files/${currentUser}/${selectedFile.name}`);
            const userFilesRef = storage.ref(`files/${currentUser}/`);
            console.log("Storage Ref String: ", `files/${currentUser}/${selectedFile.name}`);
            console.log("Users Ref String: ", `files/${currentUser}/`);
            console.log("Storage Reference: ", storageRef);
            console.log("User Files Ref: ", userFilesRef);

            storageRef.put(selectedFile).then((snapshot) => {
                let options = [];
                console.log('File uploaded successfully!', snapshot);
                userFilesRef.list().then((result) => {
                    result.items.map((item) => item.getDownloadURL().then(url => options.push(url)));
                    setFiles(options);
                    console.log(options);
                });
            });
        }
    };

    useEffect(() => {
        const currentUser = auth.currentUser.uid;

        if (currentUser) {
            const userFilesRef = storage.ref(`files/${currentUser}/`);
            // userFilesRef.delete();
            userFilesRef.list().then((result) => {
                let options = [];
                result.items.map((item) => item.getDownloadURL().then(url => options.push(url)));
                setFiles(options);
                console.log(options);
            });
        }
    }, []);

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
                                    <li key={file}>{file}</li>
                                ))}
                            </ul>
                        </div>
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button onClick={handleSubmitPicture}> Submit Picture </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    );
}
