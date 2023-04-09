import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, HStack, Text, VStack, useColorModeValue } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Context from '../context/Context';
import { screenBackground } from '../defaultStyle';

export default function GoodsAndServicesForumPage() {
    const navigate = useNavigate();
    const { setData: setPageData } = useContext(Context);
    const _screenBackground = useColorModeValue(screenBackground.light, screenBackground.dark);

    return (
        <VStack spacing="3" bg={_screenBackground} h="100vh">
            <Accordion allowToggle width="100%">
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box as="span" flex='1' textAlign='left'>
                                What can I expect from an elementary school system to help raise a child?
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        <HStack justifyContent="space-between">
                            <Text>
                                This forum is designed around discussing what to expect
                                from potential school systems that you will be
                                placing your loved one in.
                            </Text>
                            <Button onClick={() => {
                                setPageData("school_system_messages");
                                navigate("/message-page");
                            }}>
                                Chat
                            </Button>
                        </HStack>
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box as="span" flex='1' textAlign='left'>
                                What kind of car seat is best for my child?
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        <HStack justifyContent="space-between">
                            <Text>
                                This forum is designed around discussing what would be best
                                for your little one when needing to pack them in a vehicle.
                            </Text>
                            <Button onClick={() => {
                                setPageData("car_seat_messages");
                                navigate("/message-page");
                            }}>
                                Chat
                            </Button>
                        </HStack>
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box as="span" flex='1' textAlign='left'>
                                What are some items that could help with dealing with my pregnancy?
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        <HStack justifyContent="space-between">
                            <Text>
                                This forum is designed around shopping for the new mom and prepping for
                                the little one.
                            </Text>
                            <Button onClick={() => {
                                setPageData("shopping_service_messages");
                                navigate("/message-page");
                            }}>
                                Chat
                            </Button>
                        </HStack>
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box as="span" flex='1' textAlign='left'>
                                What should I expect from a birthing class?
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        <HStack justifyContent="space-between">
                            <Text>
                                This forum is designed around prepping for a birthing class.
                            </Text>
                            <Button onClick={() => {
                                setPageData("birthing_class_messages");
                                navigate("/message-page");
                            }}>
                                Chat
                            </Button>
                        </HStack>
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box as="span" flex='1' textAlign='left'>
                                How should I register for daycare?
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        <HStack justifyContent="space-between">
                            <Text>
                                This forum is designed around prepping for a daycare.
                            </Text>
                            <Button onClick={() => {
                                setPageData("day_care_service_messages");
                                navigate("/message-page");
                            }}>
                                Chat
                            </Button>
                        </HStack>
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box as="span" flex='1' textAlign='left'>
                                What would be a recommended health care provider for expecting parents?
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        <HStack justifyContent="space-between">
                            <Text>
                                This forum is designed around helping find health care providers.
                            </Text>
                            <Button onClick={() => {
                                setPageData("health_care_provider_messages");
                                navigate("/message-page");
                            }}>
                                Chat
                            </Button>
                        </HStack>
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box as="span" flex='1' textAlign='left'>
                                What should I put in a go bag for my baby?
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        <HStack justifyContent="space-between">
                            <Text>
                                This forum is designed around making traveling easier with your little one.
                            </Text>
                            <Button onClick={() => {
                                setPageData("go_bag_baby_messages");
                                navigate("/message-page");
                            }}>
                                Chat
                            </Button>
                        </HStack>
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box as="span" flex='1' textAlign='left'>
                                What are some fun activities I can do with my baby?
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        <HStack justifyContent="space-between">
                            <Text>
                                This forum is designed around helping parents find things to do with their little one.
                            </Text>
                            <Button onClick={() => {
                                setPageData("baby_activity_messages");
                                navigate("/message-page");
                            }}>
                                Chat
                            </Button>
                        </HStack>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </VStack>
    );
}
