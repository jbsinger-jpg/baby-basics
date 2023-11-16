// module imports
import { Grid, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

// relative imports
import DiaperRow from '../componentRows/DiaperRow';
import { screenBackground } from '../../defaultStyle';

export default function DiaperDataTabPanel({ diaperData, isDiapersLoading, tabIndex }) {
    const _screenBackground = useColorModeValue(screenBackground.light, screenBackground.dark);

    return (
        <Grid
            templateRows='repeat(1, 1fr)'
            templateColumns='repeat(4, 1fr)'
            gap="5"
            bg={_screenBackground}
        >
            {diaperData && diaperData.map((diaper) => {
                return (
                    <DiaperRow
                        key={diaper.id}
                        diaper={diaper}
                        isDiapersLoading={isDiapersLoading}
                        tabIndex={tabIndex}
                    />
                );
            })}
        </Grid>
    );
}
