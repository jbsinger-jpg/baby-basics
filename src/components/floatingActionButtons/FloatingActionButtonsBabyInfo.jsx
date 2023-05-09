// module imports
import { HStack, Heading, Tag, TagLabel, VStack } from '@chakra-ui/react';
import PregnantWomanOutlinedIcon from '@mui/icons-material/PregnantWomanOutlined';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import MapIcon from '@mui/icons-material/Map';
import HomeIcon from '@mui/icons-material/Home';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCollectionData } from 'react-firebase-hooks/firestore';

// relative imports
import ColorModeToggleButton from '../ColorModeToggleButton';
import FabTemplate from './StandardFab';
import { auth, firestore } from '../../firebaseConfig';

export default function FloatingActionButtonsBabyInfo({ handleSearchPlacesDialogOpen, setProgressModalVisible, selectedAgeRange }) {
    const [milestoneCheckboxValues] = useCollectionData(firestore.collection("users").doc(auth?.currentUser?.uid).collection("Milestones"));
    const [communicationCheckboxValues] = useCollectionData(firestore.collection("users").doc(auth?.currentUser?.uid).collection("Communication"));
    const [feedingCheckboxValues] = useCollectionData(firestore.collection("users").doc(auth?.currentUser?.uid).collection("Feeding"));
    const [sensoryCheckboxValues] = useCollectionData(firestore.collection("users").doc(auth?.currentUser?.uid).collection("Sensory"));

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

        if (milestoneCheckboxValues && milestoneCheckboxValues[0]?.answers) {
            for (let i = 0; i < milestoneCheckboxValues[0]?.answers.length; i++) {
                if (milestoneCheckboxValues[0]?.answers[i]) {
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

        if (communicationCheckboxValues && communicationCheckboxValues[0]?.answers) {
            for (let i = 0; i < communicationCheckboxValues[0]?.answers.length; i++) {
                if (communicationCheckboxValues[0]?.answers[i] && communicationCheckboxValues[0].ageRange === selectedAgeRange) {
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

        if (feedingCheckboxValues && feedingCheckboxValues[0]?.answers) {
            console.log(feedingCheckboxValues);
            for (let i = 0; i < feedingCheckboxValues[0]?.answers.length; i++) {
                if (feedingCheckboxValues[0]?.answers[i]) {
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

        if (sensoryCheckboxValues && sensoryCheckboxValues[0]?.answers) {
            for (let i = 0; i < sensoryCheckboxValues[0]?.answers.length; i++) {
                if (sensoryCheckboxValues[0]?.answers[i]) {
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
