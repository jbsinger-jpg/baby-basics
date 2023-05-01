// module imports
import ReactImageMagnify from '@blacklab/react-image-magnify';
import { CheckIcon, CloseIcon, StarIcon } from '@chakra-ui/icons';
import { Box, Button, Heading, HStack, SkeletonCircle, SkeletonText, Text, Tooltip, VStack, Icon, Divider, Stack, Card, CardBody, Tag, TagLabel, useColorModeValue, CardHeader, CardFooter, CircularProgress } from '@chakra-ui/react';
import { motion, useAnimation } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';

// relative imports
import { firestore } from '../../firebaseConfig';
import { cardBackground } from '../../defaultStyle';

export default function DiaperRow({ diaper, isDiapersLoading, tabIndex }) {
    const MotionBox = motion(Box);
    const MotionButton = motion(Button);
    const [flippedCards, setFlippedCards] = useState(false);
    const [buttonsPressed, setButtonsPressed] = useState(false);
    const [rating, setRating] = useState(0);
    const [total, setTotal] = useState(0);
    const [average, setAverage] = useState(0);
    const cardRef = useRef(null);

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
        const diapersRef = await firestore.collection("diapers");

        diapersRef.doc(diaper.id).collection("ratings").add({
            rating: Number(rating),
        });

        // update the data with the new rating
        const _total = (await diapersRef.doc(diaper.id).collection("ratings").get()).size;
        const sum = (await diapersRef.doc(diaper.id).collection("ratings").get()).docs.map(doc => doc.data().rating);

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

        (firestore.collection("diapers").doc(diaper.id).collection("ratings").get()).then(snapshot => {
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

    const [isVisible, setIsVisible] = useState(true);
    const controls = useAnimation();

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const card = cardRef.current;

            if (card && scrollY + windowHeight >= (card.offsetTop)) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        if (isVisible) {
            controls.start({
                opacity: 1,
                y: 0,
                transition: { duration: 1.0 },
            });
        } else {
            controls.start({
                opacity: 0,
                y: 50,
                transition: { duration: 0.2 },
            }).then(() => {
                controls.set({ opacity: 0, y: 50 });
            });
        }
        // eslint-disable-next-line
    }, [isVisible]);

    const _cardBackground = useColorModeValue(cardBackground.light, cardBackground.dark);

    return (
        <VStack
            key={diaper.id}
            h="550px"
            spacing="3"
            paddingBottom="10"
        >
            <SkeletonCircle size='10' isLoaded={!isDiapersLoading} />
            <SkeletonText isLoaded={!isDiapersLoading}>
                <HStack spacing="4" w="400px">
                    <motion.div
                        animate={controls}
                        ref={cardRef}
                    >
                        {!flippedCards ?
                            <Card w="220px" bg={_cardBackground}>
                                <CardHeader justifyContent="center" alignItems="center">
                                    <Tag
                                        borderRadius="md"
                                        size="lg"
                                        variant="outline"
                                        color="wheat"
                                    >
                                        <Text marginLeft="4" marginRight="2" marginTop="2" marginBottom="2">
                                            {diaper.title}
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
                                        {(tabIndex === 2 && !buttonsPressed) &&
                                            <ReactImageMagnify
                                                imageProps={{
                                                    src: diaper.image,
                                                    width: 150,
                                                    height: 200,
                                                }}
                                                magnifiedImageProps={{
                                                    src: diaper.image,
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
                                    {buttonsPressed &&
                                        <CircularProgress isIndeterminate color={_cardBackground} />
                                    }
                                </CardBody>
                                <CardFooter>
                                    {!flippedCards &&
                                        <HStack
                                            w="220px"
                                            justifyContent="space-between"
                                        >
                                            <MotionButton
                                                // When the user uses their mouse
                                                whileHover={{ scale: 1.2 }}
                                                // When the user tabs
                                                whileFocus={{ scale: 1.2 }}
                                                as="a"
                                                href={diaper.affiliateLink}
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
                                h="550px"
                                alignItems="center"
                                justifyContent="center"
                                display="flex"
                                initial={buttonsPressed ? { scale: 0 } : { scale: 1 }}
                                animate={{ scale: 1 }}
                                onAnimationComplete={() => setButtonsPressed(false)}
                            >
                                <VStack spacing="4" w="220px" justifyContent="start">
                                    <HStack w="220px" justifyContent="space-between">
                                        <Text>{diaper.title}</Text>
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
                    </motion.div>
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
                                    {diaper.brand}
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
                                <TagLabel>{diaper.description}</TagLabel>
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
                                <TagLabel>{"$" + diaper.price?.toFixed(2)}</TagLabel>
                            </Tag>
                        </VStack>
                        <Divider />
                        <VStack alignItems="start">
                            <Text as="b" fontSize="13">Size</Text>
                            <Tag
                                borderRadius='full'
                                variant='solid'
                                colorScheme='telegram'
                            >
                                <TagLabel>{diaper.size}</TagLabel>
                            </Tag>
                        </VStack>
                        <Divider />
                    </VStack>
                </HStack>
            </SkeletonText>
        </VStack>
    );
}
