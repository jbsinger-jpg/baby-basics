import { VStack } from '@chakra-ui/react';

export default function FloatingActionButtonContainer({ children, left }) {
    return (
        <VStack
            bottom="0"
            position="fixed"
            zIndex={999}
            // positional arguments
            right={left ? null : "2"}
            left={left ? "0" : null}
        // end positional arguments
        >
            {children}
        </VStack>
    );
}
