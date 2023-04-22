import { HamburgerIcon, SearchIcon, UnlockIcon } from '@chakra-ui/icons';
import { HStack, IconButton, Tooltip, VStack } from '@chakra-ui/react';
import PregnantWomanOutlinedIcon from '@mui/icons-material/PregnantWomanOutlined';
import BabyChangingStationIcon from '@mui/icons-material/BabyChangingStation';
import MapIcon from '@mui/icons-material/Map';

import React from 'react';
import { useNavigate } from 'react-router-dom';
import ColorModeToggleButton from './ColorModeToggleButton';
import SearchBarAlertDialog from './modals/SearchBarModal';

export default function FloatingActionButtons({ setSettingsIsOpen, handleSearchPlacesDialogOpen, currentUser, setSearchBarIsOpen, searchBarIsOpen, setFoodData, setClothingData, setDiaperData, tabIndex, setTabIndex }) {
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
        <HStack
            top="14"
            right="4"
            position="fixed"
            h="600px"
        >
            {searchBarIsOpen &&
                <SearchBarAlertDialog
                    searchBarIsOpen={searchBarIsOpen}
                    setSearchBarIsOpen={setSearchBarIsOpen}
                    setFoodData={setFoodData}
                    setClothingData={setClothingData}
                    setDiaperData={setDiaperData}
                    tabIndex={tabIndex}
                    setTabIndex={setTabIndex}
                />
            }
            <VStack>
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
                    />
                </Tooltip>
                <Tooltip label="Maternity">
                    <IconButton
                        icon={<PregnantWomanOutlinedIcon fontSize="large" />}
                        width="56px"
                        height="56px"
                        borderRadius="50%"
                        boxShadow="md"
                        _hover={{ boxShadow: "lg" }}
                        zIndex={999}
                        onClick={handleMaternalResources}
                    />
                </Tooltip>
            </VStack>
        </HStack>

    );
}
