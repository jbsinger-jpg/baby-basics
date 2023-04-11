import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Context from '../context/Context';
import { AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, HStack, Text } from '@chakra-ui/react';

export default function GeneralAccordianItem({ question, description, pageDataContext }) {
    const navigate = useNavigate();
    const { setData: setPageData } = useContext(Context);

    return (
        <AccordionItem>
            <h2>
                <AccordionButton>
                    <Box as="span" flex='1' textAlign='left'>
                        {question}
                    </Box>
                    <AccordionIcon />
                </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
                <HStack justifyContent="space-between">
                    <Text>
                        {description}
                    </Text>
                    <Button onClick={
                        () => {
                            setPageData(pageDataContext);
                            navigate("/message-page");
                        }
                    }>
                        Chat
                    </Button>
                </HStack>
            </AccordionPanel>
        </AccordionItem>
    );
};