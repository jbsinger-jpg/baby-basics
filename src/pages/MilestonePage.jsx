import { Box, HStack, Select, useColorModeValue } from '@chakra-ui/react';
import React, { useState } from 'react';
import FloatingActionButtonsBabyInfo from '../components/FloatingActionButtonsBabyInfo';
import GoogleMapsModal from '../components/modals/GoogleMapsModal';
import ChatIcon from '@mui/icons-material/Chat';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import HearingIcon from '@mui/icons-material/Hearing';
import AbcIcon from '@mui/icons-material/Abc';
import { screenBackground } from '../defaultStyle';
import AnimatedCard from '../components/animated/AnimatedCard';

const promptOptions = [
    {
        ageSelected: "0-3M",
        answer: "Baby will spend most of its time sleeping, and feeding",
        activities: [
            "Monkey See Monkey do: They might mimic you sticking your tongue out, even as a newborn. As the baby grows, they may mimic your other facial expressions and cooing sounds, too. Start early: hold her face-to-face, smile,open your mouth and slowly stick out  your tongue. Repeat",
            "Baby Calisthenics: With your baby on their back, gently pull their legs up to you and then side to side. Up, out, down, back, reverse. Do the same with their arms",
            "Airplane: Hold your baby firmly with both hands—one under their bottom and the other cupped on the back of her head. Lift them up in the air and let her “fly” around slowly and gently. Always firmly support their head"
        ],
        motorMilestones: [
            "Being able to move fists from closed to open",
            "Pushing up with arms, lying on stomach",
            "While lying on tummy, lifts and holds head up"
        ],
        sensoryMilestones: [
            "Attempts to reach for a toy held above their chest",
            "While lying on back, keeps head centered to watch faces or toys",
            "While lying on back, visually tracks a moving toy from side to side"
        ],
        communicationMilestones: [
            "Quiets or smiles in response to sound or voice",
            "Cries differently for different needs (e.g. hungry vs. tired)",
            "Coos and smiles"
        ],
        feedingMilestones: [
            "Latches onto nipple or bottle",
            "Tongue moves forward and back to suck",
            "Sucks and swallows well during feeding"
        ],
        hyperlinks: [
            "https://raisingchildren.net.au/newborns/development/development-tracker/0-1-month#:~:text=Newborn%20development%20at%200%2D1%20month%3A%20what's%20happening,-Cuddling%2C%20sleeping%2C%20feeding&text=Your%20baby's%20brain%20is%20growing,your%20face%20with%20their%20eyes.",
            "https://pathways.org/baby-milestones-calendar/?gclid=Cj0KCQjwiZqhBhCJARIsACHHEH86vfPyH6tvUXwPDgWU8jpb7cU43bPforCV23MfAutajr02Jbf9nEoaAll_EALw_wcB",
            "https://dadsadventure.com/your-babys-playmate/?gclid=CjwKCAjwrJ-hBhB7EiwAuyBVXeIezd00HCI0y_zL4c0J1PWXy0LN8DGY8huixsRVWDEFhz8b37_eNBoC7VIQAvD_BwE",
            "https://www.healthychildren.org/English/ages-stages/baby/Pages/default.aspx"
        ],
        videos: [
            { value: "https://www.youtube.com/embed/kc7nN-r5y2I", label: "How To Play With 0-3 Month Old Newborn", key: 0 },
            { value: "https://www.youtube.com/embed/_RUGceDmfwE", label: "Avoid These 5 Things for Better BABY DEVELOPMENT", key: 1 },
            { value: "https://www.youtube.com/embed/DTIz2D0K_EE", label: "What are Baby Monthly Milestones? How Should a Baby Grow?", key: 2 },
            { value: "https://www.youtube.com/embed/NMLsn1BNBYk", label: "A Complete Guide to Your Newborn's First Month - What to Expect", key: 3 },
        ]
    },
    {
        ageSelected: "4-6M",
        answer: "Baby should be able to babble to get attention, and have limited movement",
        activities: [
            "Play music",
            "Read to your baby",
            "Offer some simple toys, i.e a rattle, or mirror"
        ],
        motorMilestones: [
            "Baby's head control will get better after rolling over",
            "Rolls from back to tummy and tummy to back",
            "While standing with support, accepts entire weight with legs"
        ],
        sensoryMilestones: [
            "Your baby is starting to be able to tell the difference between shades of basic colors",
            "Babbling over new sounds, showing increase in responsiveness",
            "Knows familiar people"
        ],
        communicationMilestones: [
            "Listens and responds when spoken to",
            "Uses babbling to get attention",
            'Blows bubbles or “raspberries"'
        ],
        feedingMilestones: [
            "Shows interest in food",
            "Moves pureed food from front of mouth to back",
            "Begins to eat cereals and pureed foods – Smooth, pureed food (single ingredient only), like carrots, sweet potato, squash, apples, pears"
        ],
        hyperlinks: [
            "https://pathways.org/growth-development/4-6-months/milestones/",
            "https://www.mayoclinic.org/healthy-lifestyle/infant-and-toddler-health/in-depth/infant-development/art-20048178",
            "https://www.choc.org/primary-care/ages-stages/4-to-6-months/",
            "https://www.cdc.gov/ncbddd/actearly/milestones/milestones-6mo.html"
        ],
        videos: [
            { value: "https://www.youtube.com/embed/Y_8nlwkioLw", label: "MONTESSORI AT HOME", key: 0 },
            { value: "https://www.youtube.com/embed/AdIM7eAVPtU", label: "Four-Month-Old Baby - What to Expect", key: 1 },
        ]
    },
    {
        ageSelected: "7-9M",
        answer: "Might start crawling and being able to sit on their own",
        activities: [
            "Nursery rhyme sing-along",
            "Light and shadow play",
            "Blowing bubbles",
            "Go for a sensory walk with your 7-month-old",
            "Read picture books"
        ],
        motorMilestones: [
            "Sits and reaches for toys without falling",
            "Can hold an object in each hand",
            "May hold a bottle"
        ],
        sensoryMilestones: [
            "Pays attention to conversation",
            "Experiments with the amount of force needed to pick up different objects",
            "Focuses on objects near and far"
        ],
        communicationMilestones: [
            "Uses increased variety of sounds and syllable combinations in babbling",
            "Recognizes sound of name",
            "Lifts arms up to be picked up"
        ],
        feedingMilestones: [
            "In a high chair, holds and drinks from a bottle",
            "Stays full longer after eating",
            "Shows strong reaction to new smells and tastes"
        ],
        hyperlinks: [
            "https://pathways.org/growth-development/7-9-months/milestones/",
            "https://www.beaumont.org/services/childrens/health-safety/your-growing-child-7-9-months",
            "https://www.cdc.gov/ncbddd/actearly/milestones/milestones-9mo.html",
            "https://rainydaymum.co.uk/activity-ideas-to-do-with-your-7-month-old/"
        ],
        videos: [
            { value: "https://www.youtube.com/embed/hxQr75hrZDE", label: "7-Month-Old Baby - What to Expect", key: 0 },
            { value: "https://www.youtube.com/embed/avhyyLEY1J0", label: "7 Months Old: What to Expect - Channel Mum", key: 1 },
        ]
    },
    {
        ageSelected: "10-12M",
        answer: "Baby should be able to pull themselves to a standing position",
        activities: [
            "Interactive play: rolling a ball, playing catch",
            "Drawing with baby-safe crayon",
            "Safe physical play"
        ],
        motorMilestones: [
            "Pulls to stand along furniture, close to walking independently but not quite",
            "Sit without help and pull themselves to a standing position.",
            "Releases objects into a container with a large opening"
        ],
        sensoryMilestones: [
            "Recognizes familiar objects and pictures in books, and may point to some objects when asked",
            "Will understand that objects are hidden or stored away, increase in object permanence",
            "May begin to pretend simple activities, such as cleaning or drinking from cup",
            "Can follow simple instructions"
        ],
        communicationMilestones: [
            "Says one or two words",
            "Using simple gestures, like waving bye",
            "Imitates speech sounds"
        ],
        feedingMilestones: [
            "Finger feeds self",
            "Drinking from a cup",
            "Might be ready to start self feeding with utensils"
        ],
        hyperlinks: [
            "https://pathways.org/growth-development/10-12-months/milestones/",
            "https://www.mayoclinic.org/healthy-lifestyle/infant-and-toddler-health/in-depth/infant-development/art-20047380#:~:text=From%20ages%2010%20to%2012,lead%20to%20walking%20without%20support.",
            "https://www.choc.org/primary-care/ages-stages/10-to-12-months/",
            "https://www.peanut-app.io/blog/activities-for-10-month-old"
        ],
        videos: [
            { value: "https://www.youtube.com/embed/LFmrmSfxqAw", label: "BRAIN DEVELOPMENT ACTIVITIES", key: 0 },
            { value: "https://www.youtube.com/embed/ZI28AAC7gsk", label: "Activities for Babies 9-12 Months", key: 1 },
            { value: "https://www.youtube.com/embed/wDnWwo-C55o", label: "12-Month-Old Baby", key: 2 },
        ]
    },
    {
        ageSelected: "13-18M",
        answer: "Should be able to move freely",
        activities: [
            "Hide toys under blankets",
            "Draw with sand",
            "Throw ping-pong balls in a box"
        ],
        motorMilestones: [
            "Walks and stands independently",
            "Squats to pick up a toy",
            "Holds crayon and scribble, not with fine accuracy"
        ],
        sensoryMilestones: [
            "Recognizes familiar people",
            "Has a sleep schedule",
            "Plays pretend"
        ],
        communicationMilestones: [
            "May use 5-10 words",
            "Imitates simple words and actions",
            "Initiates games"
        ],
        feedingMilestones: [
            "Increases variety of coarsely chopped table foods",
            "Holds and drinks from a cup"
        ],
        hyperlinks: [
            "https://pathways.org/growth-development/13-18-months/milestones/",
            "https://edn.ne.gov/cms/developmental-milestones-13-through-18-months",
            "https://chicklink.com/20-activities-for-a-toddler/"
        ],
        videos: [
            { value: "https://www.youtube.com/embed/DlwFzb145Ps", label: "Activities for 15-18 Month Olds", key: 0 },
            { value: "https://www.youtube.com/embed/C7O0U9OGHew", label: "Your Baby at 18 Months", key: 1 },
        ]
    },
    {
        ageSelected: "19-24M",
        answer: "Ability to communicate should greatly increase",
        activities: [
            "Stick letters on a window",
            "Sort Elastics by staw color",
            "Matching foam numbers to their outlines"
        ],
        motorMilestones: [
            "Starts to jumps with both feet leaving the ground",
            "Climbs on low furniture",
            "Drink with a straw."
        ],
        sensoryMilestones: [
            "Flips switches on and off",
            "Likes to imitate parents' actions",
            "Refers to self by name"
        ],
        communicationMilestones: [
            "Knows the names of familiar body parts",
            "Consistently imitates new words",
            "Understands new words quickly"
        ],
        feedingMilestones: [
            "None"
        ],
        hyperlinks: [
            "https://pathways.org/growth-development/19-24-months/milestones/",
            "https://edn.ne.gov/cms/developmental-milestones-19-through-24-months",
            "https://chicklink.com/activities-for-18-24-month-olds/"
        ]
    },
];

