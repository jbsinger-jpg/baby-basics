// module imports
import { Accordion, VStack, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

// relative imports
import GeneralAccordianItem from '../components/GeneralAccordianItem';
import { allGoodsAndServicesData } from '../components/staticPageData/forumData';
import { screenBackground } from '../defaultStyle';

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
