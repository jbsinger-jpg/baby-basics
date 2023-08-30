import { VStack } from '@chakra-ui/react';
import React from 'react';
import FabTemplate from './StandardFab';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import ColorModeToggleButton from '../ColorModeToggleButton';
import { SearchIcon } from '@chakra-ui/icons';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import BabyProgressModal from '../modals/BabyProgressModal';
import { useState } from 'react';

export default function FloatingActionButtonsGrowthAndSleep({ setSearchBarIsOpen }) {
    const [progressModalVisible, setProgressModalVisible] = useState(false);

    const navigate = useNavigate();

    return (
        <VStack
            bottom="0"
            right="4"
            position="fixed"
            zIndex={999}
            pb="2"
        >
            <ColorModeToggleButton />
            <FabTemplate
                icon={<HomeIcon fontSize="large" />}
                onClick={() => navigate("/")}
                label={"Home"}
            />
            <FabTemplate
                icon={<SearchIcon height="30px" width="30px" />}
                onClick={() => setSearchBarIsOpen(true)}
                label={"Search"}
            />
            <FabTemplate
                onClick={() => setProgressModalVisible(true)}
                icon={<FormatListBulletedIcon fontSize='small' />}
            />
            <BabyProgressModal
                progressModalVisible={progressModalVisible}
                setProgressModalVisible={setProgressModalVisible}
            />
        </VStack>
    );
}
