'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Dumbbell, 
  TrendingUp, 
  Trophy, 
  Flame, 
  CheckCircle, 
  Camera, 
  Video, 
  Clock,
  Calendar,
  Target,
  Apple,
  Activity,
  Award,
  ChevronRight,
  Plus,
  Edit
} from 'lucide-react';
import { OnboardingData, WorkoutDay, NutritionPlan, DailyTask, UserProgress } from '@/lib/types';
import { exerciseDatabase, mealDatabase, badgeSystem, dailyTasksTemplate } from '@/lib/fitness-data';

export default function DashboardPage() {
  const router = useRouter();
  const [onboardingData, setOnboardingData] = useState<OnboardingData | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'workout' | 'nutrition' | 'tasks' | 'progress'>('overview');
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutDay[]>([]);
  const [nutritionPlan, setNutritionPlan] = useState<NutritionPlan | null>(null);
  const [dailyTasks, setDailyTasks] = useState<DailyTask[]>([]);
  const [userProgress, setUserProgress] = useState<UserProgress>({
    level: 1,
    totalPoints: 0,
    currentStreak: 0,
    longestStreak: 0,
    badges: [],
    completedTasks: 0
  });

  useEffect(() => {
    // Carregar dados do onboarding
    const savedData = localStorage.getItem('onboardingData');
    if (!savedData) {
      router.push('/onboarding');
      return;
    }

    const data: OnboardingData = JSON.parse(savedData);
    setOnboardingData(data);

    // Gerar plano de treino baseado nos dados
    generateWorkoutPlan(data);
    
    // Gerar plano de nutrição
    generateNutritionPlan(data);

    // Gerar tarefas diárias
    generateDailyTasks();
  }, [router]);

  const generateWorkoutPlan = (data: OnboardingData) => {
    // Filtrar exercícios baseado em restrições médicas
    const safeExercises = exerciseDatabase.filter(exercise => {
      return !exercise.contraindications.some(contra => 
        data.medicalRestrictions?.includes(contra) || data.injuries?.includes(contra)
      );
    });

    // Criar divisão de treino baseada na frequência
    const plan: WorkoutDay[] = [];
    
    if (data.weeklyFrequency && data.weeklyFrequency >= 3) {
      plan.push({
        day: 'Segunda-feira',
        focus: 'Peito e Tríceps',
        exercises: safeExercises.filter(e => ['Peito', 'Tríceps'].includes(e.muscleGroup)).slice(0, 5),
        duration: data.maxWorkoutDuration || 60
      });
      
      plan.push({
        day: 'Quarta-feira',
        focus: 'Costas e Bíceps',
        exercises: safeExercises.filter(e => ['Costas', 'Bíceps'].includes(e.muscleGroup)).slice(0, 5),
        duration: data.maxWorkoutDuration || 60
      });
      
      plan.push({
        day: 'Sexta-feira',
        focus: 'Pernas e Ombros',
        exercises: safeExercises.filter(e => ['Pernas', 'Ombros'].includes(e.muscleGroup)).slice(0, 5),
        duration: data.maxWorkoutDuration || 60
      });
    }

    setWorkoutPlan(plan);
  };

  const generateNutritionPlan = (data: OnboardingData) => {
    // Calcular calorias baseado no objetivo
    let dailyCalories = 2000;
    if (data.goals?.includes('weight-loss')) {
      dailyCalories = 1800;
    } else if (data.goals?.includes('hypertrophy')) {
      dailyCalories = 2500;
    }

    // Filtrar refeições baseado em restrições
    let filteredMeals = [...mealDatabase];
    if (data.dietType === 'vegetarian' || data.dietType === 'vegan') {
      filteredMeals = filteredMeals.map(meal => ({
        ...meal,
        foods: meal.foods.filter(food => 
          !food.toLowerCase().includes('frango') && 
          !food.toLowerCase().includes('peixe') &&
          !food.toLowerCase().includes('carne')
        )
      }));
    }

    const plan: NutritionPlan = {
      dailyCalories,
      protein: Math.round(dailyCalories * 0.3 / 4),
      carbs: Math.round(dailyCalories * 0.4 / 4),
      fats: Math.round(dailyCalories * 0.3 / 9),
      meals: filteredMeals
    };

    setNutritionPlan(plan);
  };

  const generateDailyTasks = () => {
    const tasks: DailyTask[] = dailyTasksTemplate.map((template, index) => ({
      ...template,
      id: `task-${index}`,
      completed: false
    }));
    setDailyTasks(tasks);
  };

  const completeTask = (taskId: string) => {
    setDailyTasks(prev => 
      prev.map(task => 
        task.id === taskId ? { ...task, completed: true } : task
      )
    );

    const task = dailyTasks.find(t => t.id === taskId);
    if (task && !task.completed) {
      setUserProgress(prev => ({
        ...prev,
        totalPoints: prev.totalPoints + task.points,
        completedTasks: prev.completedTasks + 1
      }));
    }
  };

  if (!onboardingData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 flex items-center justify-center">
        <div className="text-white text-xl">Carregando...</div>
      </div>
    );
  }

  const completedTasksCount = dailyTasks.filter(t => t.completed).length;
  const completionPercentage = (completedTasksCount / dailyTasks.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      {/* Header */}
      <header className="bg-slate-950/80 backdrop-blur-lg border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg">
                <Dumbbell className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Olá, Atleta!</h1>
                <p className="text-sm text-gray-400">Vamos treinar hoje?</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm text-gray-400">Nível</div>
                <div className="text-lg font-bold text-white">{userProgress.level}</div>
              </div>
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-12 h-12 rounded-full flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-slate-900/50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto">
            {[
              { id: 'overview', label: 'Visão Geral', icon: Activity },
              { id: 'workout', label: 'Treino', icon: Dumbbell },
              { id: 'nutrition', label: 'Nutrição', icon: Apple },
              { id: 'tasks', label: 'Tarefas', icon: CheckCircle },
              { id: 'progress', label: 'Progresso', icon: TrendingUp }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-all duration-300 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-purple-500 text-white'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <Flame className="w-8 h-8 text-orange-400" />
                  <span className="text-2xl font-bold text-white">{userProgress.currentStreak}</span>
                </div>
                <div className="text-sm text-gray-300">Dias de Sequência</div>
              </div>

              <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <Target className="w-8 h-8 text-blue-400" />
                  <span className="text-2xl font-bold text-white">{userProgress.totalPoints}</span>
                </div>
                <div className="text-sm text-gray-300">Pontos Totais</div>
              </div>

              <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                  <span className="text-2xl font-bold text-white">{userProgress.completedTasks}</span>
                </div>
                <div className="text-sm text-gray-300">Tarefas Completas</div>
              </div>

              <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <Award className="w-8 h-8 text-yellow-400" />
                  <span className="text-2xl font-bold text-white">{userProgress.badges.length}</span>
                </div>
                <div className="text-sm text-gray-300">Badges Conquistados</div>
              </div>
            </div>

            {/* Daily Progress */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white">Progresso de Hoje</h2>
                <span className="text-sm text-gray-400">{completedTasksCount}/{dailyTasks.length} tarefas</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-4 mb-4">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-4 rounded-full transition-all duration-500"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {dailyTasks.slice(0, 6).map((task) => (
                  <div 
                    key={task.id}
                    className={`p-4 rounded-xl border transition-all duration-300 ${
                      task.completed
                        ? 'bg-green-500/20 border-green-500/50'
                        : 'bg-white/5 border-white/10'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {task.completed ? (
                        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-white/30 flex-shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-white mb-1">{task.title}</div>
                        <div className="text-xs text-gray-400">+{task.points} pontos</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid sm:grid-cols-2 gap-4">
              <button
                onClick={() => setActiveTab('workout')}
                className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-6 text-left hover:border-purple-500 transition-all duration-300 group"
              >
                <Dumbbell className="w-8 h-8 text-purple-400 mb-3" />
                <h3 className="text-lg font-bold text-white mb-2">Treino de Hoje</h3>
                <p className="text-sm text-gray-400 mb-4">
                  {workoutPlan[0]?.focus || 'Nenhum treino programado'}
                </p>
                <div className="flex items-center gap-2 text-purple-400 group-hover:gap-3 transition-all duration-300">
                  <span className="text-sm font-medium">Ver Treino</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </button>

              <button
                onClick={() => setActiveTab('nutrition')}
                className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl p-6 text-left hover:border-green-500 transition-all duration-300 group"
              >
                <Apple className="w-8 h-8 text-green-400 mb-3" />
                <h3 className="text-lg font-bold text-white mb-2">Plano Alimentar</h3>
                <p className="text-sm text-gray-400 mb-4">
                  {nutritionPlan?.dailyCalories || 0} calorias diárias
                </p>
                <div className="flex items-center gap-2 text-green-400 group-hover:gap-3 transition-all duration-300">
                  <span className="text-sm font-medium">Ver Dieta</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Workout Tab */}
        {activeTab === 'workout' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Seu Plano de Treino</h2>
              <button className="flex items-center gap-2 px-4 py-2 bg-purple-500/20 border border-purple-500/50 text-purple-300 rounded-lg hover:bg-purple-500/30 transition-all duration-300">
                <Edit className="w-4 h-4" />
                Editar Plano
              </button>
            </div>

            {workoutPlan.map((day, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{day.day}</h3>
                    <p className="text-purple-400">{day.focus}</p>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{day.duration} min</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {day.exercises.map((exercise, exIndex) => (
                    <div key={exIndex} className="bg-white/5 border border-white/10 rounded-xl p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h4 className="text-white font-semibold mb-1">{exercise.name}</h4>
                          <p className="text-sm text-gray-400">{exercise.muscleGroup}</p>
                        </div>
                        <Video className="w-5 h-5 text-purple-400" />
                      </div>
                      <div className="grid grid-cols-3 gap-4 mt-4">
                        <div>
                          <div className="text-xs text-gray-400 mb-1">Séries</div>
                          <div className="text-white font-semibold">{exercise.sets}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-400 mb-1">Repetições</div>
                          <div className="text-white font-semibold">{exercise.reps}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-400 mb-1">Descanso</div>
                          <div className="text-white font-semibold">{exercise.rest}s</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Nutrition Tab */}
        {activeTab === 'nutrition' && nutritionPlan && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Plano Nutricional</h2>
              <button className="flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/50 text-green-300 rounded-lg hover:bg-green-500/30 transition-all duration-300">
                <Plus className="w-4 h-4" />
                Adicionar Refeição
              </button>
            </div>

            {/* Macros Summary */}
            <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Meta Diária</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <div className="text-sm text-gray-300 mb-1">Calorias</div>
                  <div className="text-2xl font-bold text-white">{nutritionPlan.dailyCalories}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-300 mb-1">Proteínas</div>
                  <div className="text-2xl font-bold text-white">{nutritionPlan.protein}g</div>
                </div>
                <div>
                  <div className="text-sm text-gray-300 mb-1">Carboidratos</div>
                  <div className="text-2xl font-bold text-white">{nutritionPlan.carbs}g</div>
                </div>
                <div>
                  <div className="text-sm text-gray-300 mb-1">Gorduras</div>
                  <div className="text-2xl font-bold text-white">{nutritionPlan.fats}g</div>
                </div>
              </div>
            </div>

            {/* Meals */}
            <div className="space-y-4">
              {nutritionPlan.meals.map((meal) => (
                <div key={meal.id} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">{meal.name}</h3>
                      <p className="text-sm text-gray-400">{meal.time}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">{meal.calories}</div>
                      <div className="text-xs text-gray-400">calorias</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="bg-white/5 rounded-lg p-3">
                      <div className="text-xs text-gray-400 mb-1">Proteína</div>
                      <div className="text-white font-semibold">{meal.protein}g</div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3">
                      <div className="text-xs text-gray-400 mb-1">Carbs</div>
                      <div className="text-white font-semibold">{meal.carbs}g</div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3">
                      <div className="text-xs text-gray-400 mb-1">Gordura</div>
                      <div className="text-white font-semibold">{meal.fats}g</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {meal.foods.map((food, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-gray-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                        {food}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tasks Tab */}
        {activeTab === 'tasks' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Tarefas de Hoje</h2>
              <div className="text-sm text-gray-400">
                {completedTasksCount}/{dailyTasks.length} completas
              </div>
            </div>

            <div className="space-y-4">
              {dailyTasks.map((task) => (
                <div 
                  key={task.id}
                  className={`bg-white/5 backdrop-blur-sm border rounded-2xl p-6 transition-all duration-300 ${
                    task.completed
                      ? 'border-green-500/50 bg-green-500/10'
                      : 'border-white/10 hover:border-purple-500/50'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <button
                      onClick={() => completeTask(task.id)}
                      disabled={task.completed}
                      className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                        task.completed
                          ? 'bg-green-500 border-green-500'
                          : 'border-white/30 hover:border-purple-500'
                      }`}
                    >
                      {task.completed && <CheckCircle className="w-5 h-5 text-white" />}
                    </button>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-1">{task.title}</h3>
                          <p className="text-sm text-gray-400">{task.description}</p>
                        </div>
                        <div className="flex items-center gap-2 text-purple-400">
                          <Trophy className="w-4 h-4" />
                          <span className="text-sm font-semibold">+{task.points}</span>
                        </div>
                      </div>

                      {!task.completed && (
                        <div className="flex items-center gap-2 mt-4">
                          {task.proofType === 'photo' && (
                            <button className="flex items-center gap-2 px-4 py-2 bg-purple-500/20 border border-purple-500/50 text-purple-300 rounded-lg hover:bg-purple-500/30 transition-all duration-300">
                              <Camera className="w-4 h-4" />
                              Enviar Foto
                            </button>
                          )}
                          {task.proofType === 'video' && (
                            <button className="flex items-center gap-2 px-4 py-2 bg-purple-500/20 border border-purple-500/50 text-purple-300 rounded-lg hover:bg-purple-500/30 transition-all duration-300">
                              <Video className="w-4 h-4" />
                              Enviar Vídeo
                            </button>
                          )}
                          {task.proofType === 'check-in' && (
                            <button 
                              onClick={() => completeTask(task.id)}
                              className="flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/50 text-green-300 rounded-lg hover:bg-green-500/30 transition-all duration-300"
                            >
                              <CheckCircle className="w-4 h-4" />
                              Marcar como Completo
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Progress Tab */}
        {activeTab === 'progress' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Seu Progresso</h2>

            {/* Level Progress */}
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">Nível {userProgress.level}</h3>
                  <p className="text-sm text-gray-400">{userProgress.totalPoints} / 1000 pontos</p>
                </div>
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-16 h-16 rounded-full flex items-center justify-center">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="w-full bg-white/10 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${(userProgress.totalPoints / 1000) * 100}%` }}
                />
              </div>
            </div>

            {/* Badges */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Conquistas</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {badgeSystem.map((badge) => {
                  const unlocked = userProgress.badges.some(b => b.id === badge.id);
                  return (
                    <div 
                      key={badge.id}
                      className={`bg-white/5 border rounded-xl p-6 text-center transition-all duration-300 ${
                        unlocked
                          ? 'border-yellow-500/50 bg-yellow-500/10'
                          : 'border-white/10 opacity-50'
                      }`}
                    >
                      <div className="text-5xl mb-3">{badge.icon}</div>
                      <h4 className="text-white font-semibold mb-1">{badge.name}</h4>
                      <p className="text-sm text-gray-400">{badge.description}</p>
                      {unlocked && (
                        <div className="mt-3 text-xs text-yellow-400 font-medium">
                          ✓ Conquistado
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
