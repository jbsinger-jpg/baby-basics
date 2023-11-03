import { Box, FormControl, FormLabel, Heading, Radio, RadioGroup, Tab, TabList, TabPanel, TabPanels, Tabs, VStack } from '@chakra-ui/react';
import React from 'react';

export default function PostPartumPage() {
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
                    <VStack alignItems="start">
                        <FormControl>
                            <FormLabel>Self-Care</FormLabel>
                            <RadioGroup defaultValue='good'>
                                <VStack spacing='10px' alignItems="start">
                                    <Radio value='good'>I Am Doing Great, I Do Not Need Extra Help.</Radio>
                                    <Radio value='okay'>I Am Okay At Home, But Need More Help Emotionally.</Radio>
                                    <Radio value='bad'>I Am Not Getting Sleep and Rest.</Radio>
                                </VStack>
                            </RadioGroup>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Lifestyle</FormLabel>
                            <RadioGroup defaultValue='good'>
                                <VStack spacing='10px' alignItems="start">
                                    <Radio value='good'>I Am Doing Great, I Do Not Need Extra Help.</Radio>
                                    <Radio value='okay'>I Am Okay, But Could Use Some Outside Resources.</Radio>
                                    <Radio value='bad'>I Am Concerned About My Health And/Or My Family's Well-Being.</Radio>
                                </VStack>
                            </RadioGroup>
                        </FormControl>
                        <FormControl>
                            <FormLabel>My Bleeding</FormLabel>
                            <RadioGroup defaultValue='good'>
                                <VStack spacing='10px' alignItems="start">
                                    <Radio value='good'>I Am Doing Great, I Do Not Need Extra Help.</Radio>
                                    <Radio value='okay'>My Bleeding is Normal, But Could Use Some Outside Resources.</Radio>
                                    <Radio value='bad'> I Am Concerned About the Amount, Color, or Odor of my Bleeding.</Radio>
                                </VStack>
                            </RadioGroup>
                        </FormControl>
                        <FormControl>
                            <FormLabel>My Incision</FormLabel>
                            <RadioGroup defaultValue='good'>
                                <VStack spacing='10px' alignItems="start">
                                    <Radio value='good'>My Incision is Fine.</Radio>
                                    <Radio value='okay'>My Incision is Healing Well, But Could Use Some Outside Resources.</Radio>
                                    <Radio value='bad'> My Incision is Not Healing Well, and Am Concerned.</Radio>
                                </VStack>
                            </RadioGroup>
                        </FormControl>
                    </VStack>
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
                        New
                    </Tab>
                    <Tab>
                        Previous
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
