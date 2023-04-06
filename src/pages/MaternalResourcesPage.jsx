import { Button, Card, CardBody, HStack, Heading, Image, ListItem, Select, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Text, UnorderedList, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import FloatingActionButtonsMaternalInfo from '../components/FloatingActionButtonsMaternalInfo';
import { healthAdviceBabyImage, physicalChangesImage, pregnantSymptomsImage, trimesterImage } from '../images/maternalPageImages';
import GoogleMapsModal from '../components/modals/GoogleMapsModal';

// trimester weeks
const trimester1Weeks = Array.from({ length: 12 }, (_, i) => i + 1);
const trimester2Weeks = Array.from({ length: 13 }, (_, i) => i + 13);
const trimester3Weeks = Array.from({ length: 14 }, (_, i) => i + 26);

// TODO: Order information based on the trimester
export default function MaternalResourcesPage() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videos, setVideos] = useState(null);
  const [searchPlaces, setSearchPlaces] = useState(false);
  const [trimesterWeeks, setTrimesterWeeks] = useState([...trimester1Weeks]);

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
            <Select placeholder='Select Week' w="20vw">
              {trimesterWeeks && trimesterWeeks.map(week => {
                return (<option value={week} key={week}>{week}</option>);

              })}
            </Select>
            <HStack w="100vw" justifyContent="space-evenly" alignItems="start">
              <VStack justifyContent="start" w="30vw" spacing="4" h="100vh">
                <Heading textDecoration="underline">Trimester Information</Heading>
                <Card maxW='sm'>
                  <CardBody>
                    <Stack mt='6' spacing='3'>
                      <Image
                        src={trimesterImage}
                        alt='avacada'
                        borderRadius='lg'
                        h="300"
                        w="300"
                      />
                      <Heading size='md'> General </Heading>
                      <UnorderedList>
                        <ListItem>
                          Embryo development: In the first few weeks of pregnancy, the embryo undergoes rapid development, with cells dividing and multiplying to form the different organs and systems of the body. By the end of the first trimester, the baby will have developed all of its major organs and systems.
                        </ListItem>
                        <ListItem>
                          Fetal heartbeat: Around week 6 of pregnancy, the baby's heart will begin to beat, and this can often be seen on an ultrasound.
                        </ListItem>
                        <ListItem>
                          Limb development: By week 8, the baby will have developed arms and legs, and fingers and toes will start to form.
                        </ListItem>
                        <ListItem>
                          Brain development: The baby's brain will begin to develop in the first trimester, and by week 10, the brain will have grown to be quite complex.
                        </ListItem>
                        <ListItem>
                          Movement: While the baby is still too small to feel any movements in the first trimester, it will start to make tiny movements of its own, such as kicking its legs and moving its arms.
                        </ListItem>
                        <ListItem>
                          Gender determination: Although the baby's genitals will begin to develop in the first trimester, it is usually not possible to determine the gender until later in the pregnancy.
                        </ListItem>
                      </UnorderedList>
                    </Stack>
                  </CardBody>
                </Card>
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
                        Your baby is the size of an Avacada!
                        The weight is around 100g, which is the same as a medium bag of salad.
                        Your baby is starting to pull faces now, but any smiling or frowning will be completely random, as there's no muscle control yet.
                      </Text>
                    </Stack>
                  </CardBody>
                </Card>
              </VStack>
              <VStack justifyContent="start" w="30vw">
                <Heading textDecoration="underline">Resource Links</Heading>
                <Card maxW='sm'>
                  <CardBody>
                    <Stack mt='6' spacing='3'>
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
                        height="300px"
                        width="100%"
                        src={selectedVideo || "https://www.youtube.com/embed/rv-fBnFbQAk"}
                        title="YouTube video player"
                        allowFullScreen
                      />
                      <Heading size='md'> Week 16! </Heading>
                      <Text>
                        Have fun baking that baby bun!
                      </Text>
                    </Stack>
                  </CardBody>
                </Card>
              </VStack>
            </HStack>
          </TabPanel>
          <TabPanel>
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
