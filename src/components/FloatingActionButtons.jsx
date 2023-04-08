import { HamburgerIcon, MoonIcon, SearchIcon, SunIcon, TimeIcon, UnlockIcon } from '@chakra-ui/icons';
import { IconButton, Tooltip, VStack, useColorMode, useColorModeValue } from '@chakra-ui/react';
import PregnantWomanOutlinedIcon from '@mui/icons-material/PregnantWomanOutlined';
import BabyChangingStationIcon from '@mui/icons-material/BabyChangingStation';
import MapIcon from '@mui/icons-material/Map';

import React from 'react';
import { useNavigate } from 'react-router-dom';
import ColorModeToggleButton from './ColorModeToggleButton';

export default function FloatingActionButtons({ setSettingsIsOpen, handleSearchPlacesDialogOpen, currentUser, setSearchBarIsOpen }) {
    const navigate = useNavigate();

    const handleSettingsPress = () => {
        setSettingsIsOpen(true);
    };

    const handleLogin = () => {
        navigate("/login");
    };

    const handleMilestones = () => {
        navigate("/milestone");
    };

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
            <Tooltip label="Log in">
                <IconButton
                    icon={<UnlockIcon height="30px" width="30px" />}
                    onClick={handleLogin}
                    width="56px"
                    height="56px"
                    borderRadius="50%"
                    boxShadow="md"
                    _hover={{ boxShadow: "lg" }}
                    zIndex={999}
                />
            </Tooltip>
            {currentUser ?
                <Tooltip label="User Account">
                    <IconButton
                        icon={<HamburgerIcon height="30px" width="30px" />}
                        onClick={handleSettingsPress}
                        width="56px"
                        height="56px"
                        borderRadius="50%"
                        boxShadow="md"
                        _hover={{ boxShadow: "lg" }}
                        zIndex={999}
                    />
                </Tooltip>
                :
                null
            }
            <Tooltip label="Search">
                <IconButton
                    icon={<SearchIcon height="30px" width="30px" />}
                    onClick={() => setSearchBarIsOpen(true)}
                    width="56px"
                    height="56px"
                    borderRadius="50%"
                    boxShadow="md"
                    _hover={{ boxShadow: "lg" }}
                    zIndex={999}
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
                    zIndex={999}
                    onClick={handleMilestones}
                >
                    Baby Milestones
                </IconButton>
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
