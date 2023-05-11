// module imports
import { HStack, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

// relative imports
import ClothingRow from '../componentRows/ClothingRow';
import { screenBackground } from '../../defaultStyle';

export default function ClothingDataTabPanel({ clothingData, clothingDataLoaded, tabIndex }) {
    const _screenBackground = useColorModeValue(screenBackground.light, screenBackground.dark);

    return (
        <HStack flexWrap={"wrap"} marginTop="20" spacing="10" bg={_screenBackground}>
            {clothingData && clothingData.map((clothing, index) => {
                return (
                    <ClothingRow
                        ml={index === 0 && "10"}
                        key={clothing.id}
                        clothing={clothing}
                        clothingDataLoaded={clothingDataLoaded}
                        tabIndex={tabIndex}
                    />
                );
            })}
        </HStack>
    );
}
