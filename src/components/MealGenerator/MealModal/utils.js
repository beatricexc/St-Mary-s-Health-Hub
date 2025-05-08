// The random meal generator returns an object with 20 ingredients form strIngredient<number>
// We therefore extract them into a structure that's easier to work with and filter out empty ingredients
export const extractIngredients = (meal) => {
    const ingredients = [];

    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        if (ingredient && ingredient.trim() !== '') {
            ingredients.push(ingredient.trim());
        }
    }

    return ingredients;
}

// similar to extractIngredients. Extracts measures from the API
export const extractMeasures = (meal) => {
    const measures = [];
    for (let i = 1; i <= 20; i++) {
        const measure = meal[`strMeasure${i}`];
        if (measure && measure.trim() !== '') {
            measures.push(measure.trim());
        }
    }
    return measures;
}

export const extractIngredientsWithMeasures = (meal) => {
    const result = [];

    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];

        if (ingredient && ingredient.trim() !== '') {
            result.push({
                ingredient: ingredient.trim(),
                measure: (measure && measure.trim()) || '',
            });
        }
    }

    return result;
};

export const truncateString = (str, maxLength) => {
    if (str.length > maxLength) {
        return str.slice(0, maxLength - 3) + '...';
    }
    return str;
}