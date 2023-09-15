import ReactImageMagnify from '@blacklab/react-image-magnify';
import { Button, Card, CardBody, CardFooter, CardHeader, HStack, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, Tag, Text, VStack, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { cardBackground } from '../../defaultStyle';
import { useState } from 'react';

export default function PictureRow({ picture, index, handleDeleteBabyPicture, handleConfirmation }) {
    const _cardBackground = useColorModeValue(cardBackground.light, cardBackground.dark);
    const [cardFlipped, setCardFlipped] = useState(false);

    return (
        <VStack
            ml={index === 0 && 10}
            h="500px"
        >
            <Card w="220px" bg={_cardBackground} justifyContent="center" alignItems="center">
                {!cardFlipped ?
                    <>
                        <CardHeader>
                            <Tag
                                borderRadius="md"
                                size="lg"
                                variant="outline"
                                color="wheat"
                                wordBreak="break-word"
                                noOfLines={1}
                            >
                                <Text marginLeft="4" marginRight="2" marginTop="2" marginBottom="2">
                                    {picture.name}
                                </Text>
                            </Tag>
                        </CardHeader>
                        <CardBody display="flex" justifyContent="center">
                            <div style={{ width: '150px', height: '200px' }}>
                                <ReactImageMagnify
                                    imageProps={{
                                        src: picture.url,
                                        style: { maxWidth: '100%', maxHeight: '100%' },
                                    }}
                                    magnifiedImageProps={{
                                        src: picture.url,
                                        style: { maxWidth: '100%', maxHeight: '100%' },
                                    }}
                                    magnifyContainerProps={{
                                        style: { width: '450px', height: '350px' },
                                    }}
                                />
                            </div>
                        </CardBody>
                    </>
                    :
                    <>
                        <CardHeader>
                            <Tag
                                borderRadius="md"
                                size="lg"
                                variant="outline"
                                color="wheat"
                                wordBreak="break-word"
                            >
                                <Text marginLeft="4" marginRight="2" marginTop="2" marginBottom="2">
                                    {"Categories"}
                                </Text>
                            </Tag>
                        </CardHeader>
                        <CardBody display="flex" justifyContent="center">
                            <HStack
                                justifyContent="space-between"
                                w="100%"
                                minH={200}
                            >
                                <VStack
                                    alignItems="start"
                                >
                                    <Tag
                                        variant="outline"
                                        color="wheat"
                                    >
                                        Age
                                    </Tag>
                                    <Tag
                                        variant="outline"
                                        color="wheat"
                                    >
                                        Tag
                                    </Tag>
                                </VStack>
                                <VStack
                                    alignItems='start'
                                >
                                    <Tag>
                                        {picture.age}
                                    </Tag>
                                    <Tag>
                                        {picture.tag}
                                    </Tag>
                                </VStack>
                            </HStack>
                        </CardBody>
                    </>
                }
                <CardFooter display={"flex"} w="100%" justifyContent="space-between">
                    <Popover>
                        <PopoverTrigger>
                            <Button onClick={() => handleConfirmation(picture)}>
                                Remove
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent bg={_cardBackground}>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverHeader>Confirmation!</PopoverHeader>
                            <PopoverBody>Are you sure you want to remove this picture?</PopoverBody>
                            <PopoverFooter>
                                <Button
                                    onClick={handleDeleteBabyPicture}
                                >
                                    Remove
                                </Button>
                            </PopoverFooter>
                        </PopoverContent>
                    </Popover>
                    <Button onClick={() => setCardFlipped(!cardFlipped)}>
                        Flip
                    </Button>
                </CardFooter>
            </Card>
        </VStack>
    );
}
