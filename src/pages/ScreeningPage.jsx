import React, { useState } from 'react';
import { motion } from "framer-motion";
import { Box, Button, Divider, Heading, HStack, IconButton, Radio, RadioGroup, Text, Tooltip, useColorModeValue, useToast, VStack } from '@chakra-ui/react';
import { auth, firestore } from '../firebaseConfig';
import { DeleteIcon } from '@chakra-ui/icons';

function ProgressBar({ progress }) {
    const progressBarVariants = {
        initial: { width: "0%" },
        animate: { width: `${progress}%` },
    };

    return (
        <div className="progress-bar-container">
            <motion.div
                style={{
                    height: "10px",
                    background: useColorModeValue("Dark", "Light") === "Dark" ? "black" : "white",
                    borderRadius: "5px"
                }}
                variants={progressBarVariants}
                initial="initial"
                animate="animate"
            />
        </div>
    );
}

function FormQuestion({ question, choices, onSelect }) {
    return (
        <RadioGroup>
            <VStack alignItems="start">
                <Heading size="md">{question}</Heading>
                {choices.map((choice) => (
                    <Radio
                        value={choice}
                        onChange={() => onSelect(choice)}
                    >
                        {choice}
                    </Radio>
                ))}
            </VStack>
        </RadioGroup>
    );
}

export default function ScreeningPage() {
    const toast = useToast();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answerButtonIsLoading, setAnswerButtonIsLoading] = useState(false);
    const [questions, setQuestions] = useState([
        {
            question: "What is your marital status?",
            choices: ["Married", "Seperated", "Widowed", "Never Married"],
            queryField: "marital",
            answer: null
        },
        {
            question: "How many children do you have in total?",
            choices: ["1", "2", "3", "4", "5+"],
            queryField: "children_total",
            answer: null
        },
        {
            question: "How many children born at the same time?",
            choices: ["N/A", "Twins", "Triplets", "Quadruplets", "Quintuplets", "Sextuplets", "a lot..."],
            queryField: "children_simultaneous",
            answer: null
        },
        {
            question: "What is your nationality?",
            choices: ["Asian", "White", "Hispanic or Latingo", "American Indian or Alaska Native", "Black or African American", "Native Hawaiian or Other Pacific Islander", "Multiple"],
            queryField: "ethnicity",
            answer: null
        }
    ]);

    const handleSelect = (choice) => {
        const newQuestions = [...questions];
        newQuestions[currentQuestion].answer = choice;
        setQuestions(newQuestions);
    };


    const handleBackButtonPress = () => {
        if (currentQuestion !== 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    const handleNextButtonPress = () => {
        if (currentQuestion !== questions.length) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    const handleAnswerSubmit = async () => {
        setAnswerButtonIsLoading(true);
        const userRef = await firestore.collection("users").doc(auth?.currentUser?.uid);
        let options = {};

        for (let i = 0; i < questions.length; i++) {
            options[questions[i].queryField] = questions[i].answer;
        }

        userRef.update({
            ...options
        })
            .then(() => {
                toast({
                    title: 'Answers submitted!',
                    description: "Other peeps will be able to see your responses when sending friend requests",
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                });
            })
            .catch(error => {
                toast({
                    title: 'Answers not submitted!',
                    description: error,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                });
            })
            .finally(() => {
                setAnswerButtonIsLoading(false);
            });
    };

    const progress = (currentQuestion / questions.length) * 100;

    const handleReset = () => {
        let options = [];

        for (let i = 0; i < questions.length; i++) {
            options.push({ ...questions[i], answer: null });
        }

        setQuestions(options);
    };

    return (
        <Box w="100vw" h="100vh">
            <ProgressBar progress={progress} />
            <Box padding="5">
                {questions[currentQuestion] &&
                    <FormQuestion
                        question={questions[currentQuestion].question}
                        choices={questions[currentQuestion].choices}
                        onSelect={handleSelect}
                    />
                }
                {!questions[currentQuestion] && (
                    <VStack>
                        <Heading size="md">Thanks for completing the form!</Heading>
                        <Heading size="sm">Your answers</Heading>
                        <Divider />
                        <VStack spacing="3" textAlign="start">
                            {questions.map((question, index) => (
                                <Box width="100vw" paddingLeft="10">
                                    <Text key={question.question}> {question.question}</Text>
                                    <Text key={index}> Answer: {question.answer}</Text>
                                </Box>
                            ))}
                        </VStack>
                    </VStack>
                )}
            </Box>
            <HStack position="absolute" bottom="10" justifyContent="space-between" width="100vw" paddingRight="5" paddingLeft="5">
                <Button onClick={handleBackButtonPress}>
                    Back
                </Button>
                {!questions[currentQuestion] ?
                    <HStack>
                        <Button onClick={handleAnswerSubmit} isLoading={answerButtonIsLoading}>
                            Submit Answers
                        </Button>
                        <Tooltip label="Clear Answers">
                            <IconButton icon={<DeleteIcon />} onClick={handleReset} />
                        </Tooltip>
                    </HStack>
                    :
                    <Button onClick={handleNextButtonPress}>
                        Next
                    </Button>
                }
            </HStack>
        </Box>
    );
}
