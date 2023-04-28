import { VStack } from '@chakra-ui/react';
import MapIcon from '@mui/icons-material/Map';
import BabyChangingStationIcon from '@mui/icons-material/BabyChangingStation';
import HomeIcon from '@mui/icons-material/Home';

import React from 'react';
import { useNavigate } from 'react-router-dom';
import ColorModeToggleButton from '../ColorModeToggleButton';
import FabTemplate from './StandardFab';

export default function FloatingActionButtonsMaternalInfo({ handleSearchPlacesDialogOpen }) {
    const navigate = useNavigate();

    const handleMilestoneResources = () => {
        navigate("/milestone");
    };

    const handleGoToHome = () => {
        navigate("/");
    };

    return (
        <VStack
            top="14"
            right="4"
            position="fixed"
            zIndex={999}

        >
            <ColorModeToggleButton />
            <FabTemplate
                label="Look up a Location"
                onClick={handleSearchPlacesDialogOpen}
                icon={<MapIcon fontSize="large" />}
            />
            <FabTemplate
                label="Baby Milestones"
                onClick={handleMilestoneResources}
                icon={<BabyChangingStationIcon fontSize="large" />}
            />
            <FabTemplate
                label="Home"
                onClick={handleGoToHome}
                icon={<HomeIcon fontSize="large" />}
            />
        </VStack>
    );
}
