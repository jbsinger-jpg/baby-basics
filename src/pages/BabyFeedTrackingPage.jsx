import { Button, HStack, Heading, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react';
import Timer from '../components/Timer';
import BreastRowTabPanel from '../components/tabPanels/BreastRowTabPanel';

export default function BabyFeedTrackingPage() {
    const [tabIndex, setTabIndex] = useState(0);
    const [leftTeetTimerValue, setLeftTeetTimerValue] = useState(0);
    const [rightTeetTimerValue, setRightTeetTimerValue] = useState(0);
    const [breastFeedingRows, setBreastFeedingRows] = useState([]);
    const [submittingTimerValues, setSubmittingTimerValues] = useState(false);

    const generateBreastFeedingRow = async () => {
        await setSubmittingTimerValues(true);

        setBreastFeedingRows([...breastFeedingRows, {
            leftBreastTime: leftTeetTimerValue,
            rightBreastTime: rightTeetTimerValue,
        }]);

        console.log("Timer values: ", leftTeetTimerValue, rightTeetTimerValue);
    };

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
                    {breastFeedingRows && breastFeedingRows.map(breastRow => {
                        return (
                            <BreastRowTabPanel
                                leftBreastTime={breastRow.leftBreastTime}
                                rightBreastTime={breastRow.rightBreastTime}
                            />
                        );
                    })}
                    <VStack>
                        <Heading>Alias</Heading>
                        <HStack spacing="5">
                            <Timer title="L" setValue={setLeftTeetTimerValue} pauseTimer={submittingTimerValues} />
                            <Timer title="R" setValue={setRightTeetTimerValue} pauseTimer={submittingTimerValues} />
                        </HStack>
                        <Button onClick={generateBreastFeedingRow}>Submit</Button>
                    </VStack>
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
