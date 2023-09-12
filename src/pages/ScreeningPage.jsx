// module imports
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Divider, Heading, HStack, IconButton, Text, Tooltip, useColorModeValue, useToast, VStack } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// relative imports
import FormQuestion from '../components/FormQuestion';
import { wordFilter } from '../components/messaging/wordFilter';
import ProgressBar from '../components/ProgressBar';
import { cardBackground, screenBackground } from '../defaultStyle';
import { auth, firestore } from '../firebaseConfig';

export default function ScreeningPage() {
    const toast = useToast();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answerButtonIsLoading, setAnswerButtonIsLoading] = useState(false);
    const [screeningAlertDialogVisibile, setScreeningAlertDialogVisibile] = useState(false);
    const navigate = useNavigate();
    const _cardBackground = useColorModeValue(cardBackground.light, cardBackground.dark);
    const [questions, setQuestions] = useState([
        {
            question: "What is your marital status?",
            choices: ["Married", "Seperated", "Widowed", "Never Married"],
            queryField: "marital",
            answer: null,
            isNumeric: false
        },
        {
            question: "How many children do you have in total?",
            choices: ["1", "2", "3", "4", "5+"],
            queryField: "children_total",
            answer: null,
            isNumeric: true
        },
        {
            question: "How many children born at the same time?",
            choices: ["N/A", "Twins", "Triplets", "Quadruplets", "Quintuplets", "Sextuplets"],
            queryField: "children_simultaneous",
            answer: null,
            isNumeric: false
        },
        {
            question: "What is your nationality?",
            choices: ["Asian", "White", "Hispanic or Latino", "American Indian or Alaska Native", "Black or African American", "Native Hawaiian or Other Pacific Islander", "Multiple"],
            queryField: "ethnicity",
            answer: null,
            isNumeric: false
        }
    ]);

    const handleSelect = (choice) => {
        const newQuestions = [...questions];
        newQuestions[currentQuestion].answer = wordFilter.clean(choice);
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
        let options = {};

        for (let i = 0; i < questions.length; i++) {
            options[questions[i].queryField] = questions[i].answer;
        }

        await firestore.collection("users").doc(auth?.currentUser?.uid).collection("screening_questions").doc(auth?.currentUser?.uid).set({
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
    const _screenBackground = useColorModeValue(screenBackground.light, screenBackground.dark);

    return (
        <Box w="100vw" h="80vh" bg={_screenBackground} overflow="hidden">
            <ProgressBar progress={progress} />
            <HStack h="100vh" alignItems="center" justifyContent="center">
                <VStack padding="5">
                    {questions[currentQuestion] &&
                        <FormQuestion
                            question={questions[currentQuestion].question}
                            choices={questions[currentQuestion].choices}
                            isNumeric={questions[currentQuestion].isNumeric}
                            onChange={handleSelect}
                            answer={questions[currentQuestion].answer}
                        />
                    }
                    {!questions[currentQuestion] && (
                        <VStack spacing="3">
                            <Heading size="md">Thanks for completing the form!</Heading>
                            <Heading size="sm">Your answers</Heading>
                            <Divider />
                            <VStack spacing="3" textAlign="center">
                                {questions.map((question, index) => (
                                    <Box width="100vw" paddingLeft="10">
                                        <Text key={question.question}> {question.question}</Text>
                                        <Text key={index}> Answer: {question.answer}</Text>
                                    </Box>
                                ))}
                            </VStack>
                        </VStack>
                    )}
                </VStack>
            </HStack>
            <HStack
                justifyContent={'space-between'}
                alignItems={'end'}
                paddingRight="10px"
                paddingLeft="10px"
                bottom="0"
                position="fixed"
                w="90vw"
            >
                <Button onClick={handleBackButtonPress}>
                    Back
                </Button>

                {questions[currentQuestion] &&
                    <Button onClick={handleNextButtonPress}>
                        Next
                    </Button>
                }
                {!questions[currentQuestion] &&
                    <HStack>
                        <Button onClick={() => setScreeningAlertDialogVisibile(true)}>
                            Confirm Answers
                        </Button>
                        <Tooltip label="Clear Answers">
                            <IconButton icon={<DeleteIcon />} onClick={handleReset} />
                        </Tooltip>
                    </HStack>
                }
            </HStack>
            <AlertDialog
                isOpen={screeningAlertDialogVisibile}
                onClose={() => setScreeningAlertDialogVisibile(false)}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent
                        bgColor={_cardBackground}
                    >
                        <AlertDialogHeader
                            fontSize='lg'
                            fontWeight='bold'
                        >
                            Submit Answers
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            These answers will be submitted for everyone to see,
                            double check that your answers are correct.
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button
                                onClick={() => setScreeningAlertDialogVisibile(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleAnswerSubmit}
                                isLoading={answerButtonIsLoading}
                                ml={3}
                            >
                                Submit
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </Box>
    );
}
