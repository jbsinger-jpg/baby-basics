// module imports
// None

// relative imports
import MonitorRow from '../componentRows/MonitorRow';
import GridContainer from '../GridContainer';

export default function MonitorsDataTabPanel({ monitorData, monitorDataIsLoading, tabIndex }) {
    return (
        <GridContainer>
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
        </GridContainer>
    );
}
