import React, { useState } from 'react';
import FloatingActionButtonContainer from './FloatingActionButtonContainer';
import ColorModeToggleButton from '../ColorModeToggleButton';
import { useNavigate } from 'react-router-dom';
import FabTemplate from './StandardFab';
import HomeIcon from '@mui/icons-material/Home';
import MotionContainerFAB from '../animated/MotionContainerFAB';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';

export default function FloatingActionButtonsEvents() {
    const navigate = useNavigate();
    const [buttonPressed, setButtonPressed] = useState(false);

    return (
        <FloatingActionButtonContainer>
            <MotionContainerFAB isPressed={buttonPressed}>
                <ColorModeToggleButton />
                <FabTemplate
                    icon={<HomeIcon fontSize="large" />}
                    onClick={() => navigate("/")}
                    label={"Home"}
                />
            </MotionContainerFAB>
            <FabTemplate
                icon={buttonPressed ? <ChevronUpIcon boxSize={8} /> : <ChevronDownIcon boxSize={8} />}
                onClick={() => setButtonPressed(!buttonPressed)}
            />
        </FloatingActionButtonContainer>
    );
}
