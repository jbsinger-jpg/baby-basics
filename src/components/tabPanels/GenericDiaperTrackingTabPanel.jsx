import { ChevronDownIcon, ChevronUpIcon, CloseIcon } from '@chakra-ui/icons';
import { Box, Card, CardBody, CardHeader, Collapse, FormLabel, HStack, Heading, IconButton, Text } from '@chakra-ui/react';
import React, { useState } from 'react';

export default function GenericDiaperTrackingTabPanel({ notes, timeStampDate, alias, index, handleDeleteRow }) {
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
