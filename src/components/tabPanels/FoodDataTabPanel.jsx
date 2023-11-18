// module imports
import { Grid, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

// relative imports
import FoodRow from '../componentRows/FoodRow';
import { screenBackground } from '../../defaultStyle';

export default function FoodDataTabPanel({ foodData, isFoodDataLoading, tabIndex }) {
    const _screenBackground = useColorModeValue(screenBackground.light, screenBackground.dark);

    return (
        <Grid
            templateRows='repeat(1, 1fr)'
            templateColumns='repeat(4, 1fr)'
            gap="5"
            bg={_screenBackground}
        >
            {foodData && foodData.length > 0 && foodData.map((food) => {
                return (
                    <FoodRow
                        key={food.id}
                        food={food}
                        isFoodDataLoading={isFoodDataLoading}
                        tabIndex={tabIndex}
                    />
                );
            })}
        </Grid>
    );
}
