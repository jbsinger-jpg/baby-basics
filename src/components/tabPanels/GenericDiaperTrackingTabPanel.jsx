import { CheckCircleIcon, ChevronDownIcon, ChevronUpIcon, CloseIcon, InfoOutlineIcon, NotAllowedIcon } from '@chakra-ui/icons';
import { Box, Card, CardBody, CardHeader, Collapse, FormLabel, GridItem, HStack, Heading, IconButton, Text, Tooltip, VStack, useColorModeValue, useMediaQuery } from '@chakra-ui/react';
import React, { useState } from 'react';
import { STATUS } from '../staticPageData/baby-color-consistency-info';
import { cardBackground } from '../../defaultStyle';

export default function GenericDiaperTrackingTabPanel({ notes, timeStampDate, alias, index, handleDeleteRow, colorStatus, color }) {
    const [showAllNotes, setShowAllNotes] = useState(false);
    const _cardBackground = useColorModeValue(cardBackground.light, cardBackground.dark);

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
    const [isLargerThan1300] = useMediaQuery("(min-width: 1300px)");

    return (
        <Box>
            <Card
                bg={_cardBackground}
                w={isLargerThan1300 ? "90vw" : "70vw"}
            >
                <CardHeader>
                    <HStack
                        justifyContent="space-between"
                        w={isLargerThan1300 ? "85vw" : "60vw"}
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
                                    {colorStatus?.status === STATUS.GOOD &&
                                        <Tooltip label={colorStatus.description}>
                                            <CheckCircleIcon />
                                        </Tooltip>
                                    }
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
                        </HStack>
                        <HStack
                            w={isLargerThan1300 ? "85vw" : "60vw"}
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
                                w={isLargerThan1300 ? "90vw" : "60vw"}
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
