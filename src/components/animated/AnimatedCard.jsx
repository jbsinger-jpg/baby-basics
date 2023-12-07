// module imports
import { Box, Button, ButtonGroup, Card, CardBody, CardFooter, Checkbox, CheckboxGroup, HStack, Heading, Icon, Image, Link, ListItem, Stack, Text, Tooltip, UnorderedList, VStack, useColorModeValue } from '@chakra-ui/react';
import RefreshIcon from '@mui/icons-material/Refresh';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

// relative imports
import { cardBackground } from '../../defaultStyle';
import StyledSelect from '../StyledSelect';
import { auth, firestore } from '../../firebaseConfig';

export default function AnimatedCard({
    flippedCard,
    setFlippedCard,
    cardIcon,
    cardButtonPressed,
    setCardButtonPressed,
    selectedCardData,
    title,
    videos,
    applyCheckbox,
    selectedAge,
    progressConfirmed,
    setProgressConfirmed,
    selectedTrimester,
    childOption,
}) {
    const _cardBackground = useColorModeValue(cardBackground.light, cardBackground.dark);
    const linkColor = useColorModeValue("blue.100", "blue.200");
    const MotionIcon = motion(Icon);
    const MotionBox = motion(Box);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [checkboxValues, setCheckboxValues] = useState(new Array(selectedCardData.length).fill(false));
    const [confirmProgressButtonLoading, setConfirmProgressButtonLoading] = useState(false);

    useEffect(() => {
        if (selectedAge && title && childOption)
            firestore.collection("users").doc(auth?.currentUser?.uid).collection("children").doc(childOption).collection(title).doc(selectedAge)
                .get().then((doc) => {
                    if (doc.exists) {
                        setCheckboxValues([...doc.data().answers]);
                    }
                    else {
                        setCheckboxValues([]);
                    }
                });
        else {
            setCheckboxValues([]);
        }
        // eslint-disable-next-line
    }, [auth?.currentUser?.uid, selectedAge]);

    useEffect(() => {
        if (title && selectedTrimester && childOption)
            firestore.collection("users").doc(auth?.currentUser?.uid).collection("children").doc(childOption).collection(title).doc(String(selectedTrimester))
                .get()
                .then((doc) => {
                    if (doc.data() && doc.data().answers) {
                        setCheckboxValues([...doc.data().answers]);
                    }
                    else {
                        setCheckboxValues([]);
                    }
                });
        else {
            setCheckboxValues([]);
        }
        // eslint-disable-next-line
    }, [auth?.currentUser?.uid, selectedTrimester]);

    const handleCheckboxValuesChange = (event, index) => {
        const checkboxValuesCopy = [...checkboxValues];
        checkboxValuesCopy[index] = event.target.checked;
        setCheckboxValues([...checkboxValuesCopy]);
    };

    const handleProgressSubmission = async () => {
        setProgressConfirmed(!progressConfirmed);
        setConfirmProgressButtonLoading(true);
        const usersRef = await firestore.collection("users");

        // Make a reference to the given card title under the user profile
        const babyProgressRef = usersRef.doc(auth?.currentUser?.uid).collection("children").doc(childOption).collection(title);

        for (let i = 0; i < checkboxValues.length; i++) {
            if (!checkboxValues[i]) {
                checkboxValues[i] = false;
            }
        }

        if (selectedAge) {
            await babyProgressRef.doc(selectedAge).set({
                answers: [...checkboxValues]
            });
        }
        else {
            await babyProgressRef.doc(String(selectedTrimester)).set({
                answers: [...checkboxValues]
            });
        }

        setConfirmProgressButtonLoading(false);
    };
    const backgroundColor = useColorModeValue("#E2E8F0", "#4A5568");

    return (
        <VStack justifyContent="start" w="30vw" spacing="4" h="60vh">
            <Heading textDecoration="underline">{title}</Heading>
            <Card w="400px" h="450px" bg={_cardBackground}>
                <CardBody>
                    <Stack mt='6' spacing='3' alignItems="center">
                        {!flippedCard ?
                            <>
                                {videos ?
                                    <>
                                        <StyledSelect
                                            value={selectedVideo}
                                            onChange={(event) => setSelectedVideo(event.target.value)}
                                            options={videos}
                                        />
                                        {selectedVideo ? <iframe
                                            height="197px"
                                            width="350px"
                                            src={selectedVideo}
                                            title="YouTube video player"
                                            allowFullScreen
                                            style={{ borderRadius: "5%" }}
                                        />
                                            :
                                            <Box
                                                w="100%"
                                                h="100%"
                                                alignItems="center"
                                                justifyContent="center"
                                                display="flex"
                                            >
                                                <Box
                                                    bg={"blackAlpha.200"}
                                                    w="40%"
                                                    h="157px"
                                                    borderRadius="20%"
                                                    alignItems="center"
                                                    justifyContent="center"
                                                    display="flex"
                                                >
                                                    <Icon
                                                        as={SupervisedUserCircleIcon}
                                                        w={20}
                                                        h={20}
                                                    />
                                                </Box>
                                            </Box>
                                        }
                                    </>
                                    :
                                    <MotionIcon
                                        as={cardIcon}
                                        borderRadius='lg'
                                        initial={cardButtonPressed ? { scale: 0, rotate: 180 } : { rotate: 0, scale: 1 }}
                                        animate={{ rotate: 0, scale: 1 }}
                                        onAnimationComplete={() => setCardButtonPressed(false)}
                                        transition={{
                                            type: "spring",
                                            stiffness: 260,
                                            damping: 20
                                        }}
                                        style={{ width: 300, height: 300, resizeMode: 'cover' }}
                                    />
                                }
                            </>
                            :
                            <>
                                <Heading size='md'> Key Points </Heading>
                                {videos ?
                                    <MotionBox
                                        initial={cardButtonPressed ? { scale: 0 } : { scale: 1 }}
                                        animate={{ scale: 1 }}
                                        onAnimationComplete={() => setCardButtonPressed(false)}
                                        overflowY="auto" w="100%" h="260px" alignItems="start" flexDir="column" display="flex">
                                        <UnorderedList spacing="2" paddingLeft="2">
                                            {selectedCardData && selectedCardData.map((milestone, index) => {
                                                return (
                                                    <Tooltip
                                                        label={milestone.mission_statement ? milestone.mission_statement : null}
                                                        hasArrow
                                                        placement="left-end"
                                                    >
                                                        <ListItem key={index}>
                                                            <Link
                                                                href={milestone.link}
                                                                isExternal
                                                                color={linkColor}
                                                            >
                                                                {milestone.name}
                                                            </Link>
                                                        </ListItem>
                                                    </Tooltip>
                                                );
                                            })}
                                        </UnorderedList>
                                    </MotionBox>
                                    :
                                    <Box
                                        overflowY="auto" w="100%" h="260px" alignItems="start" flexDir="column" display="flex"
                                    >
                                        {applyCheckbox ?
                                            <CheckboxGroup>
                                                <Stack spacing={[1, 5]} direction={['column', 'column']}>
                                                    {selectedCardData && selectedCardData.map((milestone, index) => {
                                                        return (
                                                            <Checkbox
                                                                key={index}
                                                                isChecked={checkboxValues[index]}
                                                                onChange={(event) => handleCheckboxValuesChange(event, index)}
                                                            >
                                                                {milestone}
                                                            </Checkbox>
                                                        );
                                                    })}
                                                </Stack>
                                            </CheckboxGroup>
                                            :
                                            <UnorderedList spacing="2" paddingLeft="2">
                                                {selectedCardData && selectedCardData.map((milestone, index) => {
                                                    return (<ListItem key={index}>{milestone}</ListItem>);
                                                })}
                                            </UnorderedList>
                                        }
                                    </Box>
                                }
                            </>
                        }
                    </Stack>
                </CardBody>
                <CardFooter w="100%">
                    <ButtonGroup spacing='2' justifyContent={"space-between"} w="100%">
                        <motion.button
                            style={{ backgroundColor: backgroundColor, padding: 10, borderRadius: "10%" }}
                            whileTap={{ scale: 0.8 }}
                            whileHover={{ scale: 1.2 }}
                            whileFocus={{ scale: 1.2 }}
                            onClick={() => {
                                if (selectedAge !== "" || flippedCard) {
                                    setFlippedCard(!flippedCard);
                                    setCardButtonPressed(true);
                                }
                            }}
                        >
                            <HStack>
                                <Icon as={RefreshIcon} />
                                <Text as="b">
                                    flip
                                </Text>
                            </HStack>
                        </motion.button>
                        {(applyCheckbox && flippedCard && selectedAge !== "") &&
                            <Button
                                isLoading={confirmProgressButtonLoading}
                                onClick={handleProgressSubmission}
                            >
                                <Text as="b">
                                    Confirm Progress
                                </Text>
                            </Button>
                        }
                    </ButtonGroup>
                </CardFooter>
            </Card>
        </VStack>
    );
}
