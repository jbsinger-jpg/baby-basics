import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, HStack, Text, VStack } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Context from '../context/Context';

export default function StarterForumTopicPage() {
    const navigate = useNavigate();
    const { setData: setPageData } = useContext(Context);

    return (
        <VStack spacing="3">
            <Accordion allowToggle width="100%">
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box as="span" flex='1' textAlign='left'>
                                What to feed a baby?
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        <HStack justifyContent="space-between">
                            <Text>
                                This forum is designed around discussing dietary restrictions that come with
                                taking care of a baby at certain stages of growth.
                            </Text>
                            <Button onClick={() => {
                                setPageData("feed_new_born_messages");
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
                                How often should a baby sleep?
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        <HStack justifyContent="space-between">
                            <Text>
                                This forum is designed around discussing the sleeping routine of a baby, and
                                what ages should a baby be getting routine rest.
                            </Text>
                            <Button onClick={
                                () => {
                                    setPageData("baby_sleep_messages");
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
                                What to do before the birth of a child?
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        <HStack justifyContent="space-between">
                            <Text>
                                This forum is designed around getting prepared for the visit to
                                the hospital, what to pack and how to know when the moment is near.
                            </Text>
                            <Button onClick={
                                () => {
                                    setPageData("before_birth_messages");
                                    navigate("/message-page");
                                }
                            }>
                                Chat
                            </Button>
                        </HStack>
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box as="span" flex='1' textAlign='left'>
                                How often should a baby poo and pee?
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        <HStack justifyContent="space-between">
                            <Text>
                                This forum is designed around knowing what is normal
                                when your baby goes to the bathroom.
                            </Text>
                            <Button onClick={
                                () => {
                                    setPageData("baby_poo_pee_messages");
                                    navigate("/message-page");
                                }
                            }>
                                Chat
                            </Button>
                        </HStack>
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box as="span" flex='1' textAlign='left'>
                                What is an OBGYN good for?
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        <HStack justifyContent="space-between">
                            <Text>
                                This forum is designed around helping
                                the mothers during pregnancy.
                            </Text>
                            <Button onClick={
                                () => {
                                    setPageData("pediatrician_visit_messages");
                                    navigate("/message-page");
                                }
                            }>
                                Chat
                            </Button>
                        </HStack>
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box as="span" flex='1' textAlign='left'>
                                What should I do before leaving the house?
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        <HStack justifyContent="space-between">
                            <Text>
                                This forum is designed around prepping for the trip back from the hospital
                            </Text>
                            <Button onClick={
                                () => {
                                    setPageData("leaving_house_messages");
                                    navigate("/message-page");
                                }
                            }>
                                Chat
                            </Button>
                        </HStack>
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box as="span" flex='1' textAlign='left'>
                                How to tell if baby is crying for actual needs?
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        <HStack justifyContent="space-between">
                            <Text>
                                This forum is designed around helping parents telegraph their child's behavior
                            </Text>
                            <Button onClick={
                                () => {
                                    setPageData("baby_crying_messages");
                                    navigate("/message-page");
                                }
                            }>
                                Chat
                            </Button>
                        </HStack>
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box as="span" flex='1' textAlign='left'>
                                How much of baby care is due to prenatal health?
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        <HStack justifyContent="space-between">
                            <Text>
                                This forum is designed around helping mothers understand the importance
                                of helping their baby in the womb
                            </Text>
                            <Button onClick={
                                () => {
                                    setPageData("prenatal_health_messages");
                                    navigate("/message-page");
                                }
                            }>
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
                                This forum is designed around helping parents when wanting to go
                                out and about with their little ones.
                            </Text>
                            <Button onClick={
                                () => {
                                    setPageData("go_bag_messages");
                                    navigate("/message-page");
                                }
                            }>
                                Chat
                            </Button>
                        </HStack>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </VStack>
    );
}
