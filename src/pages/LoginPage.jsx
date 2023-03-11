import { Box, Button, Card, HStack, Input, Tab, TabList, TabPanel, TabPanels, Tabs, VStack, useToast } from '@chakra-ui/react';
import React, { useState } from 'react';
import validator from 'validator';
import { auth } from '../firebaseConfig';

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const toast = useToast();

    const sendPasswordResetEmail = (email) => {
        if (validator.isEmail(email)) {
            auth.sendPasswordResetEmail(email)
                .then(() => {
                    console.log('Password reset email sent!');
                    toast({
                        title: 'Reset Email sent!',
                        description: "We sent an email to the one you have provided",
                        status: 'success',
                        duration: 9000,
                        isClosable: true,
                    });
                })
                .catch((error) => {
                    console.error(error);
                    toast({
                        title: 'Reset Email not sent!',
                        description: "We were unable to send an email to the one you have provided: error code " + error,
                        status: 'error',
                        duration: 9000,
                        isClosable: true,
                    });
                });
        }
        else {
            toast({
                title: 'Reset Email not sent!',
                description: "We were unable to send an email to the one you have provided email is invalid!",
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
        }
    };


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
                                <Input placeholder='email' value={email} onChange={(event) => { setEmail(event.target.value); }} />
                                <Input placeholder='password' value={password} onChange={(event) => { setPassword(event.target.value); }} />
                                <Box display="flex" justifyContent={"flex-end"}>
                                    <Button onClick={() => sendPasswordResetEmail(email)}>Forgot Password? </Button>
                                </Box>
                            </Box>
                            <Box display="flex" flexDir="column" justifyContent={"space-evenly"} alignContent="center" gap="2" position="absolute" bottom="20" width="100%" paddingRight="8">
                                <Button>Sign-in</Button>
                            </Box>
                        </TabPanel>
                        <TabPanel>
                            <VStack justifyContent={"flex-start"} position="absolute" top="20" width="100%" paddingRight="8">
                                <Input placeholder='first name' />
                                <Input placeholder='last name' />
                                <Input placeholder='email' value={email} onChange={(event) => { setEmail(event.target.value); }} />
                                <HStack w="100%">
                                    <Input placeholder='password' value={password} onChange={(event) => { setPassword(event.target.value); }} />
                                    <Input placeholder='confirm password' value={confirmPassword} onChange={(event) => { setConfirmPassword(event.target.value); }} />
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
