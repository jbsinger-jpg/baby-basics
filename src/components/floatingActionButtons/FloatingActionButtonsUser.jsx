import { VStack, useToast } from '@chakra-ui/react';
import { GoogleAuthProvider } from 'firebase/auth';
import { UnlockIcon } from '@chakra-ui/icons';
import LogoutIcon from '@mui/icons-material/Logout';

import { auth, firestore } from '../../firebaseConfig';
import ColorModeToggleButton from '../ColorModeToggleButton';
import FabTemplate from './StandardFab';

export default function FloatingActionButtonsUser() {
    const toast = useToast();

    const handleSignInGoogle = () => {
        const provider = new GoogleAuthProvider();

        auth.signInWithPopup(provider).then(async (result) => {
            // add a template user to the database
            const usersRef = await firestore.collection("users");
            usersRef.where("email", "==", result.user.email).get().then(snapshot => {
                if (!snapshot.docs.length) {
                    usersRef.doc(result.user.uid).set({
                        email: result.user.email,
                        full_name: result.user.displayName,
                        id: result.user.uid
                    });
                }
            });

            const token = result.credential.accessToken;

            toast({
                title: 'Successful Sign In',
                description: "We were able to sign in to the account token \n" + token,
                status: 'success',
                duration: 9000,
                isClosable: true,
            });

        }).catch((error) => {
            toast({
                title: 'Unable to sign in',
                description: "We were unable sign in to the account provided error code " + JSON.stringify(error),
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
        });
    };

    const handleSignOut = () => {
        auth.signOut()
            .then(() => {
                // Handle successful sign-out
                toast({
                    title: 'Signed Out',
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                });
                console.log("Signed out!");
            })
            .catch((error) => {
                // Handle sign-out error
                console.error(error);
            });
    };

    return (
        <VStack
            top="14"
            right="4"
            position="fixed"
            h="600px"
            alignItems="start"
        >
            <ColorModeToggleButton />
            <FabTemplate
                icon={<UnlockIcon height="30px" width="30px" />}
                onClick={handleSignInGoogle}
                label={"Log In"}
            />
            <FabTemplate
                icon={<LogoutIcon fontSize='medium' />}
                onClick={handleSignOut}
                label={"Log Out"}
            />
        </VStack>

    );
}
