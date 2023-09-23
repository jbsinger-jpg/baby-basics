// module imports
import { SearchIcon } from '@chakra-ui/icons';
import { VStack } from '@chakra-ui/react';

// relative imports
import ColorModeToggleButton from '../ColorModeToggleButton';
import SearchBarAlertDialog from '../modals/SearchBarModal';
import FabTemplate from './StandardFab';
import FloatingActionButtonContainer from './FloatingActionButtonContainer';

export default function FloatingActionButtons({
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
    setSleepData,
    tabIndex,
    setTabIndex,
    setSearchInProgress,
}) {


    return (
        <FloatingActionButtonContainer left>
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
                setSleepData={setSleepData}
                tabIndex={tabIndex}
                setTabIndex={setTabIndex}
                setSearchInProgress={setSearchInProgress}
            />
            <VStack>
                <ColorModeToggleButton />
                <FabTemplate
                    icon={<SearchIcon height="30px" width="30px" />}
                    onClick={() => setSearchBarIsOpen(true)}
                    label={"Search"}
                />
            </VStack>
        </FloatingActionButtonContainer>
    );
}
