// module imports
// None

// relative imports
import SeatRow from '../componentRows/SeatRow';
import GridContainer from '../GridContainer';

export default function SeatsTabPanel({ seatData, seatDataIsLoading, tabIndex }) {
    return (
        <GridContainer>
            {seatData && seatData.length > 0 && seatData.map((seat) => {
                return (
                    <SeatRow
                        key={seat.id}
                        seat={seat}
                        seatDataIsLoading={seatDataIsLoading}
                        tabIndex={tabIndex}
                    />
                );
            })}
        </GridContainer>
    );
}
