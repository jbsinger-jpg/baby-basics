import { useToast } from '@chakra-ui/react';
import { GoogleAuthProvider } from 'firebase/auth';
import { ChevronDownIcon, ChevronUpIcon, UnlockIcon } from '@chakra-ui/icons';
import LogoutIcon from '@mui/icons-material/Logout';
import { useState } from 'react';

import { auth, firestore } from '../../firebaseConfig';
import ColorModeToggleButton from '../ColorModeToggleButton';
import FabTemplate from './StandardFab';
import FloatingActionButtonContainer from './FloatingActionButtonContainer';
import MotionContainerFAB from '../animated/MotionContainerFAB';

export default function FloatingActionButtonsUser({ setSignInLoading, setCurrentUser }) {
    const toast = useToast();
    const [buttonPressed, setButtonPressed] = useState(false);

    const handleSignInGoogle = () => {
        setSignInLoading(true);
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
        }).finally(() => {
            setSignInLoading(false);
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
                setCurrentUser(null);
            })
            .catch((error) => {
                // Handle sign-out error
                console.error(error);
            });
    };

    return (
        <FloatingActionButtonContainer>
            <MotionContainerFAB isPressed={buttonPressed}>
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
            </MotionContainerFAB>
            <FabTemplate
                icon={buttonPressed ? <ChevronUpIcon boxSize={8} /> : <ChevronDownIcon boxSize={8} />}
                onClick={() => setButtonPressed(!buttonPressed)}
            />
        </FloatingActionButtonContainer>
    );
}
