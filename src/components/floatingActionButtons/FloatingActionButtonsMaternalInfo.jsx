// module imports
import HomeIcon from '@mui/icons-material/Home';
import React from 'react';
import { useNavigate } from 'react-router-dom';

// relative imports
import ColorModeToggleButton from '../ColorModeToggleButton';
import FabTemplate from './StandardFab';
import FloatingActionButtonContainer from './FloatingActionButtonContainer';

export default function FloatingActionButtonsMaternalInfo() {
    const navigate = useNavigate();
    const handleGoToHome = () => {
        navigate("/");
    };

    return (
        <FloatingActionButtonContainer>
            <ColorModeToggleButton />
            <FabTemplate
                label="Home"
                onClick={handleGoToHome}
                icon={<HomeIcon fontSize="large" />}
            />
        </FloatingActionButtonContainer>
    );
}
