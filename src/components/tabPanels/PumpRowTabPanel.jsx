import { CloseIcon } from '@chakra-ui/icons';
import { Box, Card, CardBody, CardHeader, FormLabel, HStack, Heading, IconButton, Text } from '@chakra-ui/react';
import React from 'react';

export default function PumpRowTabPanel({ alias, index, timeStamp, leftBreastTime, rightBreastTime, data, setData }) {
    const handleDeleteRow = () => {
        const updatedArray = [...data];
        updatedArray.splice(index, 1);
        setData(updatedArray);
    };

    return (
        <Box>
            <Card>
                <CardHeader>
                    <HStack
                        bg="white"
                        w="90vw"
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
                        bg="white"
                        w="90vw"
                        justifyContent="space-between"
                    >
                        <Box>
                            <FormLabel>Submitted</FormLabel>
                            <Text>
                                {timeStamp}
                            </Text>
                        </Box>
                        <Box>
                            <FormLabel>Left Breast Time</FormLabel>
                            <Text>
                                {leftBreastTime}
                            </Text>
                        </Box>
                        <Box>
                            <FormLabel>Right Breast Time</FormLabel>
                            <Text>
                                {rightBreastTime}
                            </Text>
                        </Box>
                    </HStack>
                </CardBody>
            </Card>
        </Box>
    );
}
