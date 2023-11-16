// module imports
import { Grid, HStack, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

// relative imports
import SeatRow from '../componentRows/SeatRow';
import { screenBackground } from '../../defaultStyle';

export default function SeatsTabPanel({ seatData, seatDataIsLoading, tabIndex }) {
    const _screenBackground = useColorModeValue(screenBackground.light, screenBackground.dark);

    return (
        <Grid
            templateRows='repeat(1, 1fr)'
            templateColumns='repeat(4, 1fr)'
            gap="5"
            bg={_screenBackground}
        >
            {seatData && seatData.length > 0 && seatData.map((seat) => {
                return (
                    <SeatRow
                        key={seat.id}
                        seat={seat}
                        seatDataIsLoading={seatDataIsLoading}
                        tabIndex={tabIndex}
                    />
                );
            })}
        </Grid>
    );
}
