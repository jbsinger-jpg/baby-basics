import { InfoOutlineIcon } from '@chakra-ui/icons';
import { HStack, Icon, Text, VStack } from '@chakra-ui/react';

export default function MissingDataMessage({ message }) {
    return (
        <VStack w="100%">
            <HStack>
                <Icon as={InfoOutlineIcon} />
                <Text>
                    {message}
                </Text>
            </HStack>
        </VStack>
    );
}
