// module imports
import { VStack } from '@chakra-ui/react';
import HomeIcon from '@mui/icons-material/Home';
import React from 'react';
import { useNavigate } from 'react-router-dom';

// relative imports
import ColorModeToggleButton from '../ColorModeToggleButton';
import FabTemplate from './StandardFab';

export default function FloatingActionButtonsMaternalInfo() {
    const navigate = useNavigate();
    const handleGoToHome = () => {
        navigate("/");
    };

    return (
        <VStack
            top="14"
            right="4"
            position="fixed"
            zIndex={999}

        >
            <ColorModeToggleButton />
            <FabTemplate
                label="Home"
                onClick={handleGoToHome}
                icon={<HomeIcon fontSize="large" />}
            />
        </VStack>
    );
}
