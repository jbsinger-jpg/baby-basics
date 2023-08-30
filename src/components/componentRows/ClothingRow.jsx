// module imports
import ReactImageMagnify from '@blacklab/react-image-magnify';
import { CheckIcon, CloseIcon, StarIcon } from '@chakra-ui/icons';
import { Box, Button, Divider, HStack, SkeletonCircle, SkeletonText, Text, VStack, Icon, Stack, Card, CardBody, Tooltip, Heading, Tag, TagLabel, useColorModeValue, CardFooter, CardHeader, CircularProgress } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

// relative imports
import { cardBackground } from '../../defaultStyle';
import { firestore } from '../../firebaseConfig';

export default function ClothingRow({ clothing, clothingDataLoaded, tabIndex, ml }) {
    const MotionBox = motion(Box);
    const MotionButton = motion(Button);
    const [flippedCards, setFlippedCards] = useState(false);
    const [buttonsPressed, setButtonsPressed] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [rating, setRating] = useState(0);
    const [total, setTotal] = useState(0);
    const [average, setAverage] = useState(0);

    const handleFlip = () => {
        setFlippedCards(!flippedCards);
    };

    const handleButtonsTrigger = () => {
        setButtonsPressed(true);
    };

    const Rating = () => {
        const handleMouseEnter = (newValue) => {
            setButtonsPressed(false);
            setRating(newValue);
        };

        const stars = Array(5)
            .fill()
            .map((_, i) => {
                const ratingValue = i + 1;
                return (
                    <Icon
                        key={i}
                        as={StarIcon}
                        color={ratingValue <= rating ? "teal.500" : "gray.300"}
                        onMouseEnter={() => handleMouseEnter(ratingValue)}
                    />
                );
            });
        return <Stack direction="row" cursor={"pointer"}>{stars}</Stack>;
    };

    const handleAddRating = async () => {
        let ratingSum = 0;
        const clothingRef = await firestore.collection("clothing");

        clothingRef.doc(clothing.id).collection("ratings").add({
            rating: Number(rating),
        });

        // update the data with the new rating
        const _total = (await clothingRef.doc(clothing.id).collection("ratings").get()).size;
        const sum = (await clothingRef.doc(clothing.id).collection("ratings").get()).docs.map(doc => doc.data().rating);

        for (let i = 0; i < sum.length; i++) {
            ratingSum += sum[i];
        }

        const avg = Number(ratingSum / _total).toFixed(1);

        setTotal(_total);
        setAverage(avg);
    };

    useEffect(() => {
        setButtonsPressed(false);
        // eslint-disable-next-line
    }, [tabIndex]);

    useEffect(() => {
        if (!imageLoaded) {
            setImageLoaded(true);
        }
        // eslint-disable-next-line
    }, [imageLoaded]);

    useEffect(() => {
        let ratingSum = 0;

        (firestore.collection("clothing").doc(clothing.id).collection("ratings").get()).then(snapshot => {
            const _total = snapshot.size;
            setTotal(_total);
            const sum = snapshot.docs.map(doc => doc.data().rating);

            for (let i = 0; i < sum.length; i++) {
                ratingSum += sum[i];
            }

            const avg = Number(ratingSum / _total).toFixed(1);
            setAverage(avg);
        });
    });

    const _cardBackground = useColorModeValue(cardBackground.light, cardBackground.dark);

    return (
        <VStack
            key={clothing.id}
            h="500px"
            spacing="3"
            paddingBottom="10"
            ml={ml}
        >
            <SkeletonCircle size='10' isLoaded={!clothingDataLoaded} />
            <SkeletonText isLoaded={!clothingDataLoaded}>
                <HStack spacing="4" w="400px" alignItems="center" justifyContent="center">
                    {!flippedCards ?
                        <Card w="220px" bg={_cardBackground} justifyContent="center" alignItems="center">
                            <CardHeader>
                                <Tag
                                    borderRadius="md"
                                    size="lg"
                                    variant="outline"
                                    color="wheat"
                                >
                                    <Text marginLeft="4" marginRight="2" marginTop="2" marginBottom="2">
                                        {clothing.title}
                                    </Text>
                                </Tag>
                            </CardHeader>
                            <CardBody display="flex" justifyContent="center">
                                <motion.div
                                    initial={buttonsPressed ? { scale: 0, rotate: 180 } : { rotate: 0, scale: 1 }}
                                    animate={{ rotate: 0, scale: 1 }}
                                    onAnimationComplete={() => setButtonsPressed(false)}
                                    transition={{
                                        type: "spring",
                                        stiffness: 260,
                                        damping: 20
                                    }}
                                >
                                    {/* Prevent image from exploding in dimensions */}
                                    {(tabIndex === 0 && !buttonsPressed && imageLoaded) &&
                                        <ReactImageMagnify
                                            imageProps={{
                                                src: clothing.image,
                                                width: 150,
                                                height: 200,
                                            }}
                                            magnifiedImageProps={{
                                                src: clothing.image,
                                                width: 600,
                                                height: 800
                                            }}
                                            magnifyContainerProps={{
                                                height: 300,
                                                width: 400
                                            }}
                                        />
                                    }
                                </motion.div>
                                {(buttonsPressed || !imageLoaded) &&
                                    <CircularProgress isIndeterminate color={_cardBackground} />
                                }
                            </CardBody>
                            <CardFooter>
                                {!flippedCards &&
                                    <HStack
                                        w="220px"
                                        justifyContent="space-between"
                                        paddingRight="4"
                                        paddingLeft="4"
                                    >
                                        <MotionButton
                                            // When the user uses their mouse
                                            whileHover={{ scale: 1.2 }}
                                            // When the user tabs
                                            whileFocus={{ scale: 1.2 }}
                                            as="a"
                                            href={clothing.affiliateLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Buy
                                        </MotionButton>
                                        <MotionButton
                                            // When the user uses their mouse
                                            whileHover={{ scale: 1.2 }}
                                            // When the user tabs
                                            whileFocus={{ scale: 1.2 }}
                                            onClick={() => {
                                                handleFlip();
                                                handleButtonsTrigger();
                                            }}
                                        >
                                            Rate
                                        </MotionButton>
                                    </HStack>
                                }
                            </CardFooter>
                        </Card>
                        :
                        <MotionBox
                            h="400px"
                            alignItems="center"
                            justifyContent="center"
                            display="flex"
                            initial={buttonsPressed ? { scale: 0 } : { scale: 1 }}
                            animate={{ scale: 1 }}
                            onAnimationComplete={() => setButtonsPressed(false)}
                        >
                            <VStack spacing="4" w="220px" justifyContent="start">
                                <HStack w="220px" justifyContent="space-between">
                                    <Text>{clothing.title}</Text>
                                    <Tooltip label="Average">
                                        <HStack>
                                            <Text>{average}</Text>
                                            <Icon as={StarIcon}></Icon>
                                        </HStack>
                                    </Tooltip>
                                </HStack>
                                <Box
                                    h={200}
                                    alignItems="center"
                                    justifyContent="center"
                                    display="flex"
                                >
                                    <HStack>
                                        <Rating />
                                        <Tooltip label="Total">
                                            <Heading size="xs">{total}</Heading>
                                        </Tooltip>
                                    </HStack>
                                </Box>
                                <HStack justifyContent="space-between" w="220px">
                                    <MotionButton
                                        whileTap={{
                                            scale: 0.8,
                                            borderRadius: "100%",
                                        }}
                                        // When the user uses their mouse
                                        whileHover={{ scale: 1.2 }}
                                        // When the user tabs
                                        whileFocus={{ scale: 1.2 }}
                                        onClick={() => {
                                            handleFlip();
                                            handleAddRating();
                                        }}
                                    >
                                        <Icon as={CheckIcon} />
                                    </MotionButton>
                                    <MotionButton
                                        whileTap={{
                                            scale: 0.8,
                                            borderRadius: "100%",
                                        }}
                                        // When the user uses their mouse
                                        whileHover={{ scale: 1.2 }}
                                        // When the user tabs
                                        whileFocus={{ scale: 1.2 }}
                                        onClick={() => {
                                            handleFlip();
                                            handleButtonsTrigger();
                                        }}
                                    >
                                        <Icon as={CloseIcon} />
                                    </MotionButton>
                                </HStack>
                            </VStack>
                        </MotionBox>
                    }
                    <VStack spacing="1" width={150} justifyContent="center" alignItems="start">
                        <Tag
                            borderRadius='full'
                            variant='solid'
                            colorScheme='green'
                        >
                            <TagLabel>
                                Amazon Affiliate
                            </TagLabel>
                        </Tag>
                        <Divider />
                        <VStack alignItems="start">
                            <Text as="b" fontSize="13">Brand</Text>
                            <Tag
                                borderRadius='full'
                                variant='outline'
                                colorScheme='blue'
                            >
                                <TagLabel>
                                    {clothing.brand}
                                </TagLabel>
                            </Tag>
                        </VStack>
                        <Divider />
                        <VStack alignItems="start">
                            <Text as="b" fontSize="13">Description</Text>
                            <Tag
                                borderRadius='full'
                                variant='outline'
                                colorScheme='orange'
                            >
                                <TagLabel>{clothing.description}</TagLabel>
                            </Tag>
                        </VStack>
                        <Divider />
                        <VStack>
                            <Text as="b" fontSize="13">Price</Text>
                            <Tag
                                borderRadius='full'
                                variant='outline'
                                colorScheme='gray'
                            >
                                <TagLabel>{"$" + clothing.price?.toFixed(2)}</TagLabel>
                            </Tag>
                        </VStack>
                        <Divider />
                        <VStack alignItems="start">
                            <Text as="b" fontSize="13">Gender</Text>
                            <Tag
                                borderRadius='full'
                                variant='solid'
                                colorScheme='telegram'
                            >
                                <TagLabel>{clothing.gender}</TagLabel>
                            </Tag>
                        </VStack>
                        <Divider />
                        <VStack alignItems="start">
                            <Text as="b" fontSize="13">Type</Text>
                            <Tag
                                borderRadius='full'
                                variant='outline'
                                colorScheme='pink'
                            >
                                <Text marginLeft="4" marginRight="2" marginTop="2" marginBottom="2">
                                    {clothing.type}
                                </Text>
                            </Tag>
                        </VStack>
                        <Divider />
                        <VStack alignItems="start">
                            <Text as="b" fontSize="13">Size</Text>
                            <Tag
                                borderRadius="md"
                                variant='subtle'
                                colorScheme='telegram'
                            >
                                <Text marginLeft="4" marginRight="2" marginTop="2" marginBottom="2">
                                    {clothing.size}
                                </Text>
                            </Tag>
                        </VStack>
                        <Divider />
                    </VStack>
                </HStack>
            </SkeletonText>
        </VStack>
    );
}
