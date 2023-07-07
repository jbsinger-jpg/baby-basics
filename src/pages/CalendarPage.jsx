import { Box, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { screenBackground } from '../defaultStyle';

export default function CalendarPage() {
    const _screenBackground = useColorModeValue(screenBackground.light, screenBackground.dark);

    return (
        <Box
            bg={_screenBackground}
            h="100vh"
        >
            CalendarPage
        </Box>
    );
}
