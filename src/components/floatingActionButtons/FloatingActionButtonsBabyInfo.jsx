// module imports
import { HStack, Heading, IconButton, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Tag, TagLabel, VStack, useColorModeValue } from '@chakra-ui/react';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import React, { useEffect, useState } from 'react';

// relative imports
import ColorModeToggleButton from '../ColorModeToggleButton';
import FabTemplate from './StandardFab';
import { auth, firestore } from '../../firebaseConfig';
import { AddIcon, InfoIcon } from '@chakra-ui/icons';
import { cardBackground } from '../../defaultStyle';
import { Delete } from '@mui/icons-material';
import FloatingActionButtonContainer from './FloatingActionButtonContainer';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';

export default function FloatingActionButtonsBabyInfo({ setProgressModalVisible, selectedAgeRange, progressConfirmed, setChildDrawerVisible, childOption, setChildOptions, setPopoverVisible, popoverVisible }) {
    const [milestones, setMilestones] = useState([]);
    const [communications, setCommunications] = useState([]);
    const [sensory, setSensory] = useState([]);
    const [feeding, setFeeding] = useState([]);
    const _cardBackground = useColorModeValue(cardBackground.light, cardBackground.dark);
    const [deleteButtonIsLoading, setDeleteButtonIsLoading] = useState(false);

    useEffect(() => {
        if (selectedAgeRange && childOption) {
            firestore
                .collection("users")
                .doc(auth?.currentUser?.uid)
                .collection("children")
                .doc(childOption)
                .collection("Milestones")
                .doc(selectedAgeRange)
                .get()
                .then((doc => {
                    if (doc.exists) {
                        setMilestones([...doc.data().answers]);
                    }
                    else {
                        setMilestones([]);
                    }
                }));

            firestore
                .collection("users")
                .doc(auth?.currentUser?.uid)
                .collection("children")
                .doc(childOption)
                .collection("Communication")
                .doc(selectedAgeRange)
                .get()
                .then((doc => {
                    if (doc.exists) {
                        setCommunications([...doc.data().answers]);
                    }
                    else {
                        setCommunications([]);
                    }
                }));

            firestore
                .collection("users")
                .doc(auth?.currentUser?.uid)
                .collection("children")
                .doc(childOption)
                .collection("Sensory")
                .doc(selectedAgeRange)
                .get()
                .then((doc => {
                    if (doc.exists) {
                        setSensory([...doc.data().answers]);
                    }
                    else {
                        setSensory([]);
                    }
                }));

            firestore
                .collection("users")
                .doc(auth?.currentUser?.uid)
                .collection("children")
                .doc(childOption)
                .collection("Feeding")
                .doc(selectedAgeRange)
                .get()
                .then((doc => {
                    if (doc.exists) {
                        setFeeding([...doc.data().answers]);
                    }
                    else {
                        setFeeding([]);
                    }
                }));
        }
    }, [selectedAgeRange, progressConfirmed, childOption]);

    const handleDocumentProgress = () => {
        setProgressModalVisible(true);
    };

    const determineMilestoneCount = () => {
        let count = 0;

        if (milestones.length) {
            for (let i = 0; i < milestones.length; i++) {
                if (milestones[i]) {
                    count++;
                }
            }
        }

        if (count === 0) {
            return { tagName: "None", colorScheme: "orange" };
        }
        else if (count === 1) {
            return { tagName: "Good", colorScheme: "purple" };
        }
        else if (count === 2) {
            return { tagName: "Great", colorScheme: "green" };
        }
        else if (count === 3) {
            return { tagName: "Super", colorScheme: "blue" };
        }
    };

    const determineCommunicationCount = () => {
        let count = 0;

        if (communications.length) {
            for (let i = 0; i < communications.length; i++) {
                if (communications[i]) {
                    count++;
                }
            }
        }

        if (count === 0) {
            return { tagName: "None", colorScheme: "orange" };
        }
        else if (count === 1) {
            return { tagName: "Good", colorScheme: "purple" };
        }
        else if (count === 2) {
            return { tagName: "Great", colorScheme: "green" };
        }
        else if (count === 3) {
            return { tagName: "Super", colorScheme: "blue" };
        }
    };

    const determineFeedingCount = () => {
        let count = 0;

        if (feeding.length) {
            for (let i = 0; i < feeding.length; i++) {
                if (feeding[i]) {
                    count++;
                }
            }
        }

        if (count === 0) {
            return { tagName: "None", colorScheme: "orange" };
        }
        else if (count === 1) {
            return { tagName: "Good", colorScheme: "purple" };
        }
        else if (count === 2) {
            return { tagName: "Great", colorScheme: "green" };
        }
        else if (count === 3) {
            return { tagName: "Super", colorScheme: "blue" };
        }
    };

    const determineSensoryCount = () => {
        let count = 0;

        if (sensory.length) {
            for (let i = 0; i < sensory.length; i++) {
                if (sensory[i]) {
                    count++;
                }
            }
        }

        if (count === 0) {
            return { tagName: "None", colorScheme: "orange" };
        }
        else if (count === 1) {
            return { tagName: "Good", colorScheme: "purple" };
        }
        else if (count === 2) {
            return { tagName: "Great", colorScheme: "green" };
        }
        else if (count === 3) {
            return { tagName: "Super", colorScheme: "blue" };
        }
    };

    const handleDrawerVisible = () => {
        setChildDrawerVisible(true);
    };

    const handleDeleteChild = () => {
        setDeleteButtonIsLoading(true);
        setPopoverVisible(false);

        firestore
            .collection("users")
            .doc(auth?.currentUser?.uid)
            .collection("children")
            .doc(childOption)
            .delete()
            .then(() => {
                firestore
                    .collection("users")
                    .doc(auth?.currentUser?.uid)
                    .collection("children")
                    .get()
                    .then((snapshot) => {
                        let index = 0;
                        let options = [];

                        snapshot.docs.forEach(doc => {
                            const childName = doc.data().name;
                            const capitalizedName = childName.charAt(0).toUpperCase() + childName.slice(1);

                            options.push({ key: index, label: capitalizedName, value: childName });
                            index += 1;
                        });
                        setChildOptions(options);
                    });
            })
            .finally(() => {
                setDeleteButtonIsLoading(false);
            });
    };

    const navigate = useNavigate();

    return (
        <FloatingActionButtonContainer>
            <ColorModeToggleButton />
            <FabTemplate
                icon={<HomeIcon fontSize="large" />}
                onClick={() => navigate("/")}
                label={"Home"}
            />
            <FabTemplate
                label="Document Progress"
                onClick={handleDocumentProgress}
                icon={<FormatListBulletedIcon fontSize="large" />}
            />
            <FabTemplate
                label="Add Child"
                onClick={handleDrawerVisible}
                icon={<AddIcon fontSize="large" />}
            />
            {popoverVisible &&
                <>
                    <FabTemplate
                        label="Remove Child"
                        onClick={handleDeleteChild}
                        icon={<Delete fontSize="large" />}
                        isLoading={deleteButtonIsLoading}
                    />
                    <Popover
                        placement="right"
                    >
                        <PopoverTrigger>
                            <IconButton
                                borderRadius="50%"
                                width="56px"
                                height="56px"
                                icon={<InfoIcon w="25px" h="25px" />}
                            />
                        </PopoverTrigger>
                        <PopoverContent
                            bg={_cardBackground}
                        >
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverHeader>Progress</PopoverHeader>
                            <PopoverBody>
                                <VStack>
                                    <HStack
                                        w="190px"
                                        justifyContent="space-between"
                                    >
                                        <Heading fontSize="m">Milestones: </Heading>
                                        <Tag
                                            borderRadius='full'
                                            variant='outline'
                                            colorScheme={determineMilestoneCount().colorScheme}
                                        >
                                            <TagLabel>
                                                {determineMilestoneCount().tagName}
                                            </TagLabel>
                                        </Tag>
                                    </HStack>
                                    <HStack
                                        w="190px"
                                        justifyContent="space-between"
                                    >
                                        <Heading fontSize="m">Communication: </Heading>
                                        <Tag
                                            borderRadius='full'
                                            variant='outline'
                                            colorScheme={determineCommunicationCount().colorScheme}
                                        >
                                            <TagLabel>
                                                {determineCommunicationCount().tagName}
                                            </TagLabel>
                                        </Tag>
                                    </HStack>
                                    <HStack
                                        w="190px"
                                        justifyContent="space-between"
                                    >
                                        <Heading fontSize="m">Feeding: </Heading>
                                        <Tag
                                            borderRadius='full'
                                            variant='outline'
                                            colorScheme={determineFeedingCount().colorScheme}
                                        >
                                            <TagLabel>
                                                {determineFeedingCount().tagName}
                                            </TagLabel>
                                        </Tag>
                                    </HStack>
                                    <HStack
                                        w="190px"
                                        justifyContent="space-between"
                                    >
                                        <Heading fontSize="m">Sensory: </Heading>
                                        <Tag
                                            borderRadius='full'
                                            variant='outline'
                                            colorScheme={determineSensoryCount().colorScheme}
                                        >
                                            <TagLabel>
                                                {determineSensoryCount().tagName}
                                            </TagLabel>
                                        </Tag>
                                    </HStack>
                                </VStack>
                            </PopoverBody>
                        </PopoverContent>
                    </Popover>
                </>
            }
        </FloatingActionButtonContainer>
    );
}
