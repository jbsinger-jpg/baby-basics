// module imports
// None

// relative imports
import ToyRow from '../componentRows/ToyRow';
import GridContainer from '../GridContainer';

export default function ToysDataTabPanel({ toyData, toyDataIsLoading, tabIndex }) {
    return (
        <GridContainer>
            {toyData && toyData.length > 0 && toyData.map((toy, index) => {
                return (
                    <ToyRow
                        key={toy.id}
                        toy={toy}
                        toyDataIsLoading={toyDataIsLoading}
                        tabIndex={tabIndex}
                        ml={index === 0 && "12"}
                    />
                );
            })}
        </GridContainer>
    );
}
