// Mock knowledge base for symptom analysis
const conditionDb = [
    {
        name: "Common Cold",
        symptoms: ["Headache", "Sore throat", "Cough", "Sneezing"],
        severity: ["Mild", "Moderate"]
    },
    {
        name: "Flu (Influenza)",
        symptoms: ["Fever", "Muscle aches", "Fatigue", "Headache"],
        severity: ["Moderate", "Severe"]
    },
    {
        name: "Migraine",
        symptoms: ["Headache", "Nausea", "Dizziness"],
        severity: ["Moderate", "Severe"]
    },
    {
        name: "Allergic Rhinitis",
        symptoms: ["Sneezing", "Itchy eyes", "Runny nose"],
        severity: ["Mild"]
    }
];

export default conditionDb