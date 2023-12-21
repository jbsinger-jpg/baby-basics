import { CheckCircleIcon, ChevronDownIcon, ChevronUpIcon, CloseIcon, InfoOutlineIcon, NotAllowedIcon } from '@chakra-ui/icons';
import { Box, Card, CardBody, CardHeader, Collapse, FormLabel, HStack, Heading, IconButton, Text, Tooltip, VStack, useMediaQuery } from '@chakra-ui/react';
import React, { useState } from 'react';
import { auth, firestore } from '../../firebaseConfig';
import { STATUS } from '../staticPageData/baby-color-consistency-info';

const ColorCircle = ({ color }) => {
    return (
        <Box h="30px" w="30px" bg={color} borderColor="black" border="1px" borderRadius={"50%"}></Box>
    );
};

export default function PooTabPanel({ setData, data, index, notes, color, consistency, timeStampDate, alias, colorStatus, consistencyStatus }) {
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
        firestore.collection("users").doc(auth?.currentUser?.uid).collection("poo-tracking").doc(alias).delete();
        const updatedArray = [...data];
        updatedArray.splice(index, 1);
        setData(updatedArray);
    };

    const [isLargerThan1300] = useMediaQuery("(min-width: 1300px)");

    return (
        <Card>
            <CardHeader>
                <HStack
                    justifyContent="space-between"
                    w={isLargerThan1300 ? "90vw" : "60vw"}
                >
                    <VStack>
                        <Box alignSelf="start" justifyContent="flex-start">
                            <Heading size='md'>{alias}</Heading>
                        </Box>
                    </VStack>
                    <IconButton variant="unstyled" icon={<CloseIcon />} onClick={() => handleDeleteRow(index)} />
                </HStack>
            </CardHeader>
            <CardBody>
                <VStack>
                    <HStack
                        w={isLargerThan1300 ? "90vw" : "60vw"}
                    >
                        <HStack alignItems="flex-start" spacing="5">
                            <Box>
                                <HStack spacing={"-0.5"} alignItems={"center"}>
                                    <FormLabel>Color</FormLabel>
                                    {colorStatus?.status === STATUS.GOOD &&
                                        <Tooltip label={colorStatus.description}>
                                            <CheckCircleIcon />
                                        </Tooltip>
                                    }
                                    {/* If either are considered to be questionable */}
                                    {colorStatus?.status === STATUS.OKAY &&
                                        <Tooltip label={colorStatus.description}>
                                            <InfoOutlineIcon />
                                        </Tooltip>
                                    }
                                    {colorStatus?.status === STATUS.BAD &&
                                        <Tooltip label={colorStatus.description}>
                                            <NotAllowedIcon />
                                        </Tooltip>
                                    }
                                </HStack>
                                {color && <ColorCircle color={color} />}
                            </Box>
                            <Box alignItems="start" display="flex" flexDir="column">
                                <HStack spacing={"-0.5"} alignItems={"center"}>
                                    <FormLabel>Consistency</FormLabel>
                                    {consistencyStatus.status === STATUS.OKAY &&
                                        <Tooltip label={consistencyStatus.description}>
                                            <InfoOutlineIcon />
                                        </Tooltip>
                                    }
                                    {consistencyStatus.status === STATUS.BAD &&
                                        <Tooltip label={consistencyStatus.description}>
                                            <NotAllowedIcon />
                                        </Tooltip>
                                    }
                                    {consistencyStatus.status === STATUS.GOOD &&
                                        <Tooltip label={consistencyStatus.description}>
                                            <CheckCircleIcon />
                                        </Tooltip>
                                    }
                                </HStack>
                                <Text>
                                    {consistency}
                                </Text>
                            </Box>
                            <Box alignItems="start" display="flex" flexDir="column">
                                <FormLabel>Time Stamp</FormLabel>
                                <Text>
                                    {timeStampDate}
                                </Text>
                            </Box>
                        </HStack>
                    </HStack>
                    <HStack
                        w={isLargerThan1300 ? "90vw" : "60vw"}
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
                                w={isLargerThan1300 ? "90vw" : "60vw"}
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
