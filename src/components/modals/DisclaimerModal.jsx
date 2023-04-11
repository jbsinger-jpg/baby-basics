import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { cardBackground } from '../../defaultStyle';

export default function DisclaimerModal({ screeningAlertDialogVisibile, setScreeningAlertDialogVisibile }) {
    const navigate = useNavigate();
    const _cardBackground = useColorModeValue(cardBackground.light, cardBackground.dark);

    return (
        <AlertDialog
            isOpen={screeningAlertDialogVisibile}
            onClose={() => setScreeningAlertDialogVisibile(false)}
        >
            <AlertDialogOverlay>
                <AlertDialogContent bg={_cardBackground}>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                        Demographic Disclaimer
                    </AlertDialogHeader>
                    <AlertDialogBody>
                        This page asks personal questions that are in no need mandatory to answer
                        this is just to make it easier for others to reach out to you when friending, or
                        seeking opinions by people with certain characteristics.
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button onClick={() => setScreeningAlertDialogVisibile(false)}>
                            Cancel
                        </Button>
                        <Button onClick={() => navigate("/screening")} ml={3}>
                            Continue
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    );
}
