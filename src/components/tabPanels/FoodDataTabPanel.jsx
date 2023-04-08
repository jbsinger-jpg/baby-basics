import { HStack, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import FoodRow from '../componentRows/FoodRow';
import { screenBackground } from '../../defaultStyle';

export default function FoodDataTabPanel({ foodData, isFoodDataLoading, tabIndex }) {
    const _screenBackground = useColorModeValue(screenBackground.light, screenBackground.dark);

    return (
        <HStack flexWrap={"wrap"} marginTop="20" spacing="12" bg={_screenBackground}>
            {foodData && foodData.length > 0 && foodData.map(food => {
                return (
                    <FoodRow
                        key={food.id}
                        food={food}
                        isFoodDataLoading={isFoodDataLoading}
                        tabIndex={tabIndex}
                    />
                );
            })}
        </HStack>
    );
}
