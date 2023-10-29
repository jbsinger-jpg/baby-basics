import React from 'react';
import FabTemplate from './StandardFab';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import ColorModeToggleButton from '../ColorModeToggleButton';
import { AddIcon, ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import BabyProgressModal from '../modals/BabyProgressModal';
import { useState } from 'react';
import FloatingActionButtonContainer from './FloatingActionButtonContainer';
import MotionContainerFAB from '../animated/MotionContainerFAB';

export default function FloatingActionButtonsGrowthAndSleep({ setChildDrawerVisible }) {
    const [progressModalVisible, setProgressModalVisible] = useState(false);
    const [buttonPressed, setButtonPressed] = useState(false);
    const navigate = useNavigate();

    return (
        <FloatingActionButtonContainer>
            <MotionContainerFAB isPressed={buttonPressed}>
                <ColorModeToggleButton />
                <FabTemplate
                    icon={<HomeIcon fontSize="large" />}
                    onClick={() => navigate("/")}
                    label={"Home"}
                />
                <FabTemplate
                    onClick={() => setProgressModalVisible(true)}
                    icon={<FormatListBulletedIcon fontSize='small' />}
                />
                <BabyProgressModal
                    progressModalVisible={progressModalVisible}
                    setProgressModalVisible={setProgressModalVisible}
                />
                <FabTemplate
                    label="Add Child"
                    onClick={() => setChildDrawerVisible(true)}
                    icon={<AddIcon fontSize="large" />}
                />
            </MotionContainerFAB>
            <FabTemplate
                icon={buttonPressed ? <ChevronUpIcon boxSize={8} /> : <ChevronDownIcon boxSize={8} />}
                onClick={() => setButtonPressed(!buttonPressed)}
            />
        </FloatingActionButtonContainer>
    );
}
