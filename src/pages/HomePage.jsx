import { ChatIcon, MoonIcon, SunIcon, UnlockIcon } from '@chakra-ui/icons';
import { Avatar, AvatarBadge, AvatarGroup, Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, HStack, IconButton, Image, SkeletonCircle, SkeletonText, Tab, TabList, TabPanel, TabPanels, Tabs, Text, Tooltip, useColorMode, useColorModeValue, useDisclosure, VStack } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { motion } from 'framer-motion';

import { useNavigate } from 'react-router-dom';
import { auth, firestore } from '../firebaseConfig';
import Context from '../context/Context';

export default function HomePage() {
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const currentUser = auth.currentUser;
    const navigate = useNavigate();
    const [userData] = useCollectionData(firestore.collection('users'), { idField: 'id' });
    // TODO: Add in clothing data is loading state when ready to present to production and out of development.
    const [clothingData] = useCollectionData(firestore.collection('clothing'), { idField: 'id' });
    const [foodData, isFoodDataLoading] = useCollectionData(firestore.collection('food'), { idField: 'id' });
    const [diaperData, isDiapersLoading] = useCollectionData(firestore.collection('diapers'), { idField: 'id' });
    const [utilityData, isUtilitiesLoading] = useCollectionData(firestore.collection('utilities'), { idField: 'id' });
    const { setData: setUser } = useContext(Context);
    const [groupUsers, setGroupUsers] = useState(null);
    const MotionButton = motion(Button);

    //-------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------
    // if current user email doesn't exist don't prevent
    // page from rendering
    const currentUserEmail = auth?.currentUser?.email;
    let starterGroupRef = firestore.collection('starter_group');
    if (currentUserEmail) {
        starterGroupRef = starterGroupRef.where("users", "array-contains", currentUserEmail);
    }
    const [starterGroup] = useCollectionData(starterGroupRef, { idField: 'id' });
    //-------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------

    const handleLogin = () => {
        navigate("/login");
    };

    const ColorModeToggleButton = () => {
        const { toggleColorMode } = useColorMode();

        return (
            <Tooltip label="Change color mode">
                <IconButton icon={useColorModeValue("Dark", "Light") === "Dark" ? <MoonIcon /> : <SunIcon />} onClick={toggleColorMode}>
                    {useColorModeValue("Dark", "Light")}
                </IconButton>
            </Tooltip>
        );
    };

    const handleDMPress = (user) => {
        // TODO: Pass the user to the message page
        setUser(user.email);
        navigate("/message");
    };

    const handleForumButtonPress = () => {
        navigate("/forum");
    };

    useEffect(() => {
        if (starterGroup) {
            let options = [];
            let userOptions = [];

            for (const group of starterGroup) {
                for (let i = 0; i < group.users.length; i++) {
                    options.push(group.users[i]);
                }

            }

            if (options.length > 0)
                firestore.collection('users')
                    .where("email", "in", options)
                    .get()
                    .then(snapshot => {
                        snapshot.docs.forEach(doc => {
                            userOptions.push({ ...doc.data() });
                        });

                        setGroupUsers(userOptions);
                    });

        }
    }, [starterGroup]);

    return (
        <>
            <Drawer
                isOpen={isOpen}
                placement='left'
                onClose={onClose}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Message Other Parents!</DrawerHeader>
                    <DrawerBody>
                        <Tabs align='start' variant='enclosed' w="100%" h="100%" isFitted>
                            <TabList>
                                <Tab _selected={{ color: 'white', bg: 'blackAlpha.400' }}>
                                    DM
                                </Tab>
                                <Tab _selected={{ color: 'white', bg: 'blackAlpha.400' }}>
                                    Forums
                                </Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel>
                                    <VStack w="100%" alignItems="start" spacing="5">
                                        {userData && userData.map(user => {
                                            return (
                                                <Button variant="unstyled" onClick={() => handleDMPress(user)}>
                                                    <HStack>
                                                        <Avatar name={user.first_name + " " + user.last_name} bg="orange">
                                                            <AvatarBadge boxSize='1.25em' bg='green.500' />
                                                        </Avatar>
                                                        <VStack spacing="-0.5" alignItems="start">
                                                            <Text>{user.first_name + " " + user.last_name}</Text>
                                                            <Text>Online</Text>
                                                        </VStack>
                                                    </HStack>
                                                </Button>

                                            );
                                        })}
                                    </VStack>
                                </TabPanel>
                                <TabPanel>
                                    <VStack w="100%" alignItems="start" spacing="12">
                                        {starterGroup && starterGroup.map(group => {
                                            return (
                                                <Button variant="unstyled" onClick={handleForumButtonPress}>
                                                    <HStack>
                                                        <AvatarGroup size='md' max={3}>
                                                            {groupUsers && groupUsers.map(user => {
                                                                return (<Avatar name={user.first_name + " " + user.last_name} />);
                                                            })}
                                                        </AvatarGroup>
                                                    </HStack>
                                                    <Text>{group.name}</Text>
                                                </Button>
                                            );
                                        })
                                        }
                                    </VStack>
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </DrawerBody>
                    <DrawerFooter>
                        <Button variant='outline' mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button>
                            Message
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
            <Tabs align='start' variant='enclosed' w="90vw" h="100vh">
                <TabList display="flex" justifyContent="space-between" w="99vw">
                    <HStack spacing="-1">
                        <Tab _selected={{ color: 'white', bg: 'blackAlpha.400' }}>
                            Clothes
                        </Tab>
                        <Tab _selected={{ color: 'white', bg: 'blackAlpha.400' }}>
                            Food
                        </Tab>
                        <Tab _selected={{ color: 'white', bg: 'blackAlpha.400' }}>
                            Diapers
                        </Tab>
                        <Tab _selected={{ color: 'white', bg: 'blackAlpha.400' }}>
                            Utilities
                        </Tab>
                    </HStack>
                    <HStack>
                        <Button onClick={() => { setIsDataLoaded(!isDataLoaded); }}>trigger skelly</Button>
                        <Tooltip label="Log in">
                            <IconButton icon={<UnlockIcon />} onClick={handleLogin} />
                        </Tooltip>
                        {currentUser ?
                            <>
                                <Tooltip label="Chat with peeps">
                                    <IconButton icon={<ChatIcon />} onClick={onOpen} />
                                </Tooltip>
                            </>
                            :
                            null
                        }
                        <ColorModeToggleButton />
                    </HStack>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <HStack flexWrap={"wrap"} top="20" position="absolute">
                            {clothingData && clothingData.map(clothing => {
                                return (
                                    <VStack spacing="3" padding="6">
                                        <SkeletonCircle size='10' isLoaded={!isDataLoaded} />
                                        <SkeletonText isLoaded={!isDataLoaded}>
                                            <Box>
                                                <VStack>
                                                    <Image
                                                        src={clothing.image}
                                                        size="sm"
                                                        alt="Alternate Text"
                                                        style={{ width: 150, height: 200, resizeMode: 'cover' }}
                                                        cursor="pointer"
                                                        onClick={() => console.log("Clicked! " + clothing.image)}
                                                    />
                                                    <VStack spacing="-0.5">
                                                        <Text>{clothing.brand + " " + clothing.type}</Text>
                                                        <Text>{"$" + clothing.price}</Text>
                                                        <Text>{"size: " + clothing.size}</Text>
                                                    </VStack>
                                                </VStack>
                                            </Box>
                                        </SkeletonText>
                                    </VStack>
                                );
                            })}
                        </HStack>
                    </TabPanel>
                    <TabPanel>
                        <HStack flexWrap={"wrap"} top="20" position="absolute">
                            {foodData && foodData.map(food => {
                                return (
                                    <VStack spacing="3" paddingBottom="10">
                                        <SkeletonCircle size='10' isLoaded={!isFoodDataLoading} />
                                        <SkeletonText isLoaded={!isFoodDataLoading}>
                                            <Image
                                                src={food.image}
                                                size="sm"
                                                alt="Alternate Text"
                                                style={{ width: 150, height: 200, resizeMode: 'cover' }}
                                            />
                                            <VStack spacing="-0.5">
                                                <Text>{food.type}</Text>
                                                <Text>{food.price}</Text>
                                                <Text>{food.age}</Text>
                                            </VStack>
                                        </SkeletonText>
                                    </VStack>
                                );
                            })}
                        </HStack>
                    </TabPanel>
                    <TabPanel>
                        <HStack flexWrap={"wrap"} top="20" position="absolute" spacing="5">
                            {diaperData && diaperData.map(diaper => {
                                return (
                                    <MotionButton
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
                                        <VStack spacing="3" paddingBottom="10">
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
                                        </VStack>
                                    </MotionButton>
                                );
                            })}
                        </HStack>
                    </TabPanel>
                    <TabPanel>
                        <HStack flexWrap={"wrap"} top="20" position="absolute">
                            {utilityData && utilityData.map(utility => {
                                return (
                                    <VStack spacing="3" paddingBottom="10">
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
                                    </VStack>
                                );
                            })}
                        </HStack>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </>

    );
}
