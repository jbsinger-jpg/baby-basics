// module imports
import { ChevronDownIcon, ChevronUpIcon, SearchIcon } from '@chakra-ui/icons';

// relative imports
import ColorModeToggleButton from '../ColorModeToggleButton';
import SearchBarAlertDialog from '../modals/SearchBarModal';
import FabTemplate from './StandardFab';
import FloatingActionButtonContainer from './FloatingActionButtonContainer';
import MotionContainerFAB from '../animated/MotionContainerFAB';
import { useState } from 'react';

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
    setBathData,
    tabIndex,
    setTabIndex,
    setSearchInProgress,
}) {

    const [buttonPressed, setButtonPressed] = useState(false);

    return (
        <FloatingActionButtonContainer left>
            <MotionContainerFAB isPressed={buttonPressed}>
                <ColorModeToggleButton />
                <FabTemplate
                    icon={<SearchIcon height="30px" width="30px" />}
                    onClick={() => setSearchBarIsOpen(true)}
                    label={"Search"}
                />
            </MotionContainerFAB>
            <FabTemplate
                icon={buttonPressed ? <ChevronUpIcon boxSize={8} /> : <ChevronDownIcon boxSize={8} />}
                onClick={() => setButtonPressed(!buttonPressed)}
            />
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
                setBathData={setBathData}
                tabIndex={tabIndex}
                setTabIndex={setTabIndex}
                setSearchInProgress={setSearchInProgress}
            />
        </FloatingActionButtonContainer>
    );
}
