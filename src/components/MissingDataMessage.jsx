import { InfoOutlineIcon } from '@chakra-ui/icons';
import { HStack, Icon, Text, VStack } from '@chakra-ui/react';

export default function MissingDataMessage() {
    return (
        <VStack w="100%">
            <HStack>
                <Icon as={InfoOutlineIcon} />
                <Text>
                    No entries, add one!
                </Text>
            </HStack>
        </VStack>
    );
}
