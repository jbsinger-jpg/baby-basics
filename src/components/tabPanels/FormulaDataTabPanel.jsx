// module imports
// None

// relative imports
import FormulaRow from '../componentRows/FormulaRow';
import GridContainer from '../GridContainer';

export default function FormulaDataTabPanel({ formulaData, formulaDataIsLoading, tabIndex }) {
    return (
        <GridContainer>
            {formulaData && formulaData.length > 0 && formulaData.map((formula) => {
                return (
                    <FormulaRow
                        key={formula.id}
                        formula={formula}
                        formulaDataIsLoading={formulaDataIsLoading}
                        tabIndex={tabIndex}
                    />
                );
            })}
        </GridContainer>
    );
}
