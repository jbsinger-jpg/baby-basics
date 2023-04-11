import { Accordion, VStack, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { screenBackground } from '../defaultStyle';
import { allGoodsAndServicesData } from '../components/staticPageData/forumData';
import GeneralAccordianItem from '../components/GeneralAccordianItem';

export default function GoodsAndServicesForumPage() {
    const _screenBackground = useColorModeValue(screenBackground.light, screenBackground.dark);

    return (
        <VStack spacing="3" bg={_screenBackground} h="100vh">
            <Accordion allowToggle width="100%">
                {allGoodsAndServicesData && allGoodsAndServicesData.map(service =>
                    <GeneralAccordianItem
                        question={service.question}
                        description={service.description}
                        context={service.context}
                    />
                )}
            </Accordion>
        </VStack>
    );
}
