// module imports
import { HStack, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

// relative imports
import FoodRow from '../componentRows/FoodRow';
import { screenBackground } from '../../defaultStyle';

export default function FoodDataTabPanel({ foodData, isFoodDataLoading, tabIndex }) {
    const _screenBackground = useColorModeValue(screenBackground.light, screenBackground.dark);

    return (
        <HStack flexWrap={"wrap"} marginTop="20" spacing="10" bg={_screenBackground} w="90vw" justifyContent="space-evenly">
            {foodData && foodData.length > 0 && foodData.map((food, index) => {
                return (
                    <FoodRow
                        key={food.id}
                        food={food}
                        isFoodDataLoading={isFoodDataLoading}
                        tabIndex={tabIndex}
                        ml={index === 0 && "12"}
                    />
                );
            })}
        </HStack>
    );
}
