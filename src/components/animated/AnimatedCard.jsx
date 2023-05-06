// module imports
import { Box, Button, ButtonGroup, Card, CardBody, CardFooter, Checkbox, CheckboxGroup, HStack, Heading, Icon, Link, ListItem, Stack, Text, Tooltip, UnorderedList, VStack, useColorModeValue } from '@chakra-ui/react';
import RefreshIcon from '@mui/icons-material/Refresh';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

// relative imports
import { cardBackground } from '../../defaultStyle';
import StyledSelect from '../StyledSelect';
import { auth, firestore } from '../../firebaseConfig';
import { useCollectionDataOnce } from 'react-firebase-hooks/firestore';

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
}) {
    const _cardBackground = useColorModeValue(cardBackground.light, cardBackground.dark);
    const linkColor = useColorModeValue("blue.500", "blue.200");
    const MotionIcon = motion(Icon);
    const MotionBox = motion(Box);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [_checkBoxValues] = useCollectionDataOnce(firestore.collection("users").doc(auth?.currentUser?.uid).collection(title));
    const [checkboxValues, setCheckboxValues] = useState(new Array(selectedCardData.length).fill(false));
    const [confirmProgressButtonLoading, setConfirmProgressButtonLoading] = useState(false);

    useEffect(() => {
        if (_checkBoxValues && _checkBoxValues.length)
            setCheckboxValues(_checkBoxValues[0].answers);
    }, [_checkBoxValues]);

    const handleCheckboxValuesChange = (event, index) => {
        const checkboxValuesCopy = [...checkboxValues];
        checkboxValuesCopy[index] = event.target.checked;
        setCheckboxValues(checkboxValuesCopy);
    };

    const handleProgressSubmission = async () => {
        setConfirmProgressButtonLoading(true);
        const usersRef = await firestore.collection("users");

        // Make a reference to the given card title under the user profile
        const babyProgressRef = usersRef.doc(auth?.currentUser?.uid).collection(title);
        await babyProgressRef.doc(auth.currentUser.uid).set({
            answers: [...checkboxValues]
        });

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
                                        <iframe
                                            height="197px"
                                            width="350px"
                                            src={selectedVideo || require('../../devbackground.png')}
                                            title="YouTube video player"
                                            allowFullScreen
                                        />
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
                                    <MotionBox
                                        initial={cardButtonPressed ? { scale: 0 } : { scale: 1 }}
                                        animate={{ scale: 1 }}
                                        onAnimationComplete={() => setCardButtonPressed(false)}
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
                                    </MotionBox>
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
                                setFlippedCard(!flippedCard);
                                setCardButtonPressed(true);
                            }}
                        >
                            <HStack>
                                <Icon as={RefreshIcon} />
                                <Text as="b">
                                    flip
                                </Text>
                            </HStack>
                        </motion.button>
                        {(applyCheckbox && flippedCard) &&
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
