import { Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react';

export default function BabyFeedTrackingPage() {
    const [tabIndex, setTabIndex] = useState(0);
    const handleTabsChange = (index) => {
        setTabIndex(index);
    };

    return (
        <Tabs variant='enclosed' index={tabIndex} onChange={handleTabsChange}>
            <TabList>
                <Tab>
                    <VStack spacing="-1">
                        {/* <Icon as={WaterDropIcon} /> */}
                        <Text>BreastFeed</Text>
                    </VStack>
                </Tab>
                <Tab>
                    <VStack spacing="-1">
                        {/* <Icon as={VolcanoIcon} /> */}
                        <Text>Bottle</Text>
                    </VStack>
                </Tab>
                <Tab>
                    <VStack spacing="-1">
                        {/* <Icon as={DoDisturbAltIcon} /> */}
                        <Text>Pump</Text>
                    </VStack>
                </Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    BreastFeed stuff...
                </TabPanel>
                <TabPanel>
                    Bottle stuff...
                </TabPanel>
                <TabPanel>
                    Pump stuff...
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
}
