import { Box, useColorModeValue, useMediaQuery } from '@chakra-ui/react';
import React, { useState } from 'react';
import GoogleMapsModal from '../components/modals/GoogleMapsModal';
import ChatIcon from '@mui/icons-material/Chat';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import HearingIcon from '@mui/icons-material/Hearing';
import AbcIcon from '@mui/icons-material/Abc';
import { screenBackground } from '../defaultStyle';
import AnimatedCard from '../components/animated/AnimatedCard';
import StyledSelect from '../components/StyledSelect';
import FloatingActionButtonsBabyInfo from '../components/floatingActionButtons/FloatingActionButtonsBabyInfo';
import { promptOptions } from '../components/staticPageData/baby-maternal-info';
import { auth } from '../firebaseConfig';
import BabyProgressModal from '../components/modals/BabyProgressModal';

export default function MilestonePage() {
    const [selectedAge, setSelectedAge] = useState("");
    const [selectedActivities, setSelectedActivities] = useState(promptOptions[0].activities);
    const [selectedMotorMilestones, setSelectedMotorMilestones] = useState(promptOptions[0].motorMilestones);
    const [selectedCommunicationMilestones, setSelectedCommunicationMilestones] = useState(promptOptions[0].communicationMilestones);
    const [selectedFeedingMilestones, setSelectedFeedingMilestones] = useState(promptOptions[0].feedingMilestones);
    const [selectedSensoryMilestones, setSelectedSensoryMilestones] = useState(promptOptions[0].sensoryMilestones);
    const [selectedHyperLinks, setSelectedHyperLinks] = useState(promptOptions[0].hyperlinks);
    const [videos, setVideos] = useState(promptOptions[0]?.videos);
    const [places, setPlaces] = useState(false);
    const [motorButtonPressed, setMotorButtonPressed] = useState(false);
    const [flippedMotorCard, setFlippedMotorCard] = useState(false);
    const [communicationButtonPressed, setCommunicationButtonPressed] = useState(false);
    const [flippedCommunicationCard, setFlippedCommunicationCard] = useState(false);
    const [feedingButtonPressed, setFeedingButtonPressed] = useState(false);
    const [flippedFeedingCard, setFlippedFeedingCard] = useState(false);
    const [sensoryButtonPressed, setSensoryButtonPressed] = useState(false);
    const [flippedSensoryCard, setFlippedSensoryCard] = useState(false);
    const [activitiesButtonPressed, setActivitiesButtonPressed] = useState(false);
    const [flippedActivitiesCard, setFlippedActivitiesCard] = useState(false);
    const [flippedResourcesCard, setFlippedResourcesCard] = useState(false);
    const [resourceButtonPressed, setResourceButtonPressed] = useState(false);
    const [progressModalVisible, setProgressModalVisible] = useState(false);
    const [progressConfirmed, setProgressConfirmed] = useState(false);

    const handleAnswerChange = (event) => {
        if (flippedMotorCard)
            setMotorButtonPressed(true);

        if (flippedCommunicationCard)
            setCommunicationButtonPressed(true);

        if (flippedFeedingCard)
            setFeedingButtonPressed(true);

        if (flippedSensoryCard)
            setSensoryButtonPressed(true);

        if (flippedResourcesCard)
            setResourceButtonPressed(true);

        if (flippedActivitiesCard)
            setActivitiesButtonPressed(true);

        for (let i = 0; i < promptOptions.length; i++) {
            if (promptOptions[i].ageSelected === event.target.value) {
                setSelectedActivities(promptOptions[i].activities);
                setSelectedMotorMilestones(promptOptions[i].motorMilestones);
                setSelectedFeedingMilestones(promptOptions[i].feedingMilestones);
                setSelectedSensoryMilestones(promptOptions[i].sensoryMilestones);
                setSelectedCommunicationMilestones(promptOptions[i].communicationMilestones);
                setSelectedHyperLinks(promptOptions[i].hyperlinks);
                setVideos(promptOptions[i].videos);
            }
        }
    };

    const _screenBackground = useColorModeValue(screenBackground.light, screenBackground.dark);
    const handleSearchPlacesDialogOpen = () => {
        setPlaces(true);
    };

    const options = [
        { value: "0-3M", label: "0-3M", key: 0 },
        { value: "4-6M", label: "4-6M", key: 1 },
        { value: "7-9M", label: "7-9M", key: 2 },
        { value: "10-12M", label: "10-12M", key: 3 },
        { value: "13-18M", label: "13-18M", key: 4 },
        { value: "19-24M", label: "19-24M", key: 5 },
    ];

    const [isLargerThan1300] = useMediaQuery("(min-width: 1300px)");

    return (
        <Box bg={_screenBackground} paddingTop="2" h={"100%"}>
            <FloatingActionButtonsBabyInfo
                handleSearchPlacesDialogOpen={handleSearchPlacesDialogOpen}
                setProgressModalVisible={setProgressModalVisible}
                selectedAgeRange={selectedAge}
                progressConfirmed={progressConfirmed}
            />
            <GoogleMapsModal
                setSearchPlaces={setPlaces}
                searchPlaces={places}
            />
            <StyledSelect
                w="50vw"
                marginBottom="10"
                marginTop="5"
                paddingLeft="5"
                options={options}
                value={selectedAge}
                onChange={(event) => {
                    setSelectedAge(event.target.value);
                    handleAnswerChange(event);
                }}
            />
            <Box
                flexWrap="wrap"
                spacing="4"
                justifyContent="center"
                alignItems="center"
                display="flex"
                flexDirection={isLargerThan1300 ? "row" : "column"}
            >
                <AnimatedCard
                    flippedCard={flippedMotorCard}
                    setFlippedCard={setFlippedMotorCard}
                    cardIcon={AccessibilityNewIcon}
                    cardButtonPressed={motorButtonPressed}
                    setCardButtonPressed={setMotorButtonPressed}
                    selectedCardData={selectedMotorMilestones}
                    title={"Milestones"}
                    applyCheckbox={auth?.currentUser?.uid ? true : false}
                    selectedAge={selectedAge}
                    progressConfirmed={progressConfirmed}
                    setProgressConfirmed={setProgressConfirmed}
                />
                <AnimatedCard
                    flippedCard={flippedCommunicationCard}
                    setFlippedCard={setFlippedCommunicationCard}
                    cardIcon={ChatIcon}
                    cardButtonPressed={communicationButtonPressed}
                    setCardButtonPressed={setCommunicationButtonPressed}
                    selectedCardData={selectedCommunicationMilestones}
                    title={"Communication"}
                    applyCheckbox={auth?.currentUser?.uid ? true : false}
                    selectedAge={selectedAge}
                    progressConfirmed={progressConfirmed}
                    setProgressConfirmed={setProgressConfirmed}
                />
                <AnimatedCard
                    flippedCard={flippedFeedingCard}
                    setFlippedCard={setFlippedFeedingCard}
                    cardIcon={LocalCafeIcon}
                    cardButtonPressed={feedingButtonPressed}
                    setCardButtonPressed={setFeedingButtonPressed}
                    selectedCardData={selectedFeedingMilestones}
                    title={"Feeding"}
                    applyCheckbox={auth?.currentUser?.uid ? true : false}
                    selectedAge={selectedAge}
                    progressConfirmed={progressConfirmed}
                    setProgressConfirmed={setProgressConfirmed}
                />
                <AnimatedCard
                    flippedCard={flippedSensoryCard}
                    setFlippedCard={setFlippedSensoryCard}
                    cardIcon={HearingIcon}
                    cardButtonPressed={sensoryButtonPressed}
                    setCardButtonPressed={setSensoryButtonPressed}
                    selectedCardData={selectedSensoryMilestones}
                    title={"Sensory"}
                    applyCheckbox={auth?.currentUser?.uid ? true : false}
                    selectedAge={selectedAge}
                    progressConfirmed={progressConfirmed}
                    setProgressConfirmed={setProgressConfirmed}
                />
                <AnimatedCard
                    flippedCard={flippedResourcesCard}
                    setFlippedCard={setFlippedResourcesCard}
                    cardButtonPressed={resourceButtonPressed}
                    setCardButtonPressed={setResourceButtonPressed}
                    selectedCardData={selectedHyperLinks}
                    videos={videos}
                    title={"Resources"}
                    selectedAge={selectedAge}
                    progressConfirmed={progressConfirmed}
                    setProgressConfirmed={setProgressConfirmed}
                />
                <AnimatedCard
                    flippedCard={flippedActivitiesCard}
                    setFlippedCard={setFlippedActivitiesCard}
                    cardIcon={AbcIcon}
                    cardButtonPressed={activitiesButtonPressed}
                    setCardButtonPressed={setActivitiesButtonPressed}
                    selectedCardData={selectedActivities}
                    title={"Potential Activities"}
                    selectedAge={selectedAge}
                    progressConfirmed={progressConfirmed}
                    setProgressConfirmed={setProgressConfirmed}
                />
            </Box>
            <BabyProgressModal
                progressModalVisible={progressModalVisible}
                setProgressModalVisible={setProgressModalVisible}
            />
        </Box>
    );
}
