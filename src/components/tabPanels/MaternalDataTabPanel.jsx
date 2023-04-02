import { HStack } from '@chakra-ui/react';
import React from 'react';
import MaternialRow from '../componentRows/MaternialRow';

export default function MaternalDataTabPanel({ maternialData, maternialDataLoading, tabIndex }) {
    return (
        <HStack flexWrap={"wrap"} top="20" position="absolute" spacing="20">
            {maternialData && maternialData.length > 0 && maternialData.map(maternial => {
                return (
                    <MaternialRow
                        key={maternial.id}
                        maternial={maternial}
                        maternialDataLoading={maternialDataLoading}
                        tabIndex={tabIndex}
                    />
                );
            })}
        </HStack>
    );
}
