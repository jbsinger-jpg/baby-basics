import { Box, Button, Card, HStack, Input, Tab, TabList, TabPanel, TabPanels, Tabs, VStack, useToast, IconButton, useColorModeValue } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import React, { useState } from 'react';
import validator from 'validator';
import { useNavigate } from 'react-router-dom';

// firebase
import { auth } from '../firebaseConfig';
import { GoogleAuthProvider } from "firebase/auth";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();

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
                toast({
                    title: 'Successful Sign In!',
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                });
                navigate("/home");
            })
            .catch((error) => {
                // Handle sign-in error
                console.error(error);
            });
    };

    const handleSignInGoogle = () => {
        const provider = new GoogleAuthProvider();

        auth.signInWithPopup(provider).then((result) => {
            console.log(result);
            navigate("/home");
            const token = result.credential.accessToken;

            toast({
                title: 'Successful Sign In',
                description: "We were able to sign in to the account token \n" + token,
                status: 'success',
                duration: 9000,
                isClosable: true,
            });

        }).catch((error) => {
            toast({
                title: 'Unable to sign in',
                description: "We were unable sign in to the account " + email + " provided error code " + error,
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
        });
    };

    const handleSignUp = (event) => {
        event.preventDefault();
        if (password === confirmPassword) {
            auth.createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    // Handle successful sign-up
                    console.log("User Credentials: ", userCredential);
                    navigate("/home");
                })
                .catch((error) => {
                    // Handle sign-up error
                    console.error(error);
                });
        }
        else {
            toast({
                title: 'Passwords not the same',
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
        }
    };

    const handleSignOut = () => {
        auth.signOut()
            .then(() => {
                // Handle successful sign-out
                toast({
                    title: 'Signed Out',
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                });
                console.log("Signed out!");
            })
            .catch((error) => {
                // Handle sign-out error
                console.error(error);
            });
    };

    return (
        <Box w="100vw" h="100vh" display="flex" alignItems="center" justifyContent="center" bg={useColorModeValue("Dark", "Light") === "Dark" ? "gray.300" : null}>
            <Card w="40vw" h="60vh" bg={useColorModeValue("Dark", "Light") === "Dark" ? "gray.400" : null}>
                <Tabs variant='enclosed' isFitted>
                    <TabList>
                        <Tab _selected={{ bg: 'blackAlpha.400' }}>
                            Sign-In
                        </Tab>
                        <Tab _selected={{ bg: 'blackAlpha.100' }}>
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
                                        onClick={handleSignIn}
                                    >
                                        Sign-in
                                    </Button>
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
                                <VStack display="flex" justifyContent={"center"} spacing={"6"}>
                                    <IconButton
                                        border="2px"
                                        variant="ghost"
                                        width="20"
                                        height="20"
                                        icon={
                                            <svg xmlns="http://www.w3.org/2000/svg" width="300px" height="120px" viewBox="0 0 220.9 200.3">
                                                <path d="M0,105C0,47.103,47.103,0,105,0c23.383,0,45.515,7.523,64.004,21.756l-24.4,31.696C133.172,44.652,119.477,40,105,40  c-35.841,0-65,29.159-65,65s29.159,65,65,65c28.867,0,53.398-18.913,61.852-45H105V85h105v20c0,57.897-47.103,105-105,105  S0,162.897,0,105z"></path>
                                            </svg>
                                        }
                                        onClick={handleSignInGoogle}
                                    />
                                </VStack>
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
