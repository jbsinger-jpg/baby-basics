import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, HStack, Text, VStack, useColorModeValue } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Context from '../context/Context';
import { screenBackground } from '../defaultStyle';

export default function BabyHealthForumPage() {

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
                                How often should a baby go to the restroom?
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
                                What should I do if I can't breastfeed my baby?
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        <HStack justifyContent="space-between">
                            <Text>
                                This forum is designed around helping parents figure out alternative options
                                for their children if they happen to experience health complications.
                            </Text>
                            <Button onClick={
                                () => {
                                    setPageData("breast_feed_alternative_messages");
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
