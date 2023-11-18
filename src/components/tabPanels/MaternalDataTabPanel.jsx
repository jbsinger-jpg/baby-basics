// module imports
// None

// relative imports
import MaternialRow from '../componentRows/MaternialRow';
import GridContainer from '../GridContainer';

export default function MaternalDataTabPanel({ maternialData, maternialDataLoading, tabIndex }) {
    return (
        <GridContainer>

            {maternialData && maternialData.length > 0 && maternialData.map((maternial) => {
                return (
                    <MaternialRow
                        key={maternial.id}
                        maternial={maternial}
                        maternialDataLoading={maternialDataLoading}
                        tabIndex={tabIndex}
                    />
                );
            })}
        </GridContainer>
    );
}
