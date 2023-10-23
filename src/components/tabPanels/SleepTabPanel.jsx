import { HStack, useColorModeValue } from '@chakra-ui/react';
import { screenBackground } from '../../defaultStyle';
import SleepRow from '../componentRows/SleepRow';

export default function SleepTabPanel({ sleepData, sleepDataIsLoading, tabIndex }) {
    const _screenBackground = useColorModeValue(screenBackground.light, screenBackground.dark);

    return (
        <HStack flexWrap={"wrap"} marginTop="20" spacing="10" bg={_screenBackground} w="90vw" justifyContent="space-evenly">
            {sleepData && sleepData.length > 0 && sleepData.map((sleep, index) => {
                return (
                    <SleepRow
                        key={sleep.id}
                        sleep={sleep}
                        sleepDataIsLoading={sleepDataIsLoading}
                        tabIndex={tabIndex}
                        ml={index === 0 && "10"}
                    />
                );
            })}
        </HStack>
    );
}
