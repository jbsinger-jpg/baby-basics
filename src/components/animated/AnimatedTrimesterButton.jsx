// module imports
import React from 'react';
import { motion } from "framer-motion";
import { Text, useColorModeValue } from '@chakra-ui/react';

export default function AnimatedButton({ title, onClick }) {
    return (
        <motion.button
            style={{ backgroundColor: useColorModeValue("#E2E8F0", "#2D3748"), padding: 10, borderRadius: "5%" }}
            whileTap={{
                scale: 0.8,
                borderRadius: "100%",
            }}
            whileHover={{ scale: 1.2 }}
            whileFocus={{ scale: 1.2 }}
            onClick={onClick}
        >
            <Text as="b">
                {title}
            </Text>
        </motion.button>
    );
}
