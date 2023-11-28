// module imports
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Woman2Icon from '@mui/icons-material/Woman2';
import { Box, HStack, IconButton, useColorModeValue, useMediaQuery } from '@chakra-ui/react';
import { useState } from 'react';

// relative imports
import AnimatedButton from "../components/animated/AnimatedTrimesterButton";
import AnimatedCard from '../components/animated/AnimatedCard';
import FloatingActionButtonsMaternalInfo from '../components/floatingActionButtons/FloatingActionButtonsMaternalInfo';
import GoogleMapsModal from '../components/modals/GoogleMapsModal';
import { trimesterPhaseInformation } from '../components/staticPageData/baby-maternal-info';
import { screenBackground } from '../defaultStyle';
import { auth } from '../firebaseConfig';

export default function MaternalResourcesPage({ informationPageOption, setInformationPageOption }) {
  const [stage, setStage] = useState(trimesterPhaseInformation[0].stage);

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
  const [isLargerThan1300] = useMediaQuery("(min-width: 1300px)");
  const [progressConfirmed, setProgressConfirmed] = useState(false);

  const handleSearchPlacesDialogOpen = () => {
    setSearchPlaces(true);
  };

  const handleSelectedTrimesterChange = (buttonStage) => {
    for (let i = 0; i < trimesterPhaseInformation.length; i++) {
      if (trimesterPhaseInformation[i].stage === buttonStage) {
        setSelectedRecommendations(trimesterPhaseInformation[i]?.recommendations);
        setSelectedBabyDevelopment(trimesterPhaseInformation[i]?.babyDevelopment);
        setSelectedPregnantSymptoms(trimesterPhaseInformation[i]?.motherPregnancySymptoms);
        setVideos(trimesterPhaseInformation[i]?.videos);
        setSelectedHyperLinks(trimesterPhaseInformation[i]?.hyperlinks);
        setStage(trimesterPhaseInformation[i].stage);
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

  const handleProgramButtonPress = () => {
    handleSelectedTrimesterChange(null);
    setFlippedResourcesCard(true);
    setResourceButtonPressed(false);
    setCardRotated(true);

    setFlippedBabyDevelopmentCard(false);
    setBabyDevelopmentButtonPressed(false);

    setFlippedRecommendationCard(false);
    setRecommendationsButtonPressed(false);

    setFlippedSymptomsCard(false);
    setSymptomsButtonPressed(false);
  };

  return (
    <Box bg={_screenBackground} paddingTop="2" h={isLargerThan1300 || cardRotated ? "90vh" : "100%"}>
      <HStack alignItems="start" w="100vw" paddingLeft="5" spacing="5" marginTop="5" paddingBottom="10">
        <AnimatedButton
          title={"Trimester 1"}
          onClick={() => {
            handleSelectedTrimesterChange(1);
            setFlippedResourcesCard(false);
          }}
        />
        <AnimatedButton
          title={"Trimester 2"}
          onClick={() => {
            handleSelectedTrimesterChange(2);
            setFlippedResourcesCard(false);
          }}
        />
        <AnimatedButton
          title={"Trimester 3"}
          onClick={() => {
            handleSelectedTrimesterChange(3);
            setFlippedResourcesCard(false);
          }}
        />
        <AnimatedButton
          title={"Programs"}
          onClick={handleProgramButtonPress}
        />
      </HStack>
      <Box
        justifyContent={!initialStage ? "center" : "space-between"}
        alignItems="center"
        display="flex"
        flexDirection={isLargerThan1300 || cardRotated ? "row" : "column"}
        w="98vw"
        gap={4}
      >
        {stage &&
          <IconButton
            onClick={() => setCardRotated(!cardRotated)}
            icon={<ChevronLeftIcon />}
          />
        }
        {!cardRotated ?
          <>
            <AnimatedCard
              flippedCard={flippedRecommendationCard}
              setFlippedCard={setFlippedRecommendationCard}
              cardIcon={Woman2Icon}
              cardButtonPressed={recommendationsButtonPressed}
              setCardButtonPressed={setRecommendationsButtonPressed}
              selectedCardData={selectedRecommendations}
              applyCheckbox={auth?.currentUser?.uid ? true : false}
              progressConfirmed={progressConfirmed}
              setProgressConfirmed={setProgressConfirmed}
              title={"Recommendations"}
              selectedTrimester={initialStage}
            />
            <AnimatedCard
              flippedCard={flippedSymptomsCard}
              setFlippedCard={setFlippedSymptomsCard}
              cardIcon={AutoAwesomeIcon}
              cardButtonPressed={symptomsButtonPressed}
              setCardButtonPressed={setSymptomsButtonPressed}
              selectedCardData={selectedPregnantSymptoms}
              applyCheckbox={auth?.currentUser?.uid ? true : false}
              progressConfirmed={progressConfirmed}
              setProgressConfirmed={setProgressConfirmed}
              title={"Pregnancy Symptoms"}
              selectedTrimester={initialStage}
            />
            <AnimatedCard
              flippedCard={flippedBabyDevelopmentCard}
              setFlippedCard={setFlippedBabyDevelopmentCard}
              cardIcon={FavoriteBorderIcon}
              cardButtonPressed={babyDevelopmentButtonPressed}
              setCardButtonPressed={setBabyDevelopmentButtonPressed}
              selectedCardData={selectedBabyDevelopment}
              title={"Development"}
            />
          </>
          :
          <AnimatedCard
            flippedCard={flippedResourcesCard}
            setFlippedCard={setFlippedResourcesCard}
            cardButtonPressed={resourceButtonPressed}
            setCardButtonPressed={setResourceButtonPressed}
            selectedCardData={selectedHyperLinks}
            videos={videos}
            title={"Resources"}
          />
        }
        {stage &&
          <IconButton
            onClick={() => setCardRotated(!cardRotated)}
            icon={<ChevronRightIcon />}
          />
        }
      </Box>
      <FloatingActionButtonsMaternalInfo
        handleSearchPlacesDialogOpen={handleSearchPlacesDialogOpen}
        informationPageOption={informationPageOption}
        setInformationPageOption={setInformationPageOption}
      />
      <GoogleMapsModal
        searchPlaces={searchPlaces}
        setSearchPlaces={setSearchPlaces}
      />
    </Box >
  );
}
