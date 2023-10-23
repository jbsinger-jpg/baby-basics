import React from 'react';
import { screenBackground } from '../../defaultStyle';
import { HStack, useColorModeValue } from '@chakra-ui/react';
import VitaminRow from '../componentRows/VitaminRow';

export default function VitaminDataTabPanel({ vitaminData, vitaminDataIsLoading, tabIndex }) {
    const _screenBackground = useColorModeValue(screenBackground.light, screenBackground.dark);

    return (
        <HStack flexWrap={"wrap"} marginTop="20" spacing="10" bg={_screenBackground} w="90vw" justifyContent="space-evenly">
            {vitaminData && vitaminData.length > 0 && vitaminData.map((vitamin, index) => {
                return (
                    <VitaminRow
                        key={vitamin.id}
                        vitamin={vitamin}
                        vitaminDataIsLoading={vitaminDataIsLoading}
                        tabIndex={tabIndex}
                        ml={index === 0 && "12"}
                    />
                );
            })}
        </HStack>
    );
}
