import { Divider, HStack, Image, SkeletonCircle, SkeletonText, Text, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React from 'react';

export default function FoodDataTabPanel({ foodData, isFoodDataLoading }) {
    const MotionVStack = motion(VStack);

    return (
        <HStack flexWrap={"wrap"} top="20" position="absolute" spacing="20">
            {foodData && foodData.length > 0 && foodData.map(food => {
                return (
                    <MotionVStack
                        spacing="3"
                        paddingBottom="10"
                        as="a"
                        href={food.affiliateLink}
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
                        <SkeletonCircle size='10' isLoaded={!isFoodDataLoading} />
                        <SkeletonText isLoaded={!isFoodDataLoading}>
                            <HStack spacing="3">
                                <Image
                                    src={food.image}
                                    size="sm"
                                    alt="Alternate Text"
                                    style={{ width: 150, height: 200, resizeMode: 'cover' }}
                                />
                                <VStack spacing="1" width={150} justifyContent="center" alignItems="start">
                                    <Text>{food.brand + " " + food.title}</Text>
                                    <Divider />
                                    <Text>{food.description}</Text>
                                    <Divider />
                                    <Text>{food.type}</Text>
                                    <Divider />
                                    <Text>{"$" + food.price}</Text>
                                    <Divider />
                                    <Text>{"Stage " + food.stage + " food product"}</Text>
                                </VStack>
                            </HStack>
                        </SkeletonText>
                    </MotionVStack>
                );
            })}
        </HStack>
    );
}
