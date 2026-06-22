export const calculateNutrition = (user) => {
    let bmr;

    if (user.gender === "male") {
        bmr =
            (10 * user.weight) +
            (6.25 * user.height) -
            (5 * user.age) +
            5;
    } else {
        bmr =
            (10 * user.weight) +
            (6.25 * user.height) -
            (5 * user.age) -
            161;
    }

    const activityMap = {
        Sedentary: 1.2,
        Light: 1.375,
        Moderate: 1.55,
        High: 1.725
    };

    const tdee = bmr * (activityMap[user.activityLevel] || 1.2);

    let calories = tdee;

    switch (user.goal) {
        case "Lose weight":
            calories -= 500;
            break;

        case "Gain weight":
            calories += 300;
            break;

        case "Build muscle":
            calories += 200;
            break;

        default:
            break;
    }

    const proteins = Math.round(user.weight * 2);
    const fats = Math.round(user.weight * 0.8);

    const carbs = Math.round(
        (calories - (proteins * 4) - (fats * 9)) / 4
    );

    return {
        calories: Math.round(calories),
        proteins,
        carbs,
        fats
    };
};