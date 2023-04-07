import { Box, Button, ButtonGroup, Card, CardBody, CardFooter, HStack, Heading, Icon, Image, ListItem, Select, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Text, UnorderedList, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import FloatingActionButtonsMaternalInfo from '../components/FloatingActionButtonsMaternalInfo';
import GoogleMapsModal from '../components/modals/GoogleMapsModal';
import { motion } from 'framer-motion';
import Woman2Icon from '@mui/icons-material/Woman2';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';

// trimester weeks
const trimester1Weeks = Array.from({ length: 12 }, (_, i) => i + 1);
const trimester2Weeks = Array.from({ length: 13 }, (_, i) => i + 13);
const trimester3Weeks = Array.from({ length: 14 }, (_, i) => i + 26);

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
      "Blood tests: check Rh status, iron levels, blood sugar (gestional diabetes), rubella or HIV, Hep. B, and syphilis"
    ]
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
      "To help prevent this drink water throughout the day and exercise lightly but regularly to increase blood flow.",
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
      " because  Kegels can help heal perineal tissues, which are stretched during vaginal birth.",
      "Take prenatal vitamins",
      "Keep your teeth and gums healthy. Poor dental hygiene is linked to premature labor."
    ]
  }
];

// TODO: Order information based on the trimester
// TODO: Break down information into one page

