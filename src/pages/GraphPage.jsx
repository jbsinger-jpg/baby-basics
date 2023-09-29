// Module imports
import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Checkbox, FormLabel, HStack, Heading, Image, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, VStack, useColorModeValue } from '@chakra-ui/react';
import { VictoryLine, VictoryLabel, VictoryChart, VictoryTheme } from 'victory';
import { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Relative imports
import { screenBackground } from '../defaultStyle';
import { auth, firestore } from '../firebaseConfig';

export default function GraphPage() {
    const _screenBackground = useColorModeValue(screenBackground.light, screenBackground.dark);
    const [selectedAgeOption, setSelectedAgeOption] = useState("1");
    const [selectedLength, setSelectedLength] = useState(1);
    const [selectedWeight, setSelectedWeight] = useState(1);
    const [headCircumference, setHeadCircumference] = useState(1);
    const [graphDialogIsOpen, setGraphDialogIsOpen] = useState(false);
    const [growthChartRelativePath, setGrowthChartRelativePath] = useState(require("../../src/components/staticPageData/growth-chart-for-girls.jpg"));
    const [allGraphPointsIsVisible, setAllGraphPointsIsVisible] = useState(false);

    const [graphButtonDataIsLoading, setGraphButtonDataIsLoading] = useState(false);
    const [weightButtonIsLoading, setWeightButtonIsLoading] = useState(false);
    const [circumferenceButtonIsLoading, setCircumferenceButtonIsLoading] = useState(false);

    const [showConversionDialog, setShowConversionDialog] = useState(false);
    const [lbValue, setLbValue] = useState(0);
    const [inValue, setInValue] = useState(0);

    const [deleteHCPointIsLoading, setDeleteHCPointIsLoading] = useState(false);
    const [deleteWLPointIsLoading, setDeleteWLPointIsLoading] = useState(false);
    const [weightLengthGraphPoints, setWeightLengthGraphPoints] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleSelectedDateChange = (date) => {
        setSelectedDate(date);
    };

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
            .collection("dates")
            .doc(selectedDate.toLocaleDateString().replace(/\//g, '-'))
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
        if (Number(headCircumference) && Number(selectedWeight)) {
            let newGraphPoints = [
                ...circumferenceWeightGraphPoints,
                { x: Number(headCircumference), y: Number(selectedWeight) }
            ];

            // Update both the front and backend whenever the button is pressed
            firestore
                .collection("users")
                .doc(auth?.currentUser?.uid)
                .collection("circumference-graph")
                .doc(selectedAgeOption)
                .collection("dates")
                .doc(selectedDate.toLocaleDateString().replace(/\//g, '-'))
                .set({
                    graph_points: [...newGraphPoints]
                }).finally(() => {
                    setCircumferenceButtonIsLoading(false);
                });
            setCircumferenceWeightGraphPoints(newGraphPoints);
        }
        else {
            setCircumferenceButtonIsLoading(false);
        }
    };
    // =========================================================================================
    // =========================================================================================
    const queryDatabaseForBabyAge = async () => {
        setGraphButtonDataIsLoading(true);
        await firestore
            .collection("users")
            .doc(auth?.currentUser?.uid)
            .collection("circumference-graph")
            .doc(selectedAgeOption)
            .collection("dates")
            .doc(selectedDate.toLocaleDateString().replace(/\//g, '-'))
            .get()
            .then(doc => {
                if (doc.data()) {
                    console.log(doc.data());
                    setCircumferenceWeightGraphPoints(doc.data().graph_points);
                }
                else {
                    setCircumferenceWeightGraphPoints([]);
                }
            });

        await firestore
            .collection("users")
            .doc(auth?.currentUser?.uid)
            .collection("weight-graph")
            .doc(selectedAgeOption)
            .collection("dates")
            .doc(selectedDate.toLocaleDateString().replace(/\//g, '-'))
            .get()
            .then(doc => {
                if (doc.data()) {
                    console.log(doc.data());
                    setWeightLengthGraphPoints(doc.data().graph_points);
                }
                else {
                    setWeightLengthGraphPoints([]);
                }
            }).finally(() => {
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
                .doc(auth?.currentUser?.uid)
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
                .doc(auth?.currentUser?.uid)
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
        setDeleteHCPointIsLoading(true);
        const newHeightLengthPoints = [...circumferenceWeightGraphPoints];

        newHeightLengthPoints.pop();
        setCircumferenceWeightGraphPoints(newHeightLengthPoints);
        firestore
            .collection("users")
            .doc(auth?.currentUser?.uid)
            .collection("circumference-graph")
            .doc(selectedAgeOption)
            .collection("dates")
            .doc(selectedDate.toLocaleDateString().replace(/\//g, '-'))
            .set({
                graph_points: [...newHeightLengthPoints]
            }).finally(() => {
                setDeleteHCPointIsLoading(false);
            });
    };

    const handleDeleteWLPoint = () => {
        setDeleteWLPointIsLoading(true);
        const newWeightLengthPoints = [...weightLengthGraphPoints];

        newWeightLengthPoints.pop();
        setWeightLengthGraphPoints(newWeightLengthPoints);
        firestore
            .collection("users")
            .doc(auth?.currentUser?.uid)
            .collection("weight-graph")
            .doc(selectedAgeOption)
            .collection("dates")
            .doc(selectedDate.toLocaleDateString().replace(/\//g, '-'))
            .set({
                graph_points: [...newWeightLengthPoints]
            }).finally(() => {
                setDeleteWLPointIsLoading(false);
            });
    };

    const textColor = useColorModeValue("black", "white");

    useEffect(() => {
        if (auth?.currentUser?.uid) {
            firestore.collection("users")
                .doc(auth?.currentUser?.uid)
                .collection("weight-graph")
                .doc("1")
                .collection("dates")
                .doc(selectedDate.toLocaleDateString().replace(/\//g, '-'))
                .get()
                .then((doc) => {
                    if (doc.data()) {
                        setWeightLengthGraphPoints(doc.data().graph_points);
                    }
                    else {
                        setWeightLengthGraphPoints([]);
                    }
                });

            firestore.collection("users")
                .doc(auth?.currentUser?.uid)
                .collection("circumference-graph")
                .doc("1")
                .collection("dates")
                .doc(selectedDate.toLocaleDateString().replace(/\//g, '-'))
                .get()
                .then((doc) => {
                    if (doc.data()) {
                        setCircumferenceWeightGraphPoints(doc.data().graph_points);
                    }
                    else {
                        setCircumferenceWeightGraphPoints([]);
                    }
                });
        }
        // eslint-disable-next-line
    }, [auth?.currentUser?.uid]);

    return (
        <Box
            bg={_screenBackground}
            height="90vh"
            width="100vw"
            overflowX="hidden"
        >
            <Box
                width="100vw"
                height="40vh"
                justifyContent="center"
                display="flex"
            >
                <HStack spacing={10}>
                    <VStack
                        h={450}
                    >
                        <VictoryChart
                            theme={VictoryTheme.material}
                        >
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
                                text="Weight"
                                style={{ fill: textColor }}
                            />
                        </VictoryChart>
                        <HStack>
                            <Button onClick={addWeightLengthPoint} isLoading={weightButtonIsLoading}>Plot W/L Point</Button>
                            <Button onClick={handleDeleteWLPoint} isLoading={deleteWLPointIsLoading}>Delete W/L Point</Button>
                        </HStack>
                    </VStack>
                    <VStack
                        h={450}
                    >
                        <VictoryChart
                            theme={VictoryTheme.material}
                        >
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
                                text="Weight"
                                style={{ fill: textColor }}

                            />
                        </VictoryChart>
                        <HStack>
                            <Button onClick={addCircumferenceWeightGraphPoint} isLoading={circumferenceButtonIsLoading}>Plot W/HC Point</Button>
                            <Button onClick={handleDeleteHWPoint} isLoading={deleteHCPointIsLoading}>Delete W/HC Point</Button>
                        </HStack>
                    </VStack>
                </HStack>
            </Box>
            <VStack
                justifyContent="space-between"
                w="90vw"
                alignItems="stretch"
                spacing="1.5"
                pl="2"
                pr="2"
            >
                <VStack alignItems="start">
                    <FormLabel>Date</FormLabel>
                    <DatePicker
                        customInput={<Input />}
                        selected={selectedDate}
                        onChange={handleSelectedDateChange}
                    />
                    <FormLabel htmlFor='age-months'>Age Months</FormLabel>
                    <HStack justifyContent="space-between">
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
                    </HStack>
                    <Checkbox
                        isChecked={allGraphPointsIsVisible}
                        onChange={handleShowAllGraphData}
                    >
                        Show All Graph Points
                    </Checkbox>
                </VStack>
                <FormLabel htmlFor='length'>Length</FormLabel>
                <NumberInput
                    min={1}
                    value={selectedLength}
                    onChange={value => setSelectedLength(value)}
                >
                    <NumberInputField
                        id="length"
                        placeholder="length"
                    />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
                <FormLabel htmlFor='weight'>Weight</FormLabel>
                <NumberInput
                    min={1}
                    value={selectedWeight}
                    onChange={value => setSelectedWeight(value)}
                >
                    <NumberInputField
                        id="weight"
                        placeholder="weight"
                    />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
                <FormLabel htmlFor='circumference'>Head Circumference</FormLabel>
                <NumberInput
                    min={1}
                    value={headCircumference}
                    onChange={value => setHeadCircumference(value)}
                >
                    <NumberInputField
                        id="circumference"
                        placeholder="head circumference"
                    />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
                <HStack bottom="0" position="fixed" justifyContent="space-between" w="85vw" pb="2">
                    <Button onClick={showGrowthChartDialog}>View Growth Chart</Button>
                    <Button onClick={() => setShowConversionDialog(true)}>Make Conversions</Button>
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
                            w="30vw"
                            display="flex"
                            flexDir="column"
                        >
                            <Image src={growthChartRelativePath} h="80vh" />
                            <Button
                                onClick={handleChangeGrowthChart}
                                bg={_screenBackground}
                                variant="unstyled"
                            >
                                Switch Chart
                            </Button>
                        </Box>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
            {/* Alert Dialog triggered for showing conversion chart */}
            <AlertDialog
                isOpen={showConversionDialog}
                onClose={() => setShowConversionDialog(false)}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <Heading size="lg">
                                Conversion
                            </Heading>
                        </AlertDialogHeader>
                        <AlertDialogCloseButton />
                        <AlertDialogBody>
                            <VStack pr="7" alignItems="start">
                                <VStack w="100%" alignItems='start'>
                                    <FormLabel>
                                        kg to lb
                                    </FormLabel>
                                    <FormLabel>lb</FormLabel>
                                    <NumberInput
                                        min={0}
                                        value={lbValue}
                                        onChange={valueString => setLbValue(valueString)}
                                    >
                                        <NumberInputField
                                            placeholder="lbs"
                                        />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                </VStack>
                                <VStack w="100%" alignItems='start'>
                                    <FormLabel>kg</FormLabel>
                                    <Input readOnly value={lbValue * 2.23} />
                                </VStack>
                                <FormLabel>
                                    inches to cm
                                </FormLabel>
                                <VStack w="100%" alignItems='start'>
                                    <FormLabel>in.</FormLabel>
                                    <NumberInput
                                        min={0}
                                        value={inValue}
                                        onChange={valueString => setInValue(valueString)}
                                    >
                                        <NumberInputField
                                            placeholder="in."
                                        />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                </VStack>
                                <VStack w="100%" alignItems='start'>
                                    <FormLabel>cm.</FormLabel>
                                    <Input readOnly value={inValue * 2.54} />
                                </VStack>
                            </VStack>
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <HStack>
                                <Button onClick={() => {
                                    setInValue(0);
                                    setLbValue(0);
                                }}>
                                    Clear
                                </Button>
                                <Button onClick={() => setShowConversionDialog(false)}>Close</Button>
                            </HStack>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </Box >
    );
}
