// Helper function to analyze symptoms 
export const findPossibleConditions = (userSymptoms, userSeverity, conditionDb) => {
    if (!userSymptoms.length || !userSeverity) return [];

    return conditionDb.map(condition => {
        const matchingSymptoms = condition.symptoms.filter(symptom =>
            userSymptoms.includes(symptom)
        ).length;

        const symptomMatchPercent = (matchingSymptoms / condition.symptoms.length) * 40;
        const severityMatch = condition.severity.includes(userSeverity) ? 30 : 0;
        const symptomCountScore = (matchingSymptoms / userSymptoms.length) * 30;

        const confidence = Math.min(
            Math.round(symptomMatchPercent + severityMatch + symptomCountScore),
            95
        );

        return {
            name: condition.name,
            confidence,
            matchingSymptoms,
            totalSymptoms: condition.symptoms.length
        };
    })
        .filter(condition => condition.confidence > 30)
        .sort((a, b) => b.confidence - a.confidence);
};

// Helper function to get recommended action based on analysis results
export const getRecommendedAction = (conditions, symptoms) => {
    if (!conditions.length) {
        return {
            message: "No strong matches found",
            description: "Consider tracking your symptoms and consulting a doctor if they persist",
            type: "info"
        };
    }

    const isEmergency = symptoms.some(s =>
        ["Chest pain", "Shortness of breath"].includes(s)
    );

    if (isEmergency) {
        return {
            message: "Emergency Warning",
            description: "Some symptoms may require immediate medical attention",
            type: "error"
        };
    }

    if (conditions[0].confidence > 70) {
        return {
            message: "High Confidence Match",
            description: "Consider consulting a healthcare provider for proper diagnosis",
            type: "warning"
        };
    }

    return {
        message: "Possible Conditions",
        description: "Monitor your condition and seek advice if symptoms worsen",
        type: "info"
    };
};

// Helper function to filter symptom autocomplete options
export const getSymptomSuggestions = (inputValue, symptomDb) => {
    return symptomDb
        .filter(s => s.toLowerCase().includes(inputValue.toLowerCase()))
        .map(symptom => ({ value: symptom }));
};

// Theme settings helper
export const getThemeSettings = (isDarkMode) => ({
    dark: {
        cardBg: '#1A103D',
        text: '#F5F5FF',
        border: '1px solid rgba(245, 245, 255, 0.1)'
    },
    light: {
        cardBg: '#FFFFFF',
        text: '#2D3436',
        border: '1px solid rgba(0, 0, 0, 0.1)'
    }
});