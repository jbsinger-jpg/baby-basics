// Module imports
import { CloseIcon, TimeIcon } from '@chakra-ui/icons';
import { Box, Button, Card, CardBody, CardHeader, FormLabel, HStack, Heading, IconButton, Text, useColorModeValue } from '@chakra-ui/react';

// Relative imports
import { cardBackground } from '../../defaultStyle';
import { auth, firestore } from '../../firebaseConfig';
import { useState } from 'react';

export default function PumpRowTabPanel({ alias, index, timeStamp, leftBreastTime, rightBreastTime, data, setData, fluidOunces, selectedChildOption }) {
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
            .collection("pump-feed-tracking")
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

    return (
        <Box>
            <Card
                bg={_cardBackground}
                w="90vw"
            >
                <CardHeader>
                    <HStack
                        justifyContent="space-between"
                    >
                        <HStack alignSelf="start" justifyContent="flex-start">
                            <Heading size='md'>{alias}</Heading>
                            <IconButton
                                icon={<TimeIcon />}
                                onClick={convertTime}
                            />
                        </HStack>
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
                            <Text>
                                {fluidOunces}
                            </Text>
                        </Box>
                    </HStack>
                </CardBody>
            </Card>
        </Box>
    );
}
