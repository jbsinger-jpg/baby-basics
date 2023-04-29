// module imports
import { IconButton, Tooltip } from '@chakra-ui/react';
import React from 'react';

// relative imports
// none

export default function FabTemplate({ onClick, icon, label }) {
    return (
        <Tooltip
            label={label}
            placement="auto"
        >
            <IconButton
                onClick={onClick}
                icon={icon}
                width="56px"
                height="56px"
                borderRadius="50%"
                boxShadow="md"
                _hover={{ boxShadow: "lg" }}
                zIndex={999}
            />
        </Tooltip>
    );
}
