import { motion } from 'framer-motion';

export default function MotionContainer({ children, isPressed, setIsPressed }) {

    return (
        <motion.div
            style={{ height: "100%", width: "100%" }}
            initial={{ scale: 0 }}
            animate={{ scale: isPressed ? 0 : 1 }}
            onAnimationComplete={() => setIsPressed(false)}
            transition={{ duration: 0.2 }}
        >
            {children}
        </motion.div>
    );
}
