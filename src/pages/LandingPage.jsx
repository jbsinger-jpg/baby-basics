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
import StorePage from './StorePage';
import FabTemplate from '../components/floatingActionButtons/StandardFab';
import { screenBackground } from '../defaultStyle';
import FloatingActionButtonsUser from '../components/floatingActionButtons/FloatingActionButtonsUser';
import BabyPicturePage from './BabyPicturePage';
import StyledSelect from '../components/StyledSelect';
import ScreeningPage from './ScreeningPage';
import FloatingActionButtonContainer from '../components/floatingActionButtons/FloatingActionButtonContainer';
import ColorModeToggleButton from '../components/ColorModeToggleButton';
import ChatPage from './ChatPage';
import { auth } from '../firebaseConfig';
import MissingDataMessage from '../components/MissingDataMessage';
import { Spinner } from '@chakra-ui/react';

export default function LandingPage() {
    const _screenBackground = useColorModeValue(screenBackground.light, screenBackground.dark);
    const [screenHeight, setScreenHeight] = useState(window.innerHeight);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [signInLoading, setSignInLoading] = useState(false);
    const [currentUser, setCurrentUser] = useState(auth?.currentUser?.uid);

    const socialPageOptions = [
        { key: 0, value: "pictures", label: "Pictures" },
        { key: 1, value: "about", label: "About You" },
        { key: 2, value: "chatWithPeeps", label: "Chat with People" },
    ];

    const [socialPageOption, setSocialPageOption] = useState("chatWithPeeps");
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
    const handleSocialPageOptionChange = (event) => {
        setSocialPageOption(event.target.value);
    };

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
        if (auth?.currentUser) {
            setCurrentUser(auth?.currentUser?.uid);
        }

        //eslint-disable-next-line
    }, [auth?.currentUser]);

    return (
        <Box
            bg={_screenBackground}
            h={screenHeight}
            w={screenWidth}
            overflowX="hidden"
        >
            {signInLoading ?
                <VStack
                    w="100vw"
                    h="100vh"
                    justifyContent="center"
                >
                    <Spinner size="xl" />
                </VStack>
                :
                <Tabs isFitted>
                    <TabList>
                        {auth?.currentUser?.uid &&
                            <Tab>
                                Information
                            </Tab>
                        }
                        <Tab>
                            User
                        </Tab>
                        {auth?.currentUser?.uid &&
                            <Tab>
                                Social
                            </Tab>
                        }
                        <Tab>
                            Store
                        </Tab>
                    </TabList>
                    <TabPanels>
                        {auth?.currentUser?.uid &&
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
                                <FloatingActionButtonContainer>
                                    <ColorModeToggleButton />
                                </FloatingActionButtonContainer>
                            </TabPanel>
                        }
                        <TabPanel>
                            <FloatingActionButtonsUser setSignInLoading={setSignInLoading} setCurrentUser={setCurrentUser} />
                            <VStack
                                alignItems="start"
                            >
                                {auth?.currentUser?.uid && userPanelOptions ? userPanelOptions.map((panelOption, index) => {
                                    return (
                                        <FabTemplate
                                            key={index}
                                            height={userCardHeight}
                                            icon={panelOption.icon}
                                            onClick={panelOption.handleClick}
                                            label={panelOption.label}
                                        />
                                    );
                                })
                                    :
                                    <VStack alignItems="center" justifyContent="center" h="90vh" w="100vw">
                                        <MissingDataMessage message="Please sign in to access other site features!" />
                                    </VStack>
                                }
                            </VStack>
                        </TabPanel>
                        {currentUser &&
                            <TabPanel>
                                <StyledSelect
                                    options={socialPageOptions}
                                    value={socialPageOption}
                                    onChange={handleSocialPageOptionChange}
                                    removeNullOption
                                />
                                {socialPageOption === "pictures" &&
                                    <BabyPicturePage />
                                }
                                {socialPageOption === "about" &&
                                    <ScreeningPage />
                                }
                                {socialPageOption === "chatWithPeeps" &&
                                    <ChatPage />
                                }
                            </TabPanel>
                        }
                        <TabPanel>
                            <StorePage />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            }
        </Box>
    );
}
