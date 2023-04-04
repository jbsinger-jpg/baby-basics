import { HStack } from '@chakra-ui/react';
import React from 'react';
import MonitorRow from '../componentRows/MonitorRow';

export default function MonitorsDataTabPanel({ monitorData, monitorDataIsLoading, tabIndex }) {
    return (
        <HStack flexWrap={"wrap"} top="20" position="absolute" spacing="20">
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
