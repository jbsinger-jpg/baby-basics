import { Heading, Radio, RadioGroup, VStack } from "@chakra-ui/react";

export default function FormQuestion({ question, choices, onSelect }) {
    return (
        <RadioGroup>
            <VStack alignItems="start">
                <Heading size="md">{question}</Heading>
                {choices.map((choice) => (
                    <Radio
                        value={choice}
                        onChange={() => onSelect(choice)}
                    >
                        {choice}
                    </Radio>
                ))}
            </VStack>
        </RadioGroup>
    );
}