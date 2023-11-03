import { Box, Button, FormControl, FormLabel, HStack, Heading, Radio, RadioGroup, Tab, TabList, TabPanel, TabPanels, Tabs, Textarea, VStack } from '@chakra-ui/react';
import { useState } from 'react';

export default function PostPartumPage() {
    const [selfcareRadio, setSelfcareRadio] = useState("");
    const [lifeStyleRadio, setLifeStyleRadio] = useState("");
    const [bleedingRadio, setBleedingRadio] = useState("");
    const [incisionRadio, setIncisionRadio] = useState("");

    const [selfCareTextBox, setSelfCareTextBox] = useState("");
    const [lifeStyleTextBox, setLifeStyleTextBox] = useState("");
    const [bleedingTextBox, setBleedingTextBox] = useState("");
    const [incisionTextBox, setIncisionTextBox] = useState("");

    const handleClearRadioOptions = () => {
        setSelfcareRadio("");
        setLifeStyleRadio("");
        setBleedingRadio("");
        setIncisionRadio("");

        setSelfCareTextBox("");
        setLifeStyleTextBox("");
        setBleedingTextBox("");
        setIncisionTextBox("");
    };

    const handleFormSubmission = (event) => {
        event.preventDefault();
        // TODO: Add logic to backend to handle this event.
        console.log("Form submitted: ", event);
    };

    const getNewTabPanelContent = () => {
        return (
            <Box display="flex" w="100%" justifyContent="center" flexDirection="column">
                <VStack>
                    <Heading>
                        Postpartum Log
                    </Heading>
                </VStack>
                <form onSubmit={handleFormSubmission}>
                    <HStack justifyContent="space-between">
                        <VStack alignItems="start" h="60vh">
                            <FormControl>
                                <FormLabel>Self-Care</FormLabel>
                                <RadioGroup value={selfcareRadio} onChange={setSelfcareRadio}>
                                    <VStack spacing='10px' alignItems="start">
                                        <Radio value='good'>I Am Doing Great, I Do Not Need Extra Help.</Radio>
                                        <Radio value='okay'>I Am Okay At Home, But Need More Help Emotionally.</Radio>
                                        <Radio value='bad'>I Am Not Getting Sleep and Rest.</Radio>
                                    </VStack>
                                </RadioGroup>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Lifestyle</FormLabel>
                                <RadioGroup value={lifeStyleRadio} onChange={setLifeStyleRadio}>
                                    <VStack spacing='10px' alignItems="start">
                                        <Radio value='good'>I Am Doing Great, I Do Not Need Extra Help.</Radio>
                                        <Radio value='okay'>I Am Okay, But Could Use Some Outside Resources.</Radio>
                                        <Radio value='bad'>I Am Concerned About My Health And/Or My Family's Well-Being.</Radio>
                                    </VStack>
                                </RadioGroup>
                            </FormControl>
                            <FormControl>
                                <FormLabel>My Bleeding</FormLabel>
                                <RadioGroup value={bleedingRadio} onChange={setBleedingRadio}>
                                    <VStack spacing='10px' alignItems="start">
                                        <Radio value='good'>I Am Doing Great, I Do Not Need Extra Help.</Radio>
                                        <Radio value='okay'>My Bleeding is Normal, But Could Use Some Outside Resources.</Radio>
                                        <Radio value='bad'> I Am Concerned About the Amount, Color, or Odor of my Bleeding.</Radio>
                                    </VStack>
                                </RadioGroup>
                            </FormControl>
                            <FormControl>
                                <FormLabel>My Incision</FormLabel>
                                <RadioGroup value={incisionRadio} onChange={setIncisionRadio}>
                                    <VStack spacing='10px' alignItems="start">
                                        <Radio value='good'>My Incision is Fine.</Radio>
                                        <Radio value='okay'>My Incision is Healing Well, But Could Use Some Outside Resources.</Radio>
                                        <Radio value='bad'> My Incision is Not Healing Well, and Am Concerned.</Radio>
                                    </VStack>
                                </RadioGroup>
                            </FormControl>
                        </VStack>
                        <VStack alignItems="start" h="60vh">
                            {selfcareRadio && selfcareRadio !== "good" &&
                                <Box w="30vw">
                                    <FormLabel>Self-Care</FormLabel>
                                    <Textarea
                                        value={selfCareTextBox}
                                        onChange={(event) => setSelfCareTextBox(event.target.value)}
                                    />
                                </Box>
                            }
                            {lifeStyleRadio && lifeStyleRadio !== "good" &&
                                <Box w="30vw">
                                    <FormLabel>Lifestyle</FormLabel>
                                    <Textarea
                                        value={lifeStyleTextBox}
                                        onChange={(event) => setLifeStyleTextBox(event.target.value)}
                                    />
                                </Box>
                            }
                            {bleedingRadio && bleedingRadio !== "good" &&
                                <Box w="30vw">
                                    <FormLabel>Bleeding</FormLabel>
                                    <Textarea
                                        value={bleedingTextBox}
                                        onChange={(event) => setBleedingTextBox(event.target.value)}
                                    />
                                </Box>
                            }
                            {incisionRadio && incisionRadio !== "good" &&
                                <Box w="30vw">
                                    <FormLabel>Incision</FormLabel>
                                    <Textarea
                                        value={incisionTextBox}
                                        onChange={(event) => setIncisionTextBox(event.target.value)}
                                    />
                                </Box>
                            }
                        </VStack>
                    </HStack>
                    <Box
                        position="fixed"
                        bottom={0}
                        pb={2}
                        justifyContent="space-between"
                        w="90vw"
                        display="flex"
                    >
                        <Button type='submit'>Submit</Button>
                        <Button onClick={handleClearRadioOptions}>Clear</Button>
                    </Box>
                </form>
            </Box>
        );
    };

    return (
        <Box h="100vh" w="100vw" display="flex" justifyContent="center">
            {/* TODO: Create a tab entry one tab for filling out the form another for seeing visual data */}
            <Tabs isFitted w="100vw">
                <TabList>
                    <Tab>
                        New Entry
                    </Tab>
                    <Tab>
                        Past Logs
                    </Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        {getNewTabPanelContent()}
                    </TabPanel>
                    <TabPanel>
                        Previous Panel
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    );
}
