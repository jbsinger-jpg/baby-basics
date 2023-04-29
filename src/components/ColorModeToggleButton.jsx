// module imports
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { IconButton, Tooltip, useColorMode, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

// relative imports
// none

export default function ColorModeToggleButton() {
    const { toggleColorMode } = useColorMode();

    return (
        <Tooltip
            label="Change color mode"
            placement="auto"
        >
            <IconButton
                icon={
                    useColorModeValue("Dark", "Light") === "Dark" ?
                        <MoonIcon height="30px" width="30px" />
                        :
                        <SunIcon height="30px" width="30px" />
                }
                onClick={toggleColorMode}
                width="56px"
                height="56px"
                borderRadius="50%"
                boxShadow="md"
                _hover={{ boxShadow: "lg" }}
            >
                {useColorModeValue("Dark", "Light")}
            </IconButton>
        </Tooltip>
    );
};
