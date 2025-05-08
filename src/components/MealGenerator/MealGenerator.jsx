import { useState } from "react";
import MealCard from "./MealCard/MealCard";
import MealModal from "./MealModal/MealModal";

const MealGenerator = () => {
    const [meal, setMeal] = useState(null);
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const fetchRandomMeal = async () => {
        try {
            const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
            const data = await response.json();
            setMeal(data.meals[0]);
        } catch (error) {
            console.error('Error fetching the meal:', error);
        }
    };

    const onGenerateMeal = async () => {
        await fetchRandomMeal();
        handleOpen()
    }

    return (
        <div>
            <MealModal open={open} handleClose={handleClose} meal={meal} />
            <MealCard onGenerateMeal={onGenerateMeal} />
        </div>
    )
}

export default MealGenerator;
