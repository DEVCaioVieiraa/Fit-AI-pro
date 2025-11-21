// Types e Interfaces do Aplicativo de Fitness

export type UserRole = 'client' | 'personal-trainer';
export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced';
export type Goal = 'hypertrophy' | 'weight-loss' | 'definition' | 'general-health' | 'performance';
export type TrainingEnvironment = 'gym' | 'home';
export type DietType = 'omnivore' | 'vegetarian' | 'vegan';

export interface OnboardingData {
  // Dados Pessoais
  age: number;
  gender: 'male' | 'female' | 'other';
  currentWeight: number;
  targetWeight: number;
  height: number;
  experienceLevel: ExperienceLevel;
  
  // Objetivos
  goals: Goal[];
  
  // Recursos
  trainingEnvironment: TrainingEnvironment;
  availableEquipment: string[];
  
  // Rotina
  weeklyFrequency: number;
  restDays: string[];
  maxWorkoutDuration: number;
  
  // Saúde e Segurança
  medicalRestrictions: string[];
  injuries: string[];
  allergies: string[];
  dietType: DietType;
  foodRestrictions: string[];
}

export interface Exercise {
  id: string;
  name: string;
  muscleGroup: string;
  sets: number;
  reps: string;
  rest: number;
  equipment: string[];
  contraindications: string[];
  videoUrl?: string;
}

export interface WorkoutDay {
  day: string;
  focus: string;
  exercises: Exercise[];
  duration: number;
}

export interface Meal {
  id: string;
  name: string;
  time: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  foods: string[];
  imageUrl?: string;
}

export interface NutritionPlan {
  dailyCalories: number;
  protein: number;
  carbs: number;
  fats: number;
  meals: Meal[];
}

export interface DailyTask {
  id: string;
  type: 'nutrition' | 'exercise' | 'activity' | 'hydration' | 'rest';
  title: string;
  description: string;
  points: number;
  completed: boolean;
  proofType: 'photo' | 'video' | 'check-in' | 'wearable';
  proofUrl?: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: Date;
}

export interface UserProgress {
  level: number;
  totalPoints: number;
  currentStreak: number;
  longestStreak: number;
  badges: Badge[];
  completedTasks: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  onboardingData?: OnboardingData;
  workoutPlan?: WorkoutDay[];
  nutritionPlan?: NutritionPlan;
  progress?: UserProgress;
  dailyTasks?: DailyTask[];
  subscriptionPlan: 'free-trial' | 'premium' | 'pt-pro';
  trialEndsAt?: Date;
}

export interface PTClient extends User {
  personalTrainerId: string;
  customWorkoutPlan?: WorkoutDay[];
  customNutritionPlan?: NutritionPlan;
  notes?: string;
}
