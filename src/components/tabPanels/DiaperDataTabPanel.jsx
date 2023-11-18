// module imports
// None

// relative imports
import DiaperRow from '../componentRows/DiaperRow';
import GridContainer from '../GridContainer';

export default function DiaperDataTabPanel({ diaperData, isDiapersLoading, tabIndex }) {
    return (
        <GridContainer>
            {diaperData && diaperData.map((diaper) => {
                return (
                    <DiaperRow
                        key={diaper.id}
                        diaper={diaper}
                        isDiapersLoading={isDiapersLoading}
                        tabIndex={tabIndex}
                    />
                );
            })}
        </GridContainer>
    );
}
