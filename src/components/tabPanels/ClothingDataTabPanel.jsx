// module imports
import { Grid, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

// relative imports
import ClothingRow from '../componentRows/ClothingRow';
import { screenBackground } from '../../defaultStyle';

export default function ClothingDataTabPanel({ clothingData, clothingDataLoaded, tabIndex }) {
    const _screenBackground = useColorModeValue(screenBackground.light, screenBackground.dark);

    return (
        <Grid
            templateRows='repeat(1, 1fr)'
            templateColumns='repeat(4, 1fr)'
            gap="5"
            bg={_screenBackground}
        >
            {clothingData && clothingData.map((clothing) => {
                return (
                    <ClothingRow
                        key={clothing.id}
                        clothing={clothing}
                        clothingDataLoaded={clothingDataLoaded}
                        tabIndex={tabIndex}
                    />
                );
            })}
        </Grid>
    );
}
