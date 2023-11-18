// module imports
// None

// relative imports
import FoodRow from '../componentRows/FoodRow';
import GridContainer from '../GridContainer';

export default function FoodDataTabPanel({ foodData, isFoodDataLoading, tabIndex }) {
    return (
        <GridContainer>
            {foodData && foodData.length > 0 && foodData.map((food) => {
                return (
                    <FoodRow
                        key={food.id}
                        food={food}
                        isFoodDataLoading={isFoodDataLoading}
                        tabIndex={tabIndex}
                    />
                );
            })}
        </GridContainer>
    );
}
