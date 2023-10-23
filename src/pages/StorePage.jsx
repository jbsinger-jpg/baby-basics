// module imports
import { Box, Spinner, TabPanel, TabPanels, Tabs, useColorModeValue, useMediaQuery } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

// relative imports
import { auth, firestore } from '../firebaseConfig';
import ClothingDataTabPanel from '../components/tabPanels/ClothingDataTabPanel';
import FoodDataTabPanel from '../components/tabPanels/FoodDataTabPanel';
import DiaperDataTabPanel from '../components/tabPanels/DiaperDataTabPanel';
import MaternalDataTabPanel from '../components/tabPanels/MaternalDataTabPanel';
import FloatingActionButtons from '../components/floatingActionButtons/FloatingActionButtons';
import FriendRequestModal from '../components/modals/FriendRequestModal';
import FormulaDataTabPanel from '../components/tabPanels/FormulaDataTabPanel';
import ToysDataTabPanel from '../components/tabPanels/ToysDataTabPanel';
import MonitorsDataTabPanel from '../components/tabPanels/MonitorsDataTabPanel';
import SeatsTabPanel from '../components/tabPanels/SeatsTabPanel';
import StrollersDataTabPanel from '../components/tabPanels/StrollersDataTabPanel';
import { screenBackground } from '../defaultStyle';
import VitaminDataTabPanel from '../components/tabPanels/VitaminDataTabPanel';
import BabyImagesModal from '../components/modals/BabyImagesModal';
import SleepTabPanel from '../components/tabPanels/SleepTabPanel';
import BathTabPanel from '../components/tabPanels/BathTabPanel';

export default function StorePage() {
    // hooks
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

    // vitamin data
    const [vitaminData, setVitaminData] = useState(null);
    const [vitaminDataIsLoading, setVitaminDataIsLoading] = useState(true);

    // sleep data
    const [sleepData, setSleepData] = useState(null);
    const [sleepDataIsLoading, setSleepDataIsLoading] = useState(true);

    // bath data
    const [bathData, setBathData] = useState(null);
    const [bathDataIsLoading, setBathDataIsLoading] = useState(true);

    const _screenBackground = useColorModeValue(screenBackground.light, screenBackground.dark);
    const [searchBarIsOpen, setSearchBarIsOpen] = useState(false);
    const [babyImagesModalIsOpen, setBabyImagesModalIsOpen] = useState(false);
    const [searchInProgress, setSearchInProgress] = useState(false);

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

        firestore.collection('sleep').get()
            .then(snapshot => {
                snapshot.docs.forEach(doc => {
                    options.push({ ...doc.data() });
                });

                setSleepData(options);
                setSleepDataIsLoading(false);
                options = [];
            });

        firestore.collection('bath').get()
            .then(snapshot => {
                snapshot.docs.forEach(doc => {
                    options.push({ ...doc.data() });
                });

                setBathData(options);
                setBathDataIsLoading(false);
                options = [];
            });
    }, []);

    return (
        <Box
            bg={_screenBackground}
            overflowX="hidden"
        >
            {/* IF CONTENT IS LOADING DISPLAY SPINNER ICON */}
            {!clothingData || !foodData || !diaperData || !maternialData || !formulaData || !toyData || !monitorData || !seatData || !strollerData || !vitaminData || !sleepData || !bathData || searchInProgress ?
                <Box
                    alignItems="center"
                    justifyContent="center"
                    h="100%"
                    w="100%"
                    display="flex"
                >
                    <Spinner size="xl" />
                </Box>
                :
                <>
                    <Tabs
                        align='start'
                        variant='enclosed'
                        index={tabIndex}
                        bg={_screenBackground}
                        orientation={isLargerThan768 ? "horizontal" : "vertical"}
                        isFitted={true}
                        w="95vw"
                    >
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
                            <TabPanel>
                                <SleepTabPanel
                                    sleepData={sleepData}
                                    sleepDataIsLoading={sleepDataIsLoading}
                                    tabIndex={tabIndex}
                                />
                            </TabPanel>
                            <TabPanel>
                                <BathTabPanel
                                    bathData={bathData}
                                    bathDataIsLoading={bathDataIsLoading}
                                    tabIndex={tabIndex}
                                />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </>
            }
            <FloatingActionButtons
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
                setSleepData={setSleepData}
                setBathData={setBathData}
                tabIndex={tabIndex}
                setTabIndex={setTabIndex}
                setSearchInProgress={setSearchInProgress}
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
