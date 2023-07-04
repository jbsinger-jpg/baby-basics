import { ChevronDownIcon, ChevronUpIcon, CloseIcon } from '@chakra-ui/icons';
import { Box, Card, CardBody, CardHeader, Collapse, FormLabel, HStack, Heading, IconButton, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';

export default function PooTabPanel({ setTempData, tempData, index, notes, color, consistency, timeStamp, alias }) {
    const [showAllNotes, setShowAllNotes] = useState(false);
    const handleToggle = () => {
        setShowAllNotes(!showAllNotes);
    };

    const getIconFromToggle = () => {
        if (!showAllNotes) {
            return <ChevronDownIcon />;
        }
        else {
            return <ChevronUpIcon />;
        }
    };

    const handleDeleteRow = (index) => {
        const updatedArray = [...tempData];
        updatedArray.splice(index, 1);
        setTempData(updatedArray);
    };

    return (
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
                <VStack>
                    <HStack
                        bg="white"
                        w="90vw"
                        justifyContent="space-between"
                    >
                        <Box>
                            <FormLabel>Color</FormLabel>
                            <Text>
                                {color}
                            </Text>
                        </Box>
                        <Box>
                            <FormLabel>Consistency</FormLabel>
                            <Text>
                                {consistency}
                            </Text>
                        </Box>
                    </HStack>
                    <HStack
                        bg="white"
                        w="90vw"
                        justifyContent="space-between"
                    >
                        <HStack spacing="-1" justifyContent="center" alignItems="end">
                            <FormLabel>Notes</FormLabel>
                            <IconButton onClick={handleToggle} icon={getIconFromToggle()} variant="unstyled" />
                        </HStack>
                        <Box>
                            <FormLabel>Time Stamp</FormLabel>
                            <Text>
                                {timeStamp}
                            </Text>
                        </Box>
                    </HStack>
                    <Box>
                        <Collapse in={showAllNotes} animateOpacity>
                            <Box
                                w="90vw"
                                whiteSpace="pre-wrap"
                            >
                                {notes}
                            </Box>
                        </Collapse>
                    </Box>
                </VStack>
            </CardBody>
        </Card>
    );
};
