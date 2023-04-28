import { Heading, Radio, RadioGroup, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";

export default function FormQuestion({ question, choices, onSelect }) {
    return (
        <RadioGroup>
            <VStack alignItems="start">
                <Heading size="md">{question}</Heading>
                {choices.map((choice) => (
                    <motion.div
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.8 }}
                    >
                        <Radio
                            value={choice}
                            onChange={() => onSelect(choice)}
                        >
                            {choice}
                        </Radio>
                    </motion.div>
                ))}
            </VStack>
        </RadioGroup>
    );
}