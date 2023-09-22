import { Box, Button, Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, FormControl, FormLabel, HStack, Input, Spinner, VStack, useColorModeValue, useMediaQuery, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import ChatIcon from '@mui/icons-material/Chat';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import HearingIcon from '@mui/icons-material/Hearing';
import AbcIcon from '@mui/icons-material/Abc';
import { cardBackground, screenBackground } from '../defaultStyle';
import AnimatedCard from '../components/animated/AnimatedCard';
import StyledSelect from '../components/StyledSelect';
import FloatingActionButtonsBabyInfo from '../components/floatingActionButtons/FloatingActionButtonsBabyInfo';
import { promptOptions } from '../components/staticPageData/baby-maternal-info';
import { auth, firestore } from '../firebaseConfig';
import BabyProgressModal from '../components/modals/BabyProgressModal';
import { childBirthOptions, childGenderOptions, childRelationshipOptions } from '../components/staticPageData/child-options';

export default function MilestonePage() {
    // card option props
    const [selectedAge, setSelectedAge] = useState("");
    const [selectedActivities, setSelectedActivities] = useState(promptOptions[0].activities);
    const [selectedMotorMilestones, setSelectedMotorMilestones] = useState(promptOptions[0].motorMilestones);
    const [selectedCommunicationMilestones, setSelectedCommunicationMilestones] = useState(promptOptions[0].communicationMilestones);
    const [selectedFeedingMilestones, setSelectedFeedingMilestones] = useState(promptOptions[0].feedingMilestones);
    const [selectedSensoryMilestones, setSelectedSensoryMilestones] = useState(promptOptions[0].sensoryMilestones);
    const [selectedHyperLinks, setSelectedHyperLinks] = useState(promptOptions[0].hyperlinks);
    const [videos, setVideos] = useState(promptOptions[0]?.videos);

    // framer motion props
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

    // progress modal props
    const [progressModalVisible, setProgressModalVisible] = useState(false);
    const [progressConfirmed, setProgressConfirmed] = useState(false);

    // drawer props
    const [childDrawerVisible, setChildDrawerVisible] = useState(false);
    const _cardBackground = useColorModeValue(cardBackground.light, cardBackground.dark);

    // drawer input field options
    const [childName, setChildName] = useState("");
    const [childGender, setChildGender] = useState("");
    const [childRelationship, setChildRelationship] = useState("");
    const [childBirth, setChildBirth] = useState("");
    const [childOptions, setChildOptions] = useState(null);
    const [selectedChildOption, setSelectedChildOption] = useState("");
    const [drawerSubmissionButtonLoading, setDrawerSubmissionButtonLoading] = useState(false);
    const [popoverVisible, setPopoverVisible] = useState(false);

    const toast = useToast();

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

    const options = [
        { value: "0-3M", label: "0-3M", key: 0 },
        { value: "4-6M", label: "4-6M", key: 1 },
        { value: "7-9M", label: "7-9M", key: 2 },
        { value: "10-12M", label: "10-12M", key: 3 },
        { value: "13-18M", label: "13-18M", key: 4 },
        { value: "19-24M", label: "19-24M", key: 5 },
    ];

    const [isLargerThan1300] = useMediaQuery("(min-width: 1300px)");
    const handleDrawerClose = () => {
        setChildDrawerVisible(false);
    };

    const handleAddChild = () => {
        setDrawerSubmissionButtonLoading(true);
        if (childName) {
            firestore.collection("users").doc(auth?.currentUser?.uid).collection("children").doc(childName).set({
                name: childName,
                gender: childGender,
                relationship: childRelationship,
                birth: childBirth,
            });
            firestore.collection("users").doc(auth?.currentUser?.uid).collection("children")
                .get().then((snapshot) => {
                    let options = [];
                    let index = 0;

                    snapshot.docs.forEach(doc => {
                        options.push({ key: index, value: doc.data().name, label: doc.data().name });
                        index += 1;
                    });

                    setChildOptions(options);
                }).finally(() => {
                    setDrawerSubmissionButtonLoading(false);
                });
        }
        else {
            toast({
                title: 'Submission Failed',
                description: "Child name field is required to submit to database",
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
        }
    };

    useEffect(() => {
        firestore
            .collection("users")
            .doc(auth?.currentUser?.uid)
            .collection("children")
            .get().then((snapshot) => {
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
        // eslint-disable-next-line
    }, [auth?.currentUser?.uid]);

    return (
        <Box bg={_screenBackground} paddingTop="2" h={"100%"} w={"100%"}>
            <FloatingActionButtonsBabyInfo
                setProgressModalVisible={setProgressModalVisible}
                selectedAgeRange={selectedAge}
                progressConfirmed={progressConfirmed}
                setChildDrawerVisible={setChildDrawerVisible}
                childOption={selectedChildOption}
                setChildOptions={setChildOptions}
                childOptions={childOptions}
                popoverVisible={popoverVisible}
                setPopoverVisible={setPopoverVisible}
            />
            <HStack
                alignItems="center"
                marginBottom="10"
                marginTop="5"
            >
                <StyledSelect
                    w="50vw"
                    options={childOptions}
                    value={selectedChildOption}
                    onChange={(event) => {
                        setSelectedChildOption(event.target.value);
                        setPopoverVisible(Boolean(event.target.value));
                    }}
                />
                <StyledSelect
                    w="50vw"
                    options={options}
                    value={selectedAge}
                    onChange={(event) => {
                        setSelectedAge(event.target.value);
                        handleAnswerChange(event);
                    }}
                />
            </HStack>
            {!childOptions ?
                <Box
                    alignItems="center"
                    justifyContent="center"
                    h="100%"
                    w="100%"
                    display="flex"
                >
                    <Spinner size="xl" />
                </Box> :
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
                        childOption={selectedChildOption}
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
                        childOption={selectedChildOption}
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
                        childOption={selectedChildOption}
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
                        childOption={selectedChildOption}
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
                        childOption={selectedChildOption}
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
                        childOption={selectedChildOption}
                    />
                </Box>
            }
            <BabyProgressModal
                progressModalVisible={progressModalVisible}
                setProgressModalVisible={setProgressModalVisible}
            />
            <Drawer
                isOpen={childDrawerVisible}
                bg={_cardBackground}
                placement="left"
            >
                <DrawerOverlay />
                <DrawerContent bg={_screenBackground}>
                    <DrawerHeader>Add Child</DrawerHeader>
                    <DrawerBody>
                        <VStack>
                            <VStack
                                alignItems="start"
                                w="100%"
                            >
                                <FormControl
                                    isRequired
                                >
                                    <FormLabel>
                                        Name
                                    </FormLabel>
                                    <Input
                                        w="100%"
                                        value={childName}
                                        onChange={(event) => setChildName(event.target.value)}
                                    />
                                </FormControl>
                            </VStack>
                            <VStack
                                alignItems="start"
                                w="100%"
                            >
                                <FormLabel>
                                    Gender
                                </FormLabel>
                                <StyledSelect
                                    w="100%"
                                    options={childGenderOptions}
                                    value={childGender}
                                    onChange={(event) => setChildGender(event.target.value)}
                                />
                            </VStack>
                            <VStack
                                alignItems="start"
                                w="100%"
                            >
                                <FormLabel>
                                    Relationship
                                </FormLabel>
                                <StyledSelect
                                    w="100%"
                                    options={childRelationshipOptions}
                                    value={childRelationship}
                                    onChange={(event) => setChildRelationship(event.target.value)}
                                />
                            </VStack>
                            <VStack
                                alignItems="start"
                                w="100%"
                            >
                                <FormLabel>
                                    Birth
                                </FormLabel>
                                <StyledSelect
                                    w="100%"
                                    options={childBirthOptions}
                                    value={childBirth}
                                    onChange={(event) => setChildBirth(event.target.value)}
                                />
                            </VStack>
                        </VStack>
                    </DrawerBody>
                    <DrawerFooter justifyContent="space-between">
                        <Button
                            onClick={handleAddChild}
                            isLoading={drawerSubmissionButtonLoading}
                        >
                            Submit
                        </Button>
                        <Button
                            onClick={handleDrawerClose}
                        >
                            Close
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </Box>
    );
}
