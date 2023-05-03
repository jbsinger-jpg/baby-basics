// module imports
import { HamburgerIcon, SearchIcon, UnlockIcon } from '@chakra-ui/icons';
import { HStack, VStack, useToast } from '@chakra-ui/react';
import PregnantWomanOutlinedIcon from '@mui/icons-material/PregnantWomanOutlined';
import BabyChangingStationIcon from '@mui/icons-material/BabyChangingStation';
import MapIcon from '@mui/icons-material/Map';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider } from 'firebase/auth';
import LogoutIcon from '@mui/icons-material/Logout';

// relative imports
import ColorModeToggleButton from '../ColorModeToggleButton';
import SearchBarAlertDialog from '../modals/SearchBarModal';
import FabTemplate from './StandardFab';
import { auth, firestore } from '../../firebaseConfig';

export default function FloatingActionButtons({
    setSettingsIsOpen,
    handleSearchPlacesDialogOpen,
    currentUser,
    setSearchBarIsOpen,
    searchBarIsOpen,
    setFoodData,
    setClothingData,
    setDiaperData,
    setMaternalData,
    setFormulaData,
    setToyData,
    setMonitorData,
    setSeatData,
    setStrollerData,
    setVitaminData,
    tabIndex,
    setTabIndex
}) {
    const navigate = useNavigate();
    const toast = useToast();

    const handleSettingsPress = () => {
        setSettingsIsOpen(true);
    };

    // const handleLogin = () => {
    //     navigate("/login");
    // };

    const handleMilestones = () => {
        navigate("/milestone");
    };

    const handleMaternalResources = () => {
        navigate("/maternal");
    };

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
        <HStack
            top="14"
            right="4"
            position="fixed"
            h="600px"
            alignItems="start"
        >
            <SearchBarAlertDialog
                searchBarIsOpen={searchBarIsOpen}
                setSearchBarIsOpen={setSearchBarIsOpen}
                setFoodData={setFoodData}
                setClothingData={setClothingData}
                setDiaperData={setDiaperData}
                setMaternalData={setMaternalData}
                setFormulaData={setFormulaData}
                setToyData={setToyData}
                setMonitorData={setMonitorData}
                setSeatData={setSeatData}
                setStrollerData={setStrollerData}
                setVitaminData={setVitaminData}
                tabIndex={tabIndex}
                setTabIndex={setTabIndex}
            />
            <VStack>
                <ColorModeToggleButton />
                <FabTemplate
                    icon={<MapIcon fontSize="large" />}
                    onClick={handleSearchPlacesDialogOpen}
                    label={"Look up a Location"}
                />
                {currentUser ?
                    <FabTemplate
                        icon={<HamburgerIcon height="30px" width="30px" />}
                        onClick={handleSettingsPress}
                        label={"User Account"}
                    />
                    :
                    null
                }
                <FabTemplate
                    icon={<SearchIcon height="30px" width="30px" />}
                    onClick={() => setSearchBarIsOpen(true)}
                    label={"Search"}
                />
                <FabTemplate
                    icon={<BabyChangingStationIcon fontSize="large" />}
                    onClick={handleMilestones}
                    label={"Baby Milestones"}
                />
                <FabTemplate
                    icon={<PregnantWomanOutlinedIcon fontSize="large" />}
                    onClick={handleMaternalResources}
                    label={"Maternity"}
                />
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
        </HStack>

    );
}
