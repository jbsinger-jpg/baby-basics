import { CloseIcon } from '@chakra-ui/icons';
import { Box, Card, CardBody, CardHeader, FormLabel, HStack, Heading, IconButton, Text, useColorModeValue } from '@chakra-ui/react';
import { cardBackground } from '../../defaultStyle';
import { auth, firestore } from '../../firebaseConfig';

export default function BreastRowTabPanel({ leftBreastTime, rightBreastTime, alias, index, timeStamp, data, setData, selectedChildOption }) {
    const _cardBackground = useColorModeValue(cardBackground.light, cardBackground.dark);

    const handleDeleteRow = () => {
        const updatedArray = [...data];
        updatedArray.splice(index, 1);
        setData(updatedArray);

        firestore.collection("users")
            .doc(auth.currentUser.uid)
            .collection("children")
            .doc(selectedChildOption)
            .collection("breast-feed-tracking")
            .doc(alias)
            .delete();
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
                            <FormLabel>Left Breast Time</FormLabel>
                            <Text>
                                {leftBreastTime}
                            </Text>
                        </Box>
                        <Box>
                            <FormLabel>Right Breast Time</FormLabel>
                            <Text>
                                {rightBreastTime}
                            </Text>
                        </Box>
                    </HStack>
                </CardBody>
            </Card>
        </Box>
    );
}
