import { VStack } from '@chakra-ui/react';
import PregnantWomanOutlinedIcon from '@mui/icons-material/PregnantWomanOutlined';
import MapIcon from '@mui/icons-material/Map';
import HomeIcon from '@mui/icons-material/Home';

import React from 'react';
import ColorModeToggleButton from '../ColorModeToggleButton';

import { useNavigate } from 'react-router-dom';
import FabTemplate from './StandardFab';

export default function FloatingActionButtonsBabyInfo({ handleSearchPlacesDialogOpen }) {
    const navigate = useNavigate();

    const handleMaternalResources = () => {
        navigate("/maternal");
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
                label="Maternity"
                onClick={handleMaternalResources}
                icon={<PregnantWomanOutlinedIcon fontSize="large" />}
            />
            <FabTemplate
                label="Home"
                onClick={handleGoToHome}
                icon={<HomeIcon fontSize="large" />}
            />
        </VStack>
    );
}
