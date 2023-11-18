import SleepRow from '../componentRows/SleepRow';
import GridContainer from '../GridContainer';

export default function SleepTabPanel({ sleepData, sleepDataIsLoading, tabIndex }) {

    return (
        <GridContainer>
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
        </GridContainer>
    );
}
