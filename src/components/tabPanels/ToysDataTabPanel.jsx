import React from 'react';
import ToyRow from '../componentRows/ToyRow';
import { HStack } from '@chakra-ui/react';

export default function ToysDataTabPanel({ toyData, toyDataIsLoading, tabIndex }) {
    return (
        <HStack flexWrap={"wrap"} top="20" position="absolute" spacing="20">
            {toyData && toyData.length > 0 && toyData.map(toy => {
                return (
                    <ToyRow
                        key={toy.id}
                        toy={toy}
                        toyDataIsLoading={toyDataIsLoading}
                        tabIndex={tabIndex}
                    />
                );
            })}
        </HStack>
    );
}
