import React, { useState } from 'react';
import { motion } from "framer-motion";
import { Box, Button, Divider, Heading, HStack, IconButton, Radio, RadioGroup, Text, useColorMode, useColorModeValue, VStack } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { auth, firestore } from '../firebaseConfig';

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
    const { toggleColorMode } = useColorMode();

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);
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
        const newAnswers = [...answers];
        const newQuestions = [...questions];

        newAnswers[currentQuestion] = choice;
        newQuestions[currentQuestion].answer = choice;

        setAnswers(newAnswers);
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
        const userRef = await firestore.collection("users").doc(auth?.currentUser?.uid);
        let options = {};

        for (let i = 0; i < questions.length; i++) {
            if (questions[i].answer) {
                options[questions[i].queryField] = questions[i].answer;
            }
        }

        userRef.update({
            ...options
        });
    };

    const progress = (currentQuestion / questions.length) * 100;

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
                            {answers.map((answer, index) => (
                                <Box width="100vw" paddingLeft="10">
                                    <Text key={questions[index].question}> {questions[index].question}</Text>
                                    <Text key={index}> Answer: {answer}</Text>
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
                    <Button onClick={handleAnswerSubmit}>
                        Submit Answers
                    </Button>
                    :
                    <Button onClick={handleNextButtonPress}>
                        Next
                    </Button>
                }
            </HStack>
            <IconButton icon={useColorModeValue("Dark", "Light") === "Dark" ? <MoonIcon /> : <SunIcon />} onClick={toggleColorMode}>
                {useColorModeValue("Dark", "Light")}
            </IconButton>
        </Box >
    );
}
