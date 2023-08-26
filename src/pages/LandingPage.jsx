import { useColorModeValue } from '@chakra-ui/color-mode';
import React from 'react';
import { useEffect } from 'react';
import { screenBackground } from '../defaultStyle';
import { useState } from 'react';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/tabs';
import { Box, VStack } from '@chakra-ui/layout';
import LandingPageCard from '../components/LandingPageCard';
import { useNavigate } from 'react-router';
import HomePage from './HomePage';

export default function LandingPage() {
    const _screenBackground = useColorModeValue(screenBackground.light, screenBackground.dark);
    const [screenHeight, setScreenHeight] = useState(window.innerHeight);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const navigate = useNavigate();

    const informationPanelOptions = ["maternal", "milestone"];
    const informationCardHeight = `${(100 / informationPanelOptions.length) - 5}vh`;

    const userPanelOptions = ["events", "babyProgress"];
    const userCardHeight = `${(100 / userPanelOptions.length) - 5}vh`;

    useEffect(() => {
        function handleResize() {
            setScreenHeight(window.innerHeight);
            setScreenWidth(window.innerWidth);
        }

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [screenHeight, screenWidth]);

    return (
        <Box
            bg={_screenBackground}
            h={screenHeight}
            w={screenWidth}
            overflowX="hidden"
        >
            <Tabs isFitted>
                <TabList>
                    <Tab>
                        Information
                    </Tab>
                    <Tab>
                        User
                    </Tab>
                    <Tab>
                        Store
                    </Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <VStack
                            alignItems="start"
                        >
                            {informationPanelOptions && informationPanelOptions.map((page, index) => {
                                return (
                                    <LandingPageCard
                                        key={index}
                                        onClick={() => navigate("/" + page)}
                                        height={informationCardHeight}
                                    />
                                );
                            })}
                        </VStack>
                    </TabPanel>
                    <TabPanel>
                        <VStack
                            alignItems="start"
                        >
                            {userPanelOptions && userPanelOptions.map((page, index) => {
                                return (
                                    <LandingPageCard
                                        key={index}
                                        onClick={() => navigate("/" + page)}
                                        height={informationCardHeight}
                                    />
                                );
                            })}
                        </VStack>
                    </TabPanel>
                    <TabPanel>
                        <HomePage />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    );
}
