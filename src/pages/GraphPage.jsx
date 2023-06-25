import { Box, Button, HStack, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { VictoryLine, VictoryLabel, VictoryChart, VictoryTheme, VictoryAxis } from 'victory';
import { screenBackground } from '../defaultStyle';
import StyledSelect from '../components/StyledSelect';
import { useState } from 'react';

export default function GraphPage() {
    const _screenBackground = useColorModeValue(screenBackground.light, screenBackground.dark);
    const measurementOptions = [
        { value: "in", label: "in", key: 0 },
        { value: "cm", label: "cm", key: 1 },
    ];
    const weightOptions = [
        { value: "lb", label: "lb", key: 0 },
        { value: "kg", label: "kg", key: 1 },
    ];

    const [selectedAgeOption, setSelectedAgeOption] = useState("");
    const [selectedLength, setSelectedLength] = useState("");
    const [selectedLengthMeasurement, setSelectedLengthMeasurement] = useState("");
    const [selectedWeight, setSelectedWeight] = useState("");
    const [selectedWeightMeasurement, setSelectedWeightMeasurement] = useState("");
    const [headCircumference, setHeadCircumference] = useState("");
    const [headCircumferenceMeasurement, setHeadCircumferenceMeasurement] = useState("");

    // These functions will be used to make sure that the database only submits one universal number (for lbs and inches) and if the conversion needs to be made it will be done
    // on the frontend to prevent multiple database calls.
    // =============================================================================================
    // =============================================================================================
    // Conversion from cm to in => 1" = 2.54cm
    // Conversion from lb to kg => 1kg = 2.23 lbs
    // =============================================================================================
    // =============================================================================================

    // If user is making submission in cm then it has to be converted to inches for the database,
    // If user is making submission in kg then it has to be converted to pounds for the database

    // TODO: Get function to convert values upon database submission.
    const getStandardValuesForDatabase = () => {
        let convertedLengthMeasurement = "";
        let convertedWeightMeasurement = "";
        let convertedCircumferenceMeasurement = "";

        if (selectedLengthMeasurement === "cm") {
            convertedLengthMeasurement = selectedLength / 2.54;
        }

        if (selectedWeightMeasurement === "kg") {
            convertedWeightMeasurement = selectedWeight * 2.23;
        }

        return {
            length: convertedLengthMeasurement,
            lengthMeasurement: "in",
            weight: convertedWeightMeasurement,
            weightMeasurement: "lb",
            headCircumference: convertedCircumferenceMeasurement,
            headCircumferenceMeasurement: "in"
        };
    };

    // TODO: Get standardized measurements for baby health, base it off the graph Mulya gave you
    // BMI=weight(kg)/height(m^2)
    // Obesity: BMI > 95th percentile
    // Overweight: 85th < BMI < 95th percentile
    // Underweight: BMI < 5th percentile
    // =========================================================================================
    // =========================================================================================


    // TODO: Make graphs dynamic.
    // x = length, y = weight
    // =========================================================================================
    const [weightLengthGraphPoints, setWeightLengthGraphPoints] = useState([]);
    const addWeightLengthPoint = () => {
        let newGraphPoints = [
            ...weightLengthGraphPoints,
            { x: Number(selectedLength), y: Number(selectedWeight) }
        ];
        setWeightLengthGraphPoints(newGraphPoints);
    };
    // =========================================================================================

    return (
        <Box
            bg={_screenBackground}
            height="100vh"
        >
            <Box
                width="100vw"
            >
                <HStack>
                    <VictoryChart
                        theme={VictoryTheme.material}
                    >
                        <VictoryLabel
                            x={5}
                            y={5}
                            dy={10}
                            text="Length"
                        />
                        {/* <VictoryAxis
                            width={400}
                            height={400}
                            theme={VictoryTheme.material}
                            offsetY={200}
                            standalone={false}
                            label="Length"
                            dependentAxis
                            tickValues={[2, 4, 6, 8]}
                            domain={[0, 20]}
                        /> */}
                        {/* <VictoryAxis
                            width={400}
                            height={400}
                            theme={VictoryTheme.material}
                            offsetX={200}
                            standalone={false}
                            label="Weight"
                            tickValues={[2, 4, 6, 8]}
                            domain={[0, 20]}
                        /> */}
                        <VictoryLine
                            style={{
                                data: { stroke: "#c43a31" },
                                parent: { border: "1px solid #ccc" }
                            }}
                            data={weightLengthGraphPoints}
                        >
                        </VictoryLine>
                        <VictoryLabel
                            x={300}
                            y={150}
                            dy={10}
                            text="Weight"
                        />
                    </VictoryChart>
                    <VictoryChart
                        theme={VictoryTheme.material}
                    >
                        <VictoryLabel
                            x={5}
                            y={5}
                            dy={10}
                            text="Age"
                        />
                        <VictoryLine
                            style={{
                                data: { stroke: "#c43a31" },
                                parent: { border: "1px solid #ccc" }
                            }}
                            data={[
                                { x: 1, y: 10 },
                                { x: 2, y: 3 },
                                { x: 3, y: 11 },
                                { x: 2, y: 12 },
                                { x: 5, y: 7 }
                            ]}
                        >
                        </VictoryLine>
                        <VictoryLabel
                            x={300}
                            y={150}
                            dy={10}
                            text="Weight"
                        />
                    </VictoryChart>
                    <VictoryChart
                        theme={VictoryTheme.material}
                    >
                        <VictoryLabel
                            x={5}
                            y={5}
                            dy={10}
                            text="Head Circumference"
                        />
                        <VictoryLine
                            style={{
                                data: { stroke: "#c43a31" },
                                parent: { border: "1px solid #ccc" }
                            }}
                            data={[
                                { x: 1, y: 2 },
                                { x: 2, y: 3 },
                                { x: 3, y: 5 },
                                { x: 4, y: 4 },
                                { x: 5, y: 7 }
                            ]}
                        >
                        </VictoryLine>
                        <VictoryLabel
                            x={300}
                            y={150}
                            dy={10}
                            text="Weight"
                        />
                    </VictoryChart>
                </HStack>
            </Box>
            <NumberInput min={1} max={24}>
                <NumberInputField placeholder="Age-months"
                    value={selectedAgeOption}
                    onChange={event => setSelectedAgeOption(event.target.value)}
                />
                <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                </NumberInputStepper>
            </NumberInput>
            <HStack>
                <Input
                    placeholder="length"
                    value={selectedLength}
                    onChange={event => setSelectedLength(event.target.value)}
                />
                <StyledSelect
                    value={selectedLengthMeasurement}
                    onChange={event => setSelectedLengthMeasurement(event.target.value)}
                    options={measurementOptions}
                />
            </HStack>
            <HStack>
                <Input
                    placeholder="weight"
                    value={selectedWeight}
                    onChange={event => setSelectedWeight(event.target.value)}
                />
                <StyledSelect
                    value={selectedWeightMeasurement}
                    onChange={event => setSelectedWeightMeasurement(event.target.value)}
                    options={weightOptions}
                />
            </HStack>
            <HStack>
                <Input
                    placeholder="head circumference"
                    value={headCircumference}
                    onChange={event => setHeadCircumference(event.target.value)}
                />
                <StyledSelect
                    value={headCircumferenceMeasurement}
                    onChange={event => setHeadCircumferenceMeasurement(event.target.value)}
                    options={measurementOptions}
                />
            </HStack>
            <Button onClick={addWeightLengthPoint}>Plot W/L Point</Button>
        </Box>
    );
}