export default function MaternalResourcesPage() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videos, setVideos] = useState(null);
  const [searchPlaces, setSearchPlaces] = useState(false);
  const [trimesterWeeks, setTrimesterWeeks] = useState([...trimester1Weeks]);

  const [flippedTrimesterCard, setFlippedTrimesterCard] = useState(false);
  const [trimesterButtonPressed, setTrimesterButtonPressed] = useState(false);
  const [selectedTrimesterInformation, setSelectedTrimesterInformation] = useState([]);
  const [selectedHealthAdvice, setSelectedHealthAdvice] = useState([]);
  const [selectedPregnantSymptoms, setSelectedPregnantSymptoms] = useState([]);

  const [flippedResourcesCard, setFlippedResourcesCard] = useState(false);
  const [resourceButtonPressed, setResourceButtonPressed] = useState(false);

  const [flippedHealthCard, setFlippedHealthCard] = useState(false);
  const [healthButtonPressed, setHealthButtonPressed] = useState(false);

  const [flippedSymptomsCard, setFlippedSymptomsCard] = useState(false);
  const [symptomsButtonPressed, setSymptomsButtonPressed] = useState(false);

  const [selectedHyperLinks, setSelectedHyperLinks] = useState([]);

  const MotionIcon = motion(Icon);
  const MotionBox = motion(Box);

  const handleSearchPlacesDialogOpen = () => {
    setSearchPlaces(true);
  };

  return (
    <HStack flexWrap={"wrap"} spacing="12" justifyContent="center" alignItems="start" marginTop="5" w="100vw">
      <HStack alignItems="start" w="100vw" paddingLeft="5">
        <Button onClick={() => { setTrimesterWeeks(trimester1Weeks); }}> Trimester 1 </Button>
        <Button onClick={() => { setTrimesterWeeks(trimester2Weeks); }}> Trimester 2 </Button>
        <Button onClick={() => { setTrimesterWeeks(trimester3Weeks); }}> Trimester 3 </Button>
      </HStack>
      <HStack w="100vw" justifyContent="space-evenly" alignItems="start">
        <VStack justifyContent="start" w="30vw" spacing="4" h="60vh">
          <Heading textDecoration="underline">Recommendations</Heading>
          <Card w="400px" h="450px">
            <CardBody>
              <Stack mt='6' spacing='3' alignItems="center">
                {!flippedTrimesterCard ?
                  <MotionIcon
                    as={Woman2Icon}
                    borderRadius='lg'
                    initial={trimesterButtonPressed ? { scale: 0, rotate: 180 } : { rotate: 0, scale: 1 }}
                    animate={{ rotate: 0, scale: 1 }}
                    onAnimationComplete={() => setTrimesterButtonPressed(false)}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20
                    }}
                    style={{ width: 300, height: 300, resizeMode: 'cover' }}
                  />
                  :
                  <>
                    <Heading size='md'> Key Points </Heading>
                    <MotionBox
                      initial={trimesterButtonPressed ? { scale: 0 } : { scale: 1 }}
                      animate={{ scale: 1 }}
                      onAnimationComplete={() => setTrimesterButtonPressed(false)}
                      overflowY="auto" w="100%" h="260px" alignItems="start" flexDir="column" display="flex">
                      <UnorderedList spacing="2" paddingLeft="2">
                        {selectedTrimesterInformation.length > 0 && selectedTrimesterInformation.map((milestone, index) => {
                          return (<ListItem key={index}>{milestone}</ListItem>);
                        })}
                      </UnorderedList>
                    </MotionBox>
                  </>
                }
              </Stack>
            </CardBody>
            <CardFooter>
              <ButtonGroup spacing='2' justifyContent={"space-between"}>
                <Button onClick={() => {
                  setFlippedTrimesterCard(!flippedTrimesterCard);
                  setTrimesterButtonPressed(true);
                }}>
                  flip
                </Button>
              </ButtonGroup>
            </CardFooter>
          </Card>
        </VStack>
        <VStack justifyContent="start" w="30vw" spacing="4" h="60vh">
          <Heading textDecoration="underline">Development</Heading>
          <Card w="400px" h="450px">
            <CardBody>
              <Stack mt='6' spacing='3' alignItems="center">
                {!flippedResourcesCard ?
                  <>
                    <Select
                      placeholder='Select Video'
                      value={selectedVideo}
                      onChange={(event) => {
                        setSelectedVideo(event.target.value);
                      }}
                    >
                      {videos && videos.length > 0 && videos.map((video) => {
                        return (<option value={video.value} key={video.key}>{video.label}</option>);
                      })}
                    </Select>
                    <iframe
                      height="250px"
                      width="100%"
                      src={selectedVideo || "https://www.youtube.com/embed/rv-fBnFbQAk"}
                      title="YouTube video player"
                      allowFullScreen
                    />
                  </>
                  :
                  <>
                    <Heading size='md'> Key Resources </Heading>
                    <MotionBox
                      initial={resourceButtonPressed ? { scale: 0 } : { scale: 1 }}
                      animate={{ scale: 1 }}
                      onAnimationComplete={() => setResourceButtonPressed(false)}
                      overflowY="auto" w="100%" h="260px" alignItems="start" flexDir="column" display="flex">
                      <UnorderedList spacing="2" paddingLeft="2">
                        {selectedHyperLinks.length > 0 && selectedHyperLinks.map((milestone, index) => {
                          return (<ListItem key={index}>{milestone}</ListItem>);
                        })}
                      </UnorderedList>
                    </MotionBox>
                  </>

                }
              </Stack>
            </CardBody>
            <CardFooter>
              <ButtonGroup spacing='2' justifyContent={"space-between"}>
                <Button onClick={() => {
                  setFlippedResourcesCard(!flippedResourcesCard);
                  setResourceButtonPressed(true);
                }}>
                  flip
                </Button>
              </ButtonGroup>
            </CardFooter>
          </Card>
        </VStack>
      </HStack>
      <HStack w="100vw" justifyContent="space-evenly" alignItems="start">
        <VStack justifyContent="start" w="30vw" spacing="4" h="60vh">
          <Heading textDecoration="underline">Baby Development</Heading>
          <Card w="400px" h="450px">
            <CardBody>
              <Stack mt='6' spacing='3' alignItems="center">
                {!flippedHealthCard ?
                  <MotionIcon
                    as={FavoriteBorderIcon}
                    borderRadius='lg'
                    initial={healthButtonPressed ? { scale: 0, rotate: 180 } : { rotate: 0, scale: 1 }}
                    animate={{ rotate: 0, scale: 1 }}
                    onAnimationComplete={() => setHealthButtonPressed(false)}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20
                    }}
                    style={{ width: 300, height: 300, resizeMode: 'cover' }}
                  />
                  :
                  <>
                    <Heading size='md'> Key Points </Heading>
                    <MotionBox
                      initial={healthButtonPressed ? { scale: 0 } : { scale: 1 }}
                      animate={{ scale: 1 }}
                      onAnimationComplete={() => setHealthButtonPressed(false)}
                      overflowY="auto" w="100%" h="260px" alignItems="start" flexDir="column" display="flex">
                      <UnorderedList spacing="2" paddingLeft="2">
                        {selectedHealthAdvice.length > 0 && selectedHealthAdvice.map((milestone, index) => {
                          return (<ListItem key={index}>{milestone}</ListItem>);
                        })}
                      </UnorderedList>
                    </MotionBox>
                  </>
                }
              </Stack>
            </CardBody>
            <CardFooter>
              <ButtonGroup spacing='2' justifyContent={"space-between"}>
                <Button onClick={() => {
                  setFlippedHealthCard(!flippedHealthCard);
                  setHealthButtonPressed(true);
                }}>
                  flip
                </Button>
              </ButtonGroup>
            </CardFooter>
          </Card>
        </VStack>
        <VStack justifyContent="start" w="30vw" spacing="4" h="60vh">
          <Heading textDecoration="underline">Preggers Symptoms</Heading>
          <Card w="400px" h="450px">
            <CardBody>
              <Stack mt='6' spacing='3' alignItems="center">
                {!flippedSymptomsCard ?
                  <MotionIcon
                    as={CatchingPokemonIcon}
                    borderRadius='lg'
                    initial={symptomsButtonPressed ? { scale: 0, rotate: 180 } : { rotate: 0, scale: 1 }}
                    animate={{ rotate: 0, scale: 1 }}
                    onAnimationComplete={() => setSymptomsButtonPressed(false)}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20
                    }}
                    style={{ width: 300, height: 300, resizeMode: 'cover' }}
                  />
                  :
                  <>
                    <Heading size='md'> Key Points </Heading>
                    <MotionBox
                      initial={symptomsButtonPressed ? { scale: 0 } : { scale: 1 }}
                      animate={{ scale: 1 }}
                      onAnimationComplete={() => setSymptomsButtonPressed(false)}
                      overflowY="auto" w="100%" h="260px" alignItems="start" flexDir="column" display="flex">
                      <UnorderedList spacing="2" paddingLeft="2">
                        {selectedPregnantSymptoms.length > 0 && selectedPregnantSymptoms.map((milestone, index) => {
                          return (<ListItem key={index}>{milestone}</ListItem>);
                        })}
                      </UnorderedList>
                    </MotionBox>
                  </>
                }
              </Stack>
            </CardBody>
            <CardFooter>
              <ButtonGroup spacing='2' justifyContent={"space-between"}>
                <Button onClick={() => {
                  setFlippedSymptomsCard(!flippedSymptomsCard);
                  setSymptomsButtonPressed(true);
                }}>
                  flip
                </Button>
              </ButtonGroup>
            </CardFooter>
          </Card>
        </VStack>
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
