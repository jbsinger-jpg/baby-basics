import React, { useState } from 'react';
import { motion } from "framer-motion";
import { Box, Button, HStack, IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

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
        <div>
            <h3>{question}</h3>
            {choices.map((choice) => (
                <label key={choice}>
                    <input
                        type="radio"
                        name={question}
                        value={choice}
                        onChange={() => onSelect(choice)}
                    />
                    {choice}
                </label>
            ))}
        </div>
    );
}

export default function ScreeningPage() {
    const { toggleColorMode } = useColorMode();

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);
    const questions = [
        {
            question: "What is your favorite color?",
            choices: ["Red", "Green", "Blue"],
        },
        {
            question: "What is your favorite animal?",
            choices: ["Dog", "Cat", "Bird"],
        },
        {
            question: "What is your favorite food?",
            choices: ["Pizza", "Sushi", "Burgers"],
        },
    ];

    const handleSelect = (choice) => {
        const newAnswers = [...answers];
        newAnswers[currentQuestion] = choice;
        setAnswers(newAnswers);
        setCurrentQuestion(currentQuestion + 1);
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
                    <div>
                        <h3>Thanks for completing the form!</h3>
                        <p>Your answers:</p>
                        <ul>
                            {answers.map((answer, index) => (
                                <li key={index}>{answer}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </Box>
            <HStack position="absolute" bottom="10" justifyContent="space-between" width="100vw" paddingRight="5" paddingLeft="5">
                <Button onClick={handleBackButtonPress}>
                    Back
                </Button>
                <Button onClick={handleNextButtonPress}>
                    Next
                </Button>
            </HStack>
            <IconButton icon={useColorModeValue("Dark", "Light") === "Dark" ? <MoonIcon /> : <SunIcon />} onClick={toggleColorMode}>
                {useColorModeValue("Dark", "Light")}
            </IconButton>
        </Box>
    );
}
