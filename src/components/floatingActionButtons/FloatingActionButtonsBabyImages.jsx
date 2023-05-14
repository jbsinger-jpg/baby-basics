import { VStack } from '@chakra-ui/react';
import PhotoIcon from '@mui/icons-material/Photo';
import React from 'react';

import FabTemplate from './StandardFab';

export default function FloatingActionButtonsBabyImages({ setBabyImagesModalIsOpen }) {
    return (
        <VStack
            top="14"
            right="4"
            position="fixed"
            zIndex={999}

        >
            <FabTemplate
                icon={<PhotoIcon fontSize="large" />}
                onClick={() => setBabyImagesModalIsOpen(true)}
                label={"Add more Pictures"}
            />
        </VStack>
    );
}
