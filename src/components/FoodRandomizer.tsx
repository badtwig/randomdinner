
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Utensils, Shuffle, BookOpen, ShoppingBag, Filter, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const CUISINE_EMOJIS = {
  "Chinese": "🥢",
  "Japanese": "🍱",
  "Thai": "🍛",
  "Vietnamese": "🍜",
  "Italian": "🍝",
  "Indian": "🍛",
  "Mexican": "🌮",
  "African": "🍲",
  "Middle Eastern": "🫒"
};

const PROTEIN_EMOJIS = {
  "Veggie Only": "🥗",
  "Red Meat": "🥩", 
  "Chicken": "🍗",
  "Fish": "🐟"
};

const FOOD_COMBINATIONS = [
  { cuisine: "Chinese", protein: "Veggie Only" },
  { cuisine: "Italian", protein: "Red Meat" },
  { cuisine: "Indian", protein: "Chicken" },
  { cuisine: "Mexican", protein: "Veggie Only" },
  { cuisine: "African", protein: "Fish" },
  { cuisine: "Japanese", protein: "Red Meat" },
  { cuisine: "Italian", protein: "Veggie Only" },
  { cuisine: "Indian", protein: "Veggie Only" },
  { cuisine: "Mexican", protein: "Fish" },
  { cuisine: "Middle Eastern", protein: "Red Meat" },
  { cuisine: "Thai", protein: "Chicken" },
  { cuisine: "Italian", protein: "Fish" },
  { cuisine: "Indian", protein: "Red Meat" },
  { cuisine: "Mexican", protein: "Chicken" },
  { cuisine: "African", protein: "Veggie Only" },
  { cuisine: "Vietnamese", protein: "Fish" },
  { cuisine: "Italian", protein: "Chicken" },
  { cuisine: "Indian", protein: "Fish" },
  { cuisine: "Mexican", protein: "Red Meat" },
  { cuisine: "Middle Eastern", protein: "Chicken" },
];

export const FoodRandomizer = () => {
  const [currentFood, setCurrentFood] = useState<{ cuisine: string; protein: string } | null>(null);
  const [hasRandomized, setHasRandomized] = useState(false);
  const [cuisineFilter, setCuisineFilter] = useState<string | null>(null);
  const [proteinFilter, setProteinFilter] = useState<string | null>(null);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  
  useEffect(() => {
    document.title = "Food Fortune | What's For Dinner?";
  }, []);

  const randomizeFood = () => {
    // Filter combinations based on user selections
    const filteredCombinations = FOOD_COMBINATIONS.filter(combo => {
      const cuisineMatch = !cuisineFilter || combo.cuisine === cuisineFilter;
      const proteinMatch = !proteinFilter || combo.protein === proteinFilter;
      return cuisineMatch && proteinMatch;
    });

    if (filteredCombinations.length === 0) {
      toast.error("No matching combinations found", {
        description: "Please try different filter options",
      });
      return;
    }

    const randomIndex = Math.floor(Math.random() * filteredCombinations.length);
    const newFood = filteredCombinations[randomIndex];
    setCurrentFood(newFood);
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

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center">
      <div className="mb-6 text-center">
        <Utensils className="w-12 h-12 mx-auto text-primary mb-4" />
        <h1 className="text-4xl font-bold mb-2">Food Fortune</h1>
        <p className="text-lg text-gray-600">Can't decide what to eat? Let us pick for you!</p>
      </div>

      <Collapsible 
        open={isFiltersOpen}
        onOpenChange={setIsFiltersOpen}
        className="w-full mb-6 border border-gray-200 rounded-lg overflow-hidden"
      >
        <CollapsibleTrigger asChild>
          <Button 
            variant="ghost" 
            className="flex items-center justify-between w-full p-4 text-left border-b border-gray-200"
          >
            <div className="flex items-center gap-2">
              <Filter size={16} className="text-primary" />
              <span className="font-medium">Filters</span>
            </div>
            {isFiltersOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </Button>
        </CollapsibleTrigger>
        
        <CollapsibleContent className="p-4 space-y-4">
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Cuisine:</p>
            <ToggleGroup type="single" value={cuisineFilter || ""} onValueChange={(value) => setCuisineFilter(value || null)} className="flex flex-wrap justify-center gap-2">
              {Object.keys(CUISINE_EMOJIS).map((cuisine) => (
                <ToggleGroupItem key={cuisine} value={cuisine} className="px-3 py-1 border rounded-full text-sm">
                  {CUISINE_EMOJIS[cuisine as keyof typeof CUISINE_EMOJIS]} {cuisine}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Protein:</p>
            <ToggleGroup type="single" value={proteinFilter || ""} onValueChange={(value) => setProteinFilter(value || null)} className="flex flex-wrap justify-center gap-2">
              {Object.keys(PROTEIN_EMOJIS).map((protein) => (
                <ToggleGroupItem key={protein} value={protein} className="px-3 py-1 border rounded-full text-sm">
                  {PROTEIN_EMOJIS[protein as keyof typeof PROTEIN_EMOJIS]} {protein}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Card className="w-full p-6 mb-6 border-dashed border-2 bg-food-secondary shadow-sm hover:shadow-md transition-all duration-300">
        <div className="min-h-40 flex items-center justify-center">
          {hasRandomized && currentFood ? (
            <div className="text-center animate-bounce-in">
              <div className="flex justify-center items-center space-x-4 mb-3">
                <span className="text-sm font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  Cuisine
                </span>
                <h2 className="text-3xl font-semibold text-gray-800">
                  {CUISINE_EMOJIS[currentFood.cuisine as keyof typeof CUISINE_EMOJIS]} {currentFood.cuisine}
                </h2>
              </div>
              <div className="w-16 h-1 bg-primary mx-auto mb-3 rounded-full"></div>
              <div className="flex justify-center items-center space-x-4">
                <span className="text-sm font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  Protein
                </span>
                <p className="text-xl text-primary font-medium">
                  {PROTEIN_EMOJIS[currentFood.protein as keyof typeof PROTEIN_EMOJIS]} {currentFood.protein}
                </p>
              </div>
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
        <div className="grid grid-cols-2 gap-4 w-full animate-fade-in">
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
        </div>
      )}
    </div>
  );
};

export default FoodRandomizer;
