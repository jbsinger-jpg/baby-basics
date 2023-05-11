// module imports
import { HStack, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

// relative imports
import MaternialRow from '../componentRows/MaternialRow';
import { screenBackground } from '../../defaultStyle';

export default function MaternalDataTabPanel({ maternialData, maternialDataLoading, tabIndex }) {
    const _screenBackground = useColorModeValue(screenBackground.light, screenBackground.dark);

    return (
        <HStack flexWrap={"wrap"} marginTop="20" spacing="12" bg={_screenBackground}>
            {maternialData && maternialData.length > 0 && maternialData.map((maternial, index) => {
                return (
                    <MaternialRow
                        key={index}
                        maternial={maternial}
                        maternialDataLoading={maternialDataLoading}
                        tabIndex={tabIndex}
                        ml={index === 0 && "12"}
                    />
                );
            })}
        </HStack>
    );
}
