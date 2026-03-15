
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Utensils, Shuffle, BookOpen, ShoppingBag, Filter, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
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
  "Pakistani": "🍲", // Added Pakistani cuisine with an appropriate emoji
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
  // Added Pakistani cuisine combinations
  { cuisine: "Pakistani", protein: "Chicken" },
  { cuisine: "Pakistani", protein: "Red Meat" },
  { cuisine: "Pakistani", protein: "Veggie Only" },
];

export const FoodRandomizer = () => {
  const [currentFood, setCurrentFood] = useState<{ cuisine: string; protein: string } | null>(null);
  const [hasRandomized, setHasRandomized] = useState(false);
  const [cuisineFilter, setCuisineFilter] = useState<string | null>(null);
  const [proteinFilter, setProteinFilter] = useState<string | null>(null);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  
  useEffect(() => {
    document.title = "Food Fortune | What's For Dinner?";
  }, []);

  // Add effect to handle delayed button appearance
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (hasRandomized && currentFood && !isAnimating) {
      timeout = setTimeout(() => {
        setShowButtons(true);
      }, 800); // Delay buttons appearance by 800ms
    } else {
      setShowButtons(false);
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [hasRandomized, currentFood, isAnimating]);

  const randomizeFood = () => {
    // Start the animation
    setIsAnimating(true);
    setShowButtons(false);
    
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
      setIsAnimating(false);
      return;
    }

    // Delay showing the result to allow for animation
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * filteredCombinations.length);
      const newFood = filteredCombinations[randomIndex];
      setCurrentFood(newFood);
      setHasRandomized(true);
      setIsAnimating(false);
    }, 800); // Animation duration
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
      <div className="mb-6 text-center w-full">
        <div className="flex items-center justify-center gap-3 mb-2">
          <Utensils className="w-10 h-10 text-primary" />
          <h1 className="text-4xl font-bold">Food Fortune</h1>
        </div>
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

      <Card className={`w-full p-6 mb-6 border-dashed border-2 bg-food-secondary shadow-sm hover:shadow-md transition-all duration-300 ${isAnimating ? 'animate-food-shuffle' : ''}`}>
        <div className="min-h-40 flex items-center justify-center">
          {hasRandomized && currentFood && !isAnimating ? (
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
          ) : isAnimating ? (
            <div className="animate-food-roulette">
              <div className="text-center">
                {Object.entries(CUISINE_EMOJIS).map(([cuisine, emoji], index) => (
                  <span key={index} className="text-3xl mx-1 opacity-0" style={{ animationDelay: `${index * 50}ms` }}>
                    {emoji}
                  </span>
                ))}
              </div>
              <div className="w-16 h-1 bg-primary mx-auto my-3 rounded-full"></div>
              <div className="text-center">
                {Object.entries(PROTEIN_EMOJIS).map(([protein, emoji], index) => (
                  <span key={index} className="text-2xl mx-1 opacity-0" style={{ animationDelay: `${index * 100 + 200}ms` }}>
                    {emoji}
                  </span>
                ))}
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
        disabled={isAnimating}
        className={`bg-primary hover:bg-primary/90 text-white px-8 py-6 rounded-full mb-8 transition-all duration-300 hover:shadow-lg transform hover:scale-105 focus:scale-95 ${isAnimating ? 'animate-pulse' : ''}`}
      >
        <Shuffle className={`w-5 h-5 mr-2 ${isAnimating ? 'animate-spin' : ''}`} /> 
        {isAnimating ? 'Randomizing...' : 'Randomize!'}
      </Button>

      {hasRandomized && currentFood && !isAnimating && (
        <div className={`grid grid-cols-2 gap-4 w-full transition-all duration-500 ${showButtons ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
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
