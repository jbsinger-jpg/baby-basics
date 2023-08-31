// Module Imports
import { Box, Button, Card, CardBody, CardFooter, CardHeader, HStack, Icon, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, Tag, Text, VStack, useColorModeValue } from '@chakra-ui/react';
import { InfoOutlineIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import ReactImageMagnify from '@blacklab/react-image-magnify';

// Relative Imports
import { cardBackground, screenBackground } from '../defaultStyle';
import { auth, firestore, storage } from '../firebaseConfig';
import BabyImagesModal from '../components/modals/BabyImagesModal';
import FloatingActionButtonsBabyImages from '../components/floatingActionButtons/FloatingActionButtonsBabyImages';
import StyledSelect from '../components/StyledSelect';

export default function BabyPicturePage() {
    const _screenBackground = useColorModeValue(screenBackground.light, screenBackground.dark);
    const _cardBackground = useColorModeValue(cardBackground.light, cardBackground.dark);
    const [babyPictureData, setBabyPictureData] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [babyImagesModalIsOpen, setBabyImagesModalIsOpen] = useState(false);
    const [selectedTag, setSelectedTag] = useState(null);
    const [selectedAge, setSelectedAge] = useState(null);
    const currentUser = auth?.currentUser?.uid;

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

        console.log("image data: ", imageData);
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
            <VStack
                w="80%"
                alignItems="start"
                pl="10"
            >
                <HStack w="300px" justifyContent='space-evenly'>
                    <Text>Age</Text>
                    <StyledSelect options={ageOptions} value={selectedAge} onChange={(event) => setSelectedAge(event.target.value)} />
                </HStack>
                <HStack w="300px" justifyContent='space-evenly'>
                    <Text>Tag</Text>
                    <StyledSelect options={tagOptions} value={selectedTag} onChange={(event) => setSelectedTag(event.target.value)} />
                </HStack>
                <Button onClick={getUploadedImages}>Confirm</Button>
            </VStack>
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
                        <VStack
                            ml={index === 0 && 10}
                        >
                            <Card w="220px" bg={_cardBackground} justifyContent="center" alignItems="center">
                                <CardHeader>
                                    <Tag
                                        borderRadius="md"
                                        size="lg"
                                        variant="outline"
                                        color="wheat"
                                    >
                                        <Text marginLeft="4" marginRight="2" marginTop="2" marginBottom="2">
                                            {picture.name}
                                        </Text>
                                    </Tag>
                                </CardHeader>
                                <CardBody display="flex" justifyContent="center">
                                    <ReactImageMagnify
                                        imageProps={{
                                            src: picture.url,
                                            width: 150,
                                            height: 200,
                                        }}
                                        magnifiedImageProps={{
                                            src: picture.url,
                                            width: 600,
                                            height: 800
                                        }}
                                        magnifyContainerProps={{
                                            height: 300,
                                            width: 400
                                        }}
                                    />
                                </CardBody>
                                <CardFooter display={"flex"} w="100%" justifyContent="space-between">
                                    <Popover>
                                        <PopoverTrigger>
                                            <Button onClick={() => handleConfirmation(picture)}>
                                                Remove
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent bg={_cardBackground}>
                                            <PopoverArrow />
                                            <PopoverCloseButton />
                                            <PopoverHeader>Confirmation!</PopoverHeader>
                                            <PopoverBody>Are you sure you want to remove this picture?</PopoverBody>
                                            <PopoverFooter>
                                                <Button
                                                    onClick={handleDeleteBabyPicture}
                                                >
                                                    Remove
                                                </Button>
                                            </PopoverFooter>
                                        </PopoverContent>
                                    </Popover>
                                </CardFooter>
                            </Card>
                        </VStack>
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
                                    No Data Select Age and Tag
                                </Text>
                            </HStack>
                        </motion.div>
                    </Box>
                }
            </HStack>
        </Box >
    );
}
