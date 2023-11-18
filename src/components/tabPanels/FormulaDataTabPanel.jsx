// module imports
import { Grid, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

// relative imports
import FormulaRow from '../componentRows/FormulaRow';
import { screenBackground } from '../../defaultStyle';

export default function FormulaDataTabPanel({ formulaData, formulaDataIsLoading, tabIndex }) {
    const _screenBackground = useColorModeValue(screenBackground.light, screenBackground.dark);

    return (
        <Grid
            templateRows='repeat(1, 1fr)'
            templateColumns='repeat(4, 1fr)'
            gap="5"
            bg={_screenBackground}
        >
            {formulaData && formulaData.length > 0 && formulaData.map((formula) => {
                return (
                    <FormulaRow
                        key={formula.id}
                        formula={formula}
                        formulaDataIsLoading={formulaDataIsLoading}
                        tabIndex={tabIndex}
                    />
                );
            })}
        </Grid>
    );
}
