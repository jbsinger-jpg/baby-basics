import { HStack, Text } from '@chakra-ui/react';
import React from 'react';

export default function PooTabPanel({ notes, color, consistency, timeStamp }) {
    return (
        <HStack
            w="100vw"
            justifyContent="space-evenly"
        >
            <Text>
                Notes: {notes}
            </Text>
            <Text>
                Color: {color}
            </Text>
            <Text>
                Consistency: {consistency}
            </Text>
            <Text>
                Time Entered: {timeStamp}
            </Text>
        </HStack>
    );
}
