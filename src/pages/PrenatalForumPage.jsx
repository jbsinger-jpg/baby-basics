// module imports
import { Accordion, Heading, Text, VStack, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

// relative imports
import { screenBackground } from '../defaultStyle';
import GeneralAccordianItem from '../components/GeneralAccordianItem';
import { allPrenatalData } from '../components/staticPageData/forumData';

export default function PrenatalForumPage() {
    const _screenBackground = useColorModeValue(screenBackground.light, screenBackground.dark);

    return (
        <VStack spacing="3" bg={_screenBackground} h="100vh" justifyContent="center">
            <VStack>
                <Heading>
                    Prenatal FAQs
                </Heading>
                <Text as="i">
                    Please be respectful when posting content.
                </Text>
            </VStack>
            <Accordion allowToggle width="100vw" h="80vh" alignContent="space-evenly" display="grid">
                {allPrenatalData && allPrenatalData.map((data, index) => {
                    return (
                        <GeneralAccordianItem
                            key={index}
                            question={data.question}
                            description={data.description}
                            context={data.context}
                        />
                    );
                })}
            </Accordion>
        </VStack>
    );
}
