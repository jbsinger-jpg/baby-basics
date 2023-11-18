import { CloseIcon } from '@chakra-ui/icons';
import { Box, Card, CardBody, CardHeader, FormLabel, HStack, Heading, IconButton, Text, useColorModeValue, useMediaQuery } from '@chakra-ui/react';
import React from 'react';
import { cardBackground } from '../../defaultStyle';
import { auth, firestore } from '../../firebaseConfig';

export default function BottleTabPanel({ data, setData, index, alias, timeStamp, fluidOunces, selectedChildOption, selectedDateOption }) {
    const _cardBackground = useColorModeValue(cardBackground.light, cardBackground.dark);
    const [isLargerThan1300] = useMediaQuery("(min-width: 1300px)");

    const handleDeleteRow = () => {
        const updatedArray = [...data];
        updatedArray.splice(index, 1);
        setData(updatedArray);

        firestore.collection("users")
            .doc(auth.currentUser.uid)
            .collection("children")
            .doc(selectedChildOption)
            .collection("dates")
            .doc(selectedDateOption)
            .collection("bottle-feed-tracking")
            .doc(alias)
            .delete();
    };

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
                            <Heading size='md'>{alias}</Heading>
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
