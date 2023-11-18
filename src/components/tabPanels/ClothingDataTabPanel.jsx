// module imports
// none

// relative imports
import ClothingRow from '../componentRows/ClothingRow';
import GridContainer from '../GridContainer';

export default function ClothingDataTabPanel({ clothingData, clothingDataLoaded, tabIndex }) {
    return (
        <GridContainer>
            {clothingData && clothingData.map((clothing) => {
                return (
                    <ClothingRow
                        key={clothing.id}
                        clothing={clothing}
                        clothingDataLoaded={clothingDataLoaded}
                        tabIndex={tabIndex}
                    />
                );
            })}
        </GridContainer>
    );
}
