// module imports
import { Grid, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

// relative imports
import ToyRow from '../componentRows/ToyRow';
import { screenBackground } from '../../defaultStyle';

export default function ToysDataTabPanel({ toyData, toyDataIsLoading, tabIndex }) {
    const _screenBackground = useColorModeValue(screenBackground.light, screenBackground.dark);

    return (
        <Grid
            templateRows='repeat(1, 1fr)'
            templateColumns='repeat(4, 1fr)'
            gap="5"
            bg={_screenBackground}
        >
            {toyData && toyData.length > 0 && toyData.map((toy, index) => {
                return (
                    <ToyRow
                        key={toy.id}
                        toy={toy}
                        toyDataIsLoading={toyDataIsLoading}
                        tabIndex={tabIndex}
                        ml={index === 0 && "12"}
                    />
                );
            })}
        </Grid>
    );
}
