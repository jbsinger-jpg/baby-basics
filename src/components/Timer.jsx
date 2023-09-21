import { Box, HStack, Heading, IconButton, VStack } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import RefreshIcon from '@mui/icons-material/Refresh';

export default function Timer({ title, setValue, tabIndex }) {
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let interval = null;

        if (isActive) {
            interval = setInterval(() => {
                setSeconds((prevSeconds) => prevSeconds + 1);
                if (setValue) {
                    setValue((prevSeconds) => prevSeconds + 1);
                }
            }, 1000);
        } else if (!isActive && seconds !== 0) {
            clearInterval(interval);
        }

        return () => clearInterval(interval);

        // eslint-disable-next-line
    }, [isActive, seconds]);

    useEffect(() => {
        if (tabIndex) {
            setValue(0);
            setSeconds(0);
        }
        // eslint-disable-next-line
    }, [tabIndex]);

    const handleStart = () => {
        setIsActive(true);
    };

    const handlePause = () => {
        setIsActive(false);
    };

    const handleReset = () => {
        setSeconds(0);
        if (setValue)
            setValue(0);

        setIsActive(false);
    };

    const formatTime = (time) => {
        const hours = Math.floor(time / 3600).toString().padStart(2, '0');
        const minutes = Math.floor((time % 3600) / 60).toString().padStart(2, '0');
        const seconds = (time % 60).toString().padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    };
    return (
        <Box alignItems="flex-start" display="flex" flexDir="column">
            <Heading>
                {title}
            </Heading>
            <VStack>
                <Heading>{formatTime(seconds)}</Heading>
                {!isActive ?
                    <IconButton
                        onClick={handleStart}
                        borderRadius={"50%"}
                        icon={<PlayCircleOutlineIcon />}
                    />
                    :
                    <HStack>
                        <IconButton
                            onClick={handlePause}
                            borderRadius={"50%"}
                            icon={<PauseCircleOutlineIcon />}
                        />
                        <IconButton
                            onClick={handleReset}
                            borderRadius={"50%"}
                            icon={<RefreshIcon />}
                        />
                    </HStack>
                }
            </VStack>
        </Box>
    );
}
