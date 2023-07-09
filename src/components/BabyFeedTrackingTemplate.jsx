import { Box, Button, FormControl, FormLabel, HStack, Input, VStack } from '@chakra-ui/react';
import React from 'react';
import Timer from './Timer';
import { useState } from 'react';

export default function BabyFeedTrackingTemplate({ componentData, setComponentData, ComponentTabPanel, additionalFooterChildren, additionalComponentData, isTimerUsed }) {
    const [leftTeetTimerValue, setLeftTeetTimerValue] = useState(0);
    const [rightTeetTimerValue, setRightTeetTimerValue] = useState(0);
    const [submittingTimerValues, setSubmittingTimerValues] = useState(false);
    const [alias, setAlias] = useState("");

    const getBabyFeedingTrackingFooter = () => {
        return (
            <form onSubmit={generateBreastFeedingRow}>
                <HStack alignItems="end" justifyContent="center">
                    <VStack alignItems="start">
                        <FormControl isRequired>
                            <FormLabel>
                                Alias
                            </FormLabel>
                            <Input value={alias} onChange={(event) => setAlias(event.target.value)} />
                        </FormControl>
                    </VStack>
                    {additionalFooterChildren}
                    <Button type="submit">Submit</Button>
                </HStack>
            </form>
        );
    };

    const generateBreastFeedingRow = (event) => {
        event.preventDefault();

        setSubmittingTimerValues(true);
        setComponentData([...componentData, {
            ...additionalComponentData,
            leftBreastTime: leftTeetTimerValue,
            rightBreastTime: rightTeetTimerValue,
            timeStamp: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
            alias: String(alias).trim()
        }]);
    };

    return (
        <Box overflowX="hidden">
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
                        fluidOunces={componentRow.fluidOunces}
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
                {getBabyFeedingTrackingFooter()}
            </VStack>
        </Box>
    );
}
