import { Box, Button, ButtonGroup, Card, CardBody, CardFooter, HStack, Heading, Image, ListItem, Select, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Text, UnorderedList, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import FloatingActionButtonsMaternalInfo from '../components/FloatingActionButtonsMaternalInfo';
import { healthAdviceBabyImage, physicalChangesImage, pregnantSymptomsImage, trimesterImage } from '../images/maternalPageImages';
import GoogleMapsModal from '../components/modals/GoogleMapsModal';
import { motion } from 'framer-motion';

// trimester weeks
const trimester1Weeks = Array.from({ length: 12 }, (_, i) => i + 1);
const trimester2Weeks = Array.from({ length: 13 }, (_, i) => i + 13);
const trimester3Weeks = Array.from({ length: 14 }, (_, i) => i + 26);

const trimesterPhaseInformation = [
  {
    stage: 1,
    babyDevelopment: [

    ],
  },
  {
    stage: 2,
    babyDevelopment: [

    ],
  },
  {
    stage: 3,
    babyDevelopment: [

    ],
  }
];

const trimesterWeekInformation = [
  {
    week: 1,
    motherHealthAdvice: [],
    motherPhysicalChanges: [],
    motherPregnantSymptoms: []
  },
  {
    week: 2,
    motherHealthAdvice: [],
    motherPhysicalChanges: [],
    motherPregnantSymptoms: []
  },
  {
    week: 3,
    motherHealthAdvice: [],
    motherPhysicalChanges: [],
    motherPregnantSymptoms: []
  },
  {
    week: 4,
    motherHealthAdvice: [],
    motherPhysicalChanges: [],
    motherPregnantSymptoms: []
  },
  {
    week: 5,
    motherHealthAdvice: [],
    motherPhysicalChanges: [],
    motherPregnantSymptoms: []
  },
  {
    week: 6,
    motherHealthAdvice: [],
    motherPhysicalChanges: [],
    motherPregnantSymptoms: []
  },
  {
    week: 7,
    motherHealthAdvice: [],
    motherPhysicalChanges: [],
    motherPregnantSymptoms: []
  },
  {
    week: 8,
    motherHealthAdvice: [],
    motherPhysicalChanges: [],
    motherPregnantSymptoms: []
  },
  {
    week: 9,
    motherHealthAdvice: [],
    motherPhysicalChanges: [],
    motherPregnantSymptoms: []
  },
  {
    week: 10,
    motherHealthAdvice: [],
    motherPhysicalChanges: [],
    motherPregnantSymptoms: []
  },
  {
    week: 11,
    motherHealthAdvice: [],
    motherPhysicalChanges: [],
    motherPregnantSymptoms: []
  },
  {
    week: 12,
    motherHealthAdvice: [],
    motherPhysicalChanges: [],
    motherPregnantSymptoms: []
  },
  {
    week: 13,
    motherHealthAdvice: [],
    motherPhysicalChanges: [],
    motherPregnantSymptoms: []
  },
  {
    week: 14,
    motherHealthAdvice: [],
    motherPhysicalChanges: [],
    motherPregnantSymptoms: []
  },
  {
    week: 15,
    motherHealthAdvice: [],
    motherPhysicalChanges: [],
    motherPregnantSymptoms: []
  },
  {
    week: 16,
    motherHealthAdvice: [],
    motherPhysicalChanges: [],
    motherPregnantSymptoms: []
  },
  {
    week: 17,
    motherHealthAdvice: [],
    motherPhysicalChanges: [],
    motherPregnantSymptoms: []
  },
  {
    week: 18,
    motherHealthAdvice: [],
    motherPhysicalChanges: [],
    motherPregnantSymptoms: []
  },
  {
    week: 19,
    motherHealthAdvice: [],
    motherPhysicalChanges: [],
    motherPregnantSymptoms: []
  },
  {
    week: 20,
    motherHealthAdvice: [],
    motherPhysicalChanges: [],
    motherPregnantSymptoms: []
  },
  {
    week: 21,
    motherHealthAdvice: [],
    motherPhysicalChanges: [],
    motherPregnantSymptoms: []
  },
  {
    week: 22,
    motherHealthAdvice: [],
    motherPhysicalChanges: [],
    motherPregnantSymptoms: []
  },
  {
    week: 23,
    motherHealthAdvice: [],
    motherPhysicalChanges: [],
    motherPregnantSymptoms: []
  },
  {
    week: 24,
    motherHealthAdvice: [],
    motherPhysicalChanges: [],
    motherPregnantSymptoms: []
  },
  {
    week: 25,
    motherHealthAdvice: [],
    motherPhysicalChanges: [],
    motherPregnantSymptoms: []
  },
  {
    week: 26,
    motherHealthAdvice: [],
    motherPhysicalChanges: [],
    motherPregnantSymptoms: []
  },
  {
    week: 27,
    motherHealthAdvice: [],
    motherPhysicalChanges: [],
    motherPregnantSymptoms: []
  },
  {
    week: 28,
    motherHealthAdvice: [],
    motherPhysicalChanges: [],
    motherPregnantSymptoms: []
  },
  {
    week: 29,
    motherHealthAdvice: [],
    motherPhysicalChanges: [],
    motherPregnantSymptoms: []
  },
  {
    week: 30,
    motherHealthAdvice: [],
    motherPhysicalChanges: [],
    motherPregnantSymptoms: []
  },
  {
    week: 31,
    motherHealthAdvice: [],
    motherPhysicalChanges: [],
    motherPregnantSymptoms: []
  },
  {
    week: 32,
    motherHealthAdvice: [],
    motherPhysicalChanges: [],
    motherPregnantSymptoms: []
  },
  {
    week: 33,
    motherHealthAdvice: [],
    motherPhysicalChanges: [],
    motherPregnantSymptoms: []
  },
  {
    week: 34,
    motherHealthAdvice: [],
    motherPhysicalChanges: [],
    motherPregnantSymptoms: []
  },
  {
    week: 35,
    motherHealthAdvice: [],
    motherPhysicalChanges: [],
    motherPregnantSymptoms: []
  },
  {
    week: 36,
    motherHealthAdvice: [],
    motherPhysicalChanges: [],
    motherPregnantSymptoms: []
  },
  {
    week: 37,
    motherHealthAdvice: [],
    motherPhysicalChanges: [],
    motherPregnantSymptoms: []
  },
  {
    week: 38,
    motherHealthAdvice: [],
    motherPhysicalChanges: [],
    motherPregnantSymptoms: []
  },
  {
    week: 39,
    motherHealthAdvice: [],
    motherPhysicalChanges: [],
    motherPregnantSymptoms: []
  },
];

// TODO: Order information based on the trimester
export default function MaternalResourcesPage() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videos, setVideos] = useState(null);
  const [searchPlaces, setSearchPlaces] = useState(false);
  const [trimesterWeeks, setTrimesterWeeks] = useState([...trimester1Weeks]);

  const [flippedTrimesterCard, setFlippedTrimesterCard] = useState(false);
  const [trimesterButtonPressed, setTrimesterButtonPressed] = useState(false);
  const [selectedTrimesterInformation, setSelectedTrimesterInformation] = useState([]);

  const [flippedResourcesCard, setFlippedResourcesCard] = useState(false);
  const [resourceButtonPressed, setResourceButtonPressed] = useState(false);

  const [selectedHyperLinks, setSelectedHyperLinks] = useState([]);

  const MotionImage = motion(Image);
  const MotionBox = motion(Box);

  const handleSearchPlacesDialogOpen = () => {
    setSearchPlaces(true);
  };

  return (
    <HStack justifyContent="space-between" w="100vw">
      <Tabs align='start' variant='enclosed'>
        <TabList display="flex" justifyContent="space-between" w="99vw">
          <HStack spacing="-1">
            <Tab _selected={{ color: 'white', bg: 'blackAlpha.400' }}>
              Baby
            </Tab>
            <Tab _selected={{ color: 'white', bg: 'blackAlpha.400' }}>
              Mother
            </Tab>
          </HStack>
          <HStack>
            <Button onClick={() => { setTrimesterWeeks(trimester1Weeks); }}> Trimester 1 </Button>
            <Button onClick={() => { setTrimesterWeeks(trimester2Weeks); }}> Trimester 2 </Button>
            <Button onClick={() => { setTrimesterWeeks(trimester3Weeks); }}> Trimester 3 </Button>
          </HStack>
        </TabList>
        <TabPanels>
          <TabPanel>
            <HStack w="100vw" justifyContent="space-evenly" alignItems="start">
              <VStack justifyContent="start" w="30vw" spacing="4" h="100vh">
                <Heading textDecoration="underline">Trimester Information</Heading>
                <Card w="400px" h="450px">
                  <CardBody>
                    <Stack mt='6' spacing='3' alignItems="center">
                      {!flippedTrimesterCard ?
                        <MotionImage
                          // onClick={() => { setTrimesterButtonPressed(true); }}
                          borderRadius='lg'
                          initial={trimesterButtonPressed ? { scale: 0, rotate: 180 } : { rotate: 0, scale: 1 }}
                          animate={{ rotate: 0, scale: 1 }}
                          onAnimationComplete={() => setTrimesterButtonPressed(false)}
                          transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20
                          }}
                          src={trimesterImage}
                          size="sm"
                          alt="Alternate Text"
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
              <VStack justifyContent="start" w="30vw">
                <Heading textDecoration="underline">Trimester Development</Heading>
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
          </TabPanel>
          <TabPanel>
            <Select placeholder='Select Week' w="20vw" marginBottom="15px">
              {trimesterWeeks && trimesterWeeks.map(week => {
                return (<option value={week} key={week}>{week}</option>);

              })}
            </Select>
            <HStack w="100vw" justifyContent="space-evenly" alignItems="start">
              <VStack h="60vh" justifyContent="space-between">
                <VStack w="30vw">
                  <Heading textDecoration="underline">Health Advice</Heading>
                  <Card maxW='sm'>
                    <CardBody>
                      <Stack mt='6' spacing='3'>
                        <Image
                          src={healthAdviceBabyImage}
                          alt='avacada'
                          borderRadius='lg'
                          h="300px"
                          w="300px"
                        />
                        <Heading size='md'> Week 16! </Heading>
                        <Text>
                          Prenatal Checkin
                        </Text>
                        <Text>
                          Prenatal Vitamins
                        </Text>
                      </Stack>
                    </CardBody>
                  </Card>
                </VStack>
              </VStack>
              <VStack justifyContent="start" w="30vw" spacing="4" h="100vh">
                <Heading textDecoration="underline">Physical Changes</Heading>
                <Card maxW='sm'>
                  <CardBody>
                    <Stack mt='6' spacing='3'>
                      <Image
                        src={physicalChangesImage}
                        alt='avacada'
                        borderRadius='lg'
                        h="300"
                        w="300"
                      />
                      <Heading size='md'> Week 16! </Heading>
                      <Text>
                        Increases in your blood and hormone levels might be causing you some discomfort.
                        You might develop acne as your skin produces more oil.
                        You might also notice varicose veins or get cramps in your legs.
                        Exercising and stretching should help to relieve this.
                      </Text>
                    </Stack>
                  </CardBody>
                </Card>
              </VStack>
              <VStack justifyContent="start" w="30vw">
                <Heading textDecoration="underline">Preggers Symptoms</Heading>
                <Card maxW='sm'>
                  <CardBody>
                    <Stack mt='6' spacing='3'>
                      <Image
                        src={pregnantSymptomsImage}
                        alt='avacada'
                        borderRadius='lg'
                        h="300"
                        w="300"
                      />
                      <Heading size='md'> Week 16! </Heading>
                      <Text>
                        Swollen and bleeding gums
                        Pains on the side of your belly, caused by your expanding womb
                        Headaches.
                        Nosebleeds.
                        Feeling bloated
                      </Text>
                    </Stack>
                  </CardBody>
                </Card>
              </VStack>
            </HStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
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
