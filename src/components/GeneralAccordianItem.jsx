// module imports
import { AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, HStack, Text } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

// relative imports

export default function GeneralAccordianItem({ question, description, context }) {
    const navigate = useNavigate();

    return (
        <Box>
            <AccordionItem>
                <h2>
                    <AccordionButton>
                        <Box as="span" flex='1' textAlign='left'>
                            {question}
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                </h2>
                <AccordionPanel>
                    <HStack justifyContent="space-between">
                        <Text>
                            {description}
                        </Text>
                        <Button onClick={
                            async () => {
                                await localStorage.setItem("pageData", context);
                                navigate("/message-page");
                            }
                        }>
                            Chat
                        </Button>
                    </HStack>
                </AccordionPanel>
            </AccordionItem>
        </Box>

    );
};