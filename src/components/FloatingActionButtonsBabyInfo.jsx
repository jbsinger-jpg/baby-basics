import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { IconButton, Tooltip, VStack, useColorMode, useColorModeValue } from '@chakra-ui/react';
import PregnantWomanOutlinedIcon from '@mui/icons-material/PregnantWomanOutlined';
import MapIcon from '@mui/icons-material/Map';

import React from 'react';
import ColorModeToggleButton from './ColorModeToggleButton';

import { useNavigate } from 'react-router-dom';

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
            <Tooltip label="Maternity Information">
                <IconButton
                    icon={<PregnantWomanOutlinedIcon fontSize="large" />}
                    width="56px"
                    height="56px"
                    borderRadius="50%"
                    boxShadow="md"
                    _hover={{ boxShadow: "lg" }}
                    onClick={handleMaternalResources}
                >
                </IconButton>
            </Tooltip>
        </VStack>
    );
}
