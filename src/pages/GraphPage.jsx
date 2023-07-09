// Module imports
import { AlertDialog, AlertDialogContent, AlertDialogOverlay, Box, Button, Checkbox, FormLabel, HStack, Image, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, VStack, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { VictoryLine, VictoryLabel, VictoryChart, VictoryTheme } from 'victory';
import { useState } from 'react';

// Relative imports
import { screenBackground } from '../defaultStyle';
import { auth, firestore } from '../firebaseConfig';

export default function GraphPage() {
    const _screenBackground = useColorModeValue(screenBackground.light, screenBackground.dark);
    const [selectedAgeOption, setSelectedAgeOption] = useState("1");
    const [selectedLength, setSelectedLength] = useState("");
    const [selectedWeight, setSelectedWeight] = useState("");
    const [headCircumference, setHeadCircumference] = useState("");
    const [graphDialogIsOpen, setGraphDialogIsOpen] = useState(false);
    const [growthChartRelativePath, setGrowthChartRelativePath] = useState(require("../../src/components/staticPageData/growth-chart-for-girls.jpg"));
    const [allGraphPointsIsVisible, setAllGraphPointsIsVisible] = useState(false);

    const [graphButtonDataIsLoading, setGraphButtonDataIsLoading] = useState(false);
    const [weightButtonIsLoading, setWeightButtonIsLoading] = useState(false);
    const [circumferenceButtonIsLoading, setCircumferenceButtonIsLoading] = useState(false);
    // =========================================================================================
    // =========================================================================================
    // Length/Weight Graph
    // x = length, y = weight
    // =========================================================================================
    // =========================================================================================
    const [weightLengthGraphPoints, setWeightLengthGraphPoints] = useState([]);
    const addWeightLengthPoint = () => {
        setWeightButtonIsLoading(true);
        let newGraphPoints = [
            ...weightLengthGraphPoints,
            { x: Number(selectedLength), y: Number(selectedWeight) }
        ];

        // Update both the front and backend whenever the button is pressed
        firestore
            .collection("users")
            .doc(auth.currentUser.uid)
            .collection("weight-graph")
            .doc(selectedAgeOption)
            .set({
                graph_points: [...newGraphPoints]
            }).finally(() => {
                setWeightButtonIsLoading(false);
            });
        setWeightLengthGraphPoints(newGraphPoints);
    };
    // =========================================================================================
    // =========================================================================================
    // Head Circumference/Weight Graph
    // x = head circumference, y = weight
    const [circumferenceWeightGraphPoints, setCircumferenceWeightGraphPoints] = useState([]);
    const addCircumferenceWeightGraphPoint = () => {
        setCircumferenceButtonIsLoading(true);
        let newGraphPoints = [
            ...circumferenceWeightGraphPoints,
            { x: Number(headCircumference), y: Number(selectedWeight) }
        ];

        // Update both the front and backend whenever the button is pressed
        firestore
            .collection("users")
            .doc(auth.currentUser.uid)
            .collection("circumference-graph")
            .doc(selectedAgeOption)
            .set({
                graph_points: [...newGraphPoints]
            }).finally(() => {
                setCircumferenceButtonIsLoading(false);
            });
        setCircumferenceWeightGraphPoints(newGraphPoints);
    };
    // =========================================================================================
    // =========================================================================================
    const queryDatabaseForBabyAge = () => {
        setGraphButtonDataIsLoading(true);
        firestore
            .collection("users")
            .doc(auth.currentUser.uid)
            .collection("circumference-graph")
            .doc(selectedAgeOption)
            .get()
            .then(doc => {
                if (doc.exists) {
                    setCircumferenceWeightGraphPoints(doc.data().graph_points);
                }
                else {
                    setCircumferenceWeightGraphPoints([]);
                }
            });

        firestore
            .collection("users")
            .doc(auth.currentUser.uid)
            .collection("weight-graph")
            .doc(selectedAgeOption)
            .get()
            .then(doc => {
                if (doc.exists) {
                    setWeightLengthGraphPoints(doc.data().graph_points);
                }
                else {
                    setWeightLengthGraphPoints([]);
                }
                setGraphButtonDataIsLoading(false);
            });
    };

    const showGrowthChartDialog = () => {
        setGraphDialogIsOpen(true);
    };

    const handleChangeGrowthChart = () => {
        if (growthChartRelativePath === require("../../src/components/staticPageData/growth-chart-for-boys.jpg")) {
            setGrowthChartRelativePath(require("../../src/components/staticPageData/growth-chart-for-girls.jpg"));
        }
        else {
            setGrowthChartRelativePath(require("../../src/components/staticPageData/growth-chart-for-boys.jpg"));
        }
    };

    const handleShowAllGraphData = (event) => {
        setAllGraphPointsIsVisible(event.target.checked);
        if (event.target.checked) {
            firestore
                .collection("users")
                .doc(auth.currentUser.uid)
                .collection("circumference-graph")
                .get()
                .then(snapshot => {
                    let newGraphPoints = [];
                    snapshot.docs.forEach(doc => {
                        newGraphPoints = newGraphPoints.concat(doc.data().graph_points);
                    });
                    setCircumferenceWeightGraphPoints(newGraphPoints);
                });
            firestore
                .collection("users")
                .doc(auth.currentUser.uid)
                .collection("weight-graph")
                .get()
                .then(snapshot => {
                    let newGraphPoints = [];
                    snapshot.docs.forEach(doc => {
                        newGraphPoints = newGraphPoints.concat(doc.data().graph_points);
                    });
                    setWeightLengthGraphPoints(newGraphPoints);
                });
        }
    };

    const handleDeleteHWPoint = () => {
        const newHeightLengthPoints = [...circumferenceWeightGraphPoints];
        newHeightLengthPoints.pop();
        setCircumferenceWeightGraphPoints(newHeightLengthPoints);
    };

    const handleDeleteWLPoint = () => {
        const newWeightLengthPoints = [...weightLengthGraphPoints];
        newWeightLengthPoints.pop();
        setWeightLengthGraphPoints(newWeightLengthPoints);
    };

    return (
        <Box
            bg={_screenBackground}
            height="100vh"
            width="100vw"
        >
            <Box
                width="55vw"
            >
                <HStack spacing={10}>
                    <VictoryChart
                        theme={VictoryTheme.material}
                    >
                        <VictoryLabel
                            x={5}
                            y={5}
                            dy={10}
                            text="Length (cm)"
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
                            x={150}
                            y={325}
                            dy={10}
                            text="Weight (kg)"
                        />
                    </VictoryChart>
                    <VictoryChart
                        theme={VictoryTheme.material}
                    >
                        <VictoryLabel
                            x={5}
                            y={5}
                            dy={10}
                            text="Head Circumference (cm)"
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
                            x={150}
                            y={325}
                            dy={10}
                            text="Weight (kg)"
                        />
                    </VictoryChart>
                </HStack>
            </Box>
            <VStack
                justifyContent="space-between"
                w="100vw"
                alignItems="stretch"
                spacing="1.5"
                pl="2"
                pr="2"
            >
                <FormLabel htmlFor='age-months'>Age Months</FormLabel>
                <VStack alignItems="start">
                    <HStack>
                        <NumberInput
                            min={1}
                            max={24}
                            value={selectedAgeOption}
                            onChange={valueString => setSelectedAgeOption(valueString)}
                            isDisabled={allGraphPointsIsVisible}
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
                        <Button onClick={queryDatabaseForBabyAge} isLoading={graphButtonDataIsLoading} isDisabled={allGraphPointsIsVisible}>
                            View Graph
                        </Button>
                    </HStack>
                    <Checkbox
                        isChecked={allGraphPointsIsVisible}
                        onChange={handleShowAllGraphData}
                    >
                        Show All Graph Points
                    </Checkbox>
                </VStack>
                <FormLabel htmlFor='length'>Length</FormLabel>
                <Input
                    id="length"
                    placeholder="length"
                    value={selectedLength}
                    onChange={event => setSelectedLength(event.target.value)}
                />
                <FormLabel htmlFor='weight'>Weight</FormLabel>
                <Input
                    id="weight"
                    placeholder="weight"
                    value={selectedWeight}
                    onChange={event => setSelectedWeight(event.target.value)}
                />
                <FormLabel htmlFor='circumference'>Head Circumference</FormLabel>
                <Input
                    id="circumference"
                    placeholder="head circumference"
                    value={headCircumference}
                    onChange={event => setHeadCircumference(event.target.value)}
                />
                <HStack>
                    <Button onClick={addWeightLengthPoint} isLoading={weightButtonIsLoading}>Plot W/L Point</Button>
                    <Button onClick={addCircumferenceWeightGraphPoint} isLoading={circumferenceButtonIsLoading}>Plot W/H Point</Button>
                    <Button onClick={showGrowthChartDialog}>View Growth Chart</Button>
                </HStack>
                <HStack>
                    <Button onClick={handleDeleteWLPoint}>Delete W/L Point</Button>
                    <Button onClick={handleDeleteHWPoint}>Delete W/H Point</Button>
                </HStack>
            </VStack>
            {/* Alert Dialog triggered for showing user growth charts */}
            <AlertDialog
                isOpen={graphDialogIsOpen}
                onClose={() => setGraphDialogIsOpen(false)}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <Box
                            w="40vw"
                            display="flex"
                            flexDir="column"
                        >
                            <Image src={growthChartRelativePath} />
                            <Button onClick={handleChangeGrowthChart}>Switch Chart</Button>
                        </Box>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </Box>
    );
}
