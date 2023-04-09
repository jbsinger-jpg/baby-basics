import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, HStack, Text, VStack, useColorModeValue } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Context from '../context/Context';
import { screenBackground } from '../defaultStyle';

export default function PrenatalForumPage() {
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
                                What kind of pets can I have around me while I am pregnant?
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        <HStack justifyContent="space-between">
                            <Text>
                                This forum is designed around knowing which critters might
                                be affecting your pregnancy.
                            </Text>
                            <Button onClick={
                                () => {
                                    setPageData("prenatal_pet_messages");
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
                                How will I know if my house is baby-proof before delivery of the baby?
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        <HStack justifyContent="space-between">
                            <Text>
                                This forum is designed around preparing expecting parent's
                                home before baby comes.
                            </Text>
                            <Button onClick={
                                () => {
                                    setPageData("baby_proof_messages");
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
                                What is the point of genetic counseling?
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        <HStack justifyContent="space-between">
                            <Text>
                                This forum is designed around helping parents know
                                the importance behind seeing a genetic counselor before
                                delivery of the baby.
                            </Text>
                            <Button onClick={
                                () => {
                                    setPageData("genetic_counselling_messages");
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
                                When would I know if I am having real contractions instead of false ones?
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        <HStack justifyContent="space-between">
                            <Text>
                                This forum is designed around helping parents identify
                                when their significant other is actually ready to deliver a baby.
                            </Text>
                            <Button onClick={
                                () => {
                                    setPageData("false_versus_true_contraction_messages");
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
                                What should I expect from my first trimester of pregnancy?
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        <HStack justifyContent="space-between">
                            <Text>
                                This forum is designed around letting parents know what to expect for the
                                first trimester of pregnancy.
                            </Text>
                            <Button onClick={
                                () => {
                                    setPageData("first_trimester_prenatal_messages");
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
                                What should I expect from my second trimester of pregnancy?
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        <HStack justifyContent="space-between">
                            <Text>
                                This forum is designed around letting parents know what to expect for the
                                first second of pregnancy.
                            </Text>
                            <Button onClick={
                                () => {
                                    setPageData("second_trimester_prenatal_messages");
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
                                What should I expect from my third trimester of pregnancy?
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        <HStack justifyContent="space-between">
                            <Text>
                                This forum is designed around letting parents know what to expect for the
                                third trimester of pregnancy.
                            </Text>
                            <Button onClick={
                                () => {
                                    setPageData("third_trimester_prenatal_messages");
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
                                How would I know if my baby is developing okay before delivery?
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        <HStack justifyContent="space-between">
                            <Text>
                                This forum is designed around letting parents know how to determine
                                the health of their baby before birth.
                            </Text>
                            <Button onClick={
                                () => {
                                    setPageData("prenatal_baby_health_messages");
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
