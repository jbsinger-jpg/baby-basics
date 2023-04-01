import { Box, Input, Select, Textarea, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
// TODO: Break down prompt options with the 4 categories for milestones
// 1) Motor milestones
// 2) Sensory milestones
// 3) Communication milestones
// 4) Feeding milestones

const promptOptions = [
    {
        ageSelected: "0-3M",
        answer: "Baby will spend most of its time sleeping, and feeding",
        activities: [
            "Monkey See Monkey do: They might mimic you sticking your tongue out, even as a newborn. As the baby grows, they may mimic your other facial expressions and cooing sounds, too. Start early: hold her face-to-face, smile, open your mouth and slowly stick out your tongue. Repeat",
            "Baby Calisthenics: With your baby on their back, gently pull their legs up to you and then side to side. Up, out, down, back, reverse. Do the same with their arms",
            "Airplane: Hold your baby firmly with both hands—one under their bottom and the other cupped on the back of her head. Lift them up in the air and let her “fly” around slowly and gently. Always firmly support their head"
        ],
        motorMilestones: [
            "Being able to move fists from closed to open",
            "Pushing up with arms, lying on stomach",
            "While lying on tummy, lifts and holds head up"
        ],
        sensoryMilestones: [
            "Attempts to reach for a toy held above their chest",
            "While lying on back, keeps head centered to watch faces or toys",
            "While lying on back, visually tracks a moving toy from side to side"
        ],
        communicationMilestones: [
            "Quiets or smiles in response to sound or voice",
            "Cries differently for different needs (e.g. hungry vs. tired)",
            "Coos and smiles"
        ],
        feedingMilestones: [
            "Latches onto nipple or bottle",
            "Tongue moves forward and back to suck",
            "Sucks and swallows well during feeding"
        ],
        hyperlinks: [
            "https://raisingchildren.net.au/newborns/development/development-tracker/0-1-month#:~:text=Newborn%20development%20at%200%2D1%20month%3A%20what's%20happening,-Cuddling%2C%20sleeping%2C%20feeding&text=Your%20baby's%20brain%20is%20growing,your%20face%20with%20their%20eyes.",
            "https://pathways.org/baby-milestones-calendar/?gclid=Cj0KCQjwiZqhBhCJARIsACHHEH86vfPyH6tvUXwPDgWU8jpb7cU43bPforCV23MfAutajr02Jbf9nEoaAll_EALw_wcB",
            "https://dadsadventure.com/your-babys-playmate/?gclid=CjwKCAjwrJ-hBhB7EiwAuyBVXeIezd00HCI0y_zL4c0J1PWXy0LN8DGY8huixsRVWDEFhz8b37_eNBoC7VIQAvD_BwE",
            "https://www.healthychildren.org/English/ages-stages/baby/Pages/default.aspx"
        ]
    },
    {
        ageSelected: "4-6M",
        answer: "Lots of crying but for a 3M old...",
        activities: [

        ],
        motorMilestones: [

        ],
        sensoryMilestones: [

        ],
        communicationMilestones: [

        ],
        feedingMilestones: [

        ],
        hyperlinks: [

        ]
    },
    {
        ageSelected: "7-9M",
        answer: "Lots of crying but for a 6M old...",
        activities: [

        ],
        motorMilestones: [

        ],
        sensoryMilestones: [

        ],
        communicationMilestones: [

        ],
        feedingMilestones: [

        ],
        hyperlinks: [

        ]
    },
    {
        ageSelected: "10-12M",
        answer: "Lots of crying but for a 9M old...",
        activities: [

        ],
        motorMilestones: [

        ],
        sensoryMilestones: [

        ],
        communicationMilestones: [

        ],
        feedingMilestones: [

        ],
        hyperlinks: [

        ]
    },
    {
        ageSelected: "13-18M",
        answer: "Lots of crying but for a 12M old...",
        activities: [

        ],
        motorMilestones: [

        ],
        sensoryMilestones: [

        ],
        communicationMilestones: [

        ],
        feedingMilestones: [

        ],
        hyperlinks: [

        ]
    },
    {
        ageSelected: "19-24M",
        answer: "Lots of crying but for a 18M old...",
        activities: [

        ],
        motorMilestones: [

        ],
        sensoryMilestones: [

        ],
        communicationMilestones: [

        ],
        feedingMilestones: [

        ],
        hyperlinks: [

        ]
    },
];

export default function MilestonePage() {
    const [selectedAge, setSelectedAge] = useState("0M");
    const [selectedAnswer, setSelectedAnswer] = useState(promptOptions[0]?.answer);
    const [selectedActivities, setSelectedActivities] = useState(promptOptions[0]?.activities);
    const [selectedMotorMilestones, setSelectedMotorMilestones] = useState(promptOptions[0]?.motorMilestones);
    const [selectedCommunicationMilestones, setSelectedCommunicationMilestones] = useState(promptOptions[0]?.communicationMilestones);
    const [selectedFeedingMilestones, setSelectedFeedingMilestones] = useState(promptOptions[0]?.feedingMilestones);
    const [selectedSensoryMilestones, setSelectedSensoryMilestones] = useState(promptOptions[0]?.sensoryMilestones);
    const [selectedHyperLinks, setSelectedHyperLinks] = useState(promptOptions[0]?.hyperlinks);

    const getFormattedHyperlinks = () => {
        let option = "";
        selectedHyperLinks.length > 0 ? option = selectedHyperLinks.join('\n\n') : option = "";
        return option;
    };

    const getFormattedSensoryMilestones = () => {
        let option = "";
        selectedSensoryMilestones.length > 0 ? option = selectedSensoryMilestones.join('\n\n') : option = "";
        return option;
    };

    const getFormattedFeedingMilestones = () => {
        let option = "";
        selectedFeedingMilestones.length > 0 ? option = selectedFeedingMilestones.join('\n\n') : option = "";
        return option;
    };

    const getFormattedCommunicationMilestones = () => {
        let option = "";
        selectedCommunicationMilestones.length > 0 ? option = selectedCommunicationMilestones.join('\n\n') : option = "";
        return option;
    };

    const getFormattedMotorMilestones = () => {
        let option = "";
        selectedMotorMilestones.length > 0 ? option = selectedMotorMilestones.join('\n\n') : option = "";
        return option;
    };

    const getFormattedActivities = () => {
        let option = "";
        selectedActivities.length > 0 ? option = selectedActivities.join('\n\n') : option = "";
        return option;
    };

    const handleAnswerChange = (event) => {
        for (let i = 0; i < promptOptions.length; i++) {
            if (promptOptions[i].ageSelected === event.target.value) {
                setSelectedAnswer(promptOptions[i].answer);
                setSelectedActivities(promptOptions[i].activities);
                setSelectedMotorMilestones(promptOptions[i].motorMilestones);
                setSelectedFeedingMilestones(promptOptions[i].feedingMilestones);
                setSelectedSensoryMilestones(promptOptions[i].sensoryMilestones);
                setSelectedCommunicationMilestones(promptOptions[i].communicationMilestones);
                setSelectedHyperLinks(promptOptions[i].hyperlinks);
            }
        }
    };

    return (
        <VStack>
            <Select placeholder='Select option' value={selectedAge} onChange={(event) => {
                setSelectedAge(event.target.value);
                handleAnswerChange(event);
            }}>
                <option value='0M'> 0M </option>
                <option value='3M'> 3M </option>
                <option value='6M'> 6M </option>
                <option value="9M"> 9M </option>
                <option value="12M"> 12M </option>
                <option value="18M"> 18M </option>
                <option value="24M"> 24M </option>
            </Select>
            <Input
                value={selectedAnswer}
                isReadOnly
                size='sm'
            />
            <Box
                w="100vw"
                h="15vh"
                whiteSpace='pre-wrap'
            >
                <Textarea
                    h="15vh"
                    value={getFormattedActivities()}
                    isReadOnly
                    size='sm'
                />
            </Box>
            <Box
                w="100vw"
                h="15vh"
                whiteSpace='pre-wrap'
            >
                <Textarea
                    h="15vh"
                    value={getFormattedMotorMilestones()}
                    isReadOnly
                    size='sm'
                />
            </Box>
            <Box
                w="100vw"
                h="15vh"
                whiteSpace='pre-wrap'
            >
                <Textarea
                    h="15vh"
                    value={getFormattedCommunicationMilestones()}
                    isReadOnly
                    size='sm'
                />
            </Box>
            <Box
                w="100vw"
                h="15vh"
                whiteSpace='pre-wrap'
            >
                <Textarea
                    h="15vh"
                    value={getFormattedFeedingMilestones()}
                    isReadOnly
                    size='sm'
                />
            </Box>
            <Box
                w="100vw"
                h="15vh"
                whiteSpace='pre-wrap'
            >
                <Textarea
                    h="15vh"
                    value={getFormattedSensoryMilestones()}
                    isReadOnly
                    size='sm'
                />
            </Box>
            <Box
                w="100vw"
                h="10vh"
                whiteSpace='pre-wrap'
            >
                <Textarea
                    h="10vh"
                    value={getFormattedHyperlinks()}
                    isReadOnly
                    size='sm'
                />
            </Box>
        </VStack>
    );
}
