// module imports
import { HamburgerIcon, SearchIcon } from '@chakra-ui/icons';
import { HStack, VStack } from '@chakra-ui/react';
import MapIcon from '@mui/icons-material/Map';
import React from 'react';

// relative imports
import ColorModeToggleButton from '../ColorModeToggleButton';
import SearchBarAlertDialog from '../modals/SearchBarModal';
import FabTemplate from './StandardFab';

export default function FloatingActionButtons({
    setSettingsIsOpen,
    handleSearchPlacesDialogOpen,
    currentUser,
    setSearchBarIsOpen,
    searchBarIsOpen,
    setFoodData,
    setClothingData,
    setDiaperData,
    setMaternalData,
    setFormulaData,
    setToyData,
    setMonitorData,
    setSeatData,
    setStrollerData,
    setVitaminData,
    tabIndex,
    setTabIndex
}) {

    const handleSettingsPress = () => {
        setSettingsIsOpen(true);
    };

    return (
        <HStack
            top="14"
            right="4"
            position="fixed"
            h="600px"
            alignItems="start"
        >
            <SearchBarAlertDialog
                searchBarIsOpen={searchBarIsOpen}
                setSearchBarIsOpen={setSearchBarIsOpen}
                setFoodData={setFoodData}
                setClothingData={setClothingData}
                setDiaperData={setDiaperData}
                setMaternalData={setMaternalData}
                setFormulaData={setFormulaData}
                setToyData={setToyData}
                setMonitorData={setMonitorData}
                setSeatData={setSeatData}
                setStrollerData={setStrollerData}
                setVitaminData={setVitaminData}
                tabIndex={tabIndex}
                setTabIndex={setTabIndex}
            />
            <VStack>
                <ColorModeToggleButton />
                <FabTemplate
                    icon={<MapIcon fontSize="large" />}
                    onClick={handleSearchPlacesDialogOpen}
                    label={"Look up a Location"}
                />
                {currentUser ?
                    <FabTemplate
                        icon={<HamburgerIcon height="30px" width="30px" />}
                        onClick={handleSettingsPress}
                        label={"User Account"}
                    />
                    :
                    null
                }
                <FabTemplate
                    icon={<SearchIcon height="30px" width="30px" />}
                    onClick={() => setSearchBarIsOpen(true)}
                    label={"Search"}
                />
            </VStack>
        </HStack>

    );
}
