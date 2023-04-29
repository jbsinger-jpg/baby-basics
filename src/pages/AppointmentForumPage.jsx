// module imports
import { Accordion, VStack, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

// relative imports
import GeneralAccordianItem from '../components/GeneralAccordianItem';
import { allAppointmentData } from '../components/staticPageData/forumData';
import { screenBackground } from '../defaultStyle';

export default function AppointmentForumPage() {
    const _screenBackground = useColorModeValue(screenBackground.light, screenBackground.dark);

    return (
        <VStack spacing="3" bg={_screenBackground} h="100vh">
            <Accordion allowToggle width="100%">
                {allAppointmentData && allAppointmentData.map(appointData =>
                    <GeneralAccordianItem
                        question={appointData.question}
                        description={appointData.description}
                        context={appointData.context}
                    />
                )}
            </Accordion>
        </VStack>
    );
}
