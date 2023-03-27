import { Box, Divider, HStack, Image, SkeletonCircle, SkeletonText, Text, VStack, Stack, Icon, Button } from '@chakra-ui/react';
import { motion, useAnimation, useCycle } from 'framer-motion';
import React, { useState } from 'react';
import { StarIcon } from "@chakra-ui/icons";

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

export default function DiaperDataTabPanel({ diaperData, isDiapersLoading }) {
    const MotionImage = motion(Image);
    const MotionButton = motion(Button);

    const [flippedCards, setFlippedCards] = useState(new Array(diaperData?.length).fill(false));

    const handleFlip = (index) => {
        const updatedFlippedCards = [...flippedCards];
        updatedFlippedCards[index] = !updatedFlippedCards[index];
        setFlippedCards(updatedFlippedCards);
        console.log("Flip at index, ", index);
    };

    return (
        <HStack flexWrap={"wrap"} top="20" position="absolute" spacing="12">
            {diaperData && diaperData.map((diaper, index) => {
                return (
                    <VStack
                        h="300px"
                        spacing="3"
                        paddingBottom="10"
                    >
                        <SkeletonCircle size='10' isLoaded={!isDiapersLoading} />
                        <SkeletonText isLoaded={!isDiapersLoading}>
                            <HStack spacing="4">
                                {!flippedCards[index] ?
                                    <MotionImage
                                        variant="unstyled"
                                        whileTap={{
                                            scale: 0.8,
                                            borderRadius: "100%",
                                            rotateY: 180
                                        }}
                                        src={diaper.image}
                                        size="sm"
                                        alt="Alternate Text"
                                        style={{ width: 150, height: 200, resizeMode: 'cover' }}
                                        onAnimationComplete={() => handleFlip(index)}
                                    />
                                    :
                                    <Box h="300px" alignItems="center" justifyContent="center" display="flex">
                                        <VStack spacing="4">
                                            <Text >TODO: Show Average Rating</Text>
                                            <Text >{diaper.title}</Text>
                                            <Rating />
                                            <HStack>
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
                                                    Submit Rating
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
                                                    }}
                                                >
                                                    Close
                                                </MotionButton>
                                            </HStack>
                                        </VStack>
                                    </Box>
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
                            w="320px"
                        >
                            {!flippedCards[index] &&
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
                            }
                        </SkeletonText>
                    </VStack>
                );
            })}
        </HStack >
    );
}
