import { Box, Divider, HStack, Image, SkeletonCircle, SkeletonText, Text, VStack, Stack, Icon, Button, Heading, Tooltip } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { CheckIcon, CloseIcon, StarIcon } from "@chakra-ui/icons";

function Rating() {
    const [rating, setRating] = useState(0);
    const handleMouseEnter = (newValue) => {
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
    return <Stack direction="row">{stars}</Stack>;
}

export default function DiaperDataTabPanel({ diaperData, isDiapersLoading, tabIndex }) {
    const MotionImage = motion(Image);
    const MotionButton = motion(Button);
    const MotionBox = motion(Box);

    const [flippedCards, setFlippedCards] = useState(new Array(diaperData?.length).fill(false));
    const [buttonsPressed, setButtonsPressed] = useState(new Array(diaperData?.length).fill(false));

    const handleFlip = (index) => {
        const updatedFlippedCards = [...flippedCards];
        updatedFlippedCards[index] = !updatedFlippedCards[index];
        setFlippedCards(updatedFlippedCards);
    };

    const handleButtonsTrigger = (index) => {
        const updatedButtonsPressed = new Array(diaperData?.length).fill(false);
        updatedButtonsPressed[index] = !updatedButtonsPressed[index];
        setButtonsPressed(updatedButtonsPressed);

    };

    useEffect(() => {
        const updatedButtonsPressed = new Array(diaperData?.length).fill(false);
        setButtonsPressed(updatedButtonsPressed);
        // eslint-disable-next-line
    }, [tabIndex]);


    return (
        <HStack flexWrap={"wrap"} top="20" position="absolute" spacing="12">
            {diaperData && diaperData.map((diaper, index) => {
                return (
                    <VStack
                        key={diaper.id}
                        h="300px"
                        spacing="3"
                        paddingBottom="10"
                    >
                        <SkeletonCircle size='10' isLoaded={!isDiapersLoading} />
                        <SkeletonText isLoaded={!isDiapersLoading}>
                            <HStack spacing="4" w="400px">
                                {!flippedCards[index] ?
                                    <MotionImage
                                        variant="unstyled"
                                        initial={buttonsPressed[index] ? { scale: 0, rotate: 180 } : { rotate: 0, scale: 1 }}
                                        animate={{ rotate: 0, scale: 1 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 260,
                                            damping: 20
                                        }}
                                        src={diaper.image}
                                        size="sm"
                                        alt="Alternate Text"
                                        style={{ width: 150, height: 200, resizeMode: 'cover' }}
                                    />
                                    :
                                    <MotionBox
                                        h="300px"
                                        alignItems="center"
                                        justifyContent="center"
                                        display="flex"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                    >
                                        <VStack spacing="4" w="220px" justifyContent="start">
                                            <HStack w="220px">
                                                <Text>{diaper.title}</Text>
                                                <Tooltip label="Average">
                                                    <HStack>
                                                        <Text>4.5 </Text>
                                                        <Icon as={StarIcon}></Icon>
                                                    </HStack>
                                                </Tooltip>
                                            </HStack>
                                            <HStack>
                                                <Rating />
                                                <Tooltip label="Total">
                                                    <Heading size="xs">1234</Heading>
                                                </Tooltip>
                                            </HStack>
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
                                                        handleFlip(index);
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
                                                        handleFlip(index);
                                                        handleButtonsTrigger(index);
                                                    }}
                                                >
                                                    <Icon as={CloseIcon} />
                                                </MotionButton>
                                            </HStack>
                                        </VStack>
                                    </MotionBox>

                                }
                                <VStack spacing="1" width={150} justifyContent="center" alignItems="start">
                                    <Text>Amazon Affiliate</Text>
                                    <Divider />
                                    <Text>{diaper.brand}</Text>
                                    <Divider />
                                    <Text>{diaper.description}</Text>
                                    <Divider />
                                    <Text>{"$" + diaper.price}</Text>
                                    <Divider />
                                    <Text>{"Size: " + diaper.size}</Text>
                                </VStack>
                            </HStack>
                        </SkeletonText>
                        <SkeletonText
                            isLoaded={!isDiapersLoading}
                            w="400px"
                        >
                            {!flippedCards[index] &&
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
                                            handleFlip(index);
                                            handleButtonsTrigger(index);
                                        }}
                                    >
                                        Rate
                                    </MotionButton>
                                </HStack>

                            }
                        </SkeletonText>
                    </VStack>
                );
            })}
        </HStack >
    );
}
