import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Utensils, Shuffle, BookOpen, ShoppingCart, ShoppingBag } from "lucide-react";

// Emoji mappings for cuisines and proteins
const CUISINE_EMOJIS = {
  "Asian": "🥢",
  "Italian": "🍝",
  "Indian": "🍛",
  "Mexican": "🌮",
  "Mediterranean": "🫒"
};

const PROTEIN_EMOJIS = {
  "Veggie Only": "🥗",
  "Red Meat": "🥩", 
  "Chicken": "🍗",
  "Fish": "🐟"
};

// Food combination data
const FOOD_COMBINATIONS = [
  { cuisine: "Asian", protein: "Veggie Only" },
  { cuisine: "Italian", protein: "Red Meat" },
  { cuisine: "Indian", protein: "Chicken" },
  { cuisine: "Mexican", protein: "Veggie Only" },
  { cuisine: "Mediterranean", protein: "Fish" },
  { cuisine: "Asian", protein: "Red Meat" },
  { cuisine: "Italian", protein: "Veggie Only" },
  { cuisine: "Indian", protein: "Veggie Only" },
  { cuisine: "Mexican", protein: "Fish" },
  { cuisine: "Mediterranean", protein: "Red Meat" },
  { cuisine: "Asian", protein: "Chicken" },
  { cuisine: "Italian", protein: "Fish" },
  { cuisine: "Indian", protein: "Red Meat" },
  { cuisine: "Mexican", protein: "Chicken" },
  { cuisine: "Mediterranean", protein: "Veggie Only" },
  { cuisine: "Asian", protein: "Fish" },
  { cuisine: "Italian", protein: "Chicken" },
  { cuisine: "Indian", protein: "Fish" },
  { cuisine: "Mexican", protein: "Red Meat" },
  { cuisine: "Mediterranean", protein: "Chicken" },
];

export const FoodRandomizer = () => {
  const [currentFood, setCurrentFood] = useState<{ cuisine: string; protein: string } | null>(null);
  const [hasRandomized, setHasRandomized] = useState(false);
  
  // Set document title
  useEffect(() => {
    document.title = "Food Fortune | What's For Dinner?";
  }, []);

  const randomizeFood = () => {
    const randomIndex = Math.floor(Math.random() * FOOD_COMBINATIONS.length);
    setCurrentFood(FOOD_COMBINATIONS[randomIndex]);
    setHasRandomized(true);
  };

  const getSearchQuery = () => {
    if (!currentFood) return "";
    return `${currentFood.cuisine} ${currentFood.protein} recipes`;
  };

  const getUberEatsQuery = () => {
    if (!currentFood) return "";
    return `${currentFood.cuisine} ${currentFood.protein}`;
  };

  // Handle the button actions
  const handleFindRecipes = () => {
    if (!currentFood) return;
    const query = getSearchQuery();
    window.open(`https://www.pinterest.com/search/pins/?q=${encodeURIComponent(query)}`, "_blank");
  };

  const handleUberEats = () => {
    if (!currentFood) return;
    const query = getUberEatsQuery();
    window.open(`https://www.ubereats.com/search?q=${encodeURIComponent(query)}`, "_blank");
  };

  const handleGroceryList = () => {
    if (!currentFood) return;
    // This is a simplified approach - in a real app, we might want to 
    // generate an actual grocery list or save it to local storage
    const query = getSearchQuery();
    window.open(`https://www.google.com/search?q=${encodeURIComponent(query + " ingredients")}`, "_blank");
  };

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center">
      <div className="mb-6 text-center">
        <Utensils className="w-12 h-12 mx-auto text-primary mb-4" />
        <h1 className="text-4xl font-bold mb-2">Food Fortune</h1>
        <p className="text-lg text-gray-600">Can't decide what to eat? Let us pick for you!</p>
      </div>

      <Card className="w-full p-6 mb-6 border-dashed border-2 bg-food-secondary shadow-sm hover:shadow-md transition-all duration-300">
        <div className="min-h-40 flex items-center justify-center">
          {hasRandomized && currentFood ? (
            <div className="text-center animate-bounce-in">
              <h2 className="text-3xl font-semibold text-gray-800 mb-3">
                {CUISINE_EMOJIS[currentFood.cuisine as keyof typeof CUISINE_EMOJIS]} {currentFood.cuisine}
              </h2>
              <div className="w-16 h-1 bg-primary mx-auto mb-3 rounded-full"></div>
              <p className="text-xl text-primary font-medium">
                {PROTEIN_EMOJIS[currentFood.protein as keyof typeof PROTEIN_EMOJIS]} {currentFood.protein}
              </p>
            </div>
          ) : (
            <div className="text-center text-gray-500">
              <Utensils className="w-14 h-14 mx-auto mb-3 opacity-50" />
              <p className="text-lg">Click randomize to get started</p>
            </div>
          )}
        </div>
      </Card>

      <Button
        onClick={randomizeFood}
        className="bg-primary hover:bg-primary/90 text-white px-8 py-6 rounded-full mb-8 transition-all duration-300 hover:shadow-lg transform hover:scale-105 focus:scale-95"
      >
        <Shuffle className="w-5 h-5 mr-2" /> Randomize!
      </Button>

      {hasRandomized && currentFood && (
        <div className="grid grid-cols-3 gap-4 w-full animate-fade-in">
          <Button
            onClick={handleFindRecipes}
            variant="outline"
            className="flex flex-col items-center justify-center p-4 h-auto border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
          >
            <BookOpen className="w-5 h-5 mb-1" />
            <span className="text-xs sm:text-sm font-medium">Find Recipes</span>
          </Button>
          
          <Button
            onClick={handleUberEats}
            variant="outline"
            className="flex flex-col items-center justify-center p-4 h-auto border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
          >
            <ShoppingBag className="w-5 h-5 mb-1" />
            <span className="text-xs sm:text-sm font-medium">Uber Eats</span>
          </Button>
          
          <Button
            onClick={handleGroceryList}
            variant="outline"
            className="flex flex-col items-center justify-center p-4 h-auto border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
          >
            <ShoppingCart className="w-5 h-5 mb-1" />
            <span className="text-xs sm:text-sm font-medium">Grocery List</span>
          </Button>
        </div>
      )}
    </div>
  );
};

export default FoodRandomizer;
