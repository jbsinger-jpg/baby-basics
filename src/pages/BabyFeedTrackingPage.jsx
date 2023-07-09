import { Box, Button, FormControl, FormLabel, HStack, Input, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react';
import BreastRowTabPanel from '../components/tabPanels/BreastRowTabPanel';
import BabyFeedTrackingTemplate from '../components/BabyFeedTrackingTemplate';
import PumpRowTabPanel from '../components/tabPanels/PumpRowTabPanel';
import BottleTabPanel from '../components/tabPanels/BottleTabPanel';
import { screenBackground } from '../defaultStyle';

export default function BabyFeedTrackingPage() {
    const [tabIndex, setTabIndex] = useState(0);
    const [breastFeedingRows, setBreastFeedingRows] = useState([]);
    const [pumpFeedingRows, setPumpFeedingRows] = useState([]);
    const [bottleFeedingRows, setBottleFeedingRows] = useState([]);
    const [bottleRowAlias, setBottleRowAlias] = useState("");
    const [bottleRowFluidOunces, setBottleRowFluidOunces] = useState(0);
    const [pumpFluidOunces, setPumpFluidOunces] = useState(0);
    const _screenBackground = useColorModeValue(screenBackground.light, screenBackground.dark);

    const handleTabsChange = (index) => {
        setTabIndex(index);
    };

    const getAdditionalPumpChildren = () => {
        return (
            <VStack alignItems="start">
                <FormControl isRequired>
                    <FormLabel>Fluid Ounces</FormLabel>
                </FormControl>
                <Input value={pumpFluidOunces} onChange={(event) => setPumpFluidOunces(event.target.value)} />
            </VStack>
        );
    };

    const generateBottleRow = (event) => {
        event.preventDefault();
        setBottleFeedingRows([...bottleFeedingRows, {
            timeStamp: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
            alias: String(bottleRowAlias).trim(),
            fluidOunces: Number(bottleRowFluidOunces)
        }]);
    };

    return (
        <Tabs variant='enclosed' index={tabIndex} onChange={handleTabsChange} bg={_screenBackground} h="100vh">
            <TabList>
                <Tab>
                    <VStack spacing="-1">
                        <Text>BreastFeed</Text>
                    </VStack>
                </Tab>
                <Tab>
                    <VStack spacing="-1">
                        <Text>Bottle</Text>
                    </VStack>
                </Tab>
                <Tab>
                    <VStack spacing="-1">
                        <Text>Pump</Text>
                    </VStack>
                </Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <BabyFeedTrackingTemplate
                        ComponentTabPanel={BreastRowTabPanel}
                        componentData={breastFeedingRows}
                        setComponentData={setBreastFeedingRows}
                    />
                </TabPanel>
                <TabPanel>
                    <Box overflowX="hidden">
                        {bottleFeedingRows && bottleFeedingRows.map((bottleRow, index) => {
                            return (
                                <BottleTabPanel
                                    data={bottleFeedingRows}
                                    setData={setBottleFeedingRows}
                                    index={index}
                                    alias={bottleRow.alias}
                                    timeStamp={bottleRow.timeStamp}
                                    fluidOunces={bottleRow.fluidOunces}
                                />
                            );
                        })}
                        <VStack
                            alignItems="start"
                            pl="2"
                            pr="2"
                            position="fixed"
                            bottom="0"
                            w="100vw"
                        >
                            <form onSubmit={generateBottleRow}>
                                <HStack alignItems="end">
                                    <HStack alignItems="end" justifyContent="center">
                                        <FormControl isRequired>
                                            <FormLabel>
                                                Alias
                                            </FormLabel>
                                            <Input value={bottleRowAlias} onChange={(event) => setBottleRowAlias(event.target.value)} />
                                        </FormControl>
                                        <FormControl isRequired>
                                            <FormLabel>
                                                Fluid Ounces
                                            </FormLabel>
                                            <Input value={bottleRowFluidOunces} onChange={(event) => setBottleRowFluidOunces(event.target.value)} />
                                        </FormControl>
                                    </HStack>
                                    <Button type="submit">Submit</Button>
                                </HStack>
                            </form>
                        </VStack>
                    </Box>
                </TabPanel>
                <TabPanel>
                    <BabyFeedTrackingTemplate
                        ComponentTabPanel={PumpRowTabPanel}
                        componentData={pumpFeedingRows}
                        setComponentData={setPumpFeedingRows}
                        additionalFooterChildren={getAdditionalPumpChildren()}
                        additionalComponentData={{ fluidOunces: pumpFluidOunces }}
                    />
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
}
