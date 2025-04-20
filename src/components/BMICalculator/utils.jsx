export const calculateBmi = (height, weight) => {
    const heightInMeters = height / 100;
    const calculatedBmi = (weight / (heightInMeters * heightInMeters)).toFixed(1);
    return calculatedBmi
};

export const getBmiCategory = (bmiValue) => {
        if (bmiValue < 18.5) return 'Underweight';
        if (bmiValue < 25) return 'Normal weight';
        if (bmiValue < 30) return 'Overweight';
        return 'Obese';
};