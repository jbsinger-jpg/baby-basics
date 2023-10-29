import PhotoIcon from '@mui/icons-material/Photo';

import FabTemplate from './StandardFab';
import ColorModeToggleButton from '../ColorModeToggleButton';
import FloatingActionButtonContainer from './FloatingActionButtonContainer';
import MotionContainerFAB from '../animated/MotionContainerFAB';
import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';

export default function FloatingActionButtonsBabyImages({ setBabyImagesModalIsOpen }) {
    const [buttonPressed, setButtonPressed] = useState(false);
    return (
        <FloatingActionButtonContainer>
            <MotionContainerFAB isPressed={buttonPressed}>
                <ColorModeToggleButton />
                <FabTemplate
                    icon={<PhotoIcon fontSize="large" />}
                    onClick={() => setBabyImagesModalIsOpen(true)}
                    label={"Add more Pictures"}
                />
            </MotionContainerFAB>
            <FabTemplate
                icon={buttonPressed ? <ChevronUpIcon boxSize={8} /> : <ChevronDownIcon boxSize={8} />}
                onClick={() => setButtonPressed(!buttonPressed)}
            />
        </FloatingActionButtonContainer>
    );
}
