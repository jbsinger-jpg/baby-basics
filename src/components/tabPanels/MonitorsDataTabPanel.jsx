// module imports
import { HStack, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

// relative imports
import MonitorRow from '../componentRows/MonitorRow';
import { screenBackground } from '../../defaultStyle';

export default function MonitorsDataTabPanel({ monitorData, monitorDataIsLoading, tabIndex }) {
    const _screenBackground = useColorModeValue(screenBackground.light, screenBackground.dark);

    return (
        <HStack flexWrap={"wrap"} marginTop="20" spacing="10" bg={_screenBackground} w="90vw" justifyContent="space-evenly">
            {monitorData && monitorData.length > 0 && monitorData.map((monitor, index) => {
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
        </HStack>
    );
}
