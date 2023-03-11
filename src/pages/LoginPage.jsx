import { Box, Button, Card, HStack, Input, Tab, TabList, TabPanel, TabPanels, Tabs, VStack } from '@chakra-ui/react';
import React from 'react';

export default function LoginPage() {
    return (
        <Box w="100vw" h="100vh" display="flex" alignItems="center" justifyContent="center" bg="blackAlpha.900">
            <Card w="40vw" h="60vh" bg={"gray.400"}>
                <Tabs variant='enclosed' isFitted>
                    <TabList>
                        <Tab _selected={{ color: 'white', bg: 'blackAlpha.400' }}>Sign-In</Tab>
                        <Tab _selected={{ color: 'white', bg: 'blackAlpha.100' }}>Sign-Up</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Box display="flex" flexDir="column" justifyContent={"space-evenly"} alignContent="center" gap="2" position="absolute" top="20" width="100%" paddingRight="8">
                                <Input placeholder='email' />
                                <Input placeholder='password' />
                                <Box display="flex" justifyContent={"flex-end"}> Forgot Password? </Box>
                            </Box>
                            <Box display="flex" flexDir="column" justifyContent={"space-evenly"} alignContent="center" gap="2" position="absolute" bottom="20" width="100%" paddingRight="8">
                                <Button>Sign-in</Button>
                            </Box>
                        </TabPanel>
                        <TabPanel>
                            <VStack justifyContent={"flex-start"} position="absolute" top="20" width="100%" paddingRight="8">
                                <Input placeholder='first name' />
                                <Input placeholder='last name' />
                                <Input placeholder='email' />
                                <HStack w="100%">
                                    <Input placeholder='password' />
                                    <Input placeholder='confirm password' />
                                </HStack>
                            </VStack>
                            <Box display="flex" flexDir="column" justifyContent={"space-evenly"} alignContent="center" gap="2" position="absolute" bottom="20" width="100%" paddingRight="8">
                                <Button>Sign-up</Button>
                            </Box>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Card>
        </Box>
    );
}
