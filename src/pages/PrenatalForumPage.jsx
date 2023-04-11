import { Accordion, VStack, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { screenBackground } from '../defaultStyle';
import GeneralAccordianItem from '../components/GeneralAccordianItem';
import { allPrenatalData } from '../components/staticPageData/forumData';

export default function PrenatalForumPage() {
    const _screenBackground = useColorModeValue(screenBackground.light, screenBackground.dark);

    // Question
    // General Description
    // Page Data Context

    return (
        <VStack spacing="3" bg={_screenBackground} h="100vh">
            <Accordion allowToggle width="100%">
                {allPrenatalData &&
                    allPrenatalData.map(prenatalData => {
                        return (
                            <GeneralAccordianItem
                                question={prenatalData.question}
                                description={prenatalData.description}
                                pageDataContext={prenatalData.context}
                            />
                        );
                    })}
            </Accordion>
        </VStack>
    );
}
