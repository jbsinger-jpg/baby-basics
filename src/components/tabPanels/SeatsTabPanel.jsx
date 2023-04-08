import { HStack, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import SeatRow from '../componentRows/SeatRow';
import { screenBackground } from '../../defaultStyle';

export default function SeatsTabPanel({ seatData, seatDataIsLoading, tabIndex }) {
    const _screenBackground = useColorModeValue(screenBackground.light, screenBackground.dark);

    return (
        <HStack flexWrap={"wrap"} marginTop="20" spacing="12" bg={_screenBackground}>
            {seatData && seatData.length > 0 && seatData.map(seat => {
                return (
                    <SeatRow
                        key={seat.id}
                        seat={seat}
                        seatDataIsLoading={seatDataIsLoading}
                        tabIndex={tabIndex}
                    />
                );
            })}
        </HStack>
    );
}
