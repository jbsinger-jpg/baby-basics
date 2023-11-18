// module imports
import { Grid, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

// relative imports
import MaternialRow from '../componentRows/MaternialRow';
import { screenBackground } from '../../defaultStyle';

export default function MaternalDataTabPanel({ maternialData, maternialDataLoading, tabIndex }) {
    const _screenBackground = useColorModeValue(screenBackground.light, screenBackground.dark);

    return (
        <Grid
            templateRows='repeat(1, 1fr)'
            templateColumns='repeat(4, 1fr)'
            gap="5"
            bg={_screenBackground}
        >
            {maternialData && maternialData.length > 0 && maternialData.map((maternial) => {
                return (
                    <MaternialRow
                        key={maternial.id}
                        maternial={maternial}
                        maternialDataLoading={maternialDataLoading}
                        tabIndex={tabIndex}
                    />
                );
            })}
        </Grid>
    );
}
