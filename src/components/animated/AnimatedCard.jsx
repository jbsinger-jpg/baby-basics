import { Box, Button, ButtonGroup, Card, CardBody, CardFooter, Heading, Icon, ListItem, Stack, UnorderedList, VStack, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { cardBackground } from '../../defaultStyle';
import { motion } from 'framer-motion';
import RefreshIcon from '@mui/icons-material/Refresh';

export default function AnimatedCard({
    flippedCard,
    setFlippedCard,
    cardIcon,
    cardButtonPressed,
    setCardButtonPressed,
    selectedCardData,
    title
}) {
    const _cardBackground = useColorModeValue(cardBackground.light, cardBackground.dark);
    const MotionIcon = motion(Icon);
    const MotionBox = motion(Box);
    const MotionButton = motion(Button);

    return (
        <VStack justifyContent="start" w="30vw" spacing="4" h="60vh">
            <Heading textDecoration="underline">{title}</Heading>
            <Card w="400px" h="450px" bg={_cardBackground}>
                <CardBody>
                    <Stack mt='6' spacing='3' alignItems="center">
                        {!flippedCard ?
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
                            :
                            <>
                                <Heading size='md'> Key Points </Heading>
                                <MotionBox
                                    initial={cardButtonPressed ? { scale: 0 } : { scale: 1 }}
                                    animate={{ scale: 1 }}
                                    onAnimationComplete={() => setCardButtonPressed(false)}
                                    overflowY="auto" w="100%" h="260px" alignItems="start" flexDir="column" display="flex">
                                    <UnorderedList spacing="2" paddingLeft="2">
                                        {selectedCardData.length > 0 && selectedCardData.map((milestone, index) => {
                                            return (<ListItem key={index}>{milestone}</ListItem>);
                                        })}
                                    </UnorderedList>
                                </MotionBox>
                            </>
                        }
                    </Stack>
                </CardBody>
                <CardFooter>
                    <ButtonGroup spacing='2' justifyContent={"space-between"}>
                        <MotionButton
                            whileTap={{ scale: 0.8 }}
                            leftIcon={<RefreshIcon />}
                            onClick={() => {
                                setFlippedCard(!flippedCard);
                                setCardButtonPressed(true);
                            }}>
                            flip
                        </MotionButton>
                    </ButtonGroup>
                </CardFooter>
            </Card>
        </VStack>
    );
}
