import React from 'react';
import FloatingActionButtonContainer from './FloatingActionButtonContainer';
import ColorModeToggleButton from '../ColorModeToggleButton';
import { useNavigate } from 'react-router-dom';
import FabTemplate from './StandardFab';
import HomeIcon from '@mui/icons-material/Home';

export default function FloatingActionButtonsEvents() {
    const navigate = useNavigate();

    return (
        <FloatingActionButtonContainer>
            <ColorModeToggleButton />
            <FabTemplate
                icon={<HomeIcon fontSize="large" />}
                onClick={() => navigate("/")}
                label={"Home"}
            />
        </FloatingActionButtonContainer>
    );
}
