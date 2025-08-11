// Types and constants for NutriPlanner

// Meal types
export const MEAL_TYPES = {
  BREAKFAST: 'breakfast',
  LUNCH: 'lunch',
  DINNER: 'dinner',
  SNACK: 'snack'
};

export const MEAL_LABELS = {
  [MEAL_TYPES.BREAKFAST]: 'Café da Manhã',
  [MEAL_TYPES.LUNCH]: 'Almoço',
  [MEAL_TYPES.DINNER]: 'Jantar',
  [MEAL_TYPES.SNACK]: 'Lanche'
};

// Units
export const UNITS = {
  GRAM: 'g',
  KILOGRAM: 'kg',
  MILLILITER: 'ml',
  LITER: 'l',
  UNIT: 'unidade',
  TABLESPOON: 'colher de sopa',
  TEASPOON: 'colher de chá',
  CUP: 'xícara'
};

// Difficulty levels
export const DIFFICULTY_LEVELS = {
  EASY: 'Fácil',
  MEDIUM: 'Médio',
  HARD: 'Difícil'
};

// Sectors for ingredients
export const SECTORS = [
  'Frutas e Vegetais',
  'Carnes e Peixes',
  'Laticínios',
  'Grãos e Cereais',
  'Bebidas',
  'Condimentos',
  'Doces e Sobremesas',
  'Congelados',
  'Outros'
];

// Nutrient info structure
export const NUTRIENT_FIELDS = [
  'calories',
  'protein',
  'carbs',
  'fat',
  'fiber',
  'sugar',
  'sodium',
  'cholesterol',
  'calcium',
  'iron',
  'vitaminC',
  'vitaminA'
];

// Default nutrient values
export const DEFAULT_NUTRIENTS = {
  calories: 0,
  protein: 0,
  carbs: 0,
  fat: 0,
  fiber: 0,
  sugar: 0,
  sodium: 0,
  cholesterol: 0,
  calcium: 0,
  iron: 0,
  vitaminC: 0,
  vitaminA: 0
};

// Nutrient labels in Portuguese
export const NUTRIENT_LABELS = {
  calories: 'Calorias',
  protein: 'Proteína',
  carbs: 'Carboidratos',
  fat: 'Gordura',
  fiber: 'Fibra',
  sugar: 'Açúcar',
  sodium: 'Sódio',
  cholesterol: 'Colesterol',
  calcium: 'Cálcio',
  iron: 'Ferro',
  vitaminC: 'Vitamina C',
  vitaminA: 'Vitamina A'
};

// Nutrient units
export const NUTRIENT_UNITS = {
  calories: 'kcal',
  protein: 'g',
  carbs: 'g',
  fat: 'g',
  fiber: 'g',
  sugar: 'g',
  sodium: 'mg',
  cholesterol: 'mg',
  calcium: 'mg',
  iron: 'mg',
  vitaminC: 'mg',
  vitaminA: 'mcg'
};

// Default goals
export const DEFAULT_GOALS = {
  calories: 2000,
  protein: 150,
  carbs: 250,
  fat: 67,
  fiber: 25,
  sugar: 50,
  sodium: 2300,
  cholesterol: 300,
  calcium: 1000,
  iron: 18,
  vitaminC: 90,
  vitaminA: 900
};

// Activity levels for TDEE calculation
export const ACTIVITY_LEVELS = {
  SEDENTARY: { label: 'Sedentário', multiplier: 1.2 },
  LIGHTLY_ACTIVE: { label: 'Levemente Ativo', multiplier: 1.375 },
  MODERATELY_ACTIVE: { label: 'Moderadamente Ativo', multiplier: 1.55 },
  VERY_ACTIVE: { label: 'Muito Ativo', multiplier: 1.725 },
  EXTREMELY_ACTIVE: { label: 'Extremamente Ativo', multiplier: 1.9 }
};

// Goals for weight management
export const WEIGHT_GOALS = {
  LOSE: { label: 'Perder Peso', calorieAdjustment: -500 },
  MAINTAIN: { label: 'Manter Peso', calorieAdjustment: 0 },
  GAIN: { label: 'Ganhar Peso', calorieAdjustment: 500 }
};

// Fallback image URLs
export const FALLBACK_IMAGES = {
  ingredient: {
    fruits: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&h=300&fit=crop',
    vegetables: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop',
    meat: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&h=300&fit=crop',
    dairy: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=300&fit=crop',
    grains: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop',
    default: 'https://picsum.photos/400/300?random='
  },
  recipe: {
    main: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
    dessert: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop',
    drink: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop',
    snack: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400&h=300&fit=crop',
    default: 'https://picsum.photos/400/300?random='
  }
};

