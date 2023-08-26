import { Box } from '@chakra-ui/layout';
import React from 'react';
import { useState } from 'react';

export default function LandingPageCard({ onClick, height }) {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <Box
            bg={isHovered ? "gray.300" : "grey"} // Change background color on hover
            cursor={isHovered ? "pointer" : "default"} // Change cursor style on hover
            h={height}
            mr="50px"
            w="95vw"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
        >
            LandingPageCard
        </Box>
    );
}
