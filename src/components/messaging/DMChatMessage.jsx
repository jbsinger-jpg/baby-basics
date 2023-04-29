// module imports
import { Avatar, Box, Tag, Text } from "@chakra-ui/react";

// relative imports
import { auth } from "../../firebaseConfig";

export default function DMChatMessage({ message, fontSize }) {
    const { text, uid, photoURL } = message;
    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

    return (
        <div style={{ display: "flex", justifyContent: messageClass === 'sent' ? "flex-start" : 'flex-end', padding: "10px" }}>
            <div style={{ display: 'flex', flexDirection: "row", alignItems: "center", gap: "10px" }}>
                <Avatar src={photoURL || 'https://i.imgur.com/rFbS5ms.png'} alt="Avatar" />
                <Box whiteSpace="pre-wrap">
                    <Box
                        whiteSpace="pre-wrap"
                    >
                        <Tag
                            borderRadius="md"
                            size="lg"
                            variant="solid"
                            colorScheme="teal"
                        >
                            <Text
                                padding="4"
                                fontSize={fontSize}
                            >
                                {text}
                            </Text>
                        </Tag>
                    </Box>
                </Box>
            </div>
        </div>
    );
}