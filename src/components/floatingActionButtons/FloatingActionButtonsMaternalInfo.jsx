// module imports
import HomeIcon from '@mui/icons-material/Home';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// relative imports
import ColorModeToggleButton from '../ColorModeToggleButton';
import FabTemplate from './StandardFab';
import FloatingActionButtonContainer from './FloatingActionButtonContainer';
import MotionContainerFAB from '../animated/MotionContainerFAB';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';

export default function FloatingActionButtonsMaternalInfo() {
    const navigate = useNavigate();
    const handleGoToHome = () => {
        navigate("/");
    };
    const [buttonPressed, setButtonPressed] = useState(false);

    return (
        <FloatingActionButtonContainer>
            <MotionContainerFAB isPressed={buttonPressed} >
                <ColorModeToggleButton />
                <FabTemplate
                    label="Home"
                    onClick={handleGoToHome}
                    icon={<HomeIcon fontSize="large" />}
                />
            </MotionContainerFAB>
            <FabTemplate
                icon={buttonPressed ? <ChevronUpIcon boxSize={8} /> : <ChevronDownIcon boxSize={8} />}
                onClick={() => setButtonPressed(!buttonPressed)}
            />
        </FloatingActionButtonContainer>
    );
}
