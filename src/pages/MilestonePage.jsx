import { FormLabel, Input, Select, Textarea, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
// TODO: Break down prompt options with the 4 categories for milestones
// 1) Motor milestones
// 2) Sensory milestones
// 3) Communication milestones
// 4) Feeding milestones

const promptOptions = [
    {
        ageSelected: "0M",
        answer: "Baby will spend most of its time sleeping, and feeding",
        activities: [],
        motorMilestones: "",
        sensoryMilestones: "",
        communicationMilestones: "",
        feedingMilestones: "",
        hyperlinks: [
            "https://raisingchildren.net.au/newborns/development/development-tracker/0-1-month#:~:text=Newborn%20development%20at%200%2D1%20month%3A%20what's%20happening,-Cuddling%2C%20sleeping%2C%20feeding&text=Your%20baby's%20brain%20is%20growing,your%20face%20with%20their%20eyes.",
            "https://pathways.org/baby-milestones-calendar/?gclid=Cj0KCQjwiZqhBhCJARIsACHHEH86vfPyH6tvUXwPDgWU8jpb7cU43bPforCV23MfAutajr02Jbf9nEoaAll_EALw_wcB"
        ]
    },
    {
        ageSelected: "3M",
        answer: "Lots of crying but for a 3M old...",
        activities: [],
        motorMilestones: "",
        sensoryMilestones: "",
        communicationMilestones: "",
        feedingMilestones: "",
        hyperlinks: []
    },
    {
        ageSelected: "6M",
        answer: "Lots of crying but for a 6M old...",
        activities: [],
        motorMilestones: "",
        sensoryMilestones: "",
        communicationMilestones: "",
        feedingMilestones: "",
        hyperlinks: []
    },
    {
        ageSelected: "9M",
        answer: "Lots of crying but for a 9M old...",
        activities: [],
        motorMilestones: "",
        sensoryMilestones: "",
        communicationMilestones: "",
        feedingMilestones: "",
        hyperlinks: []
    },
    {
        ageSelected: "12M",
        answer: "Lots of crying but for a 12M old...",
        activities: [],
        motorMilestones: "",
        sensoryMilestones: "",
        communicationMilestones: "",
        feedingMilestones: "",
        hyperlinks: []
    },
    {
        ageSelected: "18M",
        answer: "Lots of crying but for a 18M old...",
        activities: [],
        motorMilestones: "",
        sensoryMilestones: "",
        communicationMilestones: "",
        feedingMilestones: "",
        hyperlinks: []
    },
    {
        ageSelected: "24M",
        answer: "Lots of crying but for a 24M old...",
        activities: [],
        motorMilestones: "",
        sensoryMilestones: "",
        communicationMilestones: "",
        feedingMilestones: "",
        hyperlinks: []
    },
];

export default function MilestonePage() {
    const [selectedAge, setSelectedAge] = useState("0M");
    const [selectedAnswer, setSelectedAnswer] = useState("Lots of crying...");

    const handleAnswerChange = (event) => {
        for (let i = 0; i < promptOptions.length; i++) {
            if (promptOptions[i].ageSelected === event.target.value) {
                setSelectedAnswer(promptOptions[i].answer);
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
        </VStack>
    );
}
