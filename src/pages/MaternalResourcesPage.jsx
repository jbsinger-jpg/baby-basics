import { Box, HStack, IconButton, useColorModeValue } from '@chakra-ui/react';
import React, { useState } from 'react';
import GoogleMapsModal from '../components/modals/GoogleMapsModal';
import Woman2Icon from '@mui/icons-material/Woman2';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { screenBackground } from '../defaultStyle';
import AnimatedButton from "../components/animated/AnimatedTrimesterButton";
import AnimatedCard from '../components/animated/AnimatedCard';
import FloatingActionButtonsMaternalInfo from '../components/floatingActionButtons/FloatingActionButtonsMaternalInfo';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { trimesterPhaseInformation } from '../components/staticPageData/baby-maternal-info';

// TODO: Order information based on the trimester
// TODO: Break down information into one page

export default function MaternalResourcesPage() {
  // recommendations
  const [flippedRecommendationCard, setFlippedRecommendationCard] = useState(false);
  const [recommendationsButtonPressed, setRecommendationsButtonPressed] = useState(false);
  const [selectedRecommendations, setSelectedRecommendations] = useState(trimesterPhaseInformation[0].recommendations);

  // baby development
  const [selectedBabyDevelopment, setSelectedBabyDevelopment] = useState(trimesterPhaseInformation[0].babyDevelopment);
  const [flippedBabyDevelopmentCard, setFlippedBabyDevelopmentCard] = useState(false);
  const [babyDevelopmentButtonPressed, setBabyDevelopmentButtonPressed] = useState(false);

  // pregnancy symptoms
  const [selectedPregnantSymptoms, setSelectedPregnantSymptoms] = useState(trimesterPhaseInformation[0].motherPregnancySymptoms);
  const [flippedSymptomsCard, setFlippedSymptomsCard] = useState(false);
  const [symptomsButtonPressed, setSymptomsButtonPressed] = useState(false);

  // resources/videos
  const [flippedResourcesCard, setFlippedResourcesCard] = useState(false);
  const [resourceButtonPressed, setResourceButtonPressed] = useState(false);
  const [videos, setVideos] = useState(trimesterPhaseInformation[0].videos);
  const [selectedHyperLinks, setSelectedHyperLinks] = useState(trimesterPhaseInformation[0].hyperlinks);

  // FAB buttons
  const [searchPlaces, setSearchPlaces] = useState(false);
  const [initialStage, setInitialStage] = useState(1);

  // Styling for color themes
  //lhs=light, rhs=dark
  const _screenBackground = useColorModeValue(screenBackground.light, screenBackground.dark);
  const [cardRotated, setCardRotated] = useState(false);

  const handleSearchPlacesDialogOpen = () => {
    setSearchPlaces(true);
  };

  const handleSelectedTrimesterChange = (buttonStage) => {
    for (let i = 0; i < trimesterPhaseInformation.length; i++) {
      if (trimesterPhaseInformation[i].stage === buttonStage) {
        setSelectedRecommendations(trimesterPhaseInformation[i].recommendations);
        setSelectedBabyDevelopment(trimesterPhaseInformation[i].babyDevelopment);
        setSelectedPregnantSymptoms(trimesterPhaseInformation[i].motherPregnancySymptoms);
        setVideos(trimesterPhaseInformation[i].videos);
        setSelectedHyperLinks(trimesterPhaseInformation[i].hyperlinks);
      }
    }

    if (initialStage === buttonStage) {
      return;
    }

    setInitialStage(buttonStage);

    if (flippedSymptomsCard)
      setSymptomsButtonPressed(true);

    if (flippedBabyDevelopmentCard)
      setBabyDevelopmentButtonPressed(true);

    if (flippedRecommendationCard)
      setRecommendationsButtonPressed(true);

    if (flippedResourcesCard)
      setResourceButtonPressed(true);
  };

  return (
    <Box bg={_screenBackground} paddingTop="2" h="100vh">
      <HStack alignItems="start" w="100vw" paddingLeft="5" spacing="5" marginTop="5" paddingBottom="10">
        <AnimatedButton
          title={"Trimester 1"}
          onClick={() => { handleSelectedTrimesterChange(1); }}
        />
        <AnimatedButton
          title={"Trimester 2"}
          onClick={() => { handleSelectedTrimesterChange(2); }}
        />
        <AnimatedButton
          title={"Trimester 3"}
          onClick={() => { handleSelectedTrimesterChange(3); }}
        />
      </HStack>
      <HStack
        w="100vw"
        flexWrap="wrap"
        spacing="4"
        justifyContent="space-evenly"
        alignItems="center"
      >
        <IconButton
          onClick={() => setCardRotated(!cardRotated)}
          icon={<ChevronLeftIcon />}
        />
        {cardRotated ?
          <>
            <AnimatedCard
              flippedCard={flippedRecommendationCard}
              setFlippedCard={setFlippedRecommendationCard}
              cardIcon={Woman2Icon}
              cardButtonPressed={recommendationsButtonPressed}
              setCardButtonPressed={setRecommendationsButtonPressed}
              selectedCardData={selectedRecommendations}
              title={"Recommendations"}
            />
            <AnimatedCard
              flippedCard={flippedSymptomsCard}
              setFlippedCard={setFlippedSymptomsCard}
              cardIcon={AutoAwesomeIcon}
              cardButtonPressed={symptomsButtonPressed}
              setCardButtonPressed={setSymptomsButtonPressed}
              selectedCardData={selectedPregnantSymptoms}
              title={"Pregnancy Symptoms"}
            />
          </>
          :
          <>
            <AnimatedCard
              flippedCard={flippedBabyDevelopmentCard}
              setFlippedCard={setFlippedBabyDevelopmentCard}
              cardIcon={FavoriteBorderIcon}
              cardButtonPressed={babyDevelopmentButtonPressed}
              setCardButtonPressed={setBabyDevelopmentButtonPressed}
              selectedCardData={selectedBabyDevelopment}
              title={"Baby Development"}
            />
            <AnimatedCard
              flippedCard={flippedResourcesCard}
              setFlippedCard={setFlippedResourcesCard}
              cardButtonPressed={resourceButtonPressed}
              setCardButtonPressed={setResourceButtonPressed}
              selectedCardData={selectedHyperLinks}
              videos={videos}
              title={"Resources"}
            />
          </>
        }
        <IconButton
          onClick={() => setCardRotated(!cardRotated)}
          icon={<ChevronRightIcon />}
        />
      </HStack>
      <FloatingActionButtonsMaternalInfo
        handleSearchPlacesDialogOpen={handleSearchPlacesDialogOpen}
      />
      <GoogleMapsModal
        searchPlaces={searchPlaces}
        setSearchPlaces={setSearchPlaces}
      />
    </Box>
  );
}
