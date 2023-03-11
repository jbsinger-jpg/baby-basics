import { Box, Button, Card, HStack, Input, Tab, TabList, TabPanel, TabPanels, Tabs, VStack, useToast, IconButton } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import React, { useState } from 'react';
import validator from 'validator';

import { auth } from '../firebaseConfig';

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
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

    const handleSignIn = (event) => {
        event.preventDefault();
        auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Handle successful sign-in
                console.log("User Credentials: ", userCredential);
            })
            .catch((error) => {
                // Handle sign-in error
                console.error(error);
            });
    };

    const handleSignUp = (event) => {
        event.preventDefault();
        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Handle successful sign-up
                // console.log("User Credentials: ", userCredential);
            })
            .catch((error) => {
                // Handle sign-up error
                console.error(error);
            });
    };

    const handleSignOut = () => {
        auth.signOut()
            .then(() => {
                // Handle successful sign-out
                console.log("Signed out!");
            })
            .catch((error) => {
                // Handle sign-out error
                console.error(error);
            });
    };

    return (
        <Box w="100vw" h="100vh" display="flex" alignItems="center" justifyContent="center" bg="blackAlpha.900">
            <Card w="40vw" h="60vh" bg={"gray.400"}>
                <Tabs variant='enclosed' isFitted>
                    <TabList>
                        <Tab _selected={{ color: 'white', bg: 'blackAlpha.400' }}>
                            Sign-In
                        </Tab>
                        <Tab _selected={{ color: 'white', bg: 'blackAlpha.100' }}>
                            Sign-Up
                        </Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Box display="flex" flexDir="column" justifyContent={"space-evenly"} alignContent="center" gap="2" position="absolute" top="20" width="100%" paddingRight="8">
                                <Input placeholder='email' value={email} onChange={(event) => { setEmail(event.target.value); }} />
                                <HStack>
                                    <Input
                                        type={passwordVisible ? "text" : "password"}
                                        placeholder='password'
                                        value={password}
                                        onChange={(event) => { setPassword(event.target.value); }}
                                    />
                                    <IconButton
                                        icon={passwordVisible ? <ViewIcon /> : <ViewOffIcon />}
                                        onClick={() => { setPasswordVisible(!passwordVisible); }}
                                        variant="unstyled"
                                    />
                                </HStack>
                                <HStack display="flex" justifyContent={"flex-end"}>
                                    <Button
                                        onClick={() => sendPasswordResetEmail(email)}
                                    >
                                        Forgot Password?
                                    </Button>
                                    <Button
                                        onClick={handleSignOut}>
                                        Sign out
                                    </Button>
                                </HStack>
                            </Box>
                            <Box display="flex" flexDir="column" justifyContent={"space-evenly"} alignContent="center" gap="2" position="absolute" bottom="20" width="100%" paddingRight="8">
                                <Button
                                    onClick={handleSignIn}
                                >
                                    Sign-in
                                </Button>
                            </Box>
                        </TabPanel>
                        <TabPanel>
                            <VStack justifyContent={"flex-start"} position="absolute" top="20" width="100%" paddingRight="8">
                                <Input
                                    placeholder='first name'
                                />
                                <Input
                                    placeholder='last name'
                                />
                                <Input
                                    placeholder='email'
                                    value={email}
                                    onChange={(event) => { setEmail(event.target.value); }}
                                />
                                <HStack w="100%">
                                    <Input
                                        type={passwordVisible ? "text" : "password"}
                                        placeholder='password'
                                        value={password}
                                        onChange={(event) => { setPassword(event.target.value); }}
                                    />
                                    <IconButton
                                        icon={passwordVisible ? <ViewIcon /> : <ViewOffIcon />}
                                        onClick={() => { setPasswordVisible(!passwordVisible); }}
                                        variant="unstyled"
                                    />
                                    <Input
                                        type={confirmPasswordVisible ? "text" : "password"}
                                        placeholder='confirm password'
                                        value={confirmPassword}
                                        onChange={(event) => { setConfirmPassword(event.target.value); }}
                                    />
                                    <IconButton
                                        icon={confirmPasswordVisible ? <ViewIcon /> : <ViewOffIcon />}
                                        onClick={() => { setConfirmPasswordVisible(!confirmPasswordVisible); }}
                                        variant="unstyled"
                                    />
                                </HStack>
                            </VStack>
                            <Box display="flex" flexDir="column" justifyContent={"space-evenly"} alignContent="center" gap="2" position="absolute" bottom="20" width="100%" paddingRight="8">
                                <Button onClick={handleSignUp}>Sign-up</Button>
                            </Box>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Card>
        </Box>
    );
}
