// module imports
import { Grid, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

// relative imports
import MonitorRow from '../componentRows/MonitorRow';
import { screenBackground } from '../../defaultStyle';

export default function MonitorsDataTabPanel({ monitorData, monitorDataIsLoading, tabIndex }) {
    const _screenBackground = useColorModeValue(screenBackground.light, screenBackground.dark);

    return (
        <Grid
            templateRows='repeat(1, 1fr)'
            templateColumns='repeat(4, 1fr)'
            gap="5"
            bg={_screenBackground}
        >            {monitorData && monitorData.length > 0 && monitorData.map((monitor, index) => {
            return (
                <MonitorRow
                    key={monitor.id}
                    monitor={monitor}
                    monitorDataIsLoading={monitorDataIsLoading}
                    tabIndex={tabIndex}
                    ml={index === 0 && "12"}
                />
            );
        })}
        </Grid>
    );
}
