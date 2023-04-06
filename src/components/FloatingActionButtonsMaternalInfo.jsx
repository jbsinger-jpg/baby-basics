import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { IconButton, Tooltip, VStack, useColorMode, useColorModeValue } from '@chakra-ui/react';
import MapIcon from '@mui/icons-material/Map';
import BabyChangingStationIcon from '@mui/icons-material/BabyChangingStation';

import React from 'react';
import { useNavigate } from 'react-router-dom';

const ColorModeToggleButton = () => {
    const { toggleColorMode } = useColorMode();

    return (
        <Tooltip label="Change color mode">
            <IconButton
                icon={useColorModeValue("Dark", "Light") === "Dark" ? <MoonIcon height="30px" width="30px" /> : <SunIcon height="30px" width="30px" />}
                onClick={toggleColorMode}
                width="56px"
                height="56px"
                borderRadius="50%"
                boxShadow="md"
                _hover={{ boxShadow: "lg" }}
            >
                {useColorModeValue("Dark", "Light")}
            </IconButton>
        </Tooltip>
    );
};

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
