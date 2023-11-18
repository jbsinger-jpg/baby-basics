import BathRow from '../componentRows/BathRow';
import GridContainer from '../GridContainer';

export default function BathTabPanel({ bathData, bathDataIsLoading, tabIndex }) {
    return (
        <GridContainer>
            {bathData && bathData.length > 0 && bathData.map((bath) => {
                return (
                    <BathRow
                        key={bath.id}
                        bath={bath}
                        bathDataIsLoading={bathDataIsLoading}
                        tabIndex={tabIndex}
                    />
                );
            })}
        </GridContainer>
    );
}
