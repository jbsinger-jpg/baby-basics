import { Grid, useColorModeValue } from '@chakra-ui/react';

import { screenBackground } from '../../defaultStyle';
import BathRow from '../componentRows/BathRow';

export default function BathTabPanel({ bathData, bathDataIsLoading, tabIndex }) {
    const _screenBackground = useColorModeValue(screenBackground.light, screenBackground.dark);

    return (
        <Grid
            templateRows='repeat(1, 1fr)'
            templateColumns='repeat(4, 1fr)'
            gap="5"
            bg={_screenBackground}
        >
            {bathData && bathData.length > 0 && bathData.map((bath) => {
                return (
                    <BathRow
                        key={bath.id}
                        bath={bath}
                        bathDataIsLoading={bathDataIsLoading}
                        tabIndex={tabIndex}
                    />
                );
            })}
        </Grid>
    );
}
