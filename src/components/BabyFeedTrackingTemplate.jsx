import { Box, Button, HStack, Heading, Input, VStack } from '@chakra-ui/react';
import React from 'react';
import Timer from './Timer';
import { useState } from 'react';

export default function BabyFeedTrackingTemplate({ componentData, setComponentData, ComponentTabPanel }) {
    const [leftTeetTimerValue, setLeftTeetTimerValue] = useState(0);
    const [rightTeetTimerValue, setRightTeetTimerValue] = useState(0);
    const [submittingTimerValues, setSubmittingTimerValues] = useState(false);
    const [alias, setAlias] = useState("");

    const generateBreastFeedingRow = async () => {
        await setSubmittingTimerValues(true);

        setComponentData([...componentData, {
            leftBreastTime: leftTeetTimerValue,
            rightBreastTime: rightTeetTimerValue,
            timeStamp: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
            alias: String(alias).trim()
        }]);
    };

    return (
        <Box>
            <HStack
                alignItems="start"
                justifyContent="space-evenly"
                pl="2"
                pr="2"
                w="100vw"
            >
                <Timer title="L" setValue={setLeftTeetTimerValue} pauseTimer={submittingTimerValues} />
                <Timer title="R" setValue={setRightTeetTimerValue} pauseTimer={submittingTimerValues} />
            </HStack>
            {componentData && componentData.map(componentRow => {
                return (
                    <ComponentTabPanel
                        leftBreastTime={componentRow.leftBreastTime}
                        rightBreastTime={componentRow.rightBreastTime}
                        data={componentData}
                        setData={setComponentData}
                        timeStamp={componentRow.timeStamp}
                        alias={componentRow.alias}
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
                <VStack alignItems="start">
                    <Heading>Alias</Heading>
                    <Input value={alias} onChange={(event) => setAlias(event.target.value)} />
                </VStack>
                <Button onClick={generateBreastFeedingRow}>Submit</Button>
            </VStack>
        </Box>
    );
}
