import React from 'react';
import { motion } from 'framer-motion';
import { VStack } from '@chakra-ui/react';

export default function MotionContainerFAB({ children, isPressed }) {

    return (
        <motion.div
            style={{ height: "100%", width: "100%" }}
            initial={{ scale: 0 }}
            animate={isPressed ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
        >
            <VStack>
                {children}
            </VStack>
        </motion.div>
    );
}
