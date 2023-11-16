import React from 'react';
import { screenBackground } from '../../defaultStyle';
import { Grid, useColorModeValue } from '@chakra-ui/react';
import VitaminRow from '../componentRows/VitaminRow';

export default function VitaminDataTabPanel({ vitaminData, vitaminDataIsLoading, tabIndex }) {
    const _screenBackground = useColorModeValue(screenBackground.light, screenBackground.dark);

    return (
        <Grid
            templateRows='repeat(1, 1fr)'
            templateColumns='repeat(4, 1fr)'
            gap="5"
            bg={_screenBackground}
        >
            {vitaminData && vitaminData.length > 0 && vitaminData.map((vitamin, index) => {
                return (
                    <VitaminRow
                        key={vitamin.id}
                        vitamin={vitamin}
                        vitaminDataIsLoading={vitaminDataIsLoading}
                        tabIndex={tabIndex}
                    />
                );
            })}
        </Grid>
    );
}
