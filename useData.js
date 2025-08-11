import { useState, useEffect } from 'react';
import { DEFAULT_NUTRIENTS, DEFAULT_GOALS } from '../types/index.js';

// Storage keys
const STORAGE_KEYS = {
  INGREDIENTS: 'nutriplanner_ingredients',
  RECIPES: 'nutriplanner_recipes',
  MEAL_PLAN: 'nutriplanner_meal_plan',
  GOALS: 'nutriplanner_goals',
  DIET_HISTORY: 'nutriplanner_diet_history'
};

// Utility functions for localStorage
const storage = {
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error reading from localStorage:`, error);
      return defaultValue;
    }
  },
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error writing to localStorage:`, error);
    }
  },
  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing from localStorage:`, error);
    }
  }
};

// Generate unique ID
const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2);

// Calculate nutrients for a recipe based on ingredients
const calculateRecipeNutrients = (ingredients, allIngredients) => {
  const totalNutrients = { ...DEFAULT_NUTRIENTS };
  
  ingredients.forEach(({ ingredientId, quantity }) => {
    const ingredient = allIngredients.find(ing => ing.id === ingredientId);
    if (ingredient) {
      Object.keys(DEFAULT_NUTRIENTS).forEach(nutrient => {
        const value = ingredient.nutrients[nutrient] || 0;
        // Calculate based on quantity (assuming nutrients are per 100g/100ml)
        totalNutrients[nutrient] += (value * quantity) / 100;
      });
    }
  });
  
  return totalNutrients;
};

export const useData = () => {
  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [mealPlan, setMealPlan] = useState({});
  const [goals, setGoals] = useState(DEFAULT_GOALS);
  const [dietHistory, setDietHistory] = useState([]);

  // Load data from localStorage on mount
  useEffect(() => {
    setIngredients(storage.get(STORAGE_KEYS.INGREDIENTS, []));
    setRecipes(storage.get(STORAGE_KEYS.RECIPES, []));
    setMealPlan(storage.get(STORAGE_KEYS.MEAL_PLAN, {}));
    setGoals(storage.get(STORAGE_KEYS.GOALS, DEFAULT_GOALS));
    setDietHistory(storage.get(STORAGE_KEYS.DIET_HISTORY, []));
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    storage.set(STORAGE_KEYS.INGREDIENTS, ingredients);
  }, [ingredients]);

  useEffect(() => {
    storage.set(STORAGE_KEYS.RECIPES, recipes);
  }, [recipes]);

  useEffect(() => {
    storage.set(STORAGE_KEYS.MEAL_PLAN, mealPlan);
  }, [mealPlan]);

  useEffect(() => {
    storage.set(STORAGE_KEYS.GOALS, goals);
  }, [goals]);

  useEffect(() => {
    storage.set(STORAGE_KEYS.DIET_HISTORY, dietHistory);
  }, [dietHistory]);

  // Ingredient management
  const addIngredient = (ingredientData) => {
    const newIngredient = {
      id: generateId(),
      ...ingredientData,
      nutrients: { ...DEFAULT_NUTRIENTS, ...ingredientData.nutrients },
      createdAt: new Date().toISOString()
    };
    setIngredients(prev => [...prev, newIngredient]);
    return newIngredient;
  };

  const updateIngredient = (id, updates) => {
    setIngredients(prev => 
      prev.map(ingredient => 
        ingredient.id === id 
          ? { ...ingredient, ...updates, updatedAt: new Date().toISOString() }
          : ingredient
      )
    );
  };

  const deleteIngredient = (id) => {
    setIngredients(prev => prev.filter(ingredient => ingredient.id !== id));
    // Also remove from recipes that use this ingredient
    setRecipes(prev => 
      prev.map(recipe => ({
        ...recipe,
        ingredients: recipe.ingredients.filter(ing => ing.ingredientId !== id)
      }))
    );
  };

  // Recipe management
  const addRecipe = (recipeData) => {
    const nutrients = calculateRecipeNutrients(recipeData.ingredients, ingredients);
    const newRecipe = {
      id: generateId(),
      ...recipeData,
      nutrients,
      createdAt: new Date().toISOString()
    };
    setRecipes(prev => [...prev, newRecipe]);
    return newRecipe;
  };

  const updateRecipe = (id, updates) => {
    setRecipes(prev => 
      prev.map(recipe => {
        if (recipe.id === id) {
          const updatedRecipe = { ...recipe, ...updates, updatedAt: new Date().toISOString() };
          if (updates.ingredients) {
            updatedRecipe.nutrients = calculateRecipeNutrients(updates.ingredients, ingredients);
          }
          return updatedRecipe;
        }
        return recipe;
      })
    );
  };

  const deleteRecipe = (id) => {
    setRecipes(prev => prev.filter(recipe => recipe.id !== id));
  };

  // Meal plan management
  const addMealItem = (date, mealType, item) => {
    const dateKey = date.toISOString().split('T')[0];
    setMealPlan(prev => ({
      ...prev,
      [dateKey]: {
        ...prev[dateKey],
        [mealType]: [
          ...(prev[dateKey]?.[mealType] || []),
          {
            id: generateId(),
            ...item,
            addedAt: new Date().toISOString()
          }
        ]
      }
    }));
  };

  const removeMealItem = (date, mealType, itemId) => {
    const dateKey = date.toISOString().split('T')[0];
    setMealPlan(prev => ({
      ...prev,
      [dateKey]: {
        ...prev[dateKey],
        [mealType]: prev[dateKey]?.[mealType]?.filter(item => item.id !== itemId) || []
      }
    }));
  };

  const updateMealItem = (date, mealType, itemId, updates) => {
    const dateKey = date.toISOString().split('T')[0];
    setMealPlan(prev => ({
      ...prev,
      [dateKey]: {
        ...prev[dateKey],
        [mealType]: prev[dateKey]?.[mealType]?.map(item => 
          item.id === itemId ? { ...item, ...updates } : item
        ) || []
      }
    }));
  };

  // Get meals for a specific date
  const getMealsForDate = (date) => {
    const dateKey = date.toISOString().split('T')[0];
    return mealPlan[dateKey] || {};
  };

  // Calculate daily nutrients for a date
  const getDailyNutrients = (date) => {
    const meals = getMealsForDate(date);
    const totalNutrients = { ...DEFAULT_NUTRIENTS };

    Object.values(meals).forEach(mealItems => {
      mealItems.forEach(item => {
        let itemNutrients = {};
        
        if (item.type === 'ingredient') {
          const ingredient = ingredients.find(ing => ing.id === item.ingredientId);
          if (ingredient) {
            itemNutrients = ingredient.nutrients;
          }
        } else if (item.type === 'recipe') {
          const recipe = recipes.find(rec => rec.id === item.recipeId);
          if (recipe) {
            itemNutrients = recipe.nutrients;
            // Adjust for portions
            Object.keys(itemNutrients).forEach(nutrient => {
              itemNutrients[nutrient] = (itemNutrients[nutrient] / recipe.servings) * (item.servings || 1);
            });
          }
        }

        // Add to total (adjusting for quantity if ingredient)
        Object.keys(DEFAULT_NUTRIENTS).forEach(nutrient => {
          const value = itemNutrients[nutrient] || 0;
          if (item.type === 'ingredient') {
            totalNutrients[nutrient] += (value * item.quantity) / 100;
          } else {
            totalNutrients[nutrient] += value;
          }
        });
      });
    });

    return totalNutrients;
  };

  // Goals management
  const updateGoals = (newGoals) => {
    setGoals(prev => ({ ...prev, ...newGoals }));
  };

  // Diet history management
  const saveDietPlan = (name, startDate, endDate) => {
    const planData = {
      id: generateId(),
      name,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      mealPlan: { ...mealPlan },
      goals: { ...goals },
      createdAt: new Date().toISOString()
    };
    setDietHistory(prev => [...prev, planData]);
    return planData;
  };

  const deleteDietPlan = (id) => {
    setDietHistory(prev => prev.filter(plan => plan.id !== id));
  };

  const restoreDietPlan = (id) => {
    const plan = dietHistory.find(p => p.id === id);
    if (plan) {
      setMealPlan(plan.mealPlan);
      setGoals(plan.goals);
    }
  };

  // Generate shopping list
  const generateShoppingList = (startDate, endDate) => {
    const shoppingList = {};
    const currentDate = new Date(startDate);
    
    while (currentDate <= endDate) {
      const meals = getMealsForDate(currentDate);
      
      Object.values(meals).forEach(mealItems => {
        mealItems.forEach(item => {
          if (item.type === 'ingredient') {
            const ingredient = ingredients.find(ing => ing.id === item.ingredientId);
            if (ingredient) {
              const key = ingredient.id;
              if (!shoppingList[key]) {
                shoppingList[key] = {
                  ...ingredient,
                  totalQuantity: 0
                };
              }
              shoppingList[key].totalQuantity += item.quantity;
            }
          } else if (item.type === 'recipe') {
            const recipe = recipes.find(rec => rec.id === item.recipeId);
            if (recipe) {
              recipe.ingredients.forEach(recipeIngredient => {
                const ingredient = ingredients.find(ing => ing.id === recipeIngredient.ingredientId);
                if (ingredient) {
                  const key = ingredient.id;
                  if (!shoppingList[key]) {
                    shoppingList[key] = {
                      ...ingredient,
                      totalQuantity: 0
                    };
                  }
                  const servingsMultiplier = (item.servings || 1) / recipe.servings;
                  shoppingList[key].totalQuantity += recipeIngredient.quantity * servingsMultiplier;
                }
              });
            }
          }
        });
      });
      
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return Object.values(shoppingList);
  };

  // Import/Export functions
  const exportData = () => {
    return {
      ingredients,
      recipes,
      mealPlan,
      goals,
      dietHistory,
      exportedAt: new Date().toISOString()
    };
  };

  const importData = (data) => {
    if (data.ingredients) setIngredients(data.ingredients);
    if (data.recipes) setRecipes(data.recipes);
    if (data.mealPlan) setMealPlan(data.mealPlan);
    if (data.goals) setGoals(data.goals);
    if (data.dietHistory) setDietHistory(data.dietHistory);
  };

  const clearAllData = () => {
    setIngredients([]);
    setRecipes([]);
    setMealPlan({});
    setGoals(DEFAULT_GOALS);
    setDietHistory([]);
    Object.values(STORAGE_KEYS).forEach(key => storage.remove(key));
  };

  return {
    // Data
    ingredients,
    recipes,
    mealPlan,
    goals,
    dietHistory,
    
    // Ingredient methods
    addIngredient,
    updateIngredient,
    deleteIngredient,
    
    // Recipe methods
    addRecipe,
    updateRecipe,
    deleteRecipe,
    
    // Meal plan methods
    addMealItem,
    removeMealItem,
    updateMealItem,
    getMealsForDate,
    getDailyNutrients,
    
    // Goals methods
    updateGoals,
    
    // Diet history methods
    saveDietPlan,
    deleteDietPlan,
    restoreDietPlan,
    
    // Utility methods
    generateShoppingList,
    exportData,
    importData,
    clearAllData
  };
};

