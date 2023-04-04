import { HStack } from '@chakra-ui/react';
import React from 'react';
import SeatRow from '../componentRows/SeatRow';

export default function SeatsTabPanel({ seatData, seatDataIsLoading, tabIndex }) {
    return (
        <HStack flexWrap={"wrap"} top="20" position="absolute" spacing="20">
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
