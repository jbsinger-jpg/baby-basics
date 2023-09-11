import { Spinner } from '@chakra-ui/react';
import React from 'react';
import { Box } from 'victory';

export default function LoadingPageSpinner({ height, width }) {
    return (
        <Box
            alignItems="center"
            justifyContent="center"
            h={height}
            w={width}
            display="flex"
        >
            <Spinner size="xl" />
        </Box>);
}
