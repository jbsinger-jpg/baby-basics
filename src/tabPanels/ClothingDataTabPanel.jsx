import { Box, HStack, Image, SkeletonCircle, SkeletonText, Text, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React from 'react';

export default function ClothingDataTabPanel({ clothingData, clothingDataLoaded }) {
    const MotionVStack = motion(VStack);

    return (
        <HStack flexWrap={"wrap"} top="20" position="absolute" spacing="8">
            {clothingData && clothingData.map(clothing => {
                return (
                    <MotionVStack
                        spacing="3"
                        padding="10"
                        as="a"
                        href={clothing.affiliateLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="unstyled"
                        whileTap={{
                            scale: 0.8,
                            borderRadius: "100%",
                        }}
                        // When the user uses their mouse
                        whileHover={{ scale: 1.2, backgroundColor: "black" }}
                        // When the user tabs
                        whileFocus={{ scale: 1.2 }}
                    >
                        <SkeletonCircle size='10' isLoaded={!clothingDataLoaded} />
                        <SkeletonText isLoaded={!clothingDataLoaded}>
                            <Box>
                                <VStack>
                                    <Image
                                        src={clothing.image}
                                        size="sm"
                                        alt="Alternate Text"
                                        style={{ width: 150, height: 200, resizeMode: 'cover' }}
                                        cursor="pointer"
                                        onClick={() => console.log("Clicked! " + clothing.image)}
                                    />
                                    <VStack spacing="-0.5">
                                        <Text>{clothing.brand + " " + clothing.type}</Text>
                                        <Text>{"Gender: " + clothing.gender}</Text>
                                        <Text>{"$" + clothing.price}</Text>
                                        <Text>{"size: " + clothing.size}</Text>
                                    </VStack>
                                </VStack>
                            </Box>
                        </SkeletonText>
                    </MotionVStack>
                );
            })}
        </HStack>);
}
