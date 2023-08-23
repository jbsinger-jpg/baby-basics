import { CheckCircleIcon, ChevronDownIcon, ChevronUpIcon, CloseIcon, InfoOutlineIcon, NotAllowedIcon } from '@chakra-ui/icons';
import { Box, Card, CardBody, CardHeader, Collapse, FormLabel, HStack, Heading, IconButton, Text, Tooltip, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { STATUS } from '../staticPageData/baby-color-consistency-info';

export default function GenericDiaperTrackingTabPanel({ notes, timeStampDate, alias, index, handleDeleteRow, colorStatus, color }) {
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

    const ColorCircle = ({ color }) => {
        return (
            <Box h="30px" w="30px" bg={color} borderColor="black" border="1px" borderRadius={"50%"}></Box>
        );
    };

    return (
        <Box>
            <Card>
                <CardHeader>
                    <HStack
                        w="90vw"
                        justifyContent="space-between"
                    >
                        <Box alignSelf="start" justifyContent="flex-start">
                            <Heading size='md'>{alias}</Heading>
                        </Box>
                        <IconButton variant="unstyled" icon={<CloseIcon />} onClick={() => handleDeleteRow(index, alias)} />
                    </HStack>
                </CardHeader>
                <CardBody>
                    <VStack alignItems="start">
                        <HStack>
                            <Box>
                                <HStack spacing={"-0.5"} alignItems={"center"}>
                                    <FormLabel>Color</FormLabel>
                                    {colorStatus.status === STATUS.GOOD &&
                                        <Tooltip label={colorStatus.description}>
                                            <CheckCircleIcon />
                                        </Tooltip>
                                    }
                                    {colorStatus.status === STATUS.OKAY &&
                                        <Tooltip label={colorStatus.description}>
                                            <InfoOutlineIcon />
                                        </Tooltip>
                                    }
                                    {colorStatus.status === STATUS.BAD &&
                                        <Tooltip label={colorStatus.description}>
                                            <NotAllowedIcon />
                                        </Tooltip>
                                    }
                                </HStack>
                                {color && <ColorCircle color={color} />}
                            </Box>
                        </HStack>
                        <HStack
                            w="90vw"
                            justifyContent="space-between"
                        >
                            <HStack spacing="-1" justifyContent="center" alignItems="end">
                                <FormLabel>Notes</FormLabel>
                                <IconButton onClick={handleToggle} icon={getIconFromToggle()} variant="unstyled" />
                            </HStack>
                            <Box>
                                <FormLabel>Submitted</FormLabel>
                                <Text>
                                    {timeStampDate}
                                </Text>
                            </Box>
                        </HStack>
                    </VStack>
                    <Box>
                        <Collapse in={showAllNotes} animateOpacity>
                            <Box
                                w="90vw"
                                whiteSpace="pre-wrap"
                                bg="blackAlpha.200"
                                p="5"
                                borderRadius="1%"
                            >
                                {notes}
                            </Box>
                        </Collapse>
                    </Box>
                </CardBody>
            </Card>
        </Box>
    );
}
