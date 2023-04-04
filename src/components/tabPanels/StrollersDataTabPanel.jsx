import { HStack } from '@chakra-ui/react';
import React from 'react';
import StrollerRow from '../componentRows/StrollerRow';

export default function StrollersDataTabPanel({ strollerData, strollerDataIsLoading, tabIndex }) {
    return (
        <HStack flexWrap={"wrap"} top="20" position="absolute" spacing="20">
            {strollerData && strollerData.length > 0 && strollerData.map(stroller => {
                return (
                    <StrollerRow
                        key={stroller.id}
                        stroller={stroller}
                        strollerDataIsLoading={strollerDataIsLoading}
                        tabIndex={tabIndex}
                    />
                );
            })}
        </HStack>
    );
}
