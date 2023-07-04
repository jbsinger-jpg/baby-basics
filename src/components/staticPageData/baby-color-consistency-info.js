const babyPoopColorData = [
    { color: "yellow", description: "Usual coloration for babies that are breast-fed, during the meconium stage." },
    { color: "brown", description: "Coloration usually found within formula fed babies." },
    { color: "black", description: "Coloration can be considered normal for babies in the meconium stage. Should consider contacting doctor." },
    { color: "red", description: "Coloration can be caused from sudden change in diet. Red streaks could be blood should consider contacting doctor." },
    { color: "green", description: "Coloration can be caused from either bacterial infection or sudden change in diet. Should consider contacting doctor." },
    { color: "orange", description: "Coloration can be caused by certain medications that the baby was given, and/or diet related." },
    { color: "white", description: "Coloration could be an indication that your baby has biliary atresia, consider contacting doctor." },
];

const babyPoopConsistencyData = [
    { consistency: "sticky", description: "Baby's first bowel movements are considered to be sticky/tar-like" },
    { consistency: "mushy", description: "Is the consistency of baby's first bowel movements and is a good indication that they are breast-fed." },
    { consistency: "well-formed", description: "This is normal once babies start to eat solid foods." },
    { consistency: "watery", description: "Good indication that the baby has diarrhea." },
    { consistency: "hard", description: "Good indication that the baby is constipated." },
    { consistency: "chalky", description: "Could be an indicator for potential liver problems. Should consider contacting a doctor." },
    { consistency: "soft", description: "Formula-fed babies usually have poop that is soft, with a similar texture to peanut butter." },
];

export {
    babyPoopColorData, babyPoopConsistencyData
};