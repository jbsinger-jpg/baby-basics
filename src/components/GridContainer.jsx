import { Grid, useColorModeValue, useMediaQuery } from '@chakra-ui/react';
import { screenBackground } from '../defaultStyle';

export default function GridContainer({ children }) {
    const _screenBackground = useColorModeValue(screenBackground.light, screenBackground.dark);
    const [isLargerThan700] = useMediaQuery("(min-width: 700px)");
    const [isLargerThan900] = useMediaQuery("(min-width: 900px)");
    const [isLargerThan1300] = useMediaQuery("(min-width: 1300px)");

    const getTemplateColumns = () => {
        if (!isLargerThan700) {
            return 'repeat(1, 1fr)';
        }

        if (!isLargerThan900) {
            return 'repeat(2, 1fr)';
        }

        if (!isLargerThan1300) {
            return 'repeat(3, 1fr)';
        }

        return 'repeat(4, 1fr)';
    };

    return (
        <Grid
            templateRows='repeat(1, 1fr)'
            templateColumns={getTemplateColumns()}
            gap="5"
            bg={_screenBackground}
        >
            {children}
        </Grid>
    );
}
