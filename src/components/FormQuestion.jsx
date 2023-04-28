import { Heading, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Radio, RadioGroup, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function FormQuestion({ question, choices, onChange, isNumeric, answer }) {
    const [formAnswer, setFormAnswer] = useState(answer);

    return (
        <RadioGroup>
            <VStack alignItems="start" w="500px">
                <Heading size="md" alignSelf="center">{question}</Heading>
                {choices.map((choice, index) => (
                    <motion.div
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.8 }}
                    >
                        <Radio
                            key={index}
                            value={choice}
                            onChange={() => onChange(choice)}
                        >
                            {choice}
                        </Radio>
                    </motion.div>
                ))}
                {isNumeric ?
                    <NumberInput min={0}>
                        <NumberInputField placeholder="Other" />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                    :
                    <Input
                        placeholder="Other"
                        value={formAnswer}
                        onChange={(event) => setFormAnswer(event.target.value)}
                        onBlur={() => onChange(formAnswer)}
                    />
                }
            </VStack>
        </RadioGroup>
    );
}