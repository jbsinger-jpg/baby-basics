import React from 'react';
import FloatingActionButtonContainer from './FloatingActionButtonContainer';
import FabTemplate from './StandardFab';
import { AddIcon } from '@chakra-ui/icons';

export default function FloatingActionButtonsFeedingDiaper({ setChildDrawerVisible }) {
    return (
        <FloatingActionButtonContainer>
            <FabTemplate
                label="Add Child"
                onClick={() => setChildDrawerVisible(true)}
                icon={<AddIcon fontSize="large" />}
            />
        </FloatingActionButtonContainer>
    );
}
