import { Box, Button, ButtonGroup, Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, VStack, useColorModeValue } from '@chakra-ui/react';
import { useState } from 'react';
import { cardBackground, screenBackground } from '../defaultStyle';

export default function SleepPage() {
    const _cardBackground = useColorModeValue(cardBackground.light, cardBackground.dark);
    const _screenBackground = useColorModeValue(screenBackground.light, screenBackground.dark);

    const [searchBarIsOpen, setSearchBarIsOpen] = useState(false);

    const clearSearch = () => {
        // TODO: Clear sleep search fields
        // TODO: Update firebase data for page
    };

    const generateSearch = () => {
        // TODO: Generate data according to query fields
    };

    return (
        <Box
            width="100vw"
            height="100vh"
            display="flex"
            justifyContent="center"
            alignItems="start"
        >
            <VStack>

            </VStack>
            <Drawer
                onClose={() => setSearchBarIsOpen(false)}
                bg={_cardBackground}
                isOpen={searchBarIsOpen}
                placement='right'
                size="sm"
            >
                <DrawerOverlay />
                <DrawerContent
                    bg={_screenBackground}
                >
                    <DrawerHeader>Filter Items</DrawerHeader>
                    <DrawerBody>
                        {/* TODO: Add Search Fields */}
                    </DrawerBody>
                    <DrawerFooter>
                        <ButtonGroup>
                            <Button onClick={clearSearch}>Clear</Button>
                            <Button onClick={generateSearch}>Search</Button>
                        </ButtonGroup>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </Box>
    );
}
