import { Box, Button, FormLabel, HStack, Icon, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Text, VStack, useColorModeValue } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { VictoryChart, VictoryLabel, VictoryScatter, VictoryTheme } from 'victory';
import { InfoOutlineIcon } from '@chakra-ui/icons';
import { auth, firestore } from '../firebaseConfig';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import StyledSelect from '../components/StyledSelect';

export default function SleepPage({ childOptions }) {
    const textColor = useColorModeValue("black", "white");

    const [buttonIsLoading, setButtonIsLoading] = useState(false);
    const [deletePointButttonIsLoading, setDeletePointButttonIsLoading] = useState(false);

    const [selectedChildOption, setSelectedChildOption] = useState("");
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedSleepHrs, setSelectedSleepHrs] = useState(1);

    const [sleepPoints, setSleepPoints] = useState([]);
    const [latestSleepID, setLatestSleepID] = useState(0);

    const handleSelectedDateChange = async (date) => {
        setSelectedDate(date);
    };

    const handleSelectedChildChange = async (event) => {
        setSelectedChildOption(event.target.value);
    };

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

    const addPoint = () => {
        setButtonIsLoading(true);

        let newGraphPoints = [
            ...sleepPoints,
            { x: new Date(selectedDate).toLocaleDateString(), y: Number(selectedSleepHrs), date: new Date(selectedDate) }
        ];

        // Update both the front and backend whenever the button is pressed
        firestore
            .collection("users")
            .doc(auth?.currentUser?.uid)
            .collection("children")
            .doc(selectedChildOption)
            .collection("sleep-graph")
            .doc(String(Number(latestSleepID)))
            .set({ x: new Date(selectedDate).toLocaleDateString(), y: Number(selectedSleepHrs), date: new Date(selectedDate) })
            .then(() => {
                setLatestSleepID(latestSleepID + 1);
            })
            .finally(() => {
                setButtonIsLoading(false);
            });

        setSleepPoints(newGraphPoints);
    };

    const handleDeletePoint = () => {
        setDeletePointButttonIsLoading(true);

        const newSleepPoints = [...sleepPoints];
        newSleepPoints.pop();
        setSleepPoints(newSleepPoints);

        if ((latestSleepID - 1) >= 0) {
            firestore
                .collection("users")
                .doc(auth?.currentUser?.uid)
                .collection("children")
                .doc(selectedChildOption)
                .collection("sleep-graph")
                .doc(String(Number(latestSleepID - 1)))
                .delete()
                .then(() => {
                    setLatestSleepID(latestSleepID - 1);
                })
                .finally(() => {
                    setDeletePointButttonIsLoading(false);
                });
        }
        else {
            setDeletePointButttonIsLoading(false);
        }
    };

    useEffect(() => {
        if (auth?.currentUser?.uid && childOptions && childOptions.length) {
            setSelectedChildOption(childOptions[0].value);
            firestore.collection("users")
                .doc(auth?.currentUser?.uid)
                .collection("children")
                .doc(childOptions[0].value)
                .collection("sleep-graph")
                .get()
                .then((snapshot) => {
                    let options = [];
                    let index = 0;

                    snapshot.docs.forEach(doc => {
                        options.push(doc.data());
                        index++;
                    });

                    setSleepPoints(options);
                    setLatestSleepID(index);
                });
        }
        else {
            setSelectedChildOption("");
        }

        // eslint-disable-next-line
    }, [auth?.currentUser?.uid, childOptions]);

    const formatSleepPoints = (points) => {
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

        console.log(uniqueNewGraphPoints);

        return uniqueNewGraphPoints;
    };

    return (
        <>
            <Box
                width="100vw"
                height="55vh"
            >
                <HStack
                    spacing={10}
                >
                    <VStack
                        h={450}
                        w="100vw"
                        alignContent="center"
                        justifyContent="center"
                    >
                        <VictoryChart
                            theme={VictoryTheme.material}
                        >
                            <VictoryScatter
                                style={{
                                    data: { fill: "#c43a31" },
                                    parent: { border: "1px solid #ccc" },
                                    labels: { fill: "white", fontSize: 18, }
                                }}
                                size={7}
                                data={formatSleepPoints(getSortedPoints(sleepPoints))}
                                labels={({ datum }) => datum.count}
                            >
                            </VictoryScatter>
                            <VictoryLabel
                                x={150}
                                y={325}
                                dy={10}
                                text="Sleep (hrs)"
                                style={{ fill: textColor }}
                            />
                        </VictoryChart>
                        {childOptions && childOptions.length ?
                            <HStack>
                                <Button onClick={addPoint} isLoading={buttonIsLoading}>Plot Sleep</Button>
                                <Button onClick={handleDeletePoint} isLoading={deletePointButttonIsLoading}>Delete Sleep</Button>
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
                p="2"
                position="fixed"
                bottom="0"
                left="0"
            >
                <VStack
                    alignItems="start"
                >
                    <HStack>
                        <VStack
                            alignItems="start"
                        >
                            <FormLabel>Date</FormLabel>
                            <DatePicker
                                disabled={!childOptions?.length}
                                customInput={<Input />}
                                selected={selectedDate}
                                onChange={handleSelectedDateChange}
                            />
                        </VStack>
                        <VStack
                            alignItems="start"
                        >
                            <FormLabel>Sleep Hours</FormLabel>
                            <NumberInput
                                min={1}
                                value={selectedSleepHrs}
                                onChange={value => setSelectedSleepHrs(value)}
                            >
                                <NumberInputField
                                    placeholder="sleep-hrs"
                                />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </VStack>
                    </HStack>
                    <FormLabel>Child</FormLabel>
                    <StyledSelect
                        removeNullOption
                        options={childOptions}
                        value={selectedChildOption}
                        onChange={handleSelectedChildChange}
                        isDisabled={!childOptions?.length}
                    />
                </VStack>
            </VStack>
        </>
    );
}
