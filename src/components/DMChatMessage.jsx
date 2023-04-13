import { Avatar, Box, Text } from "@chakra-ui/react";
import { auth } from "../firebaseConfig";

export default function DMChatMessage({ message, fontSize }) {
    const { text, uid, photoURL } = message;
    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

    return (
        <div style={{ display: "flex", justifyContent: messageClass === 'sent' ? "flex-start" : 'flex-end', padding: "10px" }}>
            <div style={{ display: 'flex', flexDirection: "row", alignItems: "center", gap: "10px" }}>
                <Avatar src={photoURL || 'https://i.imgur.com/rFbS5ms.png'} alt="Avatar" />
                <Box whiteSpace="pre-wrap">
                    <Text fontSize={fontSize}>
                        {text}
                    </Text>
                </Box>
            </div>
        </div>
    );
}