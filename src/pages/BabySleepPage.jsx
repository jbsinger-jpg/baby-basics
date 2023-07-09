import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Checkbox, FormLabel, HStack, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Text, VStack, useColorModeValue } from '@chakra-ui/react';
import React, { useState } from 'react';
import { VictoryChart, VictoryLabel, VictoryScatter, VictoryTheme } from 'victory';
import { screenBackground } from '../defaultStyle';

export default function BabySleepPage() {
    const _screenBackground = useColorModeValue(screenBackground.light, screenBackground.dark);
    const [sleepGraphPoints, setSleepGraphPoints] = useState([]);
    const [selectedAgeOption, setSelectedAgeOption] = useState("1");
    const [ageSleepButtonIsLoading, setAgeSleepButtonIsLoading] = useState(false);
    const [sleepValue, setSleepValue] = useState("");
    const [showLabel, setShowLabel] = useState(false);
    const [showStatistics, setShowStatistics] = useState(false);
    const [dialogAgeOption, setDialogAgeOption] = useState(1);
    const [allGraphPointsIsVisible, setAllGraphPointsIsVisible] = useState(true);

    const addAgeSleepPoint = () => {
        let newGraphPoints = [
            ...sleepGraphPoints,
            { x: Number(selectedAgeOption), y: Number(sleepValue), date: new Date() }
        ];
        setSleepGraphPoints(newGraphPoints);
    };

    const getAverageSleep = () => {
        let sum = 0;
        let count = 0;

        if (allGraphPointsIsVisible && sleepGraphPoints && sleepGraphPoints.length) {
            sleepGraphPoints.map((point) => {
                return (
                    count += 1,
                    sum += point.y
                );

            });
        }
        else if (sleepGraphPoints && sleepGraphPoints.length) {
            const filteredSleepPoints = sleepGraphPoints.filter(point => Number(dialogAgeOption) === Number(point.x));

            filteredSleepPoints.map((point) => {
                return (
                    count += 1,
                    sum += point.y
                );
            });
        }

        return sum / count;
    };

    const handleShowAllGraphData = (event) => {
        setAllGraphPointsIsVisible(event.target.checked);
    };

    return (
        <Box
            bg={_screenBackground}
            height="100vh"
            width="100vw"
        >
            <Box
                width="35vw"
            >
                <VictoryChart
                    theme={VictoryTheme.material}
                >
                    <VictoryLabel
                        x={5}
                        y={5}
                        dy={10}
                        text="Sleep (hrs)"
                    />
                    <VictoryScatter
                        style={{
                            data: { stroke: "#c43a31" },
                            parent: { border: "1px solid #ccc" }
                        }}
                        data={[...sleepGraphPoints]}
                        // Place the month/day of the point as the label
                        labels={({ datum }) => showLabel ? `${datum.date.toISOString().substring(5, 7)}/${datum.date.toISOString().substring(8, 10)}` : null}
                    >
                    </VictoryScatter>
                    <VictoryLabel
                        x={150}
                        y={325}
                        dy={10}
                        text="Age (months)"
                    />
                </VictoryChart>
            </Box>
            <VStack
                justifyContent="space-between"
                w="100vw"
                alignItems="stretch"
                spacing="-0.5"
                pl="2"
                pr="2"
            >
                <VStack alignItems="start">
                    <HStack>
                        <VStack>
                            <FormLabel htmlFor='age-months'>Age Months</FormLabel>
                            <NumberInput
                                min={1}
                                max={24}
                                value={selectedAgeOption}
                                onChange={valueString => setSelectedAgeOption(valueString)}
                            >
                                <NumberInputField
                                    id="age-months"
                                    placeholder="Age-months"
                                />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </VStack>
                        <VStack alignItems="start">
                            <FormLabel htmlFor='sleep'>Sleep</FormLabel>
                            <Input id='sleep' value={sleepValue} onChange={(event) => setSleepValue(event.target.value)} />
                        </VStack>
                    </HStack>
                </VStack>
                <HStack>
                    <Button onClick={addAgeSleepPoint} isLoading={ageSleepButtonIsLoading}>Add Sleep</Button>
                    <Button onClick={() => setShowLabel(!showLabel)}>Show Labels</Button>
                    <Button onClick={() => setShowStatistics(!showStatistics)}>Show Average</Button>
                    <Button onClick={() => {
                        if (sleepGraphPoints && sleepGraphPoints.length) {
                            const newGraphPoints = [...sleepGraphPoints];
                            newGraphPoints.pop();
                            setSleepGraphPoints(newGraphPoints);
                        }
                    }}
                    >
                        Delete Prev Point
                    </Button>
                </HStack>
            </VStack>
            <AlertDialog
                isOpen={showStatistics}
                onClose={() => setShowStatistics(false)}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Average Sleep
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            <VStack
                                alignItems="start"
                            >
                                <Text
                                    fontSize='lg'
                                    as='b'
                                >
                                    {getAverageSleep()} hrs
                                </Text>
                                <FormLabel id="age-label"> Age Months</FormLabel>
                                <NumberInput
                                    id="age-label"
                                    min={1}
                                    max={24}
                                    value={dialogAgeOption}
                                    onChange={valueString => setDialogAgeOption(valueString)}
                                    isDisabled={allGraphPointsIsVisible}
                                >
                                    <NumberInputField
                                        placeholder="Age-months"
                                    />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                                <Checkbox
                                    isChecked={allGraphPointsIsVisible}
                                    onChange={handleShowAllGraphData}
                                >
                                    Show Total Average
                                </Checkbox>
                            </VStack>
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button onClick={() => setShowStatistics(false)}>
                                Cancel
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </Box>
    );
}
