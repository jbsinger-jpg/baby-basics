import { Box, Card, Text } from '@chakra-ui/react';
import React from 'react';

export default function LoginPage() {
    return (
        <Box w="100vw" h="100vh" display="flex" alignItems="center" justifyContent="center">
            <Card w="40vw" h="60vh" bg={"darkgrey"} display="flex" alignItems="center" justifyContent="center">
                <Text>LoginPage</Text>
            </Card>
        </Box>
    );
}
