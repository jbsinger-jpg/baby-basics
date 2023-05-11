// module imports
import { HStack, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

// relative imports
import StrollerRow from '../componentRows/StrollerRow';
import { screenBackground } from '../../defaultStyle';

export default function StrollersDataTabPanel({ strollerData, strollerDataIsLoading, tabIndex }) {
    const _screenBackground = useColorModeValue(screenBackground.light, screenBackground.dark);

    return (
        <HStack flexWrap={"wrap"} marginTop="20" spacing="12" bg={_screenBackground}>
            {strollerData && strollerData.length > 0 && strollerData.map((stroller, index) => {
                return (
                    <StrollerRow
                        key={stroller.id}
                        stroller={stroller}
                        strollerDataIsLoading={strollerDataIsLoading}
                        tabIndex={tabIndex}
                        ml={index === 0 && "12"}
                    />
                );
            })}
        </HStack>
    );
}
