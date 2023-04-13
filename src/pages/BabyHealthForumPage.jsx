import { Accordion, VStack, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { screenBackground } from '../defaultStyle';
import GeneralAccordianItem from '../components/GeneralAccordianItem';
import { allBabyHealthData } from '../components/staticPageData/forumData';

export default function BabyHealthForumPage() {
    const _screenBackground = useColorModeValue(screenBackground.light, screenBackground.dark);

    return (
        <VStack spacing="3" bg={_screenBackground} h="100vh">
            <Accordion allowToggle width="100%">
                {allBabyHealthData && allBabyHealthData.map(babyData =>
                    <GeneralAccordianItem
                        question={babyData.question}
                        description={babyData.description}
                        context={babyData.context}
                    />
                )}
            </Accordion>
        </VStack>
    );
}