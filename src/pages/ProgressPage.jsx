import { Box, Tab, TabList, TabPanel, TabPanels, Tabs, VStack, useColorModeValue } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { screenBackground } from '../defaultStyle';
import BabyProgressModal from '../components/modals/BabyProgressModal';
import StyledSelect from '../components/StyledSelect';
import BabyFeedTrackingPage from './BabyFeedTrackingPage';
import DiaperTrackingPage from './DiaperTrackingPage';
import FloatingActionButtonsGrowthAndSleep from '../components/floatingActionButtons/FloatingActionButtonsGrowthAndSleep';
import GraphPage from './GraphPage';

export default function ProgressPage() {
    const _screenBackground = useColorModeValue(screenBackground.light, screenBackground.dark);
    const [screenHeight, setScreenHeight] = useState(window.innerHeight);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [progressModalVisible, setProgressModalVisible] = useState(false);
    const [feedingDiaperOption, setFeedingDiaperOption] = useState("feeding");
    const [searchBarIsOpen, setSearchBarIsOpen] = useState(false);

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

    const feedingDiaperOptions = [
        { key: 0, value: "feeding", label: "Feeding" },
        { key: 1, value: "diaper", label: "Diaper" },
    ];

    const handleFeedingDiaperOptionChange = (event) => {
        setFeedingDiaperOption(event.target.value);
    };

    return (
        <Box
            bg={_screenBackground}
            h={screenHeight}
            w={screenWidth}
            overflowX="hidden"
        >
            <BabyProgressModal
                progressModalVisible={progressModalVisible}
                setProgressModalVisible={setProgressModalVisible}
            />
            <Tabs isFitted>
                <TabList>
                    <Tab>
                        Feeding and Diapers
                    </Tab>
                    <Tab>
                        Growth and Sleep
                    </Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <VStack alignItems="start">
                            <StyledSelect
                                options={feedingDiaperOptions}
                                value={feedingDiaperOption}
                                onChange={handleFeedingDiaperOptionChange}
                            />
                            {feedingDiaperOption === "feeding" ?
                                <BabyFeedTrackingPage
                                    searchBarIsOpen={searchBarIsOpen}
                                    setSearchBarIsOpen={setSearchBarIsOpen}
                                /> :
                                <DiaperTrackingPage
                                    searchBarIsOpen={searchBarIsOpen}
                                    setSearchBarIsOpen={setSearchBarIsOpen}
                                />
                            }
                        </VStack>
                    </TabPanel>
                    <TabPanel>
                        <GraphPage />
                        <FloatingActionButtonsGrowthAndSleep setSearchBarIsOpen={setSearchBarIsOpen} />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    );
}
