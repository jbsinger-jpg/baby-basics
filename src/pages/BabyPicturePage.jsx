// Module Imports
import { Box, Button, HStack, Icon, Text, VStack, useColorModeValue } from '@chakra-ui/react';
import { InfoOutlineIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";

// Relative Imports
import { screenBackground } from '../defaultStyle';
import { auth, firestore, storage } from '../firebaseConfig';
import BabyImagesModal from '../components/modals/BabyImagesModal';
import FloatingActionButtonsBabyImages from '../components/floatingActionButtons/FloatingActionButtonsBabyImages';
import StyledSelect from '../components/StyledSelect';
import PictureRow from '../components/componentRows/PictureRow';

export default function BabyPicturePage() {
    const _screenBackground = useColorModeValue(screenBackground.light, screenBackground.dark);
    const [babyPictureData, setBabyPictureData] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [babyImagesModalIsOpen, setBabyImagesModalIsOpen] = useState(false);
    const [selectedTag, setSelectedTag] = useState(null);
    const [selectedAge, setSelectedAge] = useState(null);
    const [ageOptionsLoading, setAgeOptionsLoading] = useState(false);
    const [tagOptions, setTagOptions] = useState([]);
    const currentUser = auth?.currentUser?.uid;

    const ageOptions = [
        { value: "0-3M", label: "0-3M", key: 0 },
        { value: "4-6M", label: "4-6M", key: 1 },
        { value: "7-9M", label: "7-9M", key: 2 },
        { value: "10-12M", label: "10-12M", key: 3 },
        { value: "13-18M", label: "13-18M", key: 4 },
        { value: "19-24M", label: "19-24M", key: 5 },
    ];

    const getUploadedImages = async () => {
        let uploadedImagesRef = firestore.collection("users").doc(currentUser).collection("uploaded-images");
        let imageData = [];

        if (selectedAge) {
            uploadedImagesRef = await uploadedImagesRef.where("age", "==", selectedAge);
        }

        if (selectedTag) {
            uploadedImagesRef = await uploadedImagesRef.where("tag", "==", selectedTag);
        }

        (await uploadedImagesRef.get()).docs.forEach(doc => {
            imageData.push({ ...doc.data() });
        });

        setBabyPictureData(imageData);
    };

    const handleDeleteBabyPicture = () => {
        if (currentUser && selectedFile) {
            const storageRef = storage.ref(`files`);
            const userRef = storageRef.child(currentUser);
            const fileRef = userRef.child(selectedFile.name);

            fileRef.delete(selectedFile).then(() => {
                console.log('File deleted successfully!');
                firestore.collection("users")
                    .doc(currentUser)
                    .collection("uploaded-images")
                    .doc(selectedFile.name)
                    .delete()
                    .then(() => {
                        getUploadedImages();
                    });
            });
        }
    };

    const handleConfirmation = (picture) => {
        setSelectedFile(picture);
    };

    const handleSelectedAgeChange = async (event) => {
        setAgeOptionsLoading(true);
        setSelectedAge(event.target.value);

        let tagOptions = [];
        let imagesRef = await firestore
            .collection("users")
            .doc(auth?.currentUser?.uid)
            .collection("uploaded-images");

        if (event.target.value) {
            imagesRef = imagesRef.where("age", "==", String(event.target.value));
        }

        imagesRef.get()
            .then((snapshot) => {
                let index = 0;

                snapshot.docs.forEach(doc => {
                    const formattedOption = { label: doc.data().tag, value: doc.data().tag, key: index };
                    index += 1;
                    tagOptions.push(formattedOption);
                });

                setTagOptions(tagOptions);
            })
            .finally(() => {
                setAgeOptionsLoading(false);
            });
    };

    const handleSelectedTagChange = (event) => {
        setSelectedTag(event.target.value);
    };

    useEffect(() => {
        const currentUser = auth?.currentUser?.uid;
        setTimeout(() => {
            if (currentUser) {
                getUploadedImages();
            }
            // force the page to re-render with the new data... need to 
            // find a better way to do this later.
            setSelectedFile("");
        }, [500]);

        // eslint-disable-next-line
    }, [auth.currentUser]);

    return (
        <Box pt="2" bg={_screenBackground} h="80vh">
            <HStack
                w="100vw"
                alignItems="start"
                pb="5"
                justifyContent="stretch"
                bottom="0"
                position="fixed"
            >
                <VStack
                    w="40vw"
                    alignItems="start"
                    justifyContent='space-evenly'
                >
                    <Text>Age</Text>
                    <StyledSelect options={ageOptions} value={selectedAge} onChange={handleSelectedAgeChange} />
                </VStack>
                <HStack
                    alignItems="end"
                >
                    <VStack
                        alignItems="start"
                        justifyContent='space-evenly'
                        w="40vw"
                    >
                        <Text>Tag</Text>
                        <StyledSelect options={tagOptions} value={selectedTag} onChange={handleSelectedTagChange} />
                    </VStack>
                    <Button onClick={getUploadedImages} isLoading={ageOptionsLoading}>Confirm</Button>
                </HStack>
            </HStack>
            <FloatingActionButtonsBabyImages
                setBabyImagesModalIsOpen={setBabyImagesModalIsOpen}
            />
            <BabyImagesModal
                babyImagesModalIsOpen={babyImagesModalIsOpen}
                setBabyImagesModalIsOpen={setBabyImagesModalIsOpen}
                getUploadedImages={getUploadedImages}
                onPage
            />
            <HStack
                flexWrap={"wrap"}
                marginTop="20"
                spacing="10"
                bg={_screenBackground}
            >
                {(babyPictureData && babyPictureData.length) ? babyPictureData.map((picture, index) => {
                    return (
                        <PictureRow
                            key={index}
                            picture={picture}
                            index={index}
                            handleDeleteBabyPicture={handleDeleteBabyPicture}
                            handleConfirmation={handleConfirmation}
                        />
                    );
                })
                    :
                    <Box
                        w="100%"
                        h="100%"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <motion.div
                            whileHover={{ scale: 1.2 }}
                        >
                            <HStack>
                                <Icon as={InfoOutlineIcon} />
                                <Text>
                                    No Pictures of this Age and Tag Combination
                                </Text>
                            </HStack>
                        </motion.div>
                    </Box>
                }
            </HStack>
        </Box >
    );
}
