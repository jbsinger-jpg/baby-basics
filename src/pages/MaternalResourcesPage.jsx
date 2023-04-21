import { Box, Button, ButtonGroup, Card, CardBody, CardFooter, HStack, Heading, Icon, ListItem, Select, Stack, UnorderedList, VStack, useColorModeValue } from '@chakra-ui/react';
import React, { useState } from 'react';
import FloatingActionButtonsMaternalInfo from '../components/FloatingActionButtonsMaternalInfo';
import GoogleMapsModal from '../components/modals/GoogleMapsModal';
import { motion } from 'framer-motion';
import Woman2Icon from '@mui/icons-material/Woman2';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { cardBackground, screenBackground } from '../defaultStyle';
import RefreshIcon from '@mui/icons-material/Refresh';
import AnimatedButton from "../components/animated/AnimatedTrimesterButton";
import AnimatedCard from '../components/animated/AnimatedCard';

const trimesterPhaseInformation = [
  {
    stage: 1,
    babyDevelopment: [
      "Week 1-2: Fertilization of the egg and formation of the zygote",
      "Week 3-4: Implantation of the zygote in the uterus and formation of the embryonic disc, which will eventually develop into the baby and the placenta",
      "Week 5-8: Formation of major organs and body systems, including the heart, brain, spinal cord, and limbs",
      "Week 9-12: Formation of the fetus, which looks more like a human with distinct facial features, fingers, and toes. The fetus is also able to move, and the organs continue to develop."
    ],
    motherPregnancySymptoms: [
      "Breast tenderness and swelling",
      "Fatigue",
      "Nausea and vomiting",
      "Increased Urination",
      "Mood Swings",
      "Light spotting, or bleeding",
      "Heightened sense of smell"
    ],
    recommendations: [
      "Urine tests: if left untreated can trigger pre-term labor",
      "Blood tests: check Rh status, iron levels, blood sugar (gestional diabetes), rubella or HIV, Hep. B, and syphilis",
      "Taking prenatal vitamins with folic acid. This is linked to helping preventing certain birth defects, by helping with growth of the neural tube."
    ],
    videos: [
      { key: 0, value: "https://www.youtube.com/embed/jX2L20k6uTg", label: "Everything You Need to Know About the First Trimester of Pregnancy" },
      { key: 1, value: "https://www.youtube.com/embed/81dQFYIJP60", label: "What I Wish I Knew About the First Trimester | OB-GYN Pregnancy VLOG" },
      { key: 2, value: "https://www.youtube.com/embed/Jr4nt6XM3gA", label: "Ob-Gyn Answers the Most Commonly Asked Questions About First Trimester of Pregnancy - What to Expect" },
      { key: 3, value: "https://www.youtube.com/embed/shLAZ6crUQU", label: "8 WEEKS PREGNANT + FIRST ULTRASOUND | What to Expect at FIRST Doctor Appointment During Pregnancy" },
      { key: 4, value: "https://www.youtube.com/embed/x2sFwxX1Bzk", label: "How To Survive The First Trimester: Top Health Tips and Pregnancy Questions Answered" },
    ],
  },
  {
    stage: 2,
    babyDevelopment: [
      "Week 13 - 16: The fetus is able to make facial expressions and can suck its thumb.The eyes move to the front of the face, and the ears are in their final position.The fetal heartbeat can be heard using a Doppler device.",
      "Week 17 - 20: The fetus grows rapidly and weighs around 10 ounces.Hair, eyebrows, and eyelashes begin to grow.The mother may feel the baby's movements for the first time.",
      "Week 21 - 24: The fetus continues to grow and gain weight.The lungs are developing, and the baby may practice breathing movements.The skin is still thin and translucent.",
      "Week 25-28: The fetus is now viable, meaning it has a chance of survival if born prematurely. The eyes can open and close, and the baby can hear sounds outside the womb."
    ],
    motherPregnancySymptoms: [
      "Growing belly",
      "Increased appetite",
      "Improved energy levels",
      "Nasal congestion",
      "Skin changes: Darkening of skin, stretch marks",
      "Heartburn or indegestion",
      "Braxton Hicks contractions",
      "Swelling of feet or ankles",
      "Backache"
    ],
    recommendations: [
      "Swelling will cause changes to your circulation that make it hard for your blood to get from your legs to your heart." +
      "To help prevent this drink water throughout the day and exercise lightly but regularly.",
      "Another byproduct from the swelling might be carpal tunnel syndrome, to help with this it is recommended to either ice, stretch, or massage hands",
      "Pelvic tilt exercises",
    ],
    videos: [
      { key: 0, value: "https://www.youtube.com/embed/7VtUWfHa7X4", label: "Ob-Gyn Answers Most Commonly Asked Questions About Second Trimester of Pregnancy - What to Expect" },
      { key: 1, value: "https://www.youtube.com/embed/un3P0aUbtgM", label: "15 Common Second Trimester Symptoms and HOW TO HELP." },
      { key: 2, value: "https://www.youtube.com/embed/Yyr4ti4ClRI", label: "Second Trimester Symptoms | What to Expect in your Second Trimester of Pregnancy!" },
      { key: 3, value: "https://www.youtube.com/embed/0mXrirWAl4o", label: "ROUND LIGAMENT PAIN + GROIN PAIN DURING PREGNANCY" },
      { key: 4, value: "https://www.youtube.com/embed/NJ6GgELmfJc", label: "Gender Identification - Ultrasound Scanning Technique" },
    ]
  },
  {
    stage: 3,
    babyDevelopment: [
      "Week 29-32: The fetus continues to gain weight and fill out. The bones are fully formed but still soft and pliable. The baby's movements may feel stronger and more frequent.",
      "Week 33-36: The baby's growth slows down, and the lungs are nearly fully developed. The baby may settle into a head-down position in preparation for birth.",
      "Week 37-40: The baby is considered full-term and ready for birth. The average weight is around 7.5 pounds, but it can vary widely. The baby's head may engage in the pelvis in preparation for delivery."
    ],
    motherPregnancySymptoms: [
      "Braxton Hicks contractions become more frequent and intense",
      "Shortness of breath",
      "Fatigue",
      "Increased pressure on the bladder and rectum",
      "Difficulty sleeping",
      "Braxton Hicks contractions become more frequent and intense",
      "Swelling in the hands, feet, and face",
      "Hemorrhoids",
      "Breast leakage",
      "Contractions leading to labor"
    ],
    recommendations: [
      "Work out your pelvic floor by doing Kegel exercises. These exercises are important" +
      " because  Kegels can help prevent tear of the perineal tissues, which are stretched during vaginal birth.",
      "Take prenatal vitamins",
      "Keep your teeth and gums healthy. Blood flow for a pregnant woman is going to increase drastically, which indirectly is going to affect your gum health."
    ],
    videos: [
      { key: 0, value: "https://www.youtube.com/embed/3pz6QxHOb30", label: "Pregnancy Week 30 | What to Expect in Your Third Trimester" },
    ]
  }
];

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
  const [selectedVideo, setSelectedVideo] = useState(null);

  const [selectedHyperLinks, setSelectedHyperLinks] = useState([]);
  const [videos, setVideos] = useState(trimesterPhaseInformation[0].videos);

  // FAB buttons
  const [searchPlaces, setSearchPlaces] = useState(false);
  const [initialStage, setInitialStage] = useState(1);

  const MotionBox = motion(Box);
  const MotionButton = motion(Button);

  // Styling for color themes
  //lhs=light, rhs=dark
  const _screenBackground = useColorModeValue(screenBackground.light, screenBackground.dark);
  const _cardBackground = useColorModeValue(cardBackground.light, cardBackground.dark);

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
    <HStack flexWrap={"wrap"} spacing="12" justifyContent="center" alignItems="start" w="100vw - 10px" bg={_screenBackground}>
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
      <HStack w="100vw" justifyContent="space-evenly" alignItems="start">
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
          flippedCard={flippedResourcesCard}
          setFlippedCard={setFlippedResourcesCard}
          cardButtonPressed={resourceButtonPressed}
          setCardButtonPressed={setResourceButtonPressed}
          selectedCardData={selectedVideo}
          videos={videos}
          title={"Resources"}
        />
      </HStack>
      <HStack w="100vw" justifyContent="space-evenly" alignItems="start">
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
          flippedCard={flippedSymptomsCard}
          setFlippedCard={setFlippedSymptomsCard}
          cardIcon={AutoAwesomeIcon}
          cardButtonPressed={symptomsButtonPressed}
          setCardButtonPressed={setSymptomsButtonPressed}
          selectedCardData={selectedPregnantSymptoms}
          title={"Pregnancy Symptoms"}
        />
      </HStack>
      <FloatingActionButtonsMaternalInfo
        handleSearchPlacesDialogOpen={handleSearchPlacesDialogOpen}
      />
      <GoogleMapsModal
        searchPlaces={searchPlaces}
        setSearchPlaces={setSearchPlaces}
      />
    </HStack>
  );
}
