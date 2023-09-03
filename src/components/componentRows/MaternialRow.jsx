// module imports
import ReactImageMagnify from '@blacklab/react-image-magnify';
import { CheckIcon, CloseIcon, StarIcon } from '@chakra-ui/icons';
import { Box, Button, Card, CardBody, CardFooter, CardHeader, CircularProgress, Divider, HStack, Heading, Icon, SkeletonCircle, SkeletonText, Stack, Tag, TagLabel, Text, Tooltip, VStack, useColorModeValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

// relative imports
import { firestore } from '../../firebaseConfig';
import { cardBackground } from '../../defaultStyle';

export default function MaternialRow({ maternial, maternialDataLoading, tabIndex, ml }) {
    const MotionBox = motion(Box);
    const MotionButton = motion(Button);

    const [flippedCards, setFlippedCards] = useState(false);
    const [buttonsPressed, setButtonsPressed] = useState(false);
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
        const maternialRef = await firestore.collection("maternal_clothes");

        maternialRef.doc(maternial.id).collection("ratings").add({
            rating: Number(rating),
        });

        // update the data with the new rating
        const _total = (await maternialRef.doc(maternial.id).collection("ratings").get()).size;
        const sum = (await maternialRef.doc(maternial.id).collection("ratings").get()).docs.map(doc => doc.data().rating);

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
        let ratingSum = 0;

        (firestore.collection("maternal_clothes").doc(maternial.id).collection("ratings").get()).then(snapshot => {
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
            key={maternial.id}
            h="500px"
            spacing="3"
            paddingBottom="10"
            ml={ml}
        >
            <SkeletonCircle size='10' isLoaded={!maternialDataLoading} />
            <SkeletonText isLoaded={!maternialDataLoading}>
                <HStack spacing="4" w="400px">
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
                                        {maternial.title}
                                    </Text>
                                </Tag>
                            </CardHeader>
                            <CardBody display="flex" justifyContent="center" alignItems="center">
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
                                    {(tabIndex === 4 && !buttonsPressed) &&
                                        <div style={{ width: '150px', height: '200px' }}>
                                            <ReactImageMagnify
                                                imageProps={{
                                                    src: maternial.image,
                                                    style: { maxWidth: '100%', maxHeight: '100%' },
                                                }}
                                                magnifiedImageProps={{
                                                    src: maternial.image,
                                                    style: { maxWidth: '100%', maxHeight: '100%' },
                                                }}
                                                magnifyContainerProps={{
                                                    style: { width: '450px', height: '350px' },
                                                }}
                                            />
                                        </div>
                                    }
                                </motion.div>
                                {buttonsPressed &&
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
                                            href={maternial.affiliateLink}
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
                            h="500px"
                            alignItems="center"
                            justifyContent="center"
                            display="flex"
                            initial={buttonsPressed ? { scale: 0 } : { scale: 1 }}
                            animate={{ scale: 1 }}
                            onAnimationComplete={() => setButtonsPressed(false)}
                        >
                            <VStack spacing="4" w="220px" justifyContent="start">
                                <HStack w="220px" justifyContent="space-between">
                                    <Text>{maternial.title}</Text>
                                    <Tooltip label="Average">
                                        <HStack>
                                            <Text>{average}</Text>
                                            <Icon as={StarIcon}></Icon>
                                        </HStack>
                                    </Tooltip>
                                </HStack>
                                <Box
                                    h={220}
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
                                    {maternial.brand}
                                </TagLabel>
                            </Tag>
                        </VStack>
                        <Divider />
                        <VStack alignItems="start">
                            <Text as="b" fontSize="13">Description</Text>
                            <Tag
                                borderRadius='md'
                                variant='outline'
                                colorScheme='orange'
                            >
                                <Text marginLeft="4" marginRight="2" marginTop="2" marginBottom="2">
                                    {maternial.description}
                                </Text>
                            </Tag>
                        </VStack>
                        <Divider />
                        <VStack alignItems="start">
                            <Text as="b" fontSize="13">Price</Text>
                            <Tag
                                borderRadius='full'
                                variant='outline'
                                colorScheme='gray'
                            >
                                <TagLabel>{"$" + maternial.price}</TagLabel>
                            </Tag>
                        </VStack>
                        <Divider />
                        <VStack alignItems="start">
                            {maternial.sizes &&
                                <>
                                    <Text as="b" fontSize="13">Size</Text>
                                    <Tag
                                        borderRadius='full'
                                        variant='solid'
                                        colorScheme='telegram'
                                    >
                                        <TagLabel>{maternial.sizes}</TagLabel>
                                    </Tag>
                                </>
                            }
                        </VStack>
                        <Divider />
                    </VStack>
                </HStack>
            </SkeletonText>
        </VStack>
    );
}
