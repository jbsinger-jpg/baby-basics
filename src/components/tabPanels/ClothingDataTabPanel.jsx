import { HStack } from '@chakra-ui/react';
import React from 'react';
import ClothingRow from '../componentRows/ClothingRow';

export default function ClothingDataTabPanel({ clothingData, clothingDataLoaded, tabIndex }) {
    return (
        <HStack flexWrap={"wrap"} top="20" position="absolute" spacing="12">
            {clothingData && clothingData.map(clothing => {
                return (
                    <ClothingRow
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
