// module imports
import { IconButton, Tooltip } from '@chakra-ui/react';
import React from 'react';

// relative imports
// none

export default function FabTemplate({ onClick, icon, label, height, isLoading }) {
    return (
        <Tooltip
            label={label}
            placement="auto"
        >
            <IconButton
                onClick={onClick}
                icon={icon}
                boxShadow="md"
                _hover={{ boxShadow: "lg" }}
                // if height given style component to fill page
                width={height ? "95vw" : "56px"}
                height={height ? height : "56px"}
                borderRadius={height ? "0%" : "50%"}
                zIndex={!height && 999}
                isLoading={isLoading}
            // end if
            />
        </Tooltip>
    );
}
