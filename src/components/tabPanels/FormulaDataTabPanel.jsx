// module imports
import { HStack, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

// relative imports
import FormulaRow from '../componentRows/FormulaRow';
import { screenBackground } from '../../defaultStyle';

export default function FormulaDataTabPanel({ formulaData, formulaDataIsLoading, tabIndex }) {
    const _screenBackground = useColorModeValue(screenBackground.light, screenBackground.dark);

    return (
        <HStack flexWrap={"wrap"} marginTop="20" spacing="10" bg={_screenBackground} w="90vw" justifyContent="space-evenly">
            {formulaData && formulaData.length > 0 && formulaData.map((formula, index) => {
                return (
                    <FormulaRow
                        key={formula.id}
                        formula={formula}
                        formulaDataIsLoading={formulaDataIsLoading}
                        tabIndex={tabIndex}
                        ml={index === 0 && "12"}
                    />
                );
            })}
        </HStack>
    );
}
