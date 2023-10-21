import React, { useEffect, useState } from 'react';
import { auth, firestore } from '../firebaseConfig';
import { VictoryAxis, VictoryChart, VictoryLabel, VictoryLine, VictoryScatter, VictoryTheme } from 'victory';
import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Checkbox, CheckboxGroup, FormLabel, HStack, Heading, Icon, Image, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Text, VStack, useColorModeValue } from '@chakra-ui/react';
import { InfoOutlineIcon } from '@chakra-ui/icons';
import StyledSelect from '../components/StyledSelect';
import { screenBackground } from '../defaultStyle';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function GrowthPage({ childOptions }) {
    const [selectedLength, setSelectedLength] = useState(1);
    const [selectedWeight, setSelectedWeight] = useState(1);
    const [headCircumference, setHeadCircumference] = useState(1);
    const [graphDialogIsOpen, setGraphDialogIsOpen] = useState(false);
    const [growthChartRelativePath, setGrowthChartRelativePath] = useState(require("../../src/components/staticPageData/growth-chart-for-girls.jpg"));
    const [allGraphPointsIsVisible, setAllGraphPointsIsVisible] = useState(true);

    const [weightButtonIsLoading, setWeightButtonIsLoading] = useState(false);
    const [circumferenceButtonIsLoading, setCircumferenceButtonIsLoading] = useState(false);
    const [lengthButtonIsLoading, setLengthButtonIsLoading] = useState(false);

    const [showConversionDialog, setShowConversionDialog] = useState(false);
    const [lbValue, setLbValue] = useState(0);
    const [inValue, setInValue] = useState(0);

    const [deleteHeadCircumferenceIsLoading, setDeleteHeadCircumferenceIsLoading] = useState(false);
    const [deleteWeightPointIsLoading, setDeleteWeightPointIsLoading] = useState(false);
    const [deleteLengthButtonIsLoading, setDeleteLengthButtonIsLoading] = useState(false);

    const [weightGraphPoints, setWeightGraphPoints] = useState([]);
    const [circumferenceGraphPoints, setCircumferenceGraphPoints] = useState([]);
    const [lengthGraphPoints, setLengthGraphPoints] = useState([]);

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedChildOption, setSelectedChildOption] = useState("");

    const [weeklyGraphPointsVisible, setWeeklyGraphPointsVisible] = useState(false);
    const [monthlyGraphPointsVisible, setMonthlyGraphPointsVisible] = useState(false);
    const [dailyGraphPointsVisible, setDailyGraphPointsVisible] = useState(false);
    const _screenBackground = useColorModeValue(screenBackground.light, screenBackground.dark);

    const [latestHCPointID, setLatestHCPointID] = useState(0);
    const [latestWeightID, setLatestWeightID] = useState(0);
    const [latestLengthID, setLatestLengthID] = useState(0);

    const getSortedPoints = (data) => {
        if (data && data.length) {
            return data.sort((a, b) => {
                return a.date.seconds - b.date.seconds;
            });
        }
        else {
            return [];
        }
    };

    const handleMonthlyGraphDataChange = (event) => {
        setMonthlyGraphPointsVisible(event.target.checked);
        if (event.target.checked) {
            setAllGraphPointsIsVisible(false);
            setWeeklyGraphPointsVisible(false);
            setDailyGraphPointsVisible(false);

            firestore
                .collection("users")
                .doc(auth?.currentUser?.uid)
                .collection("children")
                .doc(selectedChildOption)
                .collection("circumference-graph")
                .get()
                .then(snapshot => {
                    let newGraphPoints = [];
                    snapshot.docs.forEach(doc => {
                        if (new Date(doc.data().date.toDate()).getMonth() === new Date().getMonth()) {
                            newGraphPoints.push(doc.data());
                        }
                    });

                    setCircumferenceGraphPoints(newGraphPoints);
                });

            firestore
                .collection("users")
                .doc(auth?.currentUser?.uid)
                .collection("children")
                .doc(selectedChildOption)
                .collection("weight-graph")
                .get()
                .then(snapshot => {
                    let newGraphPoints = [];
                    snapshot.docs.forEach(doc => {
                        if (new Date(doc.data().date.toDate()).getMonth() === new Date().getMonth()) {
                            newGraphPoints.push(doc.data());
                        }
                    });

                    setWeightGraphPoints(newGraphPoints);
                });

            firestore
                .collection("users")
                .doc(auth?.currentUser?.uid)
                .collection("children")
                .doc(selectedChildOption)
                .collection("length-graph")
                .get()
                .then(snapshot => {
                    let newGraphPoints = [];
                    snapshot.docs.forEach(doc => {
                        if (new Date(doc.data().date.toDate()).getMonth() === new Date().getMonth()) {
                            newGraphPoints.push(doc.data());
                        }
                    });

                    setLengthGraphPoints(newGraphPoints);
                });
        }
    };

    const handleDailyGraphDataChange = async (event) => {
        setDailyGraphPointsVisible(event.target.checked);

        if (event.target.checked) {
            setAllGraphPointsIsVisible(false);
            setWeeklyGraphPointsVisible(false);
            setMonthlyGraphPointsVisible(false);

            await firestore
                .collection("users")
                .doc(auth?.currentUser?.uid)
                .collection("children")
                .doc(selectedChildOption)
                .collection("circumference-graph")
                .get()
                .then((snapshot) => {
                    let options = [];

                    snapshot.docs.forEach(doc => {
                        if (new Date(doc.data().date.toDate()).getDay() === new Date().getDay()) {
                            options.push(doc.data());
                        }
                    });

                    setCircumferenceGraphPoints(options);
                });

            await firestore
                .collection("users")
                .doc(auth?.currentUser?.uid)
                .collection("children")
                .doc(selectedChildOption)
                .collection("weight-graph")
                .doc(String(Number(latestWeightID)))
                .get()
                .then(doc => {
                    if (doc.data()) {
                        setWeightGraphPoints(doc.data());
                    }
                    else {
                        setWeightGraphPoints([]);
                    }
                });

            await firestore
                .collection("users")
                .doc(auth?.currentUser?.uid)
                .collection("children")
                .doc(selectedChildOption)
                .collection("length-graph")
                .doc(String(Number(latestLengthID)))
                .get()
                .then(doc => {
                    if (doc.data()) {
                        setLengthGraphPoints(doc.data());
                    }
                    else {
                        setLengthGraphPoints([]);
                    }
                });
        }
    };

    const getWeekFromDate = (dateStr1, dateStr2) => {
        const date1 = new Date(dateStr1);
        const date2 = new Date(dateStr2);
        const difference = Math.abs(date2 - date1);
        const weeks = Math.floor(difference / (1000 * 60 * 60 * 24 * 7));
        return Number(weeks);
    };

    const handleWeeklyGraphDataChange = (event) => {
        setWeeklyGraphPointsVisible(event.target.checked);
        if (event.target.checked) {
            setDailyGraphPointsVisible(false);
            setMonthlyGraphPointsVisible(false);
            setAllGraphPointsIsVisible(false);

            firestore
                .collection("users")
                .doc(auth?.currentUser?.uid)
                .collection("children")
                .doc(selectedChildOption)
                .collection("circumference-graph")
                .get()
                .then(snapshot => {
                    let newGraphPoints = [];
                    snapshot.docs.forEach(doc => {
                        let weekDifference = getWeekFromDate(new Date(), new Date(doc.data().date.toDate()));

                        if (!weekDifference) {
                            newGraphPoints.push(doc.data());
                        }
                    });

                    setCircumferenceGraphPoints(newGraphPoints);
                });

            firestore
                .collection("users")
                .doc(auth?.currentUser?.uid)
                .collection("children")
                .doc(selectedChildOption)
                .collection("weight-graph")
                .get()
                .then(snapshot => {
                    let newGraphPoints = [];
                    snapshot.docs.forEach(doc => {
                        let weekDifference = getWeekFromDate(new Date(), new Date(doc.data().date.toDate()));

                        if (!weekDifference) {
                            newGraphPoints.push(doc.data());
                        }
                    });

                    setWeightGraphPoints(newGraphPoints);
                });

            firestore
                .collection("users")
                .doc(auth?.currentUser?.uid)
                .collection("children")
                .doc(selectedChildOption)
                .collection("length-graph")
                .get()
                .then(snapshot => {
                    let newGraphPoints = [];
                    snapshot.docs.forEach(doc => {
                        let weekDifference = getWeekFromDate(new Date(), new Date(doc.data().date.toDate()));

                        if (!weekDifference) {
                            newGraphPoints.push(doc.data());
                        }
                    });
                    setLengthGraphPoints(newGraphPoints);
                });
        }
    };

    const handleSelectedDateChange = async (date) => {
        setSelectedDate(date);
    };

    const addWeightPoint = () => {
        setWeightButtonIsLoading(true);

        setAllGraphPointsIsVisible(false);
        setMonthlyGraphPointsVisible(false);
        setWeeklyGraphPointsVisible(false);
        setDailyGraphPointsVisible(true);

        let newGraphPoints = [
            ...weightGraphPoints,
            { x: new Date(selectedDate).toLocaleDateString(), y: Number(selectedWeight), date: new Date(selectedDate) }
        ];

        // Update both the front and backend whenever the button is pressed
        firestore
            .collection("users")
            .doc(auth?.currentUser?.uid)
            .collection("children")
            .doc(selectedChildOption)
            .collection("weight-graph")
            .doc(String(Number(latestWeightID)))
            .set({ x: new Date(selectedDate).toLocaleDateString(), y: Number(selectedWeight), date: new Date(selectedDate) })
            .then(() => {
                setLatestWeightID(latestWeightID + 1);
            })
            .finally(() => {
                setWeightButtonIsLoading(false);
            });

        setWeightGraphPoints(newGraphPoints);
    };
    // =========================================================================================
    // =========================================================================================
    // Head Circumference/Weight Graph
    // x = head circumference, y = weight
    const addCircumferenceGraphPoint = () => {
        setCircumferenceButtonIsLoading(true);

        setAllGraphPointsIsVisible(true);
        setMonthlyGraphPointsVisible(false);
        setWeeklyGraphPointsVisible(false);
        setDailyGraphPointsVisible(false);

        let newGraphPoints = [
            ...circumferenceGraphPoints,
            { x: new Date(selectedDate).toLocaleDateString(), y: Number(headCircumference), date: new Date(selectedDate) }
        ];

        // Update both the front and backend whenever the button is pressed
        firestore
            .collection("users")
            .doc(auth?.currentUser?.uid)
            .collection("children")
            .doc(selectedChildOption)
            .collection("circumference-graph")
            .doc(String(Number(latestHCPointID)))
            .set({ x: new Date(selectedDate).toLocaleDateString(), y: Number(headCircumference), date: new Date(selectedDate) })
            .then(() => {
                setLatestHCPointID(latestHCPointID + 1);
            })
            .finally(() => {
                setCircumferenceButtonIsLoading(false);
            });

        setCircumferenceGraphPoints(newGraphPoints);
    };
    // =========================================================================================
    // =========================================================================================
    const addLengthPoint = () => {
        setLengthButtonIsLoading(true);

        setAllGraphPointsIsVisible(false);
        setMonthlyGraphPointsVisible(false);
        setWeeklyGraphPointsVisible(false);
        setDailyGraphPointsVisible(true);

        let newGraphPoints = [
            ...lengthGraphPoints,
            { x: new Date(selectedDate).toLocaleDateString(), y: Number(selectedLength), date: new Date(selectedDate) }
        ];

        // Update both the front and backend whenever the button is pressed
        firestore
            .collection("users")
            .doc(auth?.currentUser?.uid)
            .collection("children")
            .doc(selectedChildOption)
            .collection("length-graph")
            .doc(String(Number(latestLengthID)))
            .set({ x: new Date(selectedDate).toLocaleDateString(), y: Number(selectedLength), date: new Date(selectedDate) })
            .then(() => {
                setLatestLengthID(latestLengthID + 1);
            })
            .finally(() => {
                setLengthButtonIsLoading(false);
            });

        setLengthGraphPoints(newGraphPoints);
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
            setMonthlyGraphPointsVisible(false);
            setWeeklyGraphPointsVisible(false);
            setDailyGraphPointsVisible(false);

            firestore
                .collection("users")
                .doc(auth?.currentUser?.uid)
                .collection("children")
                .doc(selectedChildOption)
                .collection("circumference-graph")
                .get()
                .then(snapshot => {
                    let newGraphPoints = [];
                    snapshot.docs.forEach(doc => {
                        newGraphPoints.push(doc.data());
                    });
                    setCircumferenceGraphPoints(newGraphPoints);
                });

            firestore
                .collection("users")
                .doc(auth?.currentUser?.uid)
                .collection("children")
                .doc(selectedChildOption)
                .collection("weight-graph")
                .get()
                .then(snapshot => {
                    let newGraphPoints = [];
                    snapshot.docs.forEach(doc => {
                        newGraphPoints.push(doc.data());
                    });
                    setWeightGraphPoints(newGraphPoints);
                });
        }
    };

    const handleDeleteHeightPoint = () => {
        setDeleteHeadCircumferenceIsLoading(true);

        if (circumferenceGraphPoints.length > 0) {
            const newCircumferencePoints = [...circumferenceGraphPoints];
            newCircumferencePoints.pop();
            setCircumferenceGraphPoints(newCircumferencePoints);
        }

        if (latestHCPointID - 1 >= 0) {
            firestore
                .collection("users")
                .doc(auth?.currentUser?.uid)
                .collection("children")
                .doc(selectedChildOption)
                .collection("circumference-graph")
                .doc(String(Number(latestHCPointID - 1)))
                .delete()
                .then(() => {
                    setLatestHCPointID(latestHCPointID - 1);
                })
                .finally(() => {
                    setDeleteHeadCircumferenceIsLoading(false);
                });
        }
        else {
            setDeleteHeadCircumferenceIsLoading(false);
        }
    };

    const handleDeleteWeightPoint = () => {
        setDeleteWeightPointIsLoading(true);

        if (weightGraphPoints.length > 0) {
            const newWeightPoints = [...weightGraphPoints];
            newWeightPoints.pop();
            setWeightGraphPoints(newWeightPoints);
        }

        if (latestWeightID - 1 >= 0) {
            firestore
                .collection("users")
                .doc(auth?.currentUser?.uid)
                .collection("children")
                .doc(selectedChildOption)
                .collection("weight-graph")
                .doc(String(Number(latestWeightID - 1)))
                .delete()
                .then(() => {
                    setLatestWeightID(latestWeightID - 1);
                })
                .finally(() => {
                    setDeleteWeightPointIsLoading(false);
                });
        }
        else {
            setDeleteWeightPointIsLoading(false);
        }
    };

    const handleDeleteLengthPoint = () => {
        setDeleteLengthButtonIsLoading(true);

        if (lengthGraphPoints.length > 0) {
            const newLengthPoints = [...lengthGraphPoints];
            newLengthPoints.pop();
            setLengthGraphPoints(newLengthPoints);
        }

        if (latestLengthID - 1 >= 0) {
            firestore
                .collection("users")
                .doc(auth?.currentUser?.uid)
                .collection("children")
                .doc(selectedChildOption)
                .collection("length-graph")
                .doc(String(Number(latestLengthID - 1)))
                .delete()
                .then(() => {
                    setLatestLengthID(latestLengthID - 1);
                })
                .finally(() => {
                    setDeleteLengthButtonIsLoading(false);
                });
        }
        else {
            setDeleteLengthButtonIsLoading(false);
        }
    };

    const handleSelectedChildChange = async (event) => {
        setSelectedChildOption(event.target.value);

        await firestore
            .collection("users")
            .doc(auth?.currentUser?.uid)
            .collection("children")
            .doc(event.target.value)
            .collection("circumference-graph")
            .get()
            .then(snapshot => {
                let options = [];

                snapshot.docs.forEach(doc => {
                    options.push(doc.data());
                });

                setCircumferenceGraphPoints(options);
            });

        await firestore
            .collection("users")
            .doc(auth?.currentUser?.uid)
            .collection("children")
            .doc(event.target.value)
            .collection("weight-graph")
            .get()
            .then(snapshot => {
                let options = [];
                snapshot.docs.forEach(doc => {
                    options.push(doc.data());
                });

                setWeightGraphPoints(options);
            });

        await firestore
            .collection("users")
            .doc(auth?.currentUser?.uid)
            .collection("children")
            .doc(event.target.value)
            .collection("length-graph")
            .get()
            .then(snapshot => {
                let options = [];
                snapshot.docs.forEach(doc => {
                    options.push(doc.data());
                });

                setLengthGraphPoints(options);
            });
    };

    const textColor = useColorModeValue("black", "white");

    const getUniquePoints = (graphPoints) => {
        let uniqueNewGraphPoints = [];

        if (graphPoints.length > 0) {
            uniqueNewGraphPoints = graphPoints.reduce((acc, curr) => {
                let isUnique = acc.every(item => (item.x !== curr.x || item.y !== curr.y));
                if (isUnique) {
                    acc.push(curr);
                }

                return acc;
            }, []);
        }


        return uniqueNewGraphPoints;
    };

    useEffect(() => {
        if (auth?.currentUser?.uid) {
            if (childOptions && childOptions.length) {
                setSelectedChildOption(childOptions[0].value);
                firestore.collection("users")
                    .doc(auth?.currentUser?.uid)
                    .collection("children")
                    .doc(childOptions[0].value)
                    .collection("weight-graph")
                    .get()
                    .then((snapshot) => {
                        let options = [];
                        let index = 0;

                        snapshot.docs.forEach(doc => {
                            options.push(doc.data());
                            index++;
                        });

                        setWeightGraphPoints(options);
                        setLatestWeightID(index);
                    });

                firestore.collection("users")
                    .doc(auth?.currentUser?.uid)
                    .collection("children")
                    .doc(childOptions[0].value)
                    .collection("circumference-graph")
                    .get()
                    .then((snapshot) => {
                        let options = [];
                        let index = 0;

                        snapshot.docs.forEach(doc => {
                            options.push(doc.data());
                            index++;
                        });

                        setCircumferenceGraphPoints(options);
                        setLatestHCPointID(index);
                    });
            }
            else {
                setSelectedChildOption("");
            }
        }
        // eslint-disable-next-line
    }, [auth?.currentUser?.uid, childOptions]);

    return (
        <>
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
                            <VictoryAxis 
                                fixLabelOverlap
                            />
                            <VictoryAxis
                                dependentAxis
                                fixLabelOverlap
                            />
                            {getUniquePoints(weightGraphPoints).length > 1 ?
                                <VictoryLine
                                    style={{
                                        data: { stroke: "#c43a31" },
                                        parent: { border: "1px solid #ccc" }
                                    }}
                                    data={getSortedPoints(weightGraphPoints)}
                                />
                                :
                                <VictoryScatter
                                    style={{
                                        data: { fill: "#c43a31" },
                                        parent: { border: "1px solid #ccc" },
                                    }}
                                    data={getSortedPoints(weightGraphPoints)}
                                    size={7}
                                />
                            }
                            <VictoryLabel
                                x={150}
                                y={325}
                                dy={10}
                                text="Weight"
                                style={{ fill: textColor }}
                            />
                        </VictoryChart>
                        {childOptions && childOptions.length ?
                            <HStack>
                                <Button onClick={addWeightPoint} isLoading={weightButtonIsLoading}>Plot Weight</Button>
                                <Button onClick={handleDeleteWeightPoint} isLoading={deleteWeightPointIsLoading}>Delete Weight</Button>
                            </HStack>
                            :
                            <HStack>
                                <Icon as={InfoOutlineIcon} />
                                <Text>
                                    Add a child to plot points!
                                </Text>
                            </HStack>
                        }
                    </VStack>
                    <VStack
                        h={450}
                    >
                        <VictoryChart
                            theme={VictoryTheme.material}
                        >
                            <VictoryAxis 
                                fixLabelOverlap
                            />
                            <VictoryAxis
                                dependentAxis
                                fixLabelOverlap
                            />
                            {getUniquePoints(circumferenceGraphPoints).length > 1 ?
                                <VictoryLine
                                    style={{
                                        data: { stroke: "#c43a31" },
                                        parent: { border: "1px solid #ccc" }
                                    }}
                                    data={getSortedPoints(circumferenceGraphPoints)}
                                />
                                :
                                <VictoryScatter
                                    style={{
                                        data: { fill: "#c43a31" },
                                        parent: { border: "1px solid #ccc" },
                                    }}
                                    data={getSortedPoints(circumferenceGraphPoints)}
                                    size={7}
                                />
                            }
                            <VictoryLabel
                                x={150}
                                y={325}
                                dy={10}
                                text="Circumference"
                                style={{ fill: textColor }}

                            />
                        </VictoryChart>
                        {childOptions && childOptions.length ?
                            <HStack>
                                <Button onClick={addCircumferenceGraphPoint} isLoading={circumferenceButtonIsLoading}>Plot Head Circumference</Button>
                                <Button onClick={handleDeleteHeightPoint} isLoading={deleteHeadCircumferenceIsLoading}>Delete Head Circumference</Button>
                            </HStack>
                            :
                            <HStack>
                                <Icon as={InfoOutlineIcon} />
                                <Text>
                                    Add a child to plot points!
                                </Text>
                            </HStack>
                        }
                    </VStack>
                    <VStack
                        h={450}
                    >
                        <VictoryChart
                            theme={VictoryTheme.material}
                        >
                            <VictoryAxis 
                                fixLabelOverlap
                            />
                            <VictoryAxis
                                dependentAxis
                                fixLabelOverlap
                            />
                            {getUniquePoints(lengthGraphPoints).length > 1 ?
                                <VictoryLine
                                    style={{
                                        data: { stroke: "#c43a31" },
                                        parent: { border: "1px solid #ccc" }
                                    }}
                                    data={getSortedPoints(lengthGraphPoints)}
                                />
                                :
                                <VictoryScatter
                                    style={{
                                        data: { fill: "#c43a31" },
                                        parent: { border: "1px solid #ccc" },
                                    }}
                                    data={getSortedPoints(lengthGraphPoints)}
                                    size={7}
                                />
                            }
                            <VictoryLabel
                                x={150}
                                y={325}
                                dy={10}
                                text="Length"
                                style={{ fill: textColor }}
                            />
                        </VictoryChart>
                        {childOptions && childOptions.length ?
                            <HStack>
                                <Button onClick={addLengthPoint} isLoading={lengthButtonIsLoading}>Plot Length</Button>
                                <Button onClick={handleDeleteLengthPoint} isLoading={deleteLengthButtonIsLoading}>Delete Length</Button>
                            </HStack>
                            :
                            <HStack>
                                <Icon as={InfoOutlineIcon} />
                                <Text>
                                    Add a child to plot points!
                                </Text>
                            </HStack>
                        }
                    </VStack>
                </HStack>
            </Box>
            <VStack
                justifyContent="space-between"
                w="90vw"
                alignItems="stretch"
                spacing="1"
                pl="2"
                pr="2"
            >
                <VStack alignItems="start">
                    <FormLabel>Date</FormLabel>
                    <HStack>
                        <DatePicker
                            disabled={!childOptions?.length}
                            customInput={<Input />}
                            selected={selectedDate}
                            onChange={handleSelectedDateChange}
                        />
                    </HStack>
                    <FormLabel>Child</FormLabel>
                    <StyledSelect
                        removeNullOption
                        options={childOptions}
                        value={selectedChildOption}
                        onChange={handleSelectedChildChange}
                        isDisabled={!childOptions?.length}
                    />
                    <HStack>
                        <CheckboxGroup>
                            <Checkbox
                                isChecked={allGraphPointsIsVisible}
                                onChange={handleShowAllGraphData}
                                isDisabled={!childOptions?.length}
                            >
                                Show All Graph Points
                            </Checkbox>
                            <Checkbox
                                isChecked={monthlyGraphPointsVisible}
                                onChange={handleMonthlyGraphDataChange}
                                isDisabled={!childOptions?.length}
                            >
                                Show Monthly Graph Points
                            </Checkbox>
                            <Checkbox
                                isChecked={weeklyGraphPointsVisible}
                                onChange={handleWeeklyGraphDataChange}
                                isDisabled={!childOptions?.length}
                            >
                                Show Weekly Graph Points
                            </Checkbox>
                            <Checkbox
                                isChecked={dailyGraphPointsVisible}
                                onChange={handleDailyGraphDataChange}
                                isDisabled={!childOptions?.length}
                            >
                                Show Daily Graph Points
                            </Checkbox>
                        </CheckboxGroup>
                    </HStack>
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
        </>);
}