export default function MilestonePage() {
    const [selectedAge, setSelectedAge] = useState("0-3M");
    const [selectedActivities, setSelectedActivities] = useState(promptOptions[0].activities);
    const [selectedMotorMilestones, setSelectedMotorMilestones] = useState(promptOptions[0].motorMilestones);
    const [selectedCommunicationMilestones, setSelectedCommunicationMilestones] = useState(promptOptions[0].communicationMilestones);
    const [selectedFeedingMilestones, setSelectedFeedingMilestones] = useState(promptOptions[0].feedingMilestones);
    const [selectedSensoryMilestones, setSelectedSensoryMilestones] = useState(promptOptions[0].sensoryMilestones);
    const [selectedHyperLinks, setSelectedHyperLinks] = useState(promptOptions[0].hyperlinks);
    const [videos, setVideos] = useState(promptOptions[0]?.videos);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [places, setPlaces] = useState(false);
    const [motorButtonPressed, setMotorButtonPressed] = useState(false);
    const [flippedMotorCard, setFlippedMotorCard] = useState(false);
    const [communicationButtonPressed, setCommunicationButtonPressed] = useState(false);
    const [flippedCommunicationCard, setFlippedCommunicationCard] = useState(false);
    const [feedingButtonPressed, setFeedingButtonPressed] = useState(false);
    const [flippedFeedingCard, setFlippedFeedingCard] = useState(false);
    const [sensoryButtonPressed, setSensoryButtonPressed] = useState(false);
    const [flippedSensoryCard, setFlippedSensoryCard] = useState(false);
    const [activitiesButtonPressed, setActivitiesButtonPressed] = useState(false);
    const [flippedActivitiesCard, setFlippedActivitiesCard] = useState(false);
    const [flippedResourcesCard, setFlippedResourcesCard] = useState(false);
    const [resourceButtonPressed, setResourceButtonPressed] = useState(false);

    const handleAnswerChange = (event) => {
        if (flippedMotorCard)
            setMotorButtonPressed(true);

        if (flippedCommunicationCard)
            setCommunicationButtonPressed(true);

        if (flippedFeedingCard)
            setFeedingButtonPressed(true);

        if (flippedSensoryCard)
            setSensoryButtonPressed(true);

        if (flippedResourcesCard)
            setResourceButtonPressed(true);

        if (flippedActivitiesCard)
            setActivitiesButtonPressed(true);

        for (let i = 0; i < promptOptions.length; i++) {
            if (promptOptions[i].ageSelected === event.target.value) {
                setSelectedActivities(promptOptions[i].activities);
                setSelectedMotorMilestones(promptOptions[i].motorMilestones);
                setSelectedFeedingMilestones(promptOptions[i].feedingMilestones);
                setSelectedSensoryMilestones(promptOptions[i].sensoryMilestones);
                setSelectedCommunicationMilestones(promptOptions[i].communicationMilestones);
                setSelectedHyperLinks(promptOptions[i].hyperlinks);
                setVideos(promptOptions[i].videos);
            }
        }
    };

    const _screenBackground = useColorModeValue(screenBackground.light, screenBackground.dark);
    const handleSearchPlacesDialogOpen = () => {
        setPlaces(true);
    };

    return (
        <Box bg={_screenBackground} paddingTop="2">
            <FloatingActionButtonsBabyInfo
                handleSearchPlacesDialogOpen={handleSearchPlacesDialogOpen}
            />
            <GoogleMapsModal
                setSearchPlaces={setPlaces}
                searchPlaces={places}
            />
            <Select
                w="50vw"
                marginBottom="10"
                marginTop="5"
                paddingLeft="5"
                placeholder='Select baby age'
                value={selectedAge}
                onChange={(event) => {
                    setSelectedAge(event.target.value);
                    handleAnswerChange(event);
                }}
            >
                <option value="0-3M"> 0-3M </option>
                <option value="4-6M"> 4-6M </option>
                <option value="7-9M"> 7-9M </option>
                <option value="10-12M"> 10-12M </option>
                <option value="13-18M"> 13-18M </option>
                <option value="19-24M"> 19-24M </option>
            </Select>
            <HStack flexWrap={"wrap"} spacing="12" justifyContent="center" alignItems="start">
                <AnimatedCard
                    flippedCard={flippedMotorCard}
                    setFlippedCard={setFlippedMotorCard}
                    cardIcon={AccessibilityNewIcon}
                    cardButtonPressed={motorButtonPressed}
                    setCardButtonPressed={setMotorButtonPressed}
                    selectedCardData={selectedMotorMilestones}
                    title={"Milestones"}
                />
                <AnimatedCard
                    flippedCard={flippedCommunicationCard}
                    setFlippedCard={setFlippedCommunicationCard}
                    cardIcon={ChatIcon}
                    cardButtonPressed={communicationButtonPressed}
                    setCardButtonPressed={setCommunicationButtonPressed}
                    selectedCardData={selectedCommunicationMilestones}
                    title={"Communication"}
                />
                <AnimatedCard
                    flippedCard={flippedFeedingCard}
                    setFlippedCard={setFlippedFeedingCard}
                    cardIcon={LocalCafeIcon}
                    cardButtonPressed={feedingButtonPressed}
                    setCardButtonPressed={setFeedingButtonPressed}
                    selectedCardData={selectedFeedingMilestones}
                    title={"Feeding"}
                />
                <AnimatedCard
                    flippedCard={flippedSensoryCard}
                    setFlippedCard={setFlippedSensoryCard}
                    cardIcon={HearingIcon}
                    cardButtonPressed={sensoryButtonPressed}
                    setCardButtonPressed={setSensoryButtonPressed}
                    selectedCardData={selectedSensoryMilestones}
                    title={"Sensory"}
                />
                <AnimatedCard
                    flippedCard={flippedResourcesCard}
                    setFlippedCard={setFlippedResourcesCard}
                    cardButtonPressed={resourceButtonPressed}
                    setCardButtonPressed={setResourceButtonPressed}
                    selectedCardData={selectedVideo}
                    videos={videos}
                    title={"Resources"}
                />
                <AnimatedCard
                    flippedCard={flippedActivitiesCard}
                    setFlippedCard={setFlippedActivitiesCard}
                    cardIcon={AbcIcon}
                    cardButtonPressed={activitiesButtonPressed}
                    setCardButtonPressed={setActivitiesButtonPressed}
                    selectedCardData={selectedActivities}
                    title={"Potential Activities"}
                />
            </HStack>
        </Box>
    );
}
