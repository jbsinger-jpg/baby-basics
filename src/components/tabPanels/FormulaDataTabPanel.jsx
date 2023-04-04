import { HStack } from '@chakra-ui/react';
import React from 'react';
import FormulaRow from '../componentRows/FormulaRow';

export default function FormulaDataTabPanel({ formulaData, formulaDataIsLoading, tabIndex }) {
    return (
        <HStack flexWrap={"wrap"} top="20" position="absolute" spacing="20">
            {formulaData && formulaData.length > 0 && formulaData.map(formula => {
                return (
                    <FormulaRow
                        key={formula.id}
                        formula={formula}
                        formulaDataIsLoading={formulaDataIsLoading}
                        tabIndex={tabIndex}
                    />
                );
            })}
        </HStack>
    );
}
