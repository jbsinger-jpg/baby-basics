import { HStack } from '@chakra-ui/react';
import React from 'react';
import FoodRow from '../componentRows/FoodRow';

export default function FoodDataTabPanel({ foodData, isFoodDataLoading, tabIndex }) {
    return (
        <HStack flexWrap={"wrap"} top="20" position="absolute" spacing="20">
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
