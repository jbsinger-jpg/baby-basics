import { HStack, Image, SkeletonCircle, SkeletonText, Text, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React from 'react';

export default function DiaperDataTabPanel({ diaperData, isDiapersLoading }) {
    const MotionVStack = motion(VStack);

    return (
        <HStack flexWrap={"wrap"} top="20" position="absolute" spacing="8">
            {diaperData && diaperData.map(diaper => {
                return (
                    <MotionVStack
                        spacing="3"
                        paddingBottom="10"
                        as="a"
                        href={diaper.affiliateLink}
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
                        <SkeletonCircle size='10' isLoaded={!isDiapersLoading} />
                        <SkeletonText isLoaded={!isDiapersLoading}>
                            <Image
                                src={diaper.image}
                                size="sm"
                                alt="Alternate Text"
                                style={{ width: 150, height: 200, resizeMode: 'cover' }}
                            />
                            <VStack spacing="-0.5">
                                <Text>Amazon Affiliate</Text>
                                <Text>{diaper.brand}</Text>
                                <Text>{diaper.description}</Text>
                                <Text>{"$" + diaper.price}</Text>
                                <Text>{"Size: " + diaper.size}</Text>
                            </VStack>
                        </SkeletonText>
                    </MotionVStack>
                );
            })}
        </HStack>);
}
