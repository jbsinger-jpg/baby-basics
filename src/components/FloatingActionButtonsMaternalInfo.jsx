import { IconButton, Tooltip, VStack } from '@chakra-ui/react';
import MapIcon from '@mui/icons-material/Map';
import BabyChangingStationIcon from '@mui/icons-material/BabyChangingStation';

import React from 'react';
import { useNavigate } from 'react-router-dom';
import ColorModeToggleButton from './ColorModeToggleButton';

export default function FloatingActionButtonsMaternalInfo({ handleSearchPlacesDialogOpen }) {
    const navigate = useNavigate();

    const handleMilestoneResources = () => {
        navigate("/milestone");
    };

    return (
        <VStack
            top="14"
            right="4"
            position="fixed"
            zIndex={999}

        >
            <ColorModeToggleButton />
            <Tooltip label="Look up a Location">
                <IconButton
                    onClick={handleSearchPlacesDialogOpen}
                    icon={<MapIcon fontSize="large" />}
                    width="56px"
                    height="56px"
                    borderRadius="50%"
                    boxShadow="md"
                    _hover={{ boxShadow: "lg" }}
                />
            </Tooltip>
            <Tooltip label="Baby Milestones">
                <IconButton
                    icon={<BabyChangingStationIcon fontSize="large" />}
                    width="56px"
                    height="56px"
                    borderRadius="50%"
                    boxShadow="md"
                    _hover={{ boxShadow: "lg" }}
                    onClick={handleMilestoneResources}
                >
                </IconButton>
            </Tooltip>
        </VStack>
    );
}
