import { Exercise, Meal, Badge, DailyTask } from './types';

// Base de Exercícios
export const exerciseDatabase: Exercise[] = [
  // Peito
  {
    id: 'ex-1',
    name: 'Supino Reto',
    muscleGroup: 'Peito',
    sets: 4,
    reps: '8-12',
    rest: 90,
    equipment: ['barra', 'banco'],
    contraindications: ['lesão no ombro']
  },
  {
    id: 'ex-2',
    name: 'Flexão de Braço',
    muscleGroup: 'Peito',
    sets: 3,
    reps: '12-15',
    rest: 60,
    equipment: [],
    contraindications: ['lesão no punho']
  },
  // Costas
  {
    id: 'ex-3',
    name: 'Barra Fixa',
    muscleGroup: 'Costas',
    sets: 4,
    reps: '6-10',
    rest: 120,
    equipment: ['barra fixa'],
    contraindications: ['lesão no ombro']
  },
  {
    id: 'ex-4',
    name: 'Remada Curvada',
    muscleGroup: 'Costas',
    sets: 4,
    reps: '8-12',
    rest: 90,
    equipment: ['barra', 'halteres'],
    contraindications: ['problemas na lombar']
  },
  // Pernas
  {
    id: 'ex-5',
    name: 'Agachamento Livre',
    muscleGroup: 'Pernas',
    sets: 4,
    reps: '8-12',
    rest: 120,
    equipment: ['barra'],
    contraindications: ['problemas na coluna', 'lesão no joelho']
  },
  {
    id: 'ex-6',
    name: 'Leg Press',
    muscleGroup: 'Pernas',
    sets: 4,
    reps: '10-15',
    rest: 90,
    equipment: ['leg press'],
    contraindications: []
  },
  {
    id: 'ex-7',
    name: 'Agachamento Sumô',
    muscleGroup: 'Pernas',
    sets: 3,
    reps: '12-15',
    rest: 60,
    equipment: ['halteres'],
    contraindications: []
  },
  // Ombros
  {
    id: 'ex-8',
    name: 'Desenvolvimento com Halteres',
    muscleGroup: 'Ombros',
    sets: 4,
    reps: '8-12',
    rest: 90,
    equipment: ['halteres', 'banco'],
    contraindications: ['lesão no ombro']
  },
  // Braços
  {
    id: 'ex-9',
    name: 'Rosca Direta',
    muscleGroup: 'Bíceps',
    sets: 3,
    reps: '10-12',
    rest: 60,
    equipment: ['barra', 'halteres'],
    contraindications: []
  },
  {
    id: 'ex-10',
    name: 'Tríceps Testa',
    muscleGroup: 'Tríceps',
    sets: 3,
    reps: '10-12',
    rest: 60,
    equipment: ['barra', 'halteres'],
    contraindications: ['lesão no cotovelo']
  }
];

// Base de Refeições
export const mealDatabase: Meal[] = [
  {
    id: 'meal-1',
    name: 'Café da Manhã Proteico',
    time: '07:00',
    calories: 450,
    protein: 35,
    carbs: 45,
    fats: 12,
    foods: ['3 ovos mexidos', '2 fatias de pão integral', '1 banana', 'café']
  },
  {
    id: 'meal-2',
    name: 'Almoço Balanceado',
    time: '12:00',
    calories: 650,
    protein: 50,
    carbs: 70,
    fats: 18,
    foods: ['150g frango grelhado', '1 xícara arroz integral', 'salada verde', 'azeite']
  },
  {
    id: 'meal-3',
    name: 'Lanche da Tarde',
    time: '15:30',
    calories: 280,
    protein: 25,
    carbs: 30,
    fats: 8,
    foods: ['1 iogurte grego', '1 scoop whey protein', 'granola']
  },
  {
    id: 'meal-4',
    name: 'Jantar Leve',
    time: '19:00',
    calories: 520,
    protein: 45,
    carbs: 50,
    fats: 15,
    foods: ['150g peixe grelhado', 'batata doce', 'brócolis', 'azeite']
  },
  {
    id: 'meal-5',
    name: 'Ceia',
    time: '22:00',
    calories: 200,
    protein: 20,
    carbs: 15,
    fats: 8,
    foods: ['200g queijo cottage', 'castanhas']
  }
];

// Sistema de Badges
export const badgeSystem: Badge[] = [
  {
    id: 'badge-1',
    name: 'Primeiro Passo',
    description: 'Complete seu primeiro treino',
    icon: '🎯'
  },
  {
    id: 'badge-2',
    name: 'Semana Completa',
    description: 'Complete 7 dias consecutivos',
    icon: '🔥'
  },
  {
    id: 'badge-3',
    name: 'Mestre da Dieta',
    description: 'Complete 30 dias seguindo a dieta',
    icon: '🥗'
  },
  {
    id: 'badge-4',
    name: 'Guerreiro',
    description: 'Complete 100 treinos',
    icon: '💪'
  },
  {
    id: 'badge-5',
    name: 'Superação',
    description: 'Treine mesmo com dificuldades',
    icon: '🏆'
  },
  {
    id: 'badge-6',
    name: 'Consistência',
    description: 'Mantenha 30 dias de streak',
    icon: '⭐'
  }
];

// Tarefas Diárias Template
export const dailyTasksTemplate: Omit<DailyTask, 'id' | 'completed' | 'proofUrl'>[] = [
  {
    type: 'nutrition',
    title: 'Café da Manhã Proteico',
    description: 'Comprove a ingestão do seu café da manhã',
    points: 10,
    proofType: 'photo'
  },
  {
    type: 'exercise',
    title: 'Treino do Dia',
    description: 'Complete seu treino programado',
    points: 25,
    proofType: 'check-in'
  },
  {
    type: 'hydration',
    title: 'Hidratação',
    description: 'Beba 8 copos de água (2L)',
    points: 5,
    proofType: 'check-in'
  },
  {
    type: 'activity',
    title: 'Cardio Leve',
    description: 'Complete 30 minutos de caminhada',
    points: 15,
    proofType: 'wearable'
  },
  {
    type: 'rest',
    title: 'Sono Adequado',
    description: 'Durma 7-9 horas',
    points: 10,
    proofType: 'check-in'
  }
];

// Equipamentos disponíveis
export const gymEquipment = [
  'Barra Olímpica',
  'Halteres',
  'Banco Reto',
  'Banco Inclinado',
  'Leg Press',
  'Hack Machine',
  'Smith Machine',
  'Polia Alta/Baixa',
  'Barra Fixa',
  'Paralelas',
  'Esteira',
  'Bicicleta'
];

export const homeEquipment = [
  'Halteres Ajustáveis',
  'Faixa Elástica',
  'Barra Fixa Porta',
  'Tapete de Yoga',
  'Corda de Pular',
  'Kettlebell',
  'Banco Dobrável'
];

// Restrições Médicas Comuns
export const commonRestrictions = [
  'Problemas na Coluna/Lombar',
  'Lesão no Joelho',
  'Lesão no Ombro',
  'Lesão no Punho/Cotovelo',
  'Hérnia de Disco',
  'Pressão Alta',
  'Diabetes',
  'Problemas Cardíacos',
  'Cirurgia Recente'
];

// Alergias Alimentares Comuns
export const commonAllergies = [
  'Lactose',
  'Glúten',
  'Amendoim',
  'Frutos do Mar',
  'Ovo',
  'Soja',
  'Nozes',
  'Peixe'
];
