// module imports
import { Box, ButtonGroup, Card, CardBody, CardFooter, HStack, Heading, Icon, Link, ListItem, Stack, Text, Tooltip, UnorderedList, VStack, useColorModeValue } from '@chakra-ui/react';
import RefreshIcon from '@mui/icons-material/Refresh';
import { motion } from 'framer-motion';
import React, { useState } from 'react';

// relative imports
import { cardBackground } from '../../defaultStyle';
import StyledSelect from '../StyledSelect';

export default function AnimatedCard({
    flippedCard,
    setFlippedCard,
    cardIcon,
    cardButtonPressed,
    setCardButtonPressed,
    selectedCardData,
    title,
    videos
}) {
    const _cardBackground = useColorModeValue(cardBackground.light, cardBackground.dark);
    const linkColor = useColorModeValue("blue.500", "blue.200");
    const MotionIcon = motion(Icon);
    const MotionBox = motion(Box);
    const [selectedVideo, setSelectedVideo] = useState(null);

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
                                        overflowY="auto" w="100%" h="260px" alignItems="start" flexDir="column" display="flex">
                                        <UnorderedList spacing="2" paddingLeft="2">
                                            {selectedCardData && selectedCardData.map((milestone, index) => {
                                                return (<ListItem key={index}>{milestone}</ListItem>);
                                            })}
                                        </UnorderedList>
                                    </MotionBox>
                                }
                            </>
                        }
                    </Stack>
                </CardBody>
                <CardFooter>
                    <ButtonGroup spacing='2' justifyContent={"space-between"}>
                        <motion.button
                            style={{ backgroundColor: useColorModeValue("#E2E8F0", "#4A5568"), padding: 10, borderRadius: "10%" }}
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
                    </ButtonGroup>
                </CardFooter>
            </Card>
        </VStack>
    );
}
