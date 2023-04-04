import { CheckIcon, CloseIcon, StarIcon } from '@chakra-ui/icons';
import { Box, Button, Card, CardBody, Divider, HStack, Heading, Icon, Image, SkeletonCircle, SkeletonText, Stack, Tag, TagLabel, Text, Tooltip, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { firestore } from '../../firebaseConfig';

export default function MonitorRow({ monitor, monitorDataIsLoading, tabIndex }) {
    const MotionImage = motion(Image);
    const MotionBox = motion(Box);
    const MotionButton = motion(Button);

    const [flippedCards, setFlippedCards] = useState(false);
    const [buttonsPressed, setButtonsPressed] = useState(false);
    const [rating, setRating] = useState(0);
    const [total, setTotal] = useState(0);
    const [average, setAverage] = useState(0);

    const handleFlip = () => {
        setFlippedCards(!flippedCards);
    };

    const handleButtonsTrigger = () => {
        setButtonsPressed(true);
    };

    const Rating = () => {
        const handleMouseEnter = (newValue) => {
            setButtonsPressed(false);
            setRating(newValue);
        };

        const stars = Array(5)
            .fill()
            .map((_, i) => {
                const ratingValue = i + 1;
                return (
                    <Icon
                        key={i}
                        as={StarIcon}
                        color={ratingValue <= rating ? "teal.500" : "gray.300"}
                        onMouseEnter={() => handleMouseEnter(ratingValue)}
                    />
                );
            });
        return <Stack direction="row" cursor={"pointer"}>{stars}</Stack>;
    };

    const handleAddRating = async () => {
        let ratingSum = 0;
        const monitorRef = await firestore.collection("monitors");

        monitorRef.doc(monitor.id).collection("ratings").add({
            rating: Number(rating),
        });

        // update the data with the new rating
        const _total = (await monitorRef.doc(monitor.id).collection("ratings").get()).size;
        const sum = (await monitorRef.doc(monitor.id).collection("ratings").get()).docs.map(doc => doc.data().rating);

        for (let i = 0; i < sum.length; i++) {
            ratingSum += sum[i];
        }

        const avg = Number(ratingSum / _total).toFixed(1);

        setTotal(_total);
        setAverage(avg);
    };

    useEffect(() => {
        setButtonsPressed(false);
        // eslint-disable-next-line
    }, [tabIndex]);

    useEffect(() => {
        let ratingSum = 0;

        (firestore.collection("monitors").doc(monitor.id).collection("ratings").get()).then(snapshot => {
            const _total = snapshot.size;
            setTotal(_total);
            const sum = snapshot.docs.map(doc => doc.data().rating);

            for (let i = 0; i < sum.length; i++) {
                ratingSum += sum[i];
            }

            const avg = Number(ratingSum / _total).toFixed(1);
            setAverage(avg);
        });
    });

    return (
        <VStack
            key={monitor.id}
            h="350px"
            spacing="3"
            paddingBottom="10"
        >
            <SkeletonCircle size='10' isLoaded={!monitorDataIsLoading} />
            <SkeletonText isLoaded={!monitorDataIsLoading}>
                <HStack spacing="4" w="400px">
                    {!flippedCards ?
                        <Card w="220px">
                            <CardBody display="flex" justifyContent="center">
                                <MotionImage
                                    variant="unstyled"
                                    initial={buttonsPressed ? { scale: 0, rotate: 180 } : { rotate: 0, scale: 1 }}
                                    animate={{ rotate: 0, scale: 1 }}
                                    onAnimationComplete={() => setButtonsPressed(false)}
                                    transition={{
                                        type: "spring",
                                        stiffness: 260,
                                        damping: 20
                                    }}
                                    src={monitor.image}
                                    size="sm"
                                    alt="Alternate Text"
                                    style={{ width: 150, height: 200, resizeMode: 'cover' }}
                                />
                            </CardBody>
                        </Card>
                        :
                        <MotionBox
                            h="300px"
                            alignItems="center"
                            justifyContent="center"
                            display="flex"
                            initial={buttonsPressed ? { scale: 0 } : { scale: 1 }}
                            animate={{ scale: 1 }}
                            onAnimationComplete={() => setButtonsPressed(false)}
                        >
                            <VStack spacing="4" w="220px" justifyContent="start">
                                <HStack w="220px" justifyContent="space-between">
                                    <Text>{monitor.title}</Text>
                                    <Tooltip label="Average">
                                        <HStack>
                                            <Text>{average}</Text>
                                            <Icon as={StarIcon}></Icon>
                                        </HStack>
                                    </Tooltip>
                                </HStack>
                                <HStack>
                                    <Rating />
                                    <Tooltip label="Total">
                                        <Heading size="xs">{total}</Heading>
                                    </Tooltip>
                                </HStack>
                                <HStack justifyContent="space-between" w="220px">
                                    <MotionButton
                                        whileTap={{
                                            scale: 0.8,
                                            borderRadius: "100%",
                                        }}
                                        // When the user uses their mouse
                                        whileHover={{ scale: 1.2 }}
                                        // When the user tabs
                                        whileFocus={{ scale: 1.2 }}
                                        onClick={() => {
                                            handleFlip();
                                            handleAddRating();
                                        }}
                                    >
                                        <Icon as={CheckIcon} />
                                    </MotionButton>
                                    <MotionButton
                                        whileTap={{
                                            scale: 0.8,
                                            borderRadius: "100%",
                                        }}
                                        // When the user uses their mouse
                                        whileHover={{ scale: 1.2 }}
                                        // When the user tabs
                                        whileFocus={{ scale: 1.2 }}
                                        onClick={() => {
                                            handleFlip();
                                            handleButtonsTrigger();
                                        }}
                                    >
                                        <Icon as={CloseIcon} />
                                    </MotionButton>
                                </HStack>
                            </VStack>
                        </MotionBox>

                    }
                    <VStack spacing="1" width={150} justifyContent="center" alignItems="start">
                        <Tag
                            borderRadius='full'
                            variant='solid'
                            colorScheme='green'
                        >
                            <TagLabel>
                                Amazon Affiliate
                            </TagLabel>
                        </Tag>
                        <Divider />
                        <Tag
                            borderRadius='full'
                            variant='outline'
                            colorScheme='blue'
                        >
                            <TagLabel>
                                {monitor.brand}
                            </TagLabel>
                        </Tag>
                        <Divider />
                        <Tag
                            borderRadius='full'
                            variant='outline'
                            colorScheme='orange'
                        >
                            <TagLabel>{monitor.description}</TagLabel>
                        </Tag>
                        <Divider />

                        <Tag
                            borderRadius='full'
                            variant='outline'
                            colorScheme='gray'
                        >
                            <TagLabel>{"$" + monitor.price}</TagLabel>
                        </Tag>
                        <Divider />
                        <Tag
                            borderRadius='full'
                            variant='solid'
                            colorScheme='telegram'
                        >
                            {monitor.sizes && <TagLabel>{"Size: " + monitor.sizes}</TagLabel>}
                        </Tag>
                    </VStack>
                </HStack>
            </SkeletonText>
            <SkeletonText
                isLoaded={!monitorDataIsLoading}
                w="400px"
            >
                {!flippedCards &&
                    <HStack
                        w="220px"
                        justifyContent="space-between"
                    >
                        <MotionButton
                            // When the user uses their mouse
                            whileHover={{ scale: 1.2 }}
                            // When the user tabs
                            whileFocus={{ scale: 1.2 }}
                            as="a"
                            href={monitor.affiliateLink}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Buy
                        </MotionButton>
                        <MotionButton
                            // When the user uses their mouse
                            whileHover={{ scale: 1.2 }}
                            // When the user tabs
                            whileFocus={{ scale: 1.2 }}
                            onClick={() => {
                                handleFlip();
                                handleButtonsTrigger();
                            }}
                        >
                            Rate
                        </MotionButton>
                    </HStack>

                }
            </SkeletonText>
        </VStack>
    );
}