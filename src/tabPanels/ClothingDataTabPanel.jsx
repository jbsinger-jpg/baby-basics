import { Box, Divider, HStack, Image, SkeletonCircle, SkeletonText, Text, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React from 'react';

export default function ClothingDataTabPanel({ clothingData, clothingDataLoaded }) {
    const MotionVStack = motion(VStack);

    return (
        <HStack flexWrap={"wrap"} top="20" position="absolute" spacing="12">
            {clothingData && clothingData.map(clothing => {
                return (
                    <MotionVStack
                        h="300px"
                        spacing="3"
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
                        whileHover={{ scale: 1.2 }}
                        // When the user tabs
                        whileFocus={{ scale: 1.2 }}
                    >
                        <SkeletonCircle size='10' isLoaded={!clothingDataLoaded} />
                        <SkeletonText isLoaded={!clothingDataLoaded}>
                            <Box>
                                <HStack spacing="4">
                                    <Image
                                        src={clothing.image}
                                        size="sm"
                                        alt="Alternate Text"
                                        style={{ width: 150, height: 200, resizeMode: 'cover' }}
                                        cursor="pointer"
                                        onClick={() => console.log("Clicked! " + clothing.image)}
                                    />
                                    <VStack spacing="1" width={150} justifyContent="center" alignItems="start">
                                        <Text>{clothing.brand + " " + clothing.type}</Text>
                                        <Divider />
                                        <Text>{"Gender: " + clothing.gender}</Text>
                                        <Divider />
                                        {clothing.price_range && <Text>{"$" + clothing.price_range}</Text>}
                                        {(clothing.price && !clothing.price_range) && <Text> {"$" + clothing.price}</Text>}
                                        <Divider />
                                        <Text>{"size: " + clothing.size}</Text>
                                    </VStack>
                                </HStack>
                            </Box>
                        </SkeletonText>
                    </MotionVStack>
                );
            })}
        </HStack>
    );
}
