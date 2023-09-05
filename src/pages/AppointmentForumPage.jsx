// module imports
import { Accordion, Heading, Text, VStack, useColorModeValue } from '@chakra-ui/react';

// relative imports
import GeneralAccordianItem from '../components/GeneralAccordianItem';
import { allAppointmentData } from '../components/staticPageData/forumData';
import { screenBackground } from '../defaultStyle';

export default function AppointmentForumPage() {
    const _screenBackground = useColorModeValue(screenBackground.light, screenBackground.dark);

    return (
        <VStack spacing="3" bg={_screenBackground} h="100vh" justifyContent="center">
            <VStack>
                <Heading>
                    Appointment FAQs
                </Heading>
                <Text as="i">
                    Please be respectful when posting content.
                </Text>
            </VStack>
            <Accordion allowToggle width="100vw" h="80vh" alignContent="space-evenly" display="grid">
                {allAppointmentData && allAppointmentData.map((data, index) => {
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
