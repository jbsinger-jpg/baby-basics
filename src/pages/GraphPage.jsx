import { Box, Button, FormLabel, HStack, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, VStack, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { VictoryLine, VictoryLabel, VictoryChart, VictoryTheme } from 'victory';
import { screenBackground } from '../defaultStyle';
import StyledSelect from '../components/StyledSelect';
import { useState } from 'react';
import { auth, firestore } from '../firebaseConfig';

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
    // Length/Weight Graph
    // x = length, y = weight
    // =========================================================================================
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
    // =========================================================================================
    // Head Circumference/Weight Graph
    // x = head circumference, y = weight
    const [circumferenceWeightGraphPoints, setCircumferenceWeightGraphPoints] = useState([]);
    const addCircumferenceWeightGraphPoint = () => {
        let newGraphPoints = [
            ...circumferenceWeightGraphPoints,
            { x: Number(headCircumference), y: Number(selectedWeight) }
        ];
        setCircumferenceWeightGraphPoints(newGraphPoints);
    };
    // =========================================================================================
    // =========================================================================================

    const queryDatabaseForBabyAge = () => {
        firestore
            .collection("users")
            .doc(auth.currentUser.uid)
            .collection("circumference")
            .doc(selectedAgeOption)
            .get()
            .then(doc => {
                // set front-end data object to array called graph points.
                // TODO: need to implement data to be set still.
                setCircumferenceWeightGraphPoints(doc.data().graph_points);
            });

        firestore
            .collection("users")
            .doc(auth.currentUser.uid)
            .collection("weight")
            .doc(selectedAgeOption)
            .get()
            .then(doc => {
                // set front-end data object to array called graph points.
                // TODO: need to implement data to be set still.
                setWeightLengthGraphPoints(doc.data().graph_points);
            });
    };

    return (
        <Box
            bg={_screenBackground}
            height="100vh"
        >
            <Box
                width="65vw"
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
                            text="Head Circumference"
                        />
                        <VictoryLine
                            style={{
                                data: { stroke: "#c43a31" },
                                parent: { border: "1px solid #ccc" }
                            }}
                            data={circumferenceWeightGraphPoints}
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
            <VStack
                justifyContent="space-between"
                w="100vw"
                alignItems="stretch"
                spacing="-0.5"
                pl="2"
                pr="2"
            >
                <FormLabel htmlFor='age-months'>Age Months</FormLabel>
                <HStack>
                    <NumberInput min={1} max={24}>
                        <NumberInputField
                            id="age-months"
                            placeholder="Age-months"
                            value={selectedAgeOption}
                            onChange={event => setSelectedAgeOption(event.target.value)}
                        />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                    <Button onClick={queryDatabaseForBabyAge}>
                        View Age
                    </Button>
                </HStack>
                <FormLabel htmlFor='length'>Length</FormLabel>
                <HStack>
                    <Input
                        id="length"
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
                <FormLabel htmlFor='weight'>Weight</FormLabel>
                <HStack>
                    <Input
                        id="weight"
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
                <FormLabel htmlFor='circumference'>Head Circumference</FormLabel>
                <HStack>
                    <Input
                        id="circumference"
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
                <HStack>
                    <Button onClick={addWeightLengthPoint}>Plot W/L Point</Button>
                    <Button onClick={addCircumferenceWeightGraphPoint}>Plot H/L Point</Button>
                </HStack>
            </VStack>
        </Box>
    );
}
