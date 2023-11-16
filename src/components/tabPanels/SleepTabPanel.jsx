import { Grid, useColorModeValue } from '@chakra-ui/react';
import { screenBackground } from '../../defaultStyle';
import SleepRow from '../componentRows/SleepRow';

export default function SleepTabPanel({ sleepData, sleepDataIsLoading, tabIndex }) {
    const _screenBackground = useColorModeValue(screenBackground.light, screenBackground.dark);

    return (
        <Grid
            templateRows='repeat(1, 1fr)'
            templateColumns='repeat(4, 1fr)'
            gap="5"
            bg={_screenBackground}
        >
            {sleepData && sleepData.length > 0 && sleepData.map((sleep, index) => {
                return (
                    <SleepRow
                        key={sleep.id}
                        sleep={sleep}
                        sleepDataIsLoading={sleepDataIsLoading}
                        tabIndex={tabIndex}
                    />
                );
            })}
        </Grid>
    );
}
