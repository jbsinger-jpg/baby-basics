// module imports
import { HStack, Heading, Tag, TagLabel, VStack } from '@chakra-ui/react';
import PregnantWomanOutlinedIcon from '@mui/icons-material/PregnantWomanOutlined';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import MapIcon from '@mui/icons-material/Map';
import HomeIcon from '@mui/icons-material/Home';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// relative imports
import ColorModeToggleButton from '../ColorModeToggleButton';
import FabTemplate from './StandardFab';
import { auth, firestore } from '../../firebaseConfig';

export default function FloatingActionButtonsBabyInfo({ handleSearchPlacesDialogOpen, setProgressModalVisible, selectedAgeRange }) {
    const [milestones, setMilestones] = useState([]);
    const [communications, setCommunications] = useState([]);
    const [sensory, setSensory] = useState([]);
    const [feeding, setFeeding] = useState([]);

    useEffect(() => {
        if (selectedAgeRange) {
            firestore.collection("users").doc(auth?.currentUser?.uid).collection("Milestones").doc(selectedAgeRange).get().then((doc => {
                if (doc.exists) {
                    setMilestones([...doc.data().answers]);
                }
                else {
                    setMilestones([]);
                }
            }));

            firestore.collection("users").doc(auth?.currentUser?.uid).collection("Communication").doc(selectedAgeRange).get().then((doc => {
                if (doc.exists) {
                    setCommunications([...doc.data().answers]);
                }
                else {
                    setCommunications([]);
                }
            }));

            firestore.collection("users").doc(auth?.currentUser?.uid).collection("Sensory").doc(selectedAgeRange).get().then((doc => {
                if (doc.exists) {
                    setSensory([...doc.data().answers]);
                }
                else {
                    setSensory([]);
                }
            }));

            firestore.collection("users").doc(auth?.currentUser?.uid).collection("Feeding").doc(selectedAgeRange).get().then((doc => {
                if (doc.exists) {
                    setFeeding([...doc.data().answers]);
                }
                else {
                    setFeeding([]);
                }
            }));
        }
    }, [selectedAgeRange]);

    const navigate = useNavigate();

    const handleMaternalResources = () => {
        navigate("/maternal");
    };

    const handleGoToHome = () => {
        navigate("/");
    };

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
            return { tagName: "Good", colorScheme: "white" };
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
            return { tagName: "Good", colorScheme: "white" };
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
            console.log(feeding);
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
            return { tagName: "Good", colorScheme: "white" };
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
            return { tagName: "Good", colorScheme: "white" };
        }
        else if (count === 2) {
            return { tagName: "Great", colorScheme: "green" };
        }
        else if (count === 3) {
            return { tagName: "Super", colorScheme: "blue" };
        }
    };

    return (
        <>
            <VStack
                top="14"
                right="4"
                position="fixed"
                zIndex={999}
            >
                <ColorModeToggleButton />
                <FabTemplate
                    label="Look up a Location"
                    onClick={handleSearchPlacesDialogOpen}
                    icon={<MapIcon fontSize="large" />}
                />
                <FabTemplate
                    label="Maternity"
                    onClick={handleMaternalResources}
                    icon={<PregnantWomanOutlinedIcon fontSize="large" />}
                />
                <FabTemplate
                    label="Home"
                    onClick={handleGoToHome}
                    icon={<HomeIcon fontSize="large" />}
                />
            </VStack>
            <VStack
                bottom="14"
                right="4"
                position="fixed"
                zIndex={999}
            >
                <FabTemplate
                    label="Document Progress"
                    onClick={handleDocumentProgress}
                    icon={<FormatListBulletedIcon fontSize="large" />}
                />
            </VStack>
            <VStack
                bottom="14"
                left="4"
                position="fixed"
                zIndex={999}
                alignItems="start"
            >
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
        </>
    );
}
