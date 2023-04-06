import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { IconButton, Tooltip, VStack, useColorMode, useColorModeValue } from '@chakra-ui/react';
import PregnantWomanOutlinedIcon from '@mui/icons-material/PregnantWomanOutlined';
import MapIcon from '@mui/icons-material/Map';

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
                zIndex={999}
            >
                {useColorModeValue("Dark", "Light")}
            </IconButton>
        </Tooltip>
    );
};

export default function FloatingActionButtonsBabyInfo({ handleSearchPlacesDialogOpen }) {
    const navigate = useNavigate();

    const handleMaternalResources = () => {
        navigate("/maternal");
    };

    return (
        <VStack
            top="14"
            right="4"
            position="fixed"
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
                    zIndex={999}
                />
            </Tooltip>
            <Tooltip label="Maternity Information">
                <IconButton
                    icon={<PregnantWomanOutlinedIcon fontSize="large" />}
                    width="56px"
                    height="56px"
                    borderRadius="50%"
                    boxShadow="md"
                    _hover={{ boxShadow: "lg" }}
                    zIndex={999}
                    onClick={handleMaternalResources}
                >
                    Baby Milestones
                </IconButton>
            </Tooltip>
        </VStack>
    );
}
