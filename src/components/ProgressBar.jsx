// module imports
import { useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";

// relative imports
// none

export default function ProgressBar({ progress }) {
    const progressBarVariants = {
        initial: { width: "0%" },
        animate: { width: `${progress}%` },
    };

    return (
        <div className="progress-bar-container">
            <motion.div
                style={{
                    height: "10px",
                    background: useColorModeValue("Dark", "Light") === "Dark" ? "black" : "white",
                    borderRadius: "5px"
                }}
                variants={progressBarVariants}
                initial="initial"
                animate="animate"
            />
        </div>
    );
}
