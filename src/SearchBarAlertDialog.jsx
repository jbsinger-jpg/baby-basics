import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import React from 'react';

export default function SearchBarAlertDialog({ searchBarIsOpen, setSearchBarIsOpen }) {
    return (
        <AlertDialog
            isOpen={searchBarIsOpen}
            placement='right'
            onClose={() => setSearchBarIsOpen(false)}
            size="md"
        >
            <AlertDialogOverlay />
            <AlertDialogContent>
                <AlertDialogHeader>Filter Items</AlertDialogHeader>
                <AlertDialogBody>
                    <Tabs align='start' variant='enclosed' w="100%" h="100%" isFitted>
                        <TabList>
                            <Tab _selected={{ color: 'white', bg: 'blackAlpha.400' }}>
                                Clothes
                            </Tab>
                            <Tab _selected={{ color: 'white', bg: 'blackAlpha.400' }}>
                                Food
                            </Tab>
                            <Tab _selected={{ color: 'white', bg: 'blackAlpha.400' }}>
                                Diapers
                            </Tab>
                            <Tab _selected={{ color: 'white', bg: 'blackAlpha.400' }}>
                                Utilities
                            </Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                Clothing
                            </TabPanel>
                            <TabPanel>
                                Food
                            </TabPanel>
                            <TabPanel>
                                Diapers
                            </TabPanel>
                            <TabPanel>
                                Utilities
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </AlertDialogBody>
                <AlertDialogFooter>
                    <Button variant='outline' mr={3} onClick={() => setSearchBarIsOpen(false)}>
                        Close
                    </Button>
                    <Button>Search</Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>);
}
