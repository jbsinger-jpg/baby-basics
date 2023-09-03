// module imports
import { ChatIcon, WarningIcon } from '@chakra-ui/icons';
import { Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, TabPanel, TabPanels, Tabs, useColorModeValue, useDisclosure, useMediaQuery, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PublishIcon from '@mui/icons-material/Publish';
import CalculateIcon from '@mui/icons-material/Calculate';
import Bedtime from '@mui/icons-material/Bedtime';

// relative imports
import { auth, firestore } from '../firebaseConfig';
import ClothingDataTabPanel from '../components/tabPanels/ClothingDataTabPanel';
import FoodDataTabPanel from '../components/tabPanels/FoodDataTabPanel';
import DiaperDataTabPanel from '../components/tabPanels/DiaperDataTabPanel';
import MaternalDataTabPanel from '../components/tabPanels/MaternalDataTabPanel';
import FloatingActionButtons from '../components/floatingActionButtons/FloatingActionButtons';
import DisclaimerModal from '../components/modals/DisclaimerModal';
import FriendRequestModal from '../components/modals/FriendRequestModal';
import FormulaDataTabPanel from '../components/tabPanels/FormulaDataTabPanel';
import ToysDataTabPanel from '../components/tabPanels/ToysDataTabPanel';
import MonitorsDataTabPanel from '../components/tabPanels/MonitorsDataTabPanel';
import SeatsTabPanel from '../components/tabPanels/SeatsTabPanel';
import StrollersDataTabPanel from '../components/tabPanels/StrollersDataTabPanel';
import { screenBackground } from '../defaultStyle';
import VitaminDataTabPanel from '../components/tabPanels/VitaminDataTabPanel';
import BabyImagesModal from '../components/modals/BabyImagesModal';
import BottleIcon from '../components/staticPageData/BottleIcon';
import DiaperIcon from '../components/staticPageData/DiaperIcon';
import StyledSelect from '../components/StyledSelect';

export default function HomePage() {
    // hooks
    const { onOpen } = useDisclosure();
    const navigate = useNavigate();
    const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

    // firebase data
    const currentUser = auth.currentUser;

    // useState variables
    const [alertDialogUser] = useState(null);
    const [alertDialogVisible, setAlertDialogVisible] = useState(false);
    const [tabIndex, setTabIndex] = useState(0);

    // clothing data for search bar
    const [clothingData, setClothingData] = useState(null);
    const [isClothingDataLoading, setIsClothingDataLoading] = useState(true);

    // food data for search bar
    const [foodData, setFoodData] = useState(null);
    const [isFoodDataLoading, setIsFoodDataLoading] = useState(true);

    // diaper data for search bar

    const [diaperData, setDiaperData] = useState(null);
    const [isDiapersLoading, setIsDiapersLoading] = useState(true);

    // maternial data
    const [maternialData, setMaternialData] = useState(null);
    const [maternialDataIsLoading, setMaternialDataIsLoading] = useState(true);

    // formula data
    const [formulaData, setFormulaData] = useState(null);
    const [formulaDataIsLoading, setFormulaDataIsLoading] = useState(true);

    // toy data
    const [toyData, setToyData] = useState(null);
    const [toyDataIsLoading, setToyDataIsLoading] = useState(true);

    // monitor data
    const [monitorData, setMonitorData] = useState(null);
    const [monitorDataIsLoading, setMonitorDataIsLoading] = useState(true);

    // seat data
    const [seatData, setSeatData] = useState(null);
    const [seatDataIsLoading, setSeatDataIsLoading] = useState(true);

    // stroller data
    const [strollerData, setStrollerData] = useState(null);
    const [strollerDataIsLoading, setStrollerDataIsLoading] = useState(true);

    const [vitaminData, setVitaminData] = useState(null);
    const [vitaminDataIsLoading, setVitaminDataIsLoading] = useState(true);

    const [screeningAlertDialogVisibile, setScreeningAlertDialogVisibile] = useState(false);
    const [settingsIsOpen, setSettingsIsOpen] = useState(false);

    const _screenBackground = useColorModeValue(screenBackground.light, screenBackground.dark);
    const [screenHeight, setScreenHeight] = useState(window.innerHeight);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [searchBarIsOpen, setSearchBarIsOpen] = useState(false);

    const [babyImagesModalIsOpen, setBabyImagesModalIsOpen] = useState(false);
    const storeOptions = [
        { key: 0, value: 0, label: "Clothing" },
        { key: 1, value: 1, label: "Food" },
        { key: 2, value: 2, label: "Diapers" },
        { key: 3, value: 3, label: "Vitamins" },
        { key: 4, value: 4, label: "Maternal" },
        { key: 5, value: 5, label: "Formula" },
        { key: 6, value: 6, label: "Toys" },
        { key: 7, value: 7, label: "Monitors" },
        { key: 8, value: 8, label: "Seats" },
        { key: 9, value: 9, label: "Strollers" },
    ];

    const handleTabsChange = (event) => {
        setTabIndex(Number(event.target.value));
    };

    const handleOpenPictureUploadDialog = () => {
        setBabyImagesModalIsOpen(true);
    };

    const handleOpenGraphPage = () => {
        navigate(`/graph`);
    };

    const handleOpenBabySleepPage = () => {
        navigate(`/sleep`);
    };

    // // initialize the page with the data from the data base
    useEffect(() => {
        let options = [];

        // set the data on the inital page load
        firestore.collection('food').get()
            .then(snapshot => {
                snapshot.docs.forEach(doc => {
                    options.push({ ...doc.data() });
                });

                setFoodData(options);
                setIsFoodDataLoading(false);
                options = [];
            });

        firestore.collection('diapers').get()
            .then(snapshot => {
                snapshot.docs.forEach(doc => {
                    options.push({ ...doc.data() });
                });

                setDiaperData(options);
                setIsDiapersLoading(false);
                options = [];
            });

        firestore.collection('clothing').get()
            .then(snapshot => {
                snapshot.docs.forEach(doc => {
                    options.push({ ...doc.data() });
                });

                setClothingData(options);
                setIsClothingDataLoading(false);
                options = [];
            });

        firestore.collection('maternal_clothes').get()
            .then(snapshot => {
                snapshot.docs.forEach(doc => {
                    options.push({ ...doc.data() });
                });

                setMaternialData(options);
                setMaternialDataIsLoading(false);
                options = [];
            });

        firestore.collection('formula').get()
            .then(snapshot => {
                snapshot.docs.forEach(doc => {
                    options.push({ ...doc.data() });
                });

                setFormulaData(options);
                setFormulaDataIsLoading(false);
                options = [];
            });

        firestore.collection('toys').get()
            .then(snapshot => {
                snapshot.docs.forEach(doc => {
                    options.push({ ...doc.data() });
                });

                setToyData(options);
                setToyDataIsLoading(false);
                options = [];
            });

        firestore.collection('monitors').get()
            .then(snapshot => {
                snapshot.docs.forEach(doc => {
                    options.push({ ...doc.data() });
                });

                setMonitorData(options);
                setMonitorDataIsLoading(false);
                options = [];
            });

        firestore.collection('car_seats').get()
            .then(snapshot => {
                snapshot.docs.forEach(doc => {
                    options.push({ ...doc.data() });
                });

                setSeatData(options);
                setSeatDataIsLoading(false);
                options = [];
            });

        firestore.collection('strollers').get()
            .then(snapshot => {
                snapshot.docs.forEach(doc => {
                    options.push({ ...doc.data() });
                });

                setStrollerData(options);
                setStrollerDataIsLoading(false);
                options = [];
            });

        firestore.collection('vitamins').get()
            .then(snapshot => {
                snapshot.docs.forEach(doc => {
                    options.push({ ...doc.data() });
                });

                setVitaminData(options);
                setVitaminDataIsLoading(false);
                options = [];
            });
    }, []);

    useEffect(() => {
        function handleResize() {
            setScreenHeight(window.innerHeight);
            setScreenWidth(window.innerWidth);
        }

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [screenHeight, screenWidth]);

    return (
        <Box
            bg={_screenBackground}
            h={screenHeight}
            w={screenWidth}
            overflowX="hidden"
        >
            <Drawer
                isOpen={settingsIsOpen}
                placement='right'
                onClose={() => setSettingsIsOpen(false)}
            >
                <DrawerOverlay />
                <DrawerContent bg={_screenBackground}>
                    <DrawerCloseButton />
                    <DrawerHeader>Stuff for You!</DrawerHeader>
                    <DrawerBody>
                        <VStack alignItems="start" spacing="5">
                            <Button leftIcon={<ChatIcon />} onClick={onOpen}>
                                Chat with Peeps
                            </Button>
                            <Button
                                leftIcon={<WarningIcon />}
                                onClick={() => setScreeningAlertDialogVisibile(true)}
                            >
                                About you
                            </Button>
                            <Button
                                rightIcon={<PublishIcon fontSize="small" />}
                                onClick={handleOpenPictureUploadDialog}
                            >
                                Upload Baby Pictures!
                            </Button>
                            <Button
                                rightIcon={<CalculateIcon fontSize="small" />}
                                onClick={handleOpenGraphPage}
                            >
                                Track Baby Growth!
                            </Button>
                            <Button
                                rightIcon={<Bedtime fontSize="small" />}
                                onClick={handleOpenBabySleepPage}
                            >
                                Track Baby Sleep!
                            </Button>
                            <Button
                                rightIcon={<DiaperIcon />}
                                onClick={() => navigate("/diaper-tracking")}
                            >
                                Track Baby Diapers!
                            </Button>
                            <Button
                                rightIcon={
                                    <BottleIcon />
                                }
                                onClick={() => navigate("/feed-tracking")}
                            >
                                Track Baby Feeding!
                            </Button>
                        </VStack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
            <Tabs
                align='start'
                variant='enclosed'
                index={tabIndex}
                bg={_screenBackground}
                orientation={isLargerThan768 ? "horizontal" : "vertical"}
                isFitted={true}
                w="95vw"
            >
                <StyledSelect
                    onChange={handleTabsChange}
                    options={storeOptions}
                    removeNullOption
                    value={tabIndex}
                />
                <TabPanels>
                    <TabPanel>
                        <ClothingDataTabPanel
                            clothingData={clothingData}
                            clothingDataLoaded={isClothingDataLoading}
                            tabIndex={tabIndex}
                        />
                    </TabPanel>
                    <TabPanel>
                        <FoodDataTabPanel
                            foodData={foodData}
                            isFoodDataLoading={isFoodDataLoading}
                            tabIndex={tabIndex}
                        />
                    </TabPanel>
                    <TabPanel>
                        <DiaperDataTabPanel
                            diaperData={diaperData}
                            isDiapersLoading={isDiapersLoading}
                            tabIndex={tabIndex}
                        />
                    </TabPanel>
                    <TabPanel>
                        <VitaminDataTabPanel
                            vitaminData={vitaminData}
                            vitaminDataIsLoading={vitaminDataIsLoading}
                            tabIndex={tabIndex}
                        />
                    </TabPanel>
                    <TabPanel>
                        <MaternalDataTabPanel
                            maternialData={maternialData}
                            maternialDataLoading={maternialDataIsLoading}
                            tabIndex={tabIndex}
                        />
                    </TabPanel>
                    <TabPanel>
                        <FormulaDataTabPanel
                            formulaData={formulaData}
                            formulaDataIsLoading={formulaDataIsLoading}
                            tabIndex={tabIndex}
                        />
                    </TabPanel>
                    <TabPanel>
                        <ToysDataTabPanel
                            toyData={toyData}
                            toyDataIsLoading={toyDataIsLoading}
                            tabIndex={tabIndex}
                        />
                    </TabPanel>
                    <TabPanel>
                        <MonitorsDataTabPanel
                            monitorData={monitorData}
                            monitorDataIsLoading={monitorDataIsLoading}
                            tabIndex={tabIndex}
                        />
                    </TabPanel>
                    <TabPanel>
                        <SeatsTabPanel
                            seatData={seatData}
                            seatDataIsLoading={seatDataIsLoading}
                            tabIndex={tabIndex}
                        />
                    </TabPanel>
                    <TabPanel>
                        <StrollersDataTabPanel
                            strollerData={strollerData}
                            strollerDataIsLoading={strollerDataIsLoading}
                            tabIndex={tabIndex}
                        />
                    </TabPanel>
                </TabPanels>
            </Tabs>
            <FloatingActionButtons
                setSettingsIsOpen={setSettingsIsOpen}
                currentUser={currentUser}
                setSearchBarIsOpen={setSearchBarIsOpen}
                searchBarIsOpen={searchBarIsOpen}
                setFoodData={setFoodData}
                setClothingData={setClothingData}
                setDiaperData={setDiaperData}
                setMaternalData={setMaternialData}
                setFormulaData={setFormulaData}
                setToyData={setToyData}
                setMonitorData={setMonitorData}
                setSeatData={setSeatData}
                setStrollerData={setStrollerData}
                setVitaminData={setVitaminData}
                tabIndex={tabIndex}
                setTabIndex={setTabIndex}
            />
            <DisclaimerModal
                screeningAlertDialogVisibile={screeningAlertDialogVisibile}
                setScreeningAlertDialogVisibile={setScreeningAlertDialogVisibile}
            />
            <FriendRequestModal
                alertDialogVisible={alertDialogVisible}
                setAlertDialogVisible={setAlertDialogVisible}
                alertDialogUser={alertDialogUser}
                currentUser={currentUser}
            />
            <BabyImagesModal
                babyImagesModalIsOpen={babyImagesModalIsOpen}
                setBabyImagesModalIsOpen={setBabyImagesModalIsOpen}
            />
        </Box>
    );
}
