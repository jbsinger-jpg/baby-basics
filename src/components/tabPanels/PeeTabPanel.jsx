import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { Box, Card, CardBody, CardHeader, Collapse, FormLabel, HStack, Heading, IconButton, Text, Textarea } from '@chakra-ui/react';
import React, { useState } from 'react';

export default function PeeTabPanel({ notes, timeStamp, alias }) {
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
                    <Box alignSelf="start" justifyContent="flex-start">
                        <Heading size='md'>{alias}</Heading>
                    </Box>
                </CardHeader>
                <CardBody>
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
                </CardBody>
            </Card>
        </Box>
    );
}
