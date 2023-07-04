import { HStack, Text } from '@chakra-ui/react';
import React from 'react';

export default function DryTabPanel({ notes, timeStamp }) {
    return (
        <HStack
            w="100vw"
            justifyContent="space-evenly"
        >
            <Text>
                Notes: {notes}
            </Text>
            <Text>
                Time Entered: {timeStamp}
            </Text>
        </HStack>
    );
}
