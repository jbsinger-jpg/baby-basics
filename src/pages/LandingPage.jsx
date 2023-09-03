// Module Imports
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { Box, VStack } from '@chakra-ui/layout';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/tabs';
import { Avatar, AvatarBadge, AvatarGroup, Badge, Button, Heading, HStack, Text, Tooltip } from '@chakra-ui/react';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import PregnantWomanOutlinedIcon from '@mui/icons-material/PregnantWomanOutlined';
import BabyChangingStationIcon from '@mui/icons-material/BabyChangingStation';
import EventIcon from '@mui/icons-material/Event';
import PendingIcon from '@mui/icons-material/Pending';

// Relative Imports
import HomePage from './HomePage';
import FabTemplate from '../components/floatingActionButtons/StandardFab';
import { screenBackground } from '../defaultStyle';
import FloatingActionButtonsUser from '../components/floatingActionButtons/FloatingActionButtonsUser';
import BabyPicturePage from './BabyPicturePage';
import StyledSelect from '../components/StyledSelect';
import { auth, firestore } from '../firebaseConfig';
import { useCollectionDataOnce } from 'react-firebase-hooks/firestore';
import Context from '../context/Context';

export default function LandingPage() {
    const _screenBackground = useColorModeValue(screenBackground.light, screenBackground.dark);
    const [screenHeight, setScreenHeight] = useState(window.innerHeight);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    const socialPageOptions = [
        { key: 0, value: "pictures", label: "Pictures" },
        { key: 1, value: "about", label: "About You" },
        { key: 2, value: "chatWithPeeps", label: "Chat with People" },
    ];

    const [socialPageOption, setSocialPageOption] = useState("pictures");
    const [, setAlertDialogUser] = useState(null);
    const [, setAlertDialogVisible] = useState(false);

    const currentUser = auth.currentUser;
    const [userDataPendingFriends] = useCollectionDataOnce(firestore.collection('users').doc(currentUser?.uid).collection("pendingFriends"), { idField: 'id' });
    const [userDataConfirmedFriends] = useCollectionDataOnce(firestore.collection('users').doc(currentUser?.uid).collection("confirmedFriends"), { idField: 'id' });
    const [groups] = useCollectionDataOnce(firestore.collection('groups'), { idField: 'id' });
    const { setData: setUser } = useContext(Context);


    const handleDMPress = (user) => {
        setUser(user.email);
        navigate("/message");
    };

    const handleFriendConfirmation = (user) => {
        setAlertDialogUser(user);
        setAlertDialogVisible(true);
    };

    const handleForumButtonPress = (groupAlias, groupId) => {
        localStorage.setItem("gid", groupId);
        localStorage.setItem("pageData", groupAlias);

        if (groupAlias)
            navigate(`/forum_${groupAlias}`);
        else {
            console.log("Could not redirect to the forum page wanted.");
        }
    };

    const handleGroupStatus = (groupUsers) => {
        const userExists = groupUsers.some((user) => user.id === auth?.currentUser?.uid);

        if (userExists) {
            return (
                <Tooltip label="In Group">
                    <Badge colorScheme='green'>
                        <CheckIcon />
                    </Badge>
                </Tooltip>
            );
        }

        return (
            <Tooltip label="Not In Group">
                <Badge colorScheme='red'>
                    <CloseIcon />
                </Badge>
            </Tooltip>
        );
    };

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
                        <FloatingActionButtonsUser />
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
                        <StyledSelect
                            options={socialPageOptions}
                            value={socialPageOption}
                            onChange={handleSocialPageOptionChange}
                            removeNullOption
                        />
                        {socialPageOption === "pictures" &&
                            <BabyPicturePage />
                        }
                        {socialPageOption === "chatWithPeeps" &&
                            <Tabs
                                align='start'
                                variant='enclosed'
                                h="85vh"
                                isFitted
                                orientation='vertical'
                            >
                                <TabList>
                                    <Tab _selected={{ color: 'white', bg: 'blackAlpha.400' }}>
                                        Forums
                                    </Tab>
                                    <Tab _selected={{ color: 'white', bg: 'blackAlpha.400' }}>
                                        DM
                                    </Tab>
                                </TabList>
                                <TabPanels>
                                    <TabPanel>
                                        <VStack
                                            h="60vh"
                                            alignItems="start"
                                            justifyContent="space-between"
                                        >
                                            <HStack
                                                justifyContent="space-between"
                                                w="80vw"
                                            >
                                                {groups && groups.slice(0, 2).map(group => {
                                                    return (
                                                        <Button variant="unstyled" onClick={() => handleForumButtonPress(group.alias, group.id)} key={group.name}>
                                                            <Text>{group.name}</Text>
                                                            <HStack justifyContent="space-between" w="250px">
                                                                <AvatarGroup size='md' max={3}>
                                                                    {group.users && group.users.map(user => {
                                                                        return (<Avatar key={user.id} name={user.full_name} />);
                                                                    })}
                                                                </AvatarGroup>
                                                                {handleGroupStatus(group.users)}
                                                            </HStack>
                                                        </Button>
                                                    );
                                                })}
                                            </HStack>
                                            <HStack
                                                justifyContent="space-between"
                                                w="80vw"
                                            >
                                                {groups && groups.slice(-2).map(group => {
                                                    return (
                                                        <Button variant="unstyled" onClick={() => handleForumButtonPress(group.alias, group.id)} key={group.name}>
                                                            <Text>{group.name}</Text>
                                                            <HStack justifyContent="space-between" w="250px">
                                                                <AvatarGroup size='md' max={3}>
                                                                    {group.users && group.users.map(user => {
                                                                        return (<Avatar key={user.id} name={user.full_name} />);
                                                                    })}
                                                                </AvatarGroup>
                                                                {handleGroupStatus(group.users)}
                                                            </HStack>
                                                        </Button>
                                                    );
                                                })}
                                            </HStack>
                                        </VStack>
                                    </TabPanel>
                                    <TabPanel>
                                        <HStack
                                            h="80vh"
                                            alignItems="start"
                                            justifyContent="space-evenly"
                                        >
                                            <VStack>
                                                <Heading size="small">Pending Friends</Heading>
                                                {userDataPendingFriends && userDataPendingFriends.map(user => {
                                                    return (
                                                        <Button variant="unstyled" onClick={() => handleFriendConfirmation(user)} key={user.id}>
                                                            <HStack>
                                                                <Avatar name={user.full_name} bg="orange">
                                                                    <AvatarBadge boxSize='1.25em' bg='green.500' />
                                                                </Avatar>
                                                                <VStack spacing="-0.5" alignItems="start">
                                                                    <Text>{user.full_name}</Text>
                                                                    <Text>Online</Text>
                                                                </VStack>
                                                            </HStack>
                                                        </Button>

                                                    );
                                                })}
                                            </VStack>
                                            <VStack>
                                                <Heading size="small">Confirmed Friends</Heading>
                                                {userDataConfirmedFriends && userDataConfirmedFriends.map(user => {
                                                    return (
                                                        <Button variant="unstyled" onClick={() => handleDMPress(user)} key={user.id}>
                                                            <HStack>
                                                                <Avatar name={user.full_name} bg="orange">
                                                                    <AvatarBadge boxSize='1.25em' bg='green.500' />
                                                                </Avatar>
                                                                <VStack spacing="-0.5" alignItems="start">
                                                                    <Text>{user.full_name}</Text>
                                                                    <Text>Online</Text>
                                                                </VStack>
                                                            </HStack>
                                                        </Button>
                                                    );
                                                })}
                                            </VStack>
                                        </HStack>
                                    </TabPanel>
                                </TabPanels>
                            </Tabs>
                        }
                    </TabPanel>
                    <TabPanel>
                        <HomePage />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    );
}
