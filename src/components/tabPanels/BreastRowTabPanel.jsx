import { CloseIcon, TimeIcon } from '@chakra-ui/icons';
import { Box, Card, CardBody, CardHeader, FormLabel, HStack, Heading, IconButton, Text, useColorModeValue, useMediaQuery } from '@chakra-ui/react';
import { cardBackground } from '../../defaultStyle';
import { auth, firestore } from '../../firebaseConfig';
import { useState } from 'react';

export default function BreastRowTabPanel({ leftBreastTime, rightBreastTime, alias, index, timeStamp, data, setData, selectedChildOption, selectedDateOption, fluidOunces }) {
    const _cardBackground = useColorModeValue(cardBackground.light, cardBackground.dark);
    const [rightTime, setRightTime] = useState(rightBreastTime);
    const [leftTime, setLeftTime] = useState(leftBreastTime);
    const [isTimeInMinutes, setIsTimeInMinutes] = useState(false);

    const handleDeleteRow = () => {
        const updatedArray = [...data];
        updatedArray.splice(index, 1);
        setData(updatedArray);

        firestore.collection("users")
            .doc(auth.currentUser.uid)
            .collection("children")
            .doc(selectedChildOption)
            .collection("breast-feed-tracking")
            .doc(alias)
            .delete();
    };

    const convertTime = () => {
        // if times are equal to the props passed assume that the time is in seconds
        // otherwise assume minute conversion has taken place

        if (rightTime === rightBreastTime && leftTime === leftBreastTime) {
            setRightTime(rightBreastTime / 60);
            setLeftTime(leftBreastTime / 60);
            setIsTimeInMinutes(true);

        }
        else {
            setRightTime(rightBreastTime);
            setLeftTime(leftBreastTime);
            setIsTimeInMinutes(false);
        }
    };

    const [isLargerThan1300] = useMediaQuery("(min-width: 1300px)");

    return (
        <Box>
            <Card
                bg={_cardBackground}
                w={isLargerThan1300 ? "90vw" : "60vw"}
            >
                <CardHeader>
                    <HStack
                        justifyContent="space-between"
                    >
                        <Box alignSelf="start" justifyContent="flex-start">
                            <HStack>
                                <Heading size='md'>{alias}</Heading>
                                <IconButton
                                    icon={<TimeIcon />}
                                    onClick={convertTime}
                                />
                            </HStack>
                        </Box>
                        <IconButton variant="unstyled" icon={<CloseIcon />} onClick={() => handleDeleteRow(index)} />
                    </HStack>
                </CardHeader>
                <CardBody>
                    <HStack
                        justifyContent="space-between"
                    >
                        <Box>
                            <FormLabel>Submitted</FormLabel>
                            <Text>
                                {timeStamp}
                            </Text>
                        </Box>
                        <Box>
                            <FormLabel>Left Breast {isTimeInMinutes ? "(min)" : "(sec)"}</FormLabel>
                            <Text>
                                {leftTime}
                            </Text>
                        </Box>
                        <Box>
                            <FormLabel>Right Breast {isTimeInMinutes ? "(min)" : "(sec)"}</FormLabel>
                            <Text>
                                {rightTime}
                            </Text>
                        </Box>
                        <Box>
                            <FormLabel>Fluid Ounces</FormLabel>
                            {fluidOunces}
                        </Box>
                    </HStack>
                </CardBody>
            </Card>
        </Box>
    );
}
