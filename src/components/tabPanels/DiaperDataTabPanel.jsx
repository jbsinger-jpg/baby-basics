// module imports
import { HStack, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

// relative imports
import DiaperRow from '../componentRows/DiaperRow';
import { screenBackground } from '../../defaultStyle';

export default function DiaperDataTabPanel({ diaperData, isDiapersLoading, tabIndex }) {
    const _screenBackground = useColorModeValue(screenBackground.light, screenBackground.dark);

    return (
        <HStack flexWrap={"wrap"} marginTop="20" spacing="10" bg={_screenBackground} w="90vw" justifyContent="space-evenly">
            {diaperData && diaperData.map((diaper, index) => {
                return (
                    <DiaperRow
                        key={index}
                        diaper={diaper}
                        isDiapersLoading={isDiapersLoading}
                        tabIndex={tabIndex}
                        ml={index === 0 && "12"}
                    />
                );
            })}
        </HStack>
    );
}
