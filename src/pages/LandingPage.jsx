// Module Imports
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { Box, VStack } from '@chakra-ui/layout';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/tabs';
import PregnantWomanOutlinedIcon from '@mui/icons-material/PregnantWomanOutlined';
import BabyChangingStationIcon from '@mui/icons-material/BabyChangingStation';
import EventIcon from '@mui/icons-material/Event';
import PendingIcon from '@mui/icons-material/Pending';

// Relative Imports
import HomePage from './HomePage';
import FabTemplate from '../components/floatingActionButtons/StandardFab';
import { screenBackground } from '../defaultStyle';

export default function LandingPage() {
    const _screenBackground = useColorModeValue(screenBackground.light, screenBackground.dark);
    const [screenHeight, setScreenHeight] = useState(window.innerHeight);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const navigate = useNavigate();

    const informationPanelOptions = [
        {
            handleClick: () => navigate("/maternal"),
            label: "Go to Maternal Page",
            icon: <PregnantWomanOutlinedIcon fontSize="large" />
        },
        {
            handleClick: () => navigate("/milestone"),
            label: "Go to Milestone Page",
            icon: <BabyChangingStationIcon fontSize="large" />
        }
    ];
    const informationCardHeight = `${(100 / informationPanelOptions.length) - 5}vh`;
    const userPanelOptions = [
        {
            handleClick: () => navigate("/events"),
            label: "Go to Event Page",
            icon: <EventIcon fontSize="large" />
        },
        {
            handleClick: () => navigate("/progress"),
            label: "Go to Progress Page",
            icon: <PendingIcon fontSize="large" />
        }
    ];
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
                        Social
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
                            {informationPanelOptions && informationPanelOptions.map((panelOption, index) => {
                                return (
                                    <FabTemplate
                                        key={index}
                                        height={informationCardHeight}
                                        icon={panelOption.icon}
                                        onClick={panelOption.handleClick}
                                        label={panelOption.label}
                                    />
                                );
                            })}
                        </VStack>
                    </TabPanel>
                    <TabPanel>
                        <VStack
                            alignItems="start"
                        >
                            {userPanelOptions && userPanelOptions.map((panelOption, index) => {
                                return (
                                    <FabTemplate
                                        key={index}
                                        height={userCardHeight}
                                        icon={panelOption.icon}
                                        onClick={panelOption.handleClick}
                                        label={panelOption.label}
                                    />
                                );
                            })}
                        </VStack>
                    </TabPanel>
                    <TabPanel>
                        Social
                    </TabPanel>
                    <TabPanel>
                        <HomePage />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    );
}
