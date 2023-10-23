// module imports
import { HStack, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

// relative imports
import ToyRow from '../componentRows/ToyRow';
import { screenBackground } from '../../defaultStyle';

export default function ToysDataTabPanel({ toyData, toyDataIsLoading, tabIndex }) {
    const _screenBackground = useColorModeValue(screenBackground.light, screenBackground.dark);

    return (
        <HStack flexWrap={"wrap"} marginTop="20" spacing="10" bg={_screenBackground} w="90vw" justifyContent="space-evenly">
            {toyData && toyData.length > 0 && toyData.map((toy, index) => {
                return (
                    <ToyRow
                        key={toy.id}
                        toy={toy}
                        toyDataIsLoading={toyDataIsLoading}
                        tabIndex={tabIndex}
                        ml={index === 0 && "12"}
                    />
                );
            })}
        </HStack>
    );
}
