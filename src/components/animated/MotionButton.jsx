import React from 'react';
import { motion } from 'framer-motion';
import { Spinner, Text, useColorModeValue } from '@chakra-ui/react';

export default function MotionButton({ onClick, title, isLoading, noWidth, type }) {
    return (
        <motion.button
            type={type ? type : "button"}
            onClick={!isLoading && onClick}
            style={{
                backgroundColor: useColorModeValue("#E2E8F0", "#2D3748"),
                padding: 8,
                borderRadius: "5%",
                zIndex: 500,
                width: !noWidth && "150px"
            }}
            whileTap={{
                scale: 0.8,
                borderRadius: "100%",
            }}
            whileHover={{ scale: 1.1 }}
            whileFocus={{ scale: 1.1 }}
        >
            {isLoading ?
                <Spinner />
                :
                <Text as="b">
                    {title}
                </Text>
            }
        </motion.button>
    );
}
