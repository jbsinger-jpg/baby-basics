import { ChevronDownIcon, ChevronUpIcon, CloseIcon } from '@chakra-ui/icons';
import { Box, Card, CardBody, CardHeader, Collapse, FormLabel, HStack, Heading, IconButton, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { auth, firestore } from '../../firebaseConfig';

const ColorCircle = ({ color }) => {
    return (
        <Box h="30px" w="30px" bg={color} borderColor="black" border="1px" borderRadius={"50%"}></Box>
    );
};

export default function PooTabPanel({ setData, data, index, notes, color, consistency, timeStampDate, alias, description, colorStatus, consistencyStatus }) {
    const [showAllNotes, setShowAllNotes] = useState(false);
    const [showDescription, setShowDescription] = useState(false);

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

    const handleDescriptionToggle = () => {
        setShowDescription(!showDescription);
    };

    const getDescriptionIconFromToggle = () => {
        if (!showDescription) {
            return <ChevronDownIcon />;
        }
        else {
            return <ChevronUpIcon />;
        }
    };

    const handleDeleteRow = (index) => {
        firestore.collection("users").doc(auth?.currentUser?.uid).collection("poo-tracking").doc(alias).delete();
        const updatedArray = [...data];
        updatedArray.splice(index, 1);
        setData(updatedArray);
    };

    console.log(colorStatus, consistencyStatus);

    return (
        <Card>
            <CardHeader>
                <HStack
                    w="90vw"
                    justifyContent="space-between"
                >
                    <VStack>
                        <Box alignSelf="start" justifyContent="flex-start">
                            <Heading size='md'>{alias}</Heading>
                        </Box>
                        <Text>
                            Status: {colorStatus} {consistencyStatus}
                        </Text>
                    </VStack>
                    <IconButton variant="unstyled" icon={<CloseIcon />} onClick={() => handleDeleteRow(index)} />
                </HStack>
            </CardHeader>
            <CardBody>
                <VStack>
                    <HStack
                        w="90vw"
                    >
                        <HStack alignItems="flex-start" spacing="5">
                            <Box>
                                <FormLabel>Color</FormLabel>
                                {color !== "none" ? <ColorCircle color={color} /> : color}
                            </Box>
                            <Box alignItems="center" display="flex" flexDir="column">
                                <FormLabel>Consistency</FormLabel>
                                <Text>
                                    {consistency}
                                </Text>
                            </Box>
                            <Box alignItems="center" display="flex" flexDir="column">
                                <FormLabel>Time Stamp</FormLabel>
                                <Text>
                                    {timeStampDate}
                                </Text>
                            </Box>
                            <Box alignItems="start" display="flex" flexDir="column" justifyContent="center">
                                <HStack spacing="-1" justifyContent="center" alignItems="start">
                                    <FormLabel>Description</FormLabel>
                                    <IconButton onClick={handleDescriptionToggle} icon={getDescriptionIconFromToggle()} variant="unstyled" h="10px" />
                                </HStack>
                                <HStack>
                                    <Collapse in={showDescription} animateOpacity>
                                        <Box
                                            whiteSpace="pre-wrap"
                                            bg="blackAlpha.200"
                                            p="5"
                                            borderRadius={"1%"}
                                            w="30vw"
                                        >
                                            {description}
                                        </Box>
                                    </Collapse>
                                </HStack>
                            </Box>
                        </HStack>
                    </HStack>
                    <HStack
                        w="90vw"
                        justifyContent="space-between"
                    >
                        <HStack spacing="-1" justifyContent="center" alignItems="end">
                            <FormLabel>Notes</FormLabel>
                            <IconButton onClick={handleToggle} icon={getIconFromToggle()} variant="unstyled" />
                        </HStack>
                    </HStack>
                    <Box>
                        <Collapse in={showAllNotes} animateOpacity>
                            <Box
                                whiteSpace="pre-wrap"
                                bg="blackAlpha.200"
                                p="5"
                                borderRadius={"1%"}
                                w="90vw"
                            >
                                {notes}
                            </Box>
                        </Collapse>
                    </Box>
                </VStack >
            </CardBody >
        </Card >
    );
};
