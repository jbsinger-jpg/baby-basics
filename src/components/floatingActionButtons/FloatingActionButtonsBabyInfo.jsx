// module imports
import { VStack } from '@chakra-ui/react';
import PregnantWomanOutlinedIcon from '@mui/icons-material/PregnantWomanOutlined';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import MapIcon from '@mui/icons-material/Map';
import HomeIcon from '@mui/icons-material/Home';
import React from 'react';
import { useNavigate } from 'react-router-dom';

// relative imports
import ColorModeToggleButton from '../ColorModeToggleButton';
import FabTemplate from './StandardFab';

export default function FloatingActionButtonsBabyInfo({ handleSearchPlacesDialogOpen, setProgressModalVisible }) {
    const navigate = useNavigate();

    const handleMaternalResources = () => {
        navigate("/maternal");
    };

    const handleGoToHome = () => {
        navigate("/");
    };

    const handleDocumentProgress = () => {
        setProgressModalVisible(true);
    };

    return (
        <>
            <VStack
                top="14"
                right="4"
                position="fixed"
                zIndex={999}
            >
                <ColorModeToggleButton />
                <FabTemplate
                    label="Look up a Location"
                    onClick={handleSearchPlacesDialogOpen}
                    icon={<MapIcon fontSize="large" />}
                />
                <FabTemplate
                    label="Maternity"
                    onClick={handleMaternalResources}
                    icon={<PregnantWomanOutlinedIcon fontSize="large" />}
                />
                <FabTemplate
                    label="Home"
                    onClick={handleGoToHome}
                    icon={<HomeIcon fontSize="large" />}
                />
            </VStack>
            <VStack
                bottom="14"
                right="4"
                position="fixed"
                zIndex={999}
            >
                <FabTemplate
                    label="Document Progress"
                    onClick={handleDocumentProgress}
                    icon={<FormatListBulletedIcon fontSize="large" />}
                />
            </VStack>
        </>
    );
}
