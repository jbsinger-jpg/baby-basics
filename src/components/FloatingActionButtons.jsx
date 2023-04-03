import { HamburgerIcon, LinkIcon, MoonIcon, SearchIcon, SunIcon, UnlockIcon } from '@chakra-ui/icons';
import { IconButton, Tooltip, VStack, useColorMode, useColorModeValue } from '@chakra-ui/react';
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

export default function FloatingActionButtons({ setSettingsIsOpen, handleSearchPlacesDialogOpen, currentUser, setSearchBarIsOpen }) {
    const navigate = useNavigate();

    const handleSettingsPress = () => {
        setSettingsIsOpen(true);
    };

    const handleLogin = () => {
        navigate("/login");
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
                    icon={<LinkIcon height="30px" width="30px" />}
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
                <Tooltip label="Other Pages">
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
        </VStack>
    );
}
