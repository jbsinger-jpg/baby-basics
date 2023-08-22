const STATUS = {
    GOOD: "optimal",
    OKAY: "info",
    BAD: "alert",
    NONE: "none",
};

const babyPoopColorData = [
    {
        color: "yellow",
        description: "Usual coloration for babies that are breast-fed, during the meconium stage.",
        status: STATUS.GOOD
    },
    {
        color: "brown",
        description: "Coloration usually found within formula fed babies.",
        status: STATUS.GOOD
    },
    {
        color: "black",
        description: "Coloration can be considered normal for babies in the meconium stage. Should consider contacting doctor otherwise.",
        status: STATUS.OKAY
    },
    {
        color: "red",
        description: "Coloration can be caused from sudden change in diet. Red streaks could be blood.",
        status: STATUS.BAD
    },
    {
        color: "green",
        description: "Coloration can be caused from either bacterial infection or sudden change in diet.",
        status: STATUS.BAD
    },
    {
        color: "orange",
        description: "Coloration can be caused by certain medications that the baby was given, and/or diet related.",
        status: STATUS.OKAY
    },
    {
        color: "white",
        description: "Coloration could be an indication that your baby has biliary atresia.",
        status: STATUS.BAD
    },
];

const babyPoopConsistencyData = [
    {
        consistency: "sticky",
        description: "Baby's first bowel movements are considered to be sticky/tar-like",
        status: STATUS.GOOD
    },
    {
        consistency: "mushy",
        description: "Is the consistency of baby's first bowel movements and is a good indication that they are breast-fed.",
        status: STATUS.GOOD
    },
    {
        consistency: "well-formed",
        description: "This is normal once babies start to eat solid foods.",
        status: STATUS.GOOD
    },
    {
        consistency: "watery",
        description: "Good indication that the baby has diarrhea.",
        status: STATUS.OKAY
    },
    {
        consistency: "hard",
        description: "Good indication that the baby is constipated.",
        status: STATUS.OKAY
    },
    {
        consistency: "chalky",
        description: "Could be an indicator for potential liver problems.",
        status: STATUS.BAD
    },
    {
        consistency: "soft",
        description: "Formula-fed babies usually have poop that is soft, with a similar texture to peanut butter.",
        status: STATUS.OKAY
    },
];

export {
    babyPoopColorData, babyPoopConsistencyData, STATUS
};