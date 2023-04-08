import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, HStack, Text, VStack, useColorModeValue } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Context from '../context/Context';
import { screenBackground } from '../defaultStyle';

export default function StarterForumTopicPage() {

    // TODO: Have the questions categorized in the following forum groups
    // 1) Before pregnancy
    // 2) During pregnancy
    // 3) After pregnancy

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
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box as="span" flex='1' textAlign='left'>
                                What can I financially expect for raising a baby?
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        <HStack justifyContent="space-between">
                            <Text>
                                This forum is designed around helping parents figure out how to handle taking care of
                                their child with certain budgetary restrictions.
                            </Text>
                            <Button onClick={
                                () => {
                                    setPageData("financial_expectation_messages");
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
                                What should I expect from an elementary school system?
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        <HStack justifyContent="space-between">
                            <Text>
                                This forum is designed around helping parents figure out how to handle knowing which
                                places to take their children for educational purposes.
                            </Text>
                            <Button onClick={
                                () => {
                                    setPageData("school_messages");
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
                                What are some fun activities I can do with my baby?
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        <HStack justifyContent="space-between">
                            <Text>
                                This forum is designed around helping parents figure out do more than just raise a kid,
                                but to learn how to interact with them in their younger stages of development.
                            </Text>
                            <Button onClick={
                                () => {
                                    setPageData("hobbies_with_baby_messages");
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
                                What kind of car seat is best for my kid?
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        <HStack justifyContent="space-between">
                            <Text>
                                This forum is designed around helping parents figure out how to keep
                                their kid safe when needing to drive from one place to another.
                            </Text>
                            <Button onClick={
                                () => {
                                    setPageData("car_seat_messages");
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
                                What kind of pets can I have around my child?
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        <HStack justifyContent="space-between">
                            <Text>
                                This forum is designed around helping parents figure out which
                                animals tend to be the safest around children.
                            </Text>
                            <Button onClick={
                                () => {
                                    setPageData("animals_and_babies_messages");
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
                                How will I know if my house is genuinely baby proofed?
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        <HStack justifyContent="space-between">
                            <Text>
                                This forum is designed around helping parents make themselves feel comfortable
                                with having their baby traverse their home.
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
            </Accordion>
        </VStack>
    );
}
