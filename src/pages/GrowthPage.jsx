import React, { useEffect, useState } from 'react';
import { VictoryAxis, VictoryBar, VictoryChart, VictoryLabel, VictoryLine, VictoryScatter, VictoryTheme } from 'victory';
import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Checkbox, CheckboxGroup, FormLabel, HStack, Heading, Icon, Image, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Spinner, Text, VStack, useColorModeValue, useMediaQuery } from '@chakra-ui/react';
import { InfoOutlineIcon } from '@chakra-ui/icons';
import DatePicker from "react-datepicker";

import StyledSelect from '../components/StyledSelect';
import { screenBackground } from '../defaultStyle';
import "react-datepicker/dist/react-datepicker.css";
import MotionButton from '../components/animated/MotionButton';
import MotionContainer from '../components/animated/MotionContainer';
import { auth, firestore } from '../firebaseConfig';

export default function GrowthPage({ childOptions }) {
    const CHART_ENUMS = { 
        LENGTH: "length",
        WEIGHT: "weight", 
        HEIGHT: "height" 
    };

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

    const [chartsAreLoading, setChartsAreLoading] = useState(false);
    const [barGraphIsVisible, setBarGraphIsVisible] = useState(false);
    const [buttonPressed, setButtonPressed] = useState(true);

    const [selectedChartOption, setSelectedChartOption] = useState(CHART_ENUMS.LENGTH);

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
    const formatGraphPoints = (points) => {
        // Step 1: Keep count of entries with duplicate x keys
        let counts = {};
        let graphPointsWithCount = points.map((point) => {
            let key = point.x + "_" + point.y;
            counts[key] = counts[key] ? counts[key] + 1 : 1;
            return { ...point, count: counts[key] };
        });

        // Step 2: Get only unique entries and make sure the object with the highest count is kept
        let uniqueNewGraphPoints = graphPointsWithCount.reduce((acc, curr) => {
            let existing = acc.find(item => (item.x === curr.x && item.y === curr.y));
            if (existing) {
                existing.count = Math.max(existing.count, curr.count);
            } else {
                acc.push(curr);
            }
            return acc;
        }, []);

        return uniqueNewGraphPoints;
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

    const getWeekFromDate = (date) => {
        const startDate = new Date(date.getFullYear(), 0, 1);
        const days = Math.floor((date - startDate) / (24 * 60 * 60 * 1000));
        const weekNumber = Number(Math.ceil(days / 7));
        return weekNumber;
    };

    const getIsSameWeekFromDate = (date1, date2) => {
        const _date1 = new Date(date1);
        const _date2 = new Date(date2);

        const weekNumber1 = getWeekFromDate(_date1);
        const weekNumber2 = getWeekFromDate(_date2);

        return Boolean(Number(weekNumber1) - Number(weekNumber2));
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
                        let weekDifference = getIsSameWeekFromDate(selectedDate, new Date(doc.data().date.toDate()));

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
                        let weekDifference = getIsSameWeekFromDate(selectedDate, new Date(doc.data().date.toDate()));

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
                        let weekDifference = getIsSameWeekFromDate(selectedDate, new Date(doc.data().date.toDate()));

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

    const formatBarData = (data) => {
        let uniqueData = {};
        const dataCopy = [...data];

        // format the bar graph to have x: sleep hours, y: frequency
        for (let i = 0; i < dataCopy.length; i++) {
            let tempY = dataCopy[i].y;
            dataCopy[i].y = dataCopy[i].count;
            dataCopy[i].x = tempY;
        }

        dataCopy.forEach(item => {
            if (uniqueData[item.x]) {
                uniqueData[item.x].y += item.count;
            }
            else {
                uniqueData[item.x] = { ...item };
            }
        });

        let resultArray = Object.values(uniqueData);
        return resultArray;
    };

    const showBarGraphs = () => {
        setBarGraphIsVisible(!barGraphIsVisible);
        setButtonPressed(true);
    };

    const [isLargerThan1300] = useMediaQuery("(min-width: 1300px)");

    const handleViewPortGraphButtonPress = () => {
        if (selectedChartOption === CHART_ENUMS.LENGTH) {
            setSelectedChartOption(CHART_ENUMS.WEIGHT);
        }
        else if (selectedChartOption === CHART_ENUMS.WEIGHT) {
            setSelectedChartOption(CHART_ENUMS.HEIGHT);
        }
        else if (selectedChartOption === CHART_ENUMS.HEIGHT) {
            setSelectedChartOption(CHART_ENUMS.LENGTH);
        }
    }

    // TODO: If the page sets isLargerThan1300 to false, then render the VictoryCharts to be 
    // conditionally rendered similar to what we have for the milestone page.

    useEffect(() => {
        setChartsAreLoading(true);

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
                        setChartsAreLoading(false);
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
                {chartsAreLoading ?
                    <Spinner />
                    :
                    <>
                        {isLargerThan1300 ? 
                            <HStack spacing={10}>
                                <VStack
                                    h={450}
                                >
                                    <MotionContainer
                                        isPressed={buttonPressed}
                                        setIsPressed={setButtonPressed}
                                    >
                                        <VictoryChart
                                            theme={VictoryTheme.material}
                                            domainPadding={14}
                                        >
                                            <VictoryAxis
                                                fixLabelOverlap
                                                label={barGraphIsVisible ? "Weight" : "Date"}
                                                axisLabelComponent={<VictoryLabel dy={20} style={{ fontSize: 15, fill: textColor }} />}
                                            />
                                            <VictoryAxis
                                                dependentAxis
                                                fixLabelOverlap
                                                label={barGraphIsVisible ? "Quantity" : "Weight"}
                                                axisLabelComponent={<VictoryLabel dy={-30} style={{ fontSize: 15, fill: textColor }} />}
                                            />
                                            {barGraphIsVisible &&
                                                <VictoryBar
                                                    data={formatBarData(formatGraphPoints(getSortedPoints(weightGraphPoints)))}
                                                />
                                            }
                                            {(getUniquePoints(weightGraphPoints).length > 1 && !barGraphIsVisible) &&
                                                <VictoryLine
                                                    style={{
                                                        data: { stroke: "#c43a31" },
                                                        parent: { border: "1px solid #ccc" }
                                                    }}
                                                    data={getSortedPoints(weightGraphPoints)}
                                                />
                                            }
                                            {(getUniquePoints(weightGraphPoints).length <= 1 && !barGraphIsVisible) &&
                                                <VictoryScatter
                                                    style={{
                                                        data: { fill: "#c43a31" },
                                                        parent: { border: "1px solid #ccc" },
                                                    }}
                                                    data={getSortedPoints(weightGraphPoints)}
                                                    size={7}
                                                />
                                            }
                                        </VictoryChart>
                                    </MotionContainer>
                                    {childOptions && childOptions.length ?
                                        <HStack>
                                            <MotionButton
                                                onClick={addWeightPoint}
                                                isLoading={weightButtonIsLoading}
                                                title="Plot Weight"
                                            />
                                            <MotionButton
                                                onClick={handleDeleteWeightPoint}
                                                isLoading={deleteWeightPointIsLoading}
                                                title="Delete Weight"
                                            />
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
                                    <MotionContainer
                                        isPressed={buttonPressed}
                                        setIsPressed={setButtonPressed}
                                    >
                                        <VictoryChart
                                            theme={VictoryTheme.material}
                                            domainPadding={14}
                                        >
                                            <VictoryAxis
                                                fixLabelOverlap
                                                label={barGraphIsVisible ? "Circumference" : "Date"}
                                                axisLabelComponent={<VictoryLabel dy={20} style={{ fontSize: 15, fill: textColor }} />}
                                            />
                                            <VictoryAxis
                                                dependentAxis
                                                fixLabelOverlap
                                                label={barGraphIsVisible ? "Quantity" : "Circumference"}
                                                axisLabelComponent={<VictoryLabel dy={-30} style={{ fontSize: 15, fill: textColor }} />}
                                            />
                                            {barGraphIsVisible &&
                                                <VictoryBar
                                                    data={formatBarData(formatGraphPoints(getSortedPoints(circumferenceGraphPoints)))}
                                                />
                                            }
                                            {(getUniquePoints(circumferenceGraphPoints).length > 1 && !barGraphIsVisible) &&
                                                <VictoryLine
                                                    style={{
                                                        data: { stroke: "#c43a31" },
                                                        parent: { border: "1px solid #ccc" }
                                                    }}
                                                    data={getSortedPoints(circumferenceGraphPoints)}
                                                />
                                            }
                                            {(getUniquePoints(circumferenceGraphPoints).length <= 1 && !barGraphIsVisible) &&
                                                <VictoryScatter
                                                    style={{
                                                        data: { fill: "#c43a31" },
                                                        parent: { border: "1px solid #ccc" },
                                                    }}
                                                    data={getSortedPoints(circumferenceGraphPoints)}
                                                    size={7}
                                                />
                                            }
                                        </VictoryChart>
                                    </MotionContainer>
                                    {childOptions && childOptions.length ?
                                        <HStack>
                                            <MotionButton
                                                onClick={addCircumferenceGraphPoint}
                                                isLoading={circumferenceButtonIsLoading}
                                                title="Plot Head Circumference"
                                            />
                                            <MotionButton
                                                onClick={handleDeleteHeightPoint}
                                                isLoading={deleteHeadCircumferenceIsLoading}
                                                title="Delete Head Circumference"
                                            />
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
                                    <MotionContainer
                                        isPressed={buttonPressed}
                                        setIsPressed={setButtonPressed}
                                    >
                                        <VictoryChart
                                            theme={VictoryTheme.material}
                                            domainPadding={14}
                                        >
                                            <VictoryAxis
                                                fixLabelOverlap
                                                label={barGraphIsVisible ? "Length" : "Date"}
                                                axisLabelComponent={<VictoryLabel dy={20} style={{ fontSize: 15, fill: textColor }} />}
                                            />
                                            <VictoryAxis
                                                dependentAxis
                                                fixLabelOverlap
                                                label={barGraphIsVisible ? "Quantity" : "Length"}
                                                axisLabelComponent={<VictoryLabel dy={-30} style={{ fontSize: 15, fill: textColor }} />}
                                            />
                                            {barGraphIsVisible &&
                                                <VictoryBar
                                                    data={formatBarData(formatGraphPoints(getSortedPoints(lengthGraphPoints)))}
                                                />
                                            }
                                            {(getUniquePoints(lengthGraphPoints).length > 1 && !barGraphIsVisible) &&
                                                <VictoryLine
                                                    style={{
                                                        data: { stroke: "#c43a31" },
                                                        parent: { border: "1px solid #ccc" }
                                                    }}
                                                    data={getSortedPoints(lengthGraphPoints)}
                                                />
                                            }
                                            {(getUniquePoints(lengthGraphPoints).length <= 1 && !barGraphIsVisible) &&
                                                <VictoryScatter
                                                    style={{
                                                        data: { fill: "#c43a31" },
                                                        parent: { border: "1px solid #ccc" },
                                                    }}
                                                    data={getSortedPoints(lengthGraphPoints)}
                                                    size={7}
                                                />
                                            }
                                        </VictoryChart>
                                    </MotionContainer>
                                    {childOptions && childOptions.length ?
                                        <HStack>
                                            <MotionButton
                                                onClick={addLengthPoint}
                                                isLoading={lengthButtonIsLoading}
                                                title="Plot Length"
                                            />
                                            <MotionButton
                                                onClick={handleDeleteLengthPoint}
                                                isLoading={deleteLengthButtonIsLoading}
                                                title="Delete Length"
                                            />
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
                            :
                            <HStack
                                justifyContent={"space-between"}
                                w="90vw"
                            >
                                <Button onClick={handleViewPortGraphButtonPress}>
                                    Toggle
                                </Button>
                                {selectedChartOption === CHART_ENUMS.LENGTH && 
                                    <VStack
                                        h={450}
                                    >
                                        <MotionContainer
                                            isPressed={buttonPressed}
                                            setIsPressed={setButtonPressed}
                                        >
                                            <VictoryChart
                                                theme={VictoryTheme.material}
                                                domainPadding={14}
                                            >
                                                <VictoryAxis
                                                    fixLabelOverlap
                                                    label={barGraphIsVisible ? "Length" : "Date"}
                                                    axisLabelComponent={<VictoryLabel dy={20} style={{ fontSize: 15, fill: textColor }} />}
                                                />
                                                <VictoryAxis
                                                    dependentAxis
                                                    fixLabelOverlap
                                                    label={barGraphIsVisible ? "Quantity" : "Length"}
                                                    axisLabelComponent={<VictoryLabel dy={-30} style={{ fontSize: 15, fill: textColor }} />}
                                                />
                                                {barGraphIsVisible &&
                                                    <VictoryBar
                                                        data={formatBarData(formatGraphPoints(getSortedPoints(lengthGraphPoints)))}
                                                    />
                                                }
                                                {(getUniquePoints(lengthGraphPoints).length > 1 && !barGraphIsVisible) &&
                                                    <VictoryLine
                                                        style={{
                                                            data: { stroke: "#c43a31" },
                                                            parent: { border: "1px solid #ccc" }
                                                        }}
                                                        data={getSortedPoints(lengthGraphPoints)}
                                                    />
                                                }
                                                {(getUniquePoints(lengthGraphPoints).length <= 1 && !barGraphIsVisible) &&
                                                    <VictoryScatter
                                                        style={{
                                                            data: { fill: "#c43a31" },
                                                            parent: { border: "1px solid #ccc" },
                                                        }}
                                                        data={getSortedPoints(lengthGraphPoints)}
                                                        size={7}
                                                    />
                                                }
                                            </VictoryChart>
                                        </MotionContainer>
                                        {childOptions && childOptions.length ?
                                            <HStack>
                                                <MotionButton
                                                    onClick={addLengthPoint}
                                                    isLoading={lengthButtonIsLoading}
                                                    title="Plot Length"
                                                />
                                                <MotionButton
                                                    onClick={handleDeleteLengthPoint}
                                                    isLoading={deleteLengthButtonIsLoading}
                                                    title="Delete Length"
                                                />
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
                                }
                                <Button onClick={handleViewPortGraphButtonPress}>
                                    Toggle
                                </Button>
                            </HStack>
                        }
                    </>

                }
            </Box>
            <VStack
                justifyContent="space-between"
                w="90vw"
                alignItems="stretch"
                pl="2"
                pr="2"
                spacing={{ base: "-1", sm: "-1", md: "0.5", lg: "1" }}
            >
                <VStack 
                    alignItems="start" 
                >
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
                    <MotionButton
                        onClick={showGrowthChartDialog}
                        title="View Growth Chart"
                        noWidth
                    />
                    <MotionButton
                        onClick={() => setShowConversionDialog(true)}
                        title="Make Conversions"
                        noWidth
                    />
                    <MotionButton
                        onClick={showBarGraphs}
                        title="Show Bar Graphs"
                        noWidth
                    />
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
        </>
    );
}
