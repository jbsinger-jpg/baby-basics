// Module imports
import { Box, useColorModeValue } from '@chakra-ui/react';
import { useState } from 'react';

// Relative imports
import { screenBackground } from '../defaultStyle';
import StyledSelect from '../components/StyledSelect';
import SleepPage from './SleepPage';
import GrowthPage from './GrowthPage';

export default function GraphPage({ childOptions }) {
    const _screenBackground = useColorModeValue(screenBackground.light, screenBackground.dark);
    const [selectedPageOption, setSelectedPageOption] = useState("growth");
    const pageOptions = [
        { label: "Growth", value: "growth", key: 0 },
        { label: "Sleep", value: "sleep", key: 1 },
    ];

    return (
        <Box
            bg={_screenBackground}
            height="90vh"
            width="100vw"
            overflowX="hidden"
        >
            <StyledSelect
                w="95vw"
                removeNullOption
                options={pageOptions}
                onChange={(event) => setSelectedPageOption(event.target.value)}
            />
            {selectedPageOption === "growth" &&
                <GrowthPage childOptions={childOptions} />
            }
            {selectedPageOption === "sleep" &&
                <SleepPage childOptions={childOptions} />
            }
        </Box>
    );
}
