// Module Imports
import { Box, Button, Card, CardBody, CardFooter, CardHeader, HStack, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, SkeletonText, Tag, Text, VStack, useColorModeValue } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import ReactImageMagnify from '@blacklab/react-image-magnify';

// Relative Imports
import { cardBackground, screenBackground } from '../defaultStyle';
import { auth, storage } from '../firebaseConfig';
import BabyImagesModal from '../components/modals/BabyImagesModal';
import FloatingActionButtonsBabyImages from '../components/floatingActionButtons/FloatingActionButtonsBabyImages';

export default function BabyPicturePage() {
    const _screenBackground = useColorModeValue(screenBackground.light, screenBackground.dark);
    const _cardBackground = useColorModeValue(cardBackground.light, cardBackground.dark);
    const [babyPictureData, setBabyPictureData] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [dataIsLoading, setDataIsLoading] = useState(false);
    const [babyImagesModalIsOpen, setBabyImagesModalIsOpen] = useState(false);
    const currentUser = auth?.currentUser?.uid;

    const getUpdatedURLList = () => {
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
                        console.log("Options: ", options);
                        setBabyPictureData(options);
                    })
                    .catch((error) => {
                        console.error('Error getting download URLs:', error);
                    })
                    .finally(() => {
                        setDataIsLoading(true);
                    });
            });
        }
    };

    const handleDeleteBabyPicture = () => {
        if (currentUser && selectedFile) {
            const storageRef = storage.ref(`files/${currentUser}/${selectedFile.name}`);

            storageRef.delete(selectedFile).then(() => {
                console.log('File deleted successfully!');
                getUpdatedURLList();
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
                getUpdatedURLList();
            }
            // force the page to re-render with the new data... need to 
            // find a better way to do this later.
            setSelectedFile("");
        }, [500]);

        // eslint-disable-next-line
    }, [auth.currentUser]);

    return (
        <Box mt="2">
            <FloatingActionButtonsBabyImages
                setBabyImagesModalIsOpen={setBabyImagesModalIsOpen}
            />
            <BabyImagesModal
                babyImagesModalIsOpen={babyImagesModalIsOpen}
                setBabyImagesModalIsOpen={setBabyImagesModalIsOpen}
                onPage
            />
            <HStack
                flexWrap={"wrap"}
                marginTop="20"
                spacing="10"
                bg={_screenBackground}
            >
                {babyPictureData && babyPictureData.map((picture, index) => {
                    return (
                        <SkeletonText isLoaded={dataIsLoading}
                            key={index}
                        >
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
                                            <PopoverContent>
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
                        </SkeletonText>
                    );
                })}
            </HStack>
        </Box >
    );
}
