import { CloseIcon } from '@chakra-ui/icons';
import { Box, Card, CardBody, CardHeader, FormLabel, HStack, Heading, IconButton, Text, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { cardBackground } from '../../defaultStyle';

export default function BottleTabPanel({ data, setData, index, alias, timeStamp, fluidOunces }) {
    const _cardBackground = useColorModeValue(cardBackground.light, cardBackground.dark);

    const handleDeleteRow = () => {
        const updatedArray = [...data];
        updatedArray.splice(index, 1);
        setData(updatedArray);
    };

    return (
        <Box>
            <Card
                bg={_cardBackground}
                w="90vw"
            >
                <CardHeader>
                    <HStack
                        justifyContent="space-between"
                    >
                        <Box alignSelf="start" justifyContent="flex-start">
                            <Heading size='md'>{alias}</Heading>
                        </Box>
                        <IconButton variant="unstyled" icon={<CloseIcon />} onClick={() => handleDeleteRow(index)} />
                    </HStack>
                </CardHeader>
                <CardBody>
                    <HStack
                        justifyContent="space-between"
                    >
                        <Box>
                            <FormLabel>Submitted</FormLabel>
                            <Text>
                                {timeStamp}
                            </Text>
                        </Box>
                        <Box>
                            <FormLabel>Fluid Ounces</FormLabel>
                            <Text>
                                {fluidOunces}
                            </Text>
                        </Box>
                    </HStack>
                </CardBody>
            </Card>
        </Box>
    );
}
