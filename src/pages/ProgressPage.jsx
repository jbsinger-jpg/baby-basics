import { Box, HStack, Tab, TabList, TabPanel, TabPanels, Tabs, VStack, useColorModeValue } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { screenBackground } from '../defaultStyle';
import BabyProgressModal from '../components/modals/BabyProgressModal';
import StyledSelect from '../components/StyledSelect';
import BabyFeedTrackingPage from './BabyFeedTrackingPage';
import DiaperTrackingPage from './DiaperTrackingPage';
import FloatingActionButtonsGrowthAndSleep from '../components/floatingActionButtons/FloatingActionButtonsGrowthAndSleep';
import GraphPage from './GraphPage';
import { auth, firestore } from '../firebaseConfig';

export default function ProgressPage() {
    const _screenBackground = useColorModeValue(screenBackground.light, screenBackground.dark);
    const [screenHeight, setScreenHeight] = useState(window.innerHeight);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [progressModalVisible, setProgressModalVisible] = useState(false);
    const [feedingDiaperOption, setFeedingDiaperOption] = useState("feeding");
    const [searchBarIsOpen, setSearchBarIsOpen] = useState(false);
    const [childOptions, setChildOptions] = useState(null);
    const [selectedChildOption, setSelectedChildOption] = useState("");

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

    useEffect(() => {
        firestore.collection("users").doc(auth?.currentUser?.uid).collection("children")
            .get().then((snapshot) => {
                let options = [];
                let index = 0;

                snapshot.docs.forEach(doc => {
                    if (!index) {
                        setSelectedChildOption(doc.data().name);
                    }
                    options.push({ key: index, value: doc.data().name, label: doc.data().name });
                    index += 1;
                });

                setChildOptions(options);
            });
        // eslint-disable-next-line
    }, [auth?.currentUser?.uid]);

    const feedingDiaperOptions = [
        { key: 0, value: "feeding", label: "Feeding" },
        { key: 1, value: "diaper", label: "Diaper" },
    ];

    const handleFeedingDiaperOptionChange = (event) => {
        setFeedingDiaperOption(event.target.value);
    };

    const handleChildOptionChange = (event) => {
        setSelectedChildOption(event.target.value);
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
                        <HStack>
                            <StyledSelect
                                options={childOptions}
                                value={selectedChildOption}
                                onChange={handleChildOptionChange}
                                removeNullOption
                            />
                            <StyledSelect
                                options={feedingDiaperOptions}
                                value={feedingDiaperOption}
                                onChange={handleFeedingDiaperOptionChange}
                                removeNullOption
                            />
                        </HStack>

                        <VStack alignItems="start">
                            {feedingDiaperOption === "feeding" ?
                                <BabyFeedTrackingPage
                                    searchBarIsOpen={searchBarIsOpen}
                                    setSearchBarIsOpen={setSearchBarIsOpen}
                                    selectedChildOption={selectedChildOption}
                                />
                                :
                                <DiaperTrackingPage
                                    searchBarIsOpen={searchBarIsOpen}
                                    setSearchBarIsOpen={setSearchBarIsOpen}
                                    selectedChildOption={selectedChildOption}
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
