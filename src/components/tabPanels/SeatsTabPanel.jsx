// module imports
import { HStack, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

// relative imports
import SeatRow from '../componentRows/SeatRow';
import { screenBackground } from '../../defaultStyle';

export default function SeatsTabPanel({ seatData, seatDataIsLoading, tabIndex }) {
    const _screenBackground = useColorModeValue(screenBackground.light, screenBackground.dark);

    return (
        <HStack flexWrap={"wrap"} marginTop="20" spacing="10" bg={_screenBackground} w="90vw" justifyContent="space-evenly">
            {seatData && seatData.length > 0 && seatData.map((seat, index) => {
                return (
                    <SeatRow
                        key={seat.id}
                        seat={seat}
                        seatDataIsLoading={seatDataIsLoading}
                        tabIndex={tabIndex}
                        ml={index === 0 && "12"}
                    />
                );
            })}
        </HStack>
    );
}
