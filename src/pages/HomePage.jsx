import { Box, Button, HStack, Image, Skeleton, SkeletonCircle, SkeletonText, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

export default function HomePage() {
    const [dummyArray, setDummyArray] = useState([]);
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    useEffect(() => {
        let options = [];
        for (let i = 0; i < 50; i++) {
            options.push(i);
        }
        setDummyArray(options);
    }, []);

    return (
        <Tabs align='start' variant='enclosed' w="100vw" h="100vh">
            <TabList>
                <Tab _selected={{ color: 'white', bg: 'blackAlpha.400' }}>
                    Diapers
                </Tab>
                <Tab _selected={{ color: 'white', bg: 'blackAlpha.400' }}>
                    Clothes
                </Tab>
                <Tab _selected={{ color: 'white', bg: 'blackAlpha.400' }}>
                    Food
                </Tab>
                <Tab _selected={{ color: 'white', bg: 'blackAlpha.400' }}>
                    Toys
                </Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <HStack flexWrap={"wrap"} top="20" position="absolute">
                        {dummyArray.map(option => {
                            return (
                                <VStack spacing="3" padding="6">
                                    <SkeletonCircle size='10' isLoaded={isDataLoaded} />
                                    <SkeletonText isLoaded={isDataLoaded}>
                                        <Box onClick={() => console.log("Clicked! " + option)}>
                                            <VStack>
                                                <Image
                                                    src="https://www.istockphoto.com/resources/images/PhotoFTLP/P2%20-%20MAR-%20iStock%20-1398043762.jpg"
                                                    size="sm"
                                                    alt="Alternate Text"
                                                    style={{ width: 150, height: 270, resizeMode: 'cover' }}
                                                />
                                                <VStack spacing="-0.5">
                                                    <Text>Title</Text>
                                                    <Text>Price</Text>
                                                    <Text>Baby Age</Text>
                                                </VStack>
                                            </VStack>
                                        </Box>
                                    </SkeletonText>
                                </VStack>
                            );
                        })}
                    </HStack>
                    <Button onClick={() => { setIsDataLoaded(!isDataLoaded); }}>trigger skelly</Button>
                </TabPanel>
                <TabPanel>
                    <HStack flexWrap={"wrap"} top="20" position="absolute">
                        {dummyArray.map(option => {
                            return (
                                <VStack spacing="3" paddingBottom="10">
                                    <Image
                                        src="https://media.istockphoto.com/id/1455966008/photo/drone-view-on-blue-collar-worker-stirring-in-soy-pod.jpg?s=612x612&w=0&k=20&c=p1xNhy3U6Kqdy0RxHyjW4oUYVZltRMgIsQGLEImIWyc="
                                        size="sm"
                                        alt="Alternate Text"
                                        style={{ width: 50, height: 70, resizeMode: 'cover' }}
                                    />
                                    <VStack spacing="-0.5">
                                        <Text>Title</Text>
                                        <Text>Price</Text>
                                        <Text>Baby Age</Text>
                                    </VStack>
                                </VStack>
                            );
                        })}
                    </HStack>
                </TabPanel>
                <TabPanel>
                    <HStack flexWrap={"wrap"} top="20" position="absolute">
                        {dummyArray.map(option => {
                            return (
                                <VStack spacing="3" paddingBottom="10">
                                    <Image
                                        src="https://media.istockphoto.com/id/1368262824/photo/blurred-motion-of-blue-ocean-wave-crashing-in-golden-light.jpg?s=612x612&w=0&k=20&c=4p-iqR8G_oCXPtzMjU4C_ilAA3-BXYiLIHF2ILm4LFc="
                                        size="sm"
                                        alt="Alternate Text"
                                        style={{ width: 50, height: 70, resizeMode: 'cover' }}
                                    />
                                    <VStack spacing="-0.5">
                                        <Text>Title</Text>
                                        <Text>Price</Text>
                                        <Text>Baby Age</Text>
                                    </VStack>
                                </VStack>
                            );
                        })}
                    </HStack>
                </TabPanel>
                <TabPanel>
                    <HStack flexWrap={"wrap"} top="20" position="absolute">
                        {dummyArray.map(option => {
                            return (
                                <VStack spacing="3" paddingBottom="10">
                                    <Image
                                        src="https://media.istockphoto.com/id/1289937778/photo/man-stands-in-front-of-a-big-maze-ready-to-take-on-the-challenge.jpg?s=612x612&w=0&k=20&c=xxDa5aYmfWM4o6qWF_QdDf9oj-3pYt883nRZyH9KGBQ="
                                        size="sm"
                                        alt="Alternate Text"
                                        style={{ width: 50, height: 70, resizeMode: 'cover' }}
                                    />
                                    <VStack spacing="-0.5">
                                        <Text>Title</Text>
                                        <Text>Price</Text>
                                        <Text>Baby Age</Text>
                                    </VStack>
                                </VStack>
                            );
                        })}
                    </HStack>
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
}
