import React from 'react';
import { Button } from "@chakra-ui/react";
import { motion } from "framer-motion";

export default function AnimatedButton({ title, onClick }) {
    const MotionButton = motion(Button);

    return (
        <MotionButton
            whileTap={{
                scale: 0.8,
                borderRadius: "100%",
            }}
            whileHover={{ scale: 1.2 }}
            whileFocus={{ scale: 1.2 }}
            onClick={onClick}
        >
            {title}
        </MotionButton>
    );
}
