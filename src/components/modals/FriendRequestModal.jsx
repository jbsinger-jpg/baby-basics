import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button } from '@chakra-ui/react';
import React, { useState } from 'react';
import { firestore } from '../../firebaseConfig';

export default function FriendRequestModal({ alertDialogVisible, setAlertDialogVisible, alertDialogUser, currentUser }) {
    const [friendButtonIsLoading, setFriendButtonIsLoading] = useState(false);


    const handleFriendSubmission = async () => {
        setFriendButtonIsLoading(true);
        const usersRef = await firestore.collection("users");
        const userDoc = await usersRef.doc(currentUser.uid);
        const userDocConfirmedFriends = await userDoc.collection("confirmedFriends");
        const userDocPendingFriends = await userDoc.collection("pendingFriends");

        if (alertDialogUser.id) {
            await userDocConfirmedFriends.doc(alertDialogUser.id).set({
                ...alertDialogUser
            });

            await userDocPendingFriends.doc(alertDialogUser.id).delete();

            // update sending user friends list as well
            const sendingUserDoc = await firestore.collection("users").doc(alertDialogUser.id);
            const sendingUserDocConfirmedFriends = await sendingUserDoc.collection("confirmedFriends");
            const sendingUserDocPendingFriends = await sendingUserDoc.collection("pendingFriends");

            await sendingUserDocConfirmedFriends.doc(currentUser?.uid)
                .set({
                    ...(await userDoc.get()).data()
                });

            await sendingUserDocPendingFriends.doc(currentUser.uid).delete();
        }

        setAlertDialogVisible(false);
        setFriendButtonIsLoading(false);
    };

    return (
        <AlertDialog
            isOpen={alertDialogVisible}
            onClose={() => setAlertDialogVisible(false)}
        >
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                        Friend Confirmation
                    </AlertDialogHeader>
                    <AlertDialogBody>
                        Are you sure you wanna friend this person, dawg?
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button onClick={() => setAlertDialogVisible(false)}>
                            Cancel
                        </Button>
                        <Button isLoading={friendButtonIsLoading} onClick={handleFriendSubmission} ml={3}>
                            Friend
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    );
}
