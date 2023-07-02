import { VStack } from '@chakra-ui/react';
import React from 'react';
import FabTemplate from './StandardFab';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';


export default function FloatingActionButtonsDiaperTracking() {
    const navigate = useNavigate();

    return (
        <VStack
            top="14"
            right="4"
            position="fixed"
            zIndex={999}

        >
            <FabTemplate
                icon={<HomeIcon fontSize="large" />}
                onClick={() => navigate("/history")}
                label={"View Tracked Progress"}
            />
        </VStack>
    );
}
