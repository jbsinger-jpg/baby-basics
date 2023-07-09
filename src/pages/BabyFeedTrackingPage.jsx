import { Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react';
import BreastRowTabPanel from '../components/tabPanels/BreastRowTabPanel';
import BabyFeedTrackingTemplate from '../components/BabyFeedTrackingTemplate';
import PumpRowTabPanel from '../components/tabPanels/PumpRowTabPanel';

export default function BabyFeedTrackingPage() {
    const [tabIndex, setTabIndex] = useState(0);
    const [breastFeedingRows, setBreastFeedingRows] = useState([]);
    const [pumpFeedingRows, setPumpFeedingRows] = useState([]);

    const handleTabsChange = (index) => {
        setTabIndex(index);
    };

    return (
        <Tabs variant='enclosed' index={tabIndex} onChange={handleTabsChange}>
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
                    Bottle stuff...
                </TabPanel>
                <TabPanel>
                    <BabyFeedTrackingTemplate
                        ComponentTabPanel={PumpRowTabPanel}
                        componentData={pumpFeedingRows}
                        setComponentData={setPumpFeedingRows}
                    />
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
}
