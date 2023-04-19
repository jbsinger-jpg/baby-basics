import { IconButton, Tooltip, VStack } from '@chakra-ui/react';
import PregnantWomanOutlinedIcon from '@mui/icons-material/PregnantWomanOutlined';
import MapIcon from '@mui/icons-material/Map';
import HomeIcon from '@mui/icons-material/Home';

import React from 'react';
import ColorModeToggleButton from './ColorModeToggleButton';

import { useNavigate } from 'react-router-dom';

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
            <Tooltip label="Home">
                <IconButton
                    icon={<HomeIcon fontSize="large" />}
                    width="56px"
                    height="56px"
                    borderRadius="50%"
                    boxShadow="md"
                    _hover={{ boxShadow: "lg" }}
                    onClick={handleGoToHome}
                >
                </IconButton>
            </Tooltip>
        </VStack>
    );
}
