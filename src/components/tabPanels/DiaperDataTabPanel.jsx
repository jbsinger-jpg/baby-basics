import { HStack } from '@chakra-ui/react';
import React from 'react';
import DiaperRow from '../componentRows/DiaperRow';

export default function DiaperDataTabPanel({ diaperData, isDiapersLoading, tabIndex }) {
    return (
        <HStack flexWrap={"wrap"} top="20" position="absolute" spacing="12">
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