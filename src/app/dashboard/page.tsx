'use client';

import { useState, useEffect, useRef } from 'react';
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
  Edit,
  GripVertical,
  Trash2,
  RefreshCw,
  Upload,
  X,
  Check,
  Zap,
  Home,
  Building2
} from 'lucide-react';
import { OnboardingData, WorkoutDay, NutritionPlan, DailyTask, UserProgress, Exercise, Meal } from '@/lib/types';
import { exerciseDatabase, badgeSystem, dailyTasksTemplate } from '@/lib/fitness-data';

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

  // Estados para configuração de treino
  const [workoutLocation, setWorkoutLocation] = useState<'home' | 'gym'>('home');
  const [hasPhysicalIssues, setHasPhysicalIssues] = useState(false);
  const [selectedIssues, setSelectedIssues] = useState<string[]>([]);
  const [workoutRotationWeeks, setWorkoutRotationWeeks] = useState(4); // Rotação padrão: 4 semanas
  const [lastWorkoutGeneration, setLastWorkoutGeneration] = useState<Date | null>(null);

  // Estados para edição
  const [editingWorkoutDay, setEditingWorkoutDay] = useState<number | null>(null);
  const [draggedExercise, setDraggedExercise] = useState<number | null>(null);
  
  // Estados para câmera e upload
  const [showCamera, setShowCamera] = useState(false);
  const [currentTaskForProof, setCurrentTaskForProof] = useState<string | null>(null);
  const [uploadingPDF, setUploadingPDF] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Carregar dados do onboarding
    const savedData = localStorage.getItem('onboardingData');
    if (!savedData) {
      router.push('/onboarding');
      return;
    }

    const data: OnboardingData = JSON.parse(savedData);
    setOnboardingData(data);

    // Carregar configurações salvas
    const savedLocation = localStorage.getItem('workoutLocation') as 'home' | 'gym' | null;
    const savedIssues = localStorage.getItem('physicalIssues');
    const savedRotation = localStorage.getItem('workoutRotationWeeks');
    const savedLastGeneration = localStorage.getItem('lastWorkoutGeneration');

    if (savedLocation) setWorkoutLocation(savedLocation);
    if (savedIssues) {
      const issues = JSON.parse(savedIssues);
      setSelectedIssues(issues);
      setHasPhysicalIssues(issues.length > 0);
    }
    if (savedRotation) setWorkoutRotationWeeks(parseInt(savedRotation));
    if (savedLastGeneration) setLastWorkoutGeneration(new Date(savedLastGeneration));

    // Verificar se precisa gerar novo treino (rotação automática)
    if (savedLastGeneration) {
      const lastGen = new Date(savedLastGeneration);
      const weeksPassed = Math.floor((Date.now() - lastGen.getTime()) / (1000 * 60 * 60 * 24 * 7));
      
      if (weeksPassed >= (savedRotation ? parseInt(savedRotation) : 4)) {
        // Tempo de rotação atingido - gerar novo treino
        generateWorkoutPlan(data, savedLocation || 'home', savedIssues ? JSON.parse(savedIssues) : []);
      } else {
        // Carregar treino salvo
        const savedWorkout = localStorage.getItem('workoutPlan');
        if (savedWorkout) {
          setWorkoutPlan(JSON.parse(savedWorkout));
        } else {
          generateWorkoutPlan(data, savedLocation || 'home', savedIssues ? JSON.parse(savedIssues) : []);
        }
      }
    } else {
      // Primeira vez - gerar treino
      generateWorkoutPlan(data, savedLocation || 'home', savedIssues ? JSON.parse(savedIssues) : []);
    }

    // Gerar tarefas diárias
    generateDailyTasks();
  }, [router]);

  const generateWorkoutPlan = (
    data: OnboardingData, 
    location: 'home' | 'gym' = workoutLocation,
    issues: string[] = selectedIssues
  ) => {
    // Filtrar exercícios baseado em localização
    let availableExercises = exerciseDatabase.filter(ex => 
      ex.location === location || ex.location === 'both'
    );

    // Filtrar por problemas físicos
    if (issues.length > 0) {
      availableExercises = availableExercises.filter(ex => 
        !ex.contraindications.some(contra => issues.includes(contra))
      );
    }

    // Filtrar por equipamentos disponíveis (se em casa)
    if (location === 'home' && data.availableEquipment) {
      availableExercises = availableExercises.filter(exercise => {
        if (exercise.equipment.length === 0) return true;
        return exercise.equipment.some(eq => 
          data.availableEquipment?.some(available => 
            available.toLowerCase().includes(eq.toLowerCase())
          )
        );
      });
    }

    // Criar divisão de treino baseada na frequência
    const plan: WorkoutDay[] = [];
    const weekDays = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'];
    
    // Divisões de treino por frequência
    const splits: { [key: number]: string[] } = {
      3: ['Peito e Tríceps', 'Costas e Bíceps', 'Pernas e Ombros'],
      4: ['Peito e Tríceps', 'Costas e Bíceps', 'Pernas', 'Ombros e Abdômen'],
      5: ['Peito', 'Costas', 'Pernas', 'Ombros', 'Braços e Abdômen'],
      6: ['Peito', 'Costas', 'Pernas', 'Ombros', 'Braços', 'Abdômen e Cardio']
    };

    const frequency = data.weeklyFrequency || 3;
    const muscleGroups = splits[frequency] || splits[3];
    
    for (let i = 0; i < frequency; i++) {
      const dayIndex = i % weekDays.length;
      const focus = muscleGroups[i % muscleGroups.length];
      
      // Determinar grupos musculares do dia
      const focusGroups = focus.split(' e ').map(g => g.trim());
      
      // Selecionar exercícios variados
      const exerciseCount = data.experienceLevel === 'advanced' ? 7 : 
                           data.experienceLevel === 'intermediate' ? 6 : 5;
      
      const selectedExercises: Exercise[] = [];
      
      focusGroups.forEach(group => {
        const groupExercises = availableExercises.filter(ex => {
          const exGroup = ex.muscleGroup.toLowerCase();
          const targetGroup = group.toLowerCase();
          
          // Mapeamento de grupos musculares
          if (targetGroup.includes('peito')) return exGroup.includes('peito');
          if (targetGroup.includes('costas')) return exGroup.includes('costas');
          if (targetGroup.includes('pernas')) return exGroup.includes('pernas') || exGroup.includes('glúteos');
          if (targetGroup.includes('ombros')) return exGroup.includes('ombros');
          if (targetGroup.includes('braços')) return exGroup.includes('bíceps') || exGroup.includes('tríceps') || exGroup.includes('braços');
          if (targetGroup.includes('bíceps')) return exGroup.includes('bíceps');
          if (targetGroup.includes('tríceps')) return exGroup.includes('tríceps');
          if (targetGroup.includes('abdômen')) return exGroup.includes('abdômen') || exGroup.includes('core');
          if (targetGroup.includes('glúteos')) return exGroup.includes('glúteos');
          
          return false;
        });

        // Randomizar e selecionar exercícios
        const shuffled = groupExercises.sort(() => Math.random() - 0.5);
        const count = Math.ceil(exerciseCount / focusGroups.length);
        selectedExercises.push(...shuffled.slice(0, count));
      });

      // Limitar ao número de exercícios desejado
      const finalExercises = selectedExercises.slice(0, exerciseCount);

      plan.push({
        day: weekDays[dayIndex],
        focus: focus,
        exercises: finalExercises,
        duration: data.maxWorkoutDuration || 60
      });
    }

    setWorkoutPlan(plan);
    
    // Salvar no localStorage
    localStorage.setItem('workoutPlan', JSON.stringify(plan));
    localStorage.setItem('lastWorkoutGeneration', new Date().toISOString());
    setLastWorkoutGeneration(new Date());
  };

  const handleWorkoutConfigChange = () => {
    // Salvar configurações
    localStorage.setItem('workoutLocation', workoutLocation);
    localStorage.setItem('physicalIssues', JSON.stringify(selectedIssues));
    localStorage.setItem('workoutRotationWeeks', workoutRotationWeeks.toString());
    
    // Gerar novo treino
    if (onboardingData) {
      generateWorkoutPlan(onboardingData, workoutLocation, selectedIssues);
    }
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

  // Funções de edição de treino
  const replaceExercise = (dayIndex: number, exerciseIndex: number) => {
    if (!onboardingData) return;
    
    const currentExercise = workoutPlan[dayIndex].exercises[exerciseIndex];
    
    // Filtrar exercícios do mesmo grupo muscular
    let alternatives = exerciseDatabase.filter(ex => 
      ex.muscleGroup === currentExercise.muscleGroup && 
      ex.id !== currentExercise.id &&
      (ex.location === workoutLocation || ex.location === 'both') &&
      !ex.contraindications.some(contra => selectedIssues.includes(contra))
    );

    if (alternatives.length > 0) {
      const newExercise = alternatives[Math.floor(Math.random() * alternatives.length)];
      const updatedPlan = [...workoutPlan];
      updatedPlan[dayIndex].exercises[exerciseIndex] = newExercise;
      setWorkoutPlan(updatedPlan);
      localStorage.setItem('workoutPlan', JSON.stringify(updatedPlan));
    }
  };

  const updateExerciseDetails = (dayIndex: number, exerciseIndex: number, field: keyof Exercise, value: any) => {
    const updatedPlan = [...workoutPlan];
    updatedPlan[dayIndex].exercises[exerciseIndex] = {
      ...updatedPlan[dayIndex].exercises[exerciseIndex],
      [field]: value
    };
    setWorkoutPlan(updatedPlan);
    localStorage.setItem('workoutPlan', JSON.stringify(updatedPlan));
  };

  const handleDragStart = (exerciseIndex: number) => {
    setDraggedExercise(exerciseIndex);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (dayIndex: number, targetIndex: number) => {
    if (draggedExercise === null) return;
    
    const updatedPlan = [...workoutPlan];
    const exercises = [...updatedPlan[dayIndex].exercises];
    const [removed] = exercises.splice(draggedExercise, 1);
    exercises.splice(targetIndex, 0, removed);
    updatedPlan[dayIndex].exercises = exercises;
    setWorkoutPlan(updatedPlan);
    localStorage.setItem('workoutPlan', JSON.stringify(updatedPlan));
    setDraggedExercise(null);
  };

  // Funções de câmera
  const startCamera = async (taskId: string) => {
    setCurrentTaskForProof(taskId);
    setShowCamera(true);
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' },
        audio: false 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Erro ao acessar câmera:', error);
      alert('Não foi possível acessar a câmera. Verifique as permissões.');
      setShowCamera(false);
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current || !currentTaskForProof) return;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    if (context) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0);
      
      const photoData = canvas.toDataURL('image/jpeg');
      console.log('Foto capturada:', photoData);
      
      completeTask(currentTaskForProof);
      stopCamera();
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
    setShowCamera(false);
    setCurrentTaskForProof(null);
  };

  // Função de upload de arquivo
  const handleFileUpload = (taskId: string) => {
    setCurrentTaskForProof(taskId);
    fileInputRef.current?.click();
  };

  const processUploadedFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !currentTaskForProof) return;
    
    console.log('Arquivo enviado:', file.name);
    completeTask(currentTaskForProof);
    setCurrentTaskForProof(null);
  };

  // Função de upload de PDF para dieta
  const handlePDFUpload = () => {
    pdfInputRef.current?.click();
  };

  const processPDFFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    if (!file.type.includes('pdf')) {
      alert('❌ Por favor, selecione um arquivo PDF válido.');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert('❌ O arquivo é muito grande. O tamanho máximo é 10MB.');
      return;
    }
    
    setUploadingPDF(true);
    
    try {
      const formData = new FormData();
      formData.append('pdf', file);
      
      const response = await fetch('/api/process-diet-pdf', {
        method: 'POST',
        body: formData
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        if (data.nutritionPlan) {
          setNutritionPlan(data.nutritionPlan);
          alert('✅ Dieta importada com sucesso!');
        }
      } else {
        const errorMessage = data.error || 'Erro ao processar PDF';
        const errorDetails = data.details ? `\n\nDetalhes: ${data.details}` : '';
        alert(`❌ ${errorMessage}${errorDetails}`);
      }
    } catch (error) {
      console.error('Erro ao processar PDF:', error);
      alert('❌ Erro de conexão ao processar o PDF. Verifique sua internet e tente novamente.');
    } finally {
      setUploadingPDF(false);
      if (pdfInputRef.current) {
        pdfInputRef.current.value = '';
      }
    }
  };

  if (!onboardingData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 flex items-center justify-center">
        <div className="text-white text-xl">Carregando...</div>
      </div>
    );
  }

  const completedTasksCount = dailyTasks.filter(t => t.completed).length;
  const completionPercentage = (completedTasksCount / dailyTasks.length) * 100;

  // Calcular dias até próxima rotação
  const daysUntilRotation = lastWorkoutGeneration 
    ? workoutRotationWeeks * 7 - Math.floor((Date.now() - lastWorkoutGeneration.getTime()) / (1000 * 60 * 60 * 24))
    : workoutRotationWeeks * 7;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950">
      {/* Header */}
      <header className="bg-slate-950/80 backdrop-blur-lg border-b border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-2 rounded-lg">
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
              <div className="bg-gradient-to-r from-cyan-500 to-blue-500 w-12 h-12 rounded-full flex items-center justify-center">
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
                    ? 'border-cyan-500 text-white'
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
              <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <Flame className="w-8 h-8 text-orange-400" />
                  <span className="text-2xl font-bold text-white">{userProgress.currentStreak}</span>
                </div>
                <div className="text-sm text-gray-300">Dias de Sequência</div>
              </div>

              <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <Target className="w-8 h-8 text-cyan-400" />
                  <span className="text-2xl font-bold text-white">{userProgress.totalPoints}</span>
                </div>
                <div className="text-sm text-gray-300">Pontos Totais</div>
              </div>

              <div className="bg-gradient-to-br from-emerald-500/20 to-green-500/20 border border-emerald-500/30 rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <CheckCircle className="w-8 h-8 text-emerald-400" />
                  <span className="text-2xl font-bold text-white">{userProgress.completedTasks}</span>
                </div>
                <div className="text-sm text-gray-300">Tarefas Completas</div>
              </div>

              <div className="bg-gradient-to-br from-yellow-500/20 to-amber-500/20 border border-yellow-500/30 rounded-xl p-6">
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
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 h-4 rounded-full transition-all duration-500"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {dailyTasks.slice(0, 6).map((task) => (
                  <div 
                    key={task.id}
                    className={`p-4 rounded-xl border transition-all duration-300 ${
                      task.completed
                        ? 'bg-emerald-500/20 border-emerald-500/50'
                        : 'bg-white/5 border-white/10'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {task.completed ? (
                        <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
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
                className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-xl p-6 text-left hover:border-cyan-500 transition-all duration-300 group"
              >
                <Dumbbell className="w-8 h-8 text-cyan-400 mb-3" />
                <h3 className="text-lg font-bold text-white mb-2">Treino de Hoje</h3>
                <p className="text-sm text-gray-400 mb-4">
                  {workoutPlan[0]?.focus || 'Configure seu treino'}
                </p>
                <div className="flex items-center gap-2 text-cyan-400 group-hover:gap-3 transition-all duration-300">
                  <span className="text-sm font-medium">Ver Treino</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </button>

              <button
                onClick={() => setActiveTab('nutrition')}
                className="bg-gradient-to-br from-emerald-500/20 to-green-500/20 border border-emerald-500/30 rounded-xl p-6 text-left hover:border-emerald-500 transition-all duration-300 group"
              >
                <Apple className="w-8 h-8 text-emerald-400 mb-3" />
                <h3 className="text-lg font-bold text-white mb-2">Plano Alimentar</h3>
                <p className="text-sm text-gray-400 mb-4">
                  {nutritionPlan ? 'Dieta personalizada carregada' : 'Faça upload da sua dieta'}
                </p>
                <div className="flex items-center gap-2 text-emerald-400 group-hover:gap-3 transition-all duration-300">
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
            {/* Configuração de Treino */}
            <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Zap className="w-6 h-6 text-cyan-400" />
                Configuração do Treino
              </h3>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                {/* Localização */}
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Local de Treino</label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setWorkoutLocation('home')}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all duration-300 ${
                        workoutLocation === 'home'
                          ? 'bg-cyan-500/20 border-cyan-500 text-white'
                          : 'bg-white/5 border-white/10 text-gray-400 hover:border-cyan-500/50'
                      }`}
                    >
                      <Home className="w-5 h-5" />
                      <span className="font-medium">Casa</span>
                    </button>
                    <button
                      onClick={() => setWorkoutLocation('gym')}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all duration-300 ${
                        workoutLocation === 'gym'
                          ? 'bg-cyan-500/20 border-cyan-500 text-white'
                          : 'bg-white/5 border-white/10 text-gray-400 hover:border-cyan-500/50'
                      }`}
                    >
                      <Building2 className="w-5 h-5" />
                      <span className="font-medium">Academia</span>
                    </button>
                  </div>
                </div>

                {/* Problemas Físicos */}
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Problemas Físicos</label>
                  <button
                    onClick={() => setHasPhysicalIssues(!hasPhysicalIssues)}
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 ${
                      hasPhysicalIssues
                        ? 'bg-orange-500/20 border-orange-500 text-white'
                        : 'bg-white/5 border-white/10 text-gray-400 hover:border-orange-500/50'
                    }`}
                  >
                    {hasPhysicalIssues ? 'Sim, tenho restrições' : 'Não tenho restrições'}
                  </button>
                </div>

                {/* Rotação de Treino */}
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Rotação de Treino</label>
                  <select
                    value={workoutRotationWeeks}
                    onChange={(e) => setWorkoutRotationWeeks(parseInt(e.target.value))}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white rounded-lg focus:border-cyan-500 focus:outline-none"
                  >
                    <option value={4}>A cada 4 semanas</option>
                    <option value={6}>A cada 6 semanas</option>
                    <option value={8}>A cada 8 semanas</option>
                    <option value={12}>A cada 12 semanas</option>
                  </select>
                </div>
              </div>

              {/* Seleção de Problemas Físicos */}
              {hasPhysicalIssues && (
                <div className="mb-4">
                  <label className="text-sm text-gray-400 mb-2 block">Selecione suas restrições:</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {['lombar', 'coluna', 'joelho', 'ombro'].map((issue) => (
                      <button
                        key={issue}
                        onClick={() => {
                          setSelectedIssues(prev => 
                            prev.includes(issue) 
                              ? prev.filter(i => i !== issue)
                              : [...prev, issue]
                          );
                        }}
                        className={`px-4 py-2 rounded-lg border-2 transition-all duration-300 capitalize ${
                          selectedIssues.includes(issue)
                            ? 'bg-orange-500/20 border-orange-500 text-white'
                            : 'bg-white/5 border-white/10 text-gray-400 hover:border-orange-500/50'
                        }`}
                      >
                        {issue}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-400">
                  {daysUntilRotation > 0 ? (
                    <>Próxima rotação em <span className="text-cyan-400 font-semibold">{daysUntilRotation} dias</span></>
                  ) : (
                    <span className="text-orange-400 font-semibold">Rotação disponível agora!</span>
                  )}
                </div>
                <button
                  onClick={handleWorkoutConfigChange}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:shadow-xl hover:shadow-cyan-500/50 transition-all duration-300"
                >
                  <RefreshCw className="w-4 h-4" />
                  Aplicar e Gerar Treino
                </button>
              </div>
            </div>

            {/* Plano de Treino */}
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Seu Plano de Treino</h2>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Calendar className="w-4 h-4" />
                <span>{workoutLocation === 'home' ? 'Treino em Casa' : 'Treino na Academia'}</span>
              </div>
            </div>

            {workoutPlan.length === 0 ? (
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-12 text-center">
                <Dumbbell className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Nenhum treino configurado</h3>
                <p className="text-gray-400 mb-6">Configure suas preferências acima e clique em "Aplicar e Gerar Treino"</p>
              </div>
            ) : (
              workoutPlan.map((day, dayIndex) => (
                <div key={dayIndex} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{day.day}</h3>
                      <p className="text-cyan-400">{day.focus}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 text-gray-400">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">{day.duration} min</span>
                      </div>
                      <button
                        onClick={() => setEditingWorkoutDay(editingWorkoutDay === dayIndex ? null : dayIndex)}
                        className="flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 transition-all duration-300"
                      >
                        <Edit className="w-4 h-4" />
                        {editingWorkoutDay === dayIndex ? 'Salvar' : 'Editar'}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {day.exercises.map((exercise, exIndex) => (
                      <div 
                        key={exIndex} 
                        className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-cyan-500/50 transition-all duration-300"
                        draggable={editingWorkoutDay === dayIndex}
                        onDragStart={() => handleDragStart(exIndex)}
                        onDragOver={handleDragOver}
                        onDrop={() => handleDrop(dayIndex, exIndex)}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-start gap-3 flex-1">
                            {editingWorkoutDay === dayIndex && (
                              <GripVertical className="w-5 h-5 text-gray-400 cursor-move mt-1" />
                            )}
                            <div className="flex-1">
                              <h4 className="text-white font-semibold mb-1">{exercise.name}</h4>
                              <div className="flex items-center gap-2 text-sm">
                                <span className="text-gray-400">{exercise.muscleGroup}</span>
                                <span className="text-gray-600">•</span>
                                <span className="text-cyan-400 capitalize">{exercise.category}</span>
                                {exercise.equipment.length > 0 && (
                                  <>
                                    <span className="text-gray-600">•</span>
                                    <span className="text-gray-500 text-xs">{exercise.equipment.join(', ')}</span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Video className="w-5 h-5 text-cyan-400" />
                            {editingWorkoutDay === dayIndex && (
                              <button
                                onClick={() => replaceExercise(dayIndex, exIndex)}
                                className="p-1.5 bg-blue-500/20 border border-blue-500/50 text-blue-300 rounded hover:bg-blue-500/30 transition-all duration-300"
                                title="Substituir exercício"
                              >
                                <RefreshCw className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>
                        
                        {editingWorkoutDay === dayIndex ? (
                          <div className="grid grid-cols-3 gap-4 mt-4">
                            <div>
                              <label className="text-xs text-gray-400 mb-1 block">Séries</label>
                              <input
                                type="number"
                                value={exercise.sets}
                                onChange={(e) => updateExerciseDetails(dayIndex, exIndex, 'sets', parseInt(e.target.value))}
                                className="w-full bg-white/10 border border-white/20 text-white rounded px-2 py-1 text-sm focus:border-cyan-500 focus:outline-none"
                              />
                            </div>
                            <div>
                              <label className="text-xs text-gray-400 mb-1 block">Repetições</label>
                              <input
                                type="text"
                                value={exercise.reps}
                                onChange={(e) => updateExerciseDetails(dayIndex, exIndex, 'reps', e.target.value)}
                                className="w-full bg-white/10 border border-white/20 text-white rounded px-2 py-1 text-sm focus:border-cyan-500 focus:outline-none"
                              />
                            </div>
                            <div>
                              <label className="text-xs text-gray-400 mb-1 block">Descanso (s)</label>
                              <input
                                type="number"
                                value={exercise.rest}
                                onChange={(e) => updateExerciseDetails(dayIndex, exIndex, 'rest', parseInt(e.target.value))}
                                className="w-full bg-white/10 border border-white/20 text-white rounded px-2 py-1 text-sm focus:border-cyan-500 focus:outline-none"
                              />
                            </div>
                          </div>
                        ) : (
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
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Nutrition Tab */}
        {activeTab === 'nutrition' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Plano Nutricional</h2>
            </div>

            {!nutritionPlan ? (
              <div className="bg-gradient-to-br from-emerald-500/10 to-green-500/10 border border-emerald-500/30 rounded-2xl p-12 text-center">
                <Apple className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Faça Upload da Sua Dieta</h3>
                <p className="text-gray-400 mb-6 max-w-md mx-auto">
                  Envie um PDF com seu plano alimentar e nossa IA irá processar e organizar tudo para você
                </p>
                <button 
                  onClick={handlePDFUpload}
                  disabled={uploadingPDF}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-lg hover:shadow-xl hover:shadow-emerald-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Upload className="w-5 h-5" />
                  {uploadingPDF ? 'Processando...' : 'Selecionar PDF'}
                </button>
                <p className="text-xs text-gray-500 mt-4">Tamanho máximo: 10MB</p>
              </div>
            ) : (
              <>
                {/* Macros Summary */}
                <div className="bg-gradient-to-br from-emerald-500/20 to-green-500/20 border border-emerald-500/30 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-white">Meta Diária</h3>
                    <button 
                      onClick={handlePDFUpload}
                      disabled={uploadingPDF}
                      className="flex items-center gap-2 px-4 py-2 bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 rounded-lg hover:bg-emerald-500/30 transition-all duration-300"
                    >
                      <Upload className="w-4 h-4" />
                      {uploadingPDF ? 'Processando...' : 'Atualizar Dieta'}
                    </button>
                  </div>
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
                  {nutritionPlan.meals.map((meal, index) => (
                    <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-emerald-500/50 transition-all duration-300">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-white mb-1">{meal.name}</h3>
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
                          <div className="text-lg font-bold text-white">{meal.protein}g</div>
                        </div>
                        <div className="bg-white/5 rounded-lg p-3">
                          <div className="text-xs text-gray-400 mb-1">Carboidratos</div>
                          <div className="text-lg font-bold text-white">{meal.carbs}g</div>
                        </div>
                        <div className="bg-white/5 rounded-lg p-3">
                          <div className="text-xs text-gray-400 mb-1">Gorduras</div>
                          <div className="text-lg font-bold text-white">{meal.fats}g</div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-gray-400 mb-2">Alimentos:</h4>
                        {meal.foods.map((food, foodIndex) => (
                          <div key={foodIndex} className="flex items-center gap-3 p-2 bg-white/5 rounded-lg">
                            <div className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" />
                            <span className="text-white text-sm">{food}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
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
                      ? 'border-emerald-500/50 bg-emerald-500/10'
                      : 'border-white/10 hover:border-cyan-500/50'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <button
                      onClick={() => completeTask(task.id)}
                      disabled={task.completed}
                      className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                        task.completed
                          ? 'bg-emerald-500 border-emerald-500'
                          : 'border-white/30 hover:border-cyan-500'
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
                        <div className="flex items-center gap-2 text-cyan-400">
                          <Trophy className="w-4 h-4" />
                          <span className="text-sm font-semibold">+{task.points}</span>
                        </div>
                      </div>

                      {!task.completed && (
                        <div className="flex items-center gap-2 mt-4">
                          {task.proofType === 'photo' && (
                            <>
                              <button 
                                onClick={() => startCamera(task.id)}
                                className="flex items-center gap-2 px-4 py-2 bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 rounded-lg hover:bg-cyan-500/30 transition-all duration-300"
                              >
                                <Camera className="w-4 h-4" />
                                Tirar Foto
                              </button>
                              <button 
                                onClick={() => handleFileUpload(task.id)}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-500/50 text-blue-300 rounded-lg hover:bg-blue-500/30 transition-all duration-300"
                              >
                                <Upload className="w-4 h-4" />
                                Upload
                              </button>
                            </>
                          )}
                          {task.proofType === 'video' && (
                            <button 
                              onClick={() => handleFileUpload(task.id)}
                              className="flex items-center gap-2 px-4 py-2 bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 rounded-lg hover:bg-cyan-500/30 transition-all duration-300"
                            >
                              <Video className="w-4 h-4" />
                              Enviar Vídeo
                            </button>
                          )}
                          {task.proofType === 'check-in' && (
                            <button 
                              onClick={() => completeTask(task.id)}
                              className="flex items-center gap-2 px-4 py-2 bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 rounded-lg hover:bg-emerald-500/30 transition-all duration-300"
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
            <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">Nível {userProgress.level}</h3>
                  <p className="text-sm text-gray-400">{userProgress.totalPoints} / 1000 pontos</p>
                </div>
                <div className="bg-gradient-to-r from-cyan-500 to-blue-500 w-16 h-16 rounded-full flex items-center justify-center">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="w-full bg-white/10 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 h-3 rounded-full transition-all duration-500"
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

      {/* Camera Modal */}
      {showCamera && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-2xl p-6 max-w-2xl w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">Tirar Foto</h3>
              <button 
                onClick={stopCamera}
                className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-300"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
            
            <div className="relative bg-black rounded-xl overflow-hidden mb-4">
              <video 
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-auto"
              />
            </div>
            
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={capturePhoto}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:shadow-xl hover:shadow-cyan-500/50 transition-all duration-300"
              >
                <Camera className="w-5 h-5" />
                Capturar Foto
              </button>
              <button
                onClick={stopCamera}
                className="px-6 py-3 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 transition-all duration-300"
              >
                Cancelar
              </button>
            </div>
          </div>
          
          <canvas ref={canvasRef} className="hidden" />
        </div>
      )}

      {/* Hidden file inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,video/*"
        onChange={processUploadedFile}
        className="hidden"
      />
      
      <input
        ref={pdfInputRef}
        type="file"
        accept="application/pdf"
        onChange={processPDFFile}
        className="hidden"
      />
    </div>
  );
}
