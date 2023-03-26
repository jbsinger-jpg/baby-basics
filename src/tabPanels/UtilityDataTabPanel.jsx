import { HStack, Image, SkeletonCircle, SkeletonText, Text, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React from 'react';

export default function UtilityDataTabPanel({ utilityData, isUtilitiesLoading }) {
    const MotionVStack = motion(VStack);

    return (
        <HStack flexWrap={"wrap"} top="20" position="absolute" spacing="8">
            {utilityData && utilityData.map(utility => {
                return (
                    <MotionVStack
                        h="500px"
                        spacing="3"
                        paddingBottom="10"
                        as="a"
                        href={utility.affiliateLink}
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
                        <SkeletonCircle size='10' isLoaded={!isUtilitiesLoading} />
                        <SkeletonText isLoaded={!isUtilitiesLoading}>
                            <Image
                                src={utility.image}
                                size="sm"
                                alt="Alternate Text"
                                style={{ width: 150, height: 200, resizeMode: 'cover' }}
                            />
                            <VStack spacing="-0.5">
                                <Text>{utility.type}</Text>
                                <Text>{utility.price}</Text>
                                <Text>{utility.age}</Text>
                            </VStack>
                        </SkeletonText>
                    </MotionVStack>
                );
            })}
        </HStack>
    );
}
