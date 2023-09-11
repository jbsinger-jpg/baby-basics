import { Box, VStack } from '@chakra-ui/react';
import MapIcon from '@mui/icons-material/Map';

import FabTemplate from '../components/floatingActionButtons/StandardFab';
import { useState } from 'react';
import GoogleMapsModal from '../components/modals/GoogleMapsModal';
import CustomPopOver from '../components/CustomPopover';
import FloatingActionButtonsEvents from '../components/floatingActionButtons/FloatingActionButtonsEvents';

export default function EventsPage() {
    const [searchDialogIsOpen, setSearchDialogIsOpen] = useState(false);
    const cardHeight = `${(100 / 2) - 5}vh`;
    const handleSearchPlacesDialogOpen = () => {
        setSearchDialogIsOpen(!searchDialogIsOpen);
    };

    return (
        <Box>
            <VStack
                alignItems="start"
                pl={2}
                pt={4}
            >
                <FabTemplate
                    height={cardHeight}
                    icon={<MapIcon fontSize="large" />}
                    onClick={handleSearchPlacesDialogOpen}
                    label={"Look up a Location"}
                />
                <CustomPopOver cardHeight={cardHeight} />
            </VStack>
            <GoogleMapsModal
                searchPlaces={searchDialogIsOpen}
                setSearchPlaces={setSearchDialogIsOpen}
            />
            <FloatingActionButtonsEvents />
        </Box>
    );
}
