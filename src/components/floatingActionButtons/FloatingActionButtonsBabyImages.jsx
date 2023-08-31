import { VStack } from '@chakra-ui/react';
import PhotoIcon from '@mui/icons-material/Photo';
import React from 'react';

import FabTemplate from './StandardFab';
import ColorModeToggleButton from '../ColorModeToggleButton';

export default function FloatingActionButtonsBabyImages({ setBabyImagesModalIsOpen }) {
    return (
        <VStack
            bottom="0"
            right="4"
            position="fixed"
            zIndex={999}

        >
            <ColorModeToggleButton />
            <FabTemplate
                icon={<PhotoIcon fontSize="large" />}
                onClick={() => setBabyImagesModalIsOpen(true)}
                label={"Add more Pictures"}
            />
        </VStack>
    );
}
