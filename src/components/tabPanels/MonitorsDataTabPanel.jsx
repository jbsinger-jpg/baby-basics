import { HStack, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import MonitorRow from '../componentRows/MonitorRow';
import { screenBackground } from '../../defaultStyle';

export default function MonitorsDataTabPanel({ monitorData, monitorDataIsLoading, tabIndex }) {
    const _screenBackground = useColorModeValue(screenBackground.light, screenBackground.dark);

    return (
        <HStack flexWrap={"wrap"} marginTop="20" spacing="12" bg={_screenBackground}>
            {monitorData && monitorData.length > 0 && monitorData.map(monitor => {
                return (
                    <MonitorRow
                        key={monitor.id}
                        monitor={monitor}
                        monitorDataIsLoading={monitorDataIsLoading}
                        tabIndex={tabIndex}
                    />
                );
            })}
        </HStack>
    );
}
