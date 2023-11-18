// module imports
// None

// relative imports
import StrollerRow from '../componentRows/StrollerRow';
import GridContainer from '../GridContainer';

export default function StrollersDataTabPanel({ strollerData, strollerDataIsLoading, tabIndex }) {
    return (
        <GridContainer>
            {strollerData && strollerData.length > 0 && strollerData.map((stroller, index) => {
                return (
                    <StrollerRow
                        key={stroller.id}
                        stroller={stroller}
                        strollerDataIsLoading={strollerDataIsLoading}
                        tabIndex={tabIndex}
                    />
                );
            })}
        </GridContainer>
    );
}
