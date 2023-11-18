import VitaminRow from '../componentRows/VitaminRow';
import GridContainer from '../GridContainer';

export default function VitaminDataTabPanel({ vitaminData, vitaminDataIsLoading, tabIndex }) {
    return (
        <GridContainer>
            {vitaminData && vitaminData.length > 0 && vitaminData.map((vitamin, index) => {
                return (
                    <VitaminRow
                        key={vitamin.id}
                        vitamin={vitamin}
                        vitaminDataIsLoading={vitaminDataIsLoading}
                        tabIndex={tabIndex}
                    />
                );
            })}
        </GridContainer>
    );
}
