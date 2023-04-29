// module imports
import { HStack, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

// relative imports
import DiaperRow from '../componentRows/DiaperRow';
import { screenBackground } from '../../defaultStyle';

export default function DiaperDataTabPanel({ diaperData, isDiapersLoading, tabIndex }) {
    const _screenBackground = useColorModeValue(screenBackground.light, screenBackground.dark);

    return (
        <HStack flexWrap={"wrap"} marginTop="20" spacing="12" bg={_screenBackground}>
            {diaperData && diaperData.map((diaper, index) => {
                return (
                    <DiaperRow
                        key={index}
                        diaper={diaper}
                        isDiapersLoading={isDiapersLoading}
                        tabIndex={tabIndex}
                    />
                );
            })}
        </HStack>
    );
}
