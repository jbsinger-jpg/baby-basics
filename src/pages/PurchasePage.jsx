import { Box, Button, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import ReactImageMagnify from 'react-image-magnify';

export default function PurchasePage() {
    return (
        <Box h="100vh" w="100vw" alignItems="start" justifyContent="flex-start" display="flex">
            <VStack alignItems="start" justifyContent="flex-start" display="flex">
                <HStack justifyContent="space-between" display="flex" w="100vw" padding="2">
                    <Heading as="h1">
                        Huggies Little Snugglers Baby Diapers – (Select Size and Count)
                    </Heading>
                    <Text> TODO: ADD HEADER ICONS </Text>
                </HStack>
                <HStack padding="10" spacing="5">
                    <ReactImageMagnify
                        {...{
                            smallImage: {
                                alt: 'Image',
                                src: "https://media.istockphoto.com/id/1289937778/photo/man-stands-in-front-of-a-big-maze-ready-to-take-on-the-challenge.jpg?s=612x612&w=0&k=20&c=xxDa5aYmfWM4o6qWF_QdDf9oj-3pYt883nRZyH9KGBQ=",
                                isFluidWidth: true,
                                width: 344,
                                height: 612
                            },
                            largeImage: {
                                src: "https://media.istockphoto.com/id/1289937778/photo/man-stands-in-front-of-a-big-maze-ready-to-take-on-the-challenge.jpg?s=612x612&w=0&k=20&c=xxDa5aYmfWM4o6qWF_QdDf9oj-3pYt883nRZyH9KGBQ=",
                                width: 1032,
                                height: 1836
                            },
                            shouldUsePositiveSpaceLens: true
                        }}
                    />
                </HStack>
                <VStack whiteSpace="pre-wrap" spacing={6} paddingLeft="10">
                    <VStack>
                        <Text>Features</Text>
                        <Text>
                            {
                                "* Absorbent \n" +
                                "* Stretch sides \n" +
                                "* Wetness indicator \n" +
                                "* Cutout (newborns)"
                            }
                        </Text>
                    </VStack>
                    <VStack>
                        <Text>Description</Text>
                        <Text>
                            {
                                "This is a diaper that is used for babies. \n" +
                                "Which is kinda cool... dare I say extremely cool\n" +
                                "coooolllllll"
                            }
                        </Text>
                    </VStack>
                    <VStack>
                        <Text> TODO: ADD PRICE </Text>
                    </VStack>
                    <HStack>
                        <Button>Qty</Button>
                        <Button>Add to Cart</Button>
                        <Button> Sign in to Buy</Button>
                    </HStack>
                </VStack>
            </VStack>
        </Box>
    );
}
