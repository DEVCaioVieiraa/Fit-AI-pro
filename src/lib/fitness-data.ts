// 🏋️ BANCO DE DADOS COMPLETO DE EXERCÍCIOS

export interface Exercise {
  id: string;
  name: string;
  muscleGroup: string;
  muscleSubGroup?: string; // Nova propriedade para especificar parte do músculo
  location: 'home' | 'gym';
  equipment: string[];
  sets: number;
  reps: string;
  rest: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  contraindications: string[];
  category?: 'machine' | 'free-weight' | 'cable' | 'bodyweight';
}

// ========================================
// 1. EXERCÍCIOS PARA CASA (APENAS HOME)
// ========================================

const homeChestExercises: Exercise[] = [
  { id: 'h-chest-1', name: 'Flexão tradicional', muscleGroup: 'Peito', muscleSubGroup: 'Peito médio', location: 'home', equipment: [], sets: 3, reps: '12-15', rest: 60, difficulty: 'beginner', contraindications: [], category: 'bodyweight' },
  { id: 'h-chest-2', name: 'Flexão aberta', muscleGroup: 'Peito', muscleSubGroup: 'Peito médio', location: 'home', equipment: [], sets: 3, reps: '10-12', rest: 60, difficulty: 'beginner', contraindications: [], category: 'bodyweight' },
  { id: 'h-chest-3', name: 'Flexão fechada', muscleGroup: 'Peito', muscleSubGroup: 'Peito médio/interno', location: 'home', equipment: [], sets: 3, reps: '10-12', rest: 60, difficulty: 'intermediate', contraindications: [], category: 'bodyweight' },
  { id: 'h-chest-4', name: 'Flexão inclinada (pés elevados)', muscleGroup: 'Peito', muscleSubGroup: 'Peito superior', location: 'home', equipment: ['banco/cadeira'], sets: 3, reps: '8-12', rest: 60, difficulty: 'intermediate', contraindications: [], category: 'bodyweight' },
  { id: 'h-chest-5', name: 'Flexão declinada (mãos elevadas)', muscleGroup: 'Peito', muscleSubGroup: 'Peito inferior', location: 'home', equipment: ['banco/cadeira'], sets: 3, reps: '12-15', rest: 60, difficulty: 'beginner', contraindications: [], category: 'bodyweight' },
];

const homeBackExercises: Exercise[] = [
  { id: 'h-back-1', name: 'Remada com toalha', muscleGroup: 'Costas', muscleSubGroup: 'Dorsais/trapézio', location: 'home', equipment: ['toalha'], sets: 3, reps: '12-15', rest: 60, difficulty: 'beginner', contraindications: [], category: 'bodyweight' },
  { id: 'h-back-2', name: 'Remada unilateral com garrafa', muscleGroup: 'Costas', muscleSubGroup: 'Dorsais/romboides', location: 'home', equipment: ['garrafa'], sets: 3, reps: '12-15', rest: 60, difficulty: 'beginner', contraindications: [], category: 'bodyweight' },
  { id: 'h-back-3', name: 'Superman', muscleGroup: 'Costas', muscleSubGroup: 'Lombar/eretores', location: 'home', equipment: [], sets: 3, reps: '15-20', rest: 45, difficulty: 'beginner', contraindications: ['lombar'], category: 'bodyweight' },
  { id: 'h-back-4', name: 'Prancha com elevação alternada de braços', muscleGroup: 'Costas', muscleSubGroup: 'Core/estabilizadores', location: 'home', equipment: [], sets: 3, reps: '10-12', rest: 60, difficulty: 'intermediate', contraindications: [], category: 'bodyweight' },
  { id: 'h-back-5', name: 'Hip hinge', muscleGroup: 'Costas', muscleSubGroup: 'Lombar/posterior', location: 'home', equipment: [], sets: 3, reps: '15-20', rest: 45, difficulty: 'beginner', contraindications: [], category: 'bodyweight' },
];

const homeLegsExercises: Exercise[] = [
  { id: 'h-legs-1', name: 'Agachamento livre', muscleGroup: 'Pernas', muscleSubGroup: 'Quadríceps/glúteos', location: 'home', equipment: [], sets: 4, reps: '15-20', rest: 60, difficulty: 'beginner', contraindications: [], category: 'bodyweight' },
  { id: 'h-legs-2', name: 'Agachamento sumô', muscleGroup: 'Pernas', muscleSubGroup: 'Adutores/glúteos', location: 'home', equipment: [], sets: 3, reps: '15-20', rest: 60, difficulty: 'beginner', contraindications: [], category: 'bodyweight' },
  { id: 'h-legs-3', name: 'Afundo', muscleGroup: 'Pernas', muscleSubGroup: 'Quadríceps/glúteos', location: 'home', equipment: [], sets: 3, reps: '12-15', rest: 60, difficulty: 'intermediate', contraindications: ['joelho'], category: 'bodyweight' },
  { id: 'h-legs-4', name: 'Avanço (passada)', muscleGroup: 'Pernas', muscleSubGroup: 'Quadríceps/glúteos', location: 'home', equipment: [], sets: 3, reps: '12-15', rest: 60, difficulty: 'intermediate', contraindications: ['joelho'], category: 'bodyweight' },
  { id: 'h-legs-5', name: 'Subida em banco/cadeira', muscleGroup: 'Pernas', muscleSubGroup: 'Quadríceps/glúteos', location: 'home', equipment: ['banco/cadeira'], sets: 3, reps: '12-15', rest: 60, difficulty: 'beginner', contraindications: [], category: 'bodyweight' },
  { id: 'h-legs-6', name: 'Elevação de panturrilha', muscleGroup: 'Pernas', muscleSubGroup: 'Panturrilha', location: 'home', equipment: [], sets: 4, reps: '20-25', rest: 45, difficulty: 'beginner', contraindications: [], category: 'bodyweight' },
  { id: 'h-legs-7', name: 'Ponte de quadril (glúteo)', muscleGroup: 'Pernas', muscleSubGroup: 'Glúteos/posterior', location: 'home', equipment: [], sets: 3, reps: '15-20', rest: 60, difficulty: 'beginner', contraindications: [], category: 'bodyweight' },
];

const homeGlutesExercises: Exercise[] = [
  { id: 'h-glutes-1', name: 'Ponte', muscleGroup: 'Glúteos', muscleSubGroup: 'Glúteo máximo', location: 'home', equipment: [], sets: 4, reps: '15-20', rest: 60, difficulty: 'beginner', contraindications: [], category: 'bodyweight' },
  { id: 'h-glutes-2', name: 'Glute bridge unilateral', muscleGroup: 'Glúteos', muscleSubGroup: 'Glúteo máximo', location: 'home', equipment: [], sets: 3, reps: '12-15', rest: 60, difficulty: 'intermediate', contraindications: [], category: 'bodyweight' },
  { id: 'h-glutes-3', name: 'Agachamento sumô', muscleGroup: 'Glúteos', muscleSubGroup: 'Glúteo máximo/adutores', location: 'home', equipment: [], sets: 3, reps: '15-20', rest: 60, difficulty: 'beginner', contraindications: [], category: 'bodyweight' },
  { id: 'h-glutes-4', name: 'Abdução de quadril no chão', muscleGroup: 'Glúteos', muscleSubGroup: 'Glúteo médio', location: 'home', equipment: [], sets: 3, reps: '15-20', rest: 45, difficulty: 'beginner', contraindications: [], category: 'bodyweight' },
  { id: 'h-glutes-5', name: 'Elevação de quadril com isometria', muscleGroup: 'Glúteos', muscleSubGroup: 'Glúteo máximo', location: 'home', equipment: [], sets: 3, reps: '10-12', rest: 60, difficulty: 'intermediate', contraindications: [], category: 'bodyweight' },
];

const homeShouldersExercises: Exercise[] = [
  { id: 'h-shoulders-1', name: 'Elevação lateral com garrafas', muscleGroup: 'Ombros', muscleSubGroup: 'Deltoide lateral', location: 'home', equipment: ['garrafa'], sets: 3, reps: '12-15', rest: 60, difficulty: 'beginner', contraindications: [], category: 'bodyweight' },
  { id: 'h-shoulders-2', name: 'Desenvolvimento militar com garrafas', muscleGroup: 'Ombros', muscleSubGroup: 'Deltoide anterior', location: 'home', equipment: ['garrafa'], sets: 3, reps: '10-12', rest: 60, difficulty: 'intermediate', contraindications: ['ombro'], category: 'bodyweight' },
  { id: 'h-shoulders-3', name: 'Pike push-up', muscleGroup: 'Ombros', muscleSubGroup: 'Deltoide anterior', location: 'home', equipment: [], sets: 3, reps: '8-12', rest: 60, difficulty: 'intermediate', contraindications: ['ombro'], category: 'bodyweight' },
  { id: 'h-shoulders-4', name: 'Elevação frontal com garrafas', muscleGroup: 'Ombros', muscleSubGroup: 'Deltoide anterior', location: 'home', equipment: ['garrafa'], sets: 3, reps: '12-15', rest: 60, difficulty: 'beginner', contraindications: [], category: 'bodyweight' },
];

const homeArmsExercises: Exercise[] = [
  { id: 'h-arms-1', name: 'Tríceps banco', muscleGroup: 'Tríceps', muscleSubGroup: 'Tríceps (todas cabeças)', location: 'home', equipment: ['banco/cadeira'], sets: 3, reps: '12-15', rest: 60, difficulty: 'beginner', contraindications: [], category: 'bodyweight' },
  { id: 'h-arms-2', name: 'Flexão fechada (tríceps)', muscleGroup: 'Tríceps', muscleSubGroup: 'Tríceps (todas cabeças)', location: 'home', equipment: [], sets: 3, reps: '10-12', rest: 60, difficulty: 'intermediate', contraindications: [], category: 'bodyweight' },
  { id: 'h-arms-3', name: 'Rosca com garrafas', muscleGroup: 'Bíceps', muscleSubGroup: 'Bíceps (cabeça curta e longa)', location: 'home', equipment: ['garrafa'], sets: 3, reps: '12-15', rest: 60, difficulty: 'beginner', contraindications: [], category: 'bodyweight' },
  { id: 'h-arms-4', name: 'Rosca martelo com garrafas', muscleGroup: 'Bíceps', muscleSubGroup: 'Braquial/braquiorradial', location: 'home', equipment: ['garrafa'], sets: 3, reps: '12-15', rest: 60, difficulty: 'beginner', contraindications: [], category: 'bodyweight' },
];

const homeAbsExercises: Exercise[] = [
  { id: 'h-abs-1', name: 'Prancha', muscleGroup: 'Abdômen', muscleSubGroup: 'Core completo', location: 'home', equipment: [], sets: 3, reps: '30-60s', rest: 60, difficulty: 'beginner', contraindications: [], category: 'bodyweight' },
  { id: 'h-abs-2', name: 'Prancha lateral', muscleGroup: 'Abdômen', muscleSubGroup: 'Oblíquos', location: 'home', equipment: [], sets: 3, reps: '30-45s', rest: 60, difficulty: 'intermediate', contraindications: [], category: 'bodyweight' },
  { id: 'h-abs-3', name: 'Elevação de pernas', muscleGroup: 'Abdômen', muscleSubGroup: 'Abdômen inferior', location: 'home', equipment: [], sets: 3, reps: '12-15', rest: 60, difficulty: 'intermediate', contraindications: ['lombar'], category: 'bodyweight' },
  { id: 'h-abs-4', name: 'Abdominal crunch', muscleGroup: 'Abdômen', muscleSubGroup: 'Abdômen superior', location: 'home', equipment: [], sets: 3, reps: '15-20', rest: 45, difficulty: 'beginner', contraindications: [], category: 'bodyweight' },
  { id: 'h-abs-5', name: 'Bicicleta no ar', muscleGroup: 'Abdômen', muscleSubGroup: 'Oblíquos/core', location: 'home', equipment: [], sets: 3, reps: '15-20', rest: 45, difficulty: 'beginner', contraindications: [], category: 'bodyweight' },
];

// ========================================
// 2. EXERCÍCIOS DE ACADEMIA (APENAS GYM)
// ========================================

// PEITO (3 partes: superior, médio, inferior)
const gymChestExercises: Exercise[] = [
  // Máquinas
  { id: 'g-chest-1', name: 'Peck deck', muscleGroup: 'Peito', muscleSubGroup: 'Peito médio/interno', location: 'gym', equipment: ['Peck deck'], sets: 3, reps: '12-15', rest: 60, difficulty: 'beginner', contraindications: [], category: 'machine' },
  { id: 'g-chest-2', name: 'Supino máquina', muscleGroup: 'Peito', muscleSubGroup: 'Peito médio', location: 'gym', equipment: ['Supino máquina'], sets: 4, reps: '10-12', rest: 90, difficulty: 'beginner', contraindications: [], category: 'machine' },
  { id: 'g-chest-3', name: 'Supino inclinado máquina', muscleGroup: 'Peito', muscleSubGroup: 'Peito superior', location: 'gym', equipment: ['Supino inclinado máquina'], sets: 3, reps: '10-12', rest: 90, difficulty: 'intermediate', contraindications: [], category: 'machine' },
  { id: 'g-chest-4', name: 'Crucifixo máquina', muscleGroup: 'Peito', muscleSubGroup: 'Peito médio', location: 'gym', equipment: ['Crucifixo máquina'], sets: 3, reps: '12-15', rest: 60, difficulty: 'beginner', contraindications: [], category: 'machine' },
  { id: 'g-chest-5', name: 'Crossover máquina', muscleGroup: 'Peito', muscleSubGroup: 'Peito médio/interno', location: 'gym', equipment: ['Crossover máquina'], sets: 3, reps: '12-15', rest: 60, difficulty: 'intermediate', contraindications: [], category: 'machine' },
  // Pesos livres
  { id: 'g-chest-6', name: 'Supino reto com barra', muscleGroup: 'Peito', muscleSubGroup: 'Peito médio', location: 'gym', equipment: ['Barra olímpica', 'Banco'], sets: 4, reps: '8-12', rest: 90, difficulty: 'intermediate', contraindications: [], category: 'free-weight' },
  { id: 'g-chest-7', name: 'Supino inclinado', muscleGroup: 'Peito', muscleSubGroup: 'Peito superior', location: 'gym', equipment: ['Barra/Halteres', 'Banco inclinado'], sets: 4, reps: '8-12', rest: 90, difficulty: 'intermediate', contraindications: [], category: 'free-weight' },
  { id: 'g-chest-8', name: 'Supino declinado', muscleGroup: 'Peito', muscleSubGroup: 'Peito inferior', location: 'gym', equipment: ['Barra/Halteres', 'Banco declinado'], sets: 3, reps: '10-12', rest: 90, difficulty: 'intermediate', contraindications: [], category: 'free-weight' },
  { id: 'g-chest-9', name: 'Crucifixo com halteres', muscleGroup: 'Peito', muscleSubGroup: 'Peito médio', location: 'gym', equipment: ['Halteres', 'Banco'], sets: 3, reps: '12-15', rest: 60, difficulty: 'intermediate', contraindications: [], category: 'free-weight' },
  { id: 'g-chest-10', name: 'Pullover', muscleGroup: 'Peito', muscleSubGroup: 'Peito/dorsais', location: 'gym', equipment: ['Halter', 'Banco'], sets: 3, reps: '12-15', rest: 60, difficulty: 'intermediate', contraindications: [], category: 'free-weight' },
  // Cabos
  { id: 'g-chest-11', name: 'Crossover alto', muscleGroup: 'Peito', muscleSubGroup: 'Peito inferior', location: 'gym', equipment: ['Crossover'], sets: 3, reps: '12-15', rest: 60, difficulty: 'intermediate', contraindications: [], category: 'cable' },
  { id: 'g-chest-12', name: 'Crossover baixo', muscleGroup: 'Peito', muscleSubGroup: 'Peito superior', location: 'gym', equipment: ['Crossover'], sets: 3, reps: '12-15', rest: 60, difficulty: 'intermediate', contraindications: [], category: 'cable' },
  { id: 'g-chest-13', name: 'Crucifixo no cabo', muscleGroup: 'Peito', muscleSubGroup: 'Peito médio', location: 'gym', equipment: ['Crossover'], sets: 3, reps: '12-15', rest: 60, difficulty: 'intermediate', contraindications: [], category: 'cable' },
  { id: 'g-chest-14', name: 'Supino no cabo', muscleGroup: 'Peito', muscleSubGroup: 'Peito médio', location: 'gym', equipment: ['Crossover'], sets: 3, reps: '12-15', rest: 60, difficulty: 'advanced', contraindications: [], category: 'cable' },
];

// COSTAS
const gymBackExercises: Exercise[] = [
  // Máquinas
  { id: 'g-back-1', name: 'Puxada frente', muscleGroup: 'Costas', muscleSubGroup: 'Dorsais/largura', location: 'gym', equipment: ['Puxada frente'], sets: 4, reps: '10-12', rest: 90, difficulty: 'beginner', contraindications: [], category: 'machine' },
  { id: 'g-back-2', name: 'Puxada atrás', muscleGroup: 'Costas', muscleSubGroup: 'Dorsais/trapézio', location: 'gym', equipment: ['Puxada'], sets: 3, reps: '10-12', rest: 90, difficulty: 'intermediate', contraindications: ['ombro'], category: 'machine' },
  { id: 'g-back-3', name: 'Remada articulada', muscleGroup: 'Costas', muscleSubGroup: 'Dorsais/espessura', location: 'gym', equipment: ['Remada articulada'], sets: 4, reps: '10-12', rest: 90, difficulty: 'intermediate', contraindications: [], category: 'machine' },
  { id: 'g-back-4', name: 'Remada baixa', muscleGroup: 'Costas', muscleSubGroup: 'Dorsais/romboides', location: 'gym', equipment: ['Remada baixa'], sets: 4, reps: '10-12', rest: 90, difficulty: 'beginner', contraindications: [], category: 'machine' },
  { id: 'g-back-5', name: 'Remada unilateral máquina', muscleGroup: 'Costas', muscleSubGroup: 'Dorsais/simetria', location: 'gym', equipment: ['Remada unilateral'], sets: 3, reps: '12-15', rest: 60, difficulty: 'intermediate', contraindications: [], category: 'machine' },
  // Pesos livres
  { id: 'g-back-6', name: 'Remada curvada', muscleGroup: 'Costas', muscleSubGroup: 'Dorsais/espessura', location: 'gym', equipment: ['Barra olímpica'], sets: 4, reps: '8-12', rest: 90, difficulty: 'intermediate', contraindications: ['lombar'], category: 'free-weight' },
  { id: 'g-back-7', name: 'Remada unilateral halter', muscleGroup: 'Costas', muscleSubGroup: 'Dorsais/simetria', location: 'gym', equipment: ['Halter', 'Banco'], sets: 3, reps: '10-12', rest: 60, difficulty: 'intermediate', contraindications: [], category: 'free-weight' },
  { id: 'g-back-8', name: 'Levantamento terra (Deadlift)', muscleGroup: 'Costas', muscleSubGroup: 'Lombar/eretores/posterior', location: 'gym', equipment: ['Barra olímpica'], sets: 4, reps: '6-10', rest: 120, difficulty: 'advanced', contraindications: ['lombar', 'coluna'], category: 'free-weight' },
  { id: 'g-back-9', name: 'Barra fixa', muscleGroup: 'Costas', muscleSubGroup: 'Dorsais/largura', location: 'gym', equipment: ['Barra fixa'], sets: 3, reps: '8-12', rest: 90, difficulty: 'intermediate', contraindications: [], category: 'bodyweight' },
  // Cabos
  { id: 'g-back-10', name: 'Remada baixa cabo', muscleGroup: 'Costas', muscleSubGroup: 'Dorsais/romboides', location: 'gym', equipment: ['Cabo'], sets: 4, reps: '10-12', rest: 90, difficulty: 'beginner', contraindications: [], category: 'cable' },
  { id: 'g-back-11', name: 'Remada alta cabo', muscleGroup: 'Costas', muscleSubGroup: 'Trapézio/deltoides', location: 'gym', equipment: ['Cabo'], sets: 3, reps: '12-15', rest: 60, difficulty: 'intermediate', contraindications: [], category: 'cable' },
  { id: 'g-back-12', name: 'Pulldown', muscleGroup: 'Costas', muscleSubGroup: 'Dorsais/largura', location: 'gym', equipment: ['Cabo'], sets: 3, reps: '12-15', rest: 60, difficulty: 'beginner', contraindications: [], category: 'cable' },
  { id: 'g-back-13', name: 'Pullover no cabo', muscleGroup: 'Costas', muscleSubGroup: 'Dorsais/serrátil', location: 'gym', equipment: ['Cabo'], sets: 3, reps: '12-15', rest: 60, difficulty: 'intermediate', contraindications: [], category: 'cable' },
];

// OMBROS (3 partes: anterior, lateral, posterior)
const gymShouldersExercises: Exercise[] = [
  // Máquinas
  { id: 'g-shoulders-1', name: 'Desenvolvimento ombro máquina', muscleGroup: 'Ombros', muscleSubGroup: 'Deltoide anterior/lateral', location: 'gym', equipment: ['Desenvolvimento máquina'], sets: 4, reps: '10-12', rest: 90, difficulty: 'beginner', contraindications: [], category: 'machine' },
  { id: 'g-shoulders-2', name: 'Elevação lateral máquina', muscleGroup: 'Ombros', muscleSubGroup: 'Deltoide lateral', location: 'gym', equipment: ['Elevação lateral máquina'], sets: 3, reps: '12-15', rest: 60, difficulty: 'beginner', contraindications: [], category: 'machine' },
  { id: 'g-shoulders-3', name: 'Posterior de ombro máquina', muscleGroup: 'Ombros', muscleSubGroup: 'Deltoide posterior', location: 'gym', equipment: ['Posterior máquina'], sets: 3, reps: '12-15', rest: 60, difficulty: 'beginner', contraindications: [], category: 'machine' },
  // Pesos livres
  { id: 'g-shoulders-4', name: 'Desenvolvimento militar', muscleGroup: 'Ombros', muscleSubGroup: 'Deltoide anterior/lateral', location: 'gym', equipment: ['Barra olímpica'], sets: 4, reps: '8-12', rest: 90, difficulty: 'intermediate', contraindications: ['ombro'], category: 'free-weight' },
  { id: 'g-shoulders-5', name: 'Elevação lateral', muscleGroup: 'Ombros', muscleSubGroup: 'Deltoide lateral', location: 'gym', equipment: ['Halteres'], sets: 3, reps: '12-15', rest: 60, difficulty: 'beginner', contraindications: [], category: 'free-weight' },
  { id: 'g-shoulders-6', name: 'Elevação frontal', muscleGroup: 'Ombros', muscleSubGroup: 'Deltoide anterior', location: 'gym', equipment: ['Halteres'], sets: 3, reps: '12-15', rest: 60, difficulty: 'beginner', contraindications: [], category: 'free-weight' },
  { id: 'g-shoulders-7', name: 'Remada alta', muscleGroup: 'Ombros', muscleSubGroup: 'Deltoide lateral/trapézio', location: 'gym', equipment: ['Barra/Halteres'], sets: 3, reps: '12-15', rest: 60, difficulty: 'intermediate', contraindications: ['ombro'], category: 'free-weight' },
  { id: 'g-shoulders-8', name: 'Crucifixo inverso', muscleGroup: 'Ombros', muscleSubGroup: 'Deltoide posterior', location: 'gym', equipment: ['Halteres', 'Banco'], sets: 3, reps: '12-15', rest: 60, difficulty: 'intermediate', contraindications: [], category: 'free-weight' },
  // Cabos
  { id: 'g-shoulders-9', name: 'Elevação lateral cabo', muscleGroup: 'Ombros', muscleSubGroup: 'Deltoide lateral', location: 'gym', equipment: ['Cabo'], sets: 3, reps: '12-15', rest: 60, difficulty: 'intermediate', contraindications: [], category: 'cable' },
  { id: 'g-shoulders-10', name: 'Elevação frontal cabo', muscleGroup: 'Ombros', muscleSubGroup: 'Deltoide anterior', location: 'gym', equipment: ['Cabo'], sets: 3, reps: '12-15', rest: 60, difficulty: 'intermediate', contraindications: [], category: 'cable' },
  { id: 'g-shoulders-11', name: 'Fly reverso cabo', muscleGroup: 'Ombros', muscleSubGroup: 'Deltoide posterior', location: 'gym', equipment: ['Cabo'], sets: 3, reps: '12-15', rest: 60, difficulty: 'intermediate', contraindications: [], category: 'cable' },
  { id: 'g-shoulders-12', name: 'Desenvolvimento cabo', muscleGroup: 'Ombros', muscleSubGroup: 'Deltoide anterior/lateral', location: 'gym', equipment: ['Cabo'], sets: 3, reps: '12-15', rest: 60, difficulty: 'advanced', contraindications: [], category: 'cable' },
];

// BÍCEPS (2 cabeças: curta e longa)
const gymBicepsExercises: Exercise[] = [
  // Máquina
  { id: 'g-biceps-1', name: 'Rosca máquina', muscleGroup: 'Bíceps', muscleSubGroup: 'Bíceps (ambas cabeças)', location: 'gym', equipment: ['Rosca máquina'], sets: 3, reps: '12-15', rest: 60, difficulty: 'beginner', contraindications: [], category: 'machine' },
  { id: 'g-biceps-2', name: 'Rosca Scott máquina', muscleGroup: 'Bíceps', muscleSubGroup: 'Bíceps (cabeça curta)', location: 'gym', equipment: ['Scott máquina'], sets: 3, reps: '12-15', rest: 60, difficulty: 'beginner', contraindications: [], category: 'machine' },
  // Pesos livres
  { id: 'g-biceps-3', name: 'Rosca direta', muscleGroup: 'Bíceps', muscleSubGroup: 'Bíceps (ambas cabeças)', location: 'gym', equipment: ['Barra'], sets: 3, reps: '10-12', rest: 60, difficulty: 'beginner', contraindications: [], category: 'free-weight' },
  { id: 'g-biceps-4', name: 'Rosca alternada', muscleGroup: 'Bíceps', muscleSubGroup: 'Bíceps (ambas cabeças)', location: 'gym', equipment: ['Halteres'], sets: 3, reps: '12-15', rest: 60, difficulty: 'beginner', contraindications: [], category: 'free-weight' },
  { id: 'g-biceps-5', name: 'Rosca martelo', muscleGroup: 'Bíceps', muscleSubGroup: 'Braquial/braquiorradial', location: 'gym', equipment: ['Halteres'], sets: 3, reps: '12-15', rest: 60, difficulty: 'beginner', contraindications: [], category: 'free-weight' },
  { id: 'g-biceps-6', name: 'Rosca inversa', muscleGroup: 'Bíceps', muscleSubGroup: 'Braquiorradial/antebraço', location: 'gym', equipment: ['Barra'], sets: 3, reps: '12-15', rest: 60, difficulty: 'intermediate', contraindications: [], category: 'free-weight' },
  // Cabos
  { id: 'g-biceps-7', name: 'Rosca no cabo', muscleGroup: 'Bíceps', muscleSubGroup: 'Bíceps (ambas cabeças)', location: 'gym', equipment: ['Cabo'], sets: 3, reps: '12-15', rest: 60, difficulty: 'beginner', contraindications: [], category: 'cable' },
  { id: 'g-biceps-8', name: 'Rosca no pulley baixo', muscleGroup: 'Bíceps', muscleSubGroup: 'Bíceps (cabeça longa)', location: 'gym', equipment: ['Cabo'], sets: 3, reps: '12-15', rest: 60, difficulty: 'intermediate', contraindications: [], category: 'cable' },
  { id: 'g-biceps-9', name: 'Rosca unilateral cabo', muscleGroup: 'Bíceps', muscleSubGroup: 'Bíceps (isolamento)', location: 'gym', equipment: ['Cabo'], sets: 3, reps: '12-15', rest: 60, difficulty: 'intermediate', contraindications: [], category: 'cable' },
];

// TRÍCEPS (3 cabeças: longa, lateral, medial)
const gymTricepsExercises: Exercise[] = [
  // Máquina
  { id: 'g-triceps-1', name: 'Tríceps testa máquina', muscleGroup: 'Tríceps', muscleSubGroup: 'Tríceps (todas cabeças)', location: 'gym', equipment: ['Tríceps máquina'], sets: 3, reps: '12-15', rest: 60, difficulty: 'beginner', contraindications: [], category: 'machine' },
  { id: 'g-triceps-2', name: 'Tríceps mergulho máquina', muscleGroup: 'Tríceps', muscleSubGroup: 'Tríceps (todas cabeças)', location: 'gym', equipment: ['Mergulho máquina'], sets: 3, reps: '10-12', rest: 60, difficulty: 'intermediate', contraindications: [], category: 'machine' },
  // Pesos livres
  { id: 'g-triceps-3', name: 'Tríceps testa', muscleGroup: 'Tríceps', muscleSubGroup: 'Tríceps (cabeça longa)', location: 'gym', equipment: ['Barra/Halteres', 'Banco'], sets: 3, reps: '10-12', rest: 60, difficulty: 'intermediate', contraindications: [], category: 'free-weight' },
  { id: 'g-triceps-4', name: 'Tríceps francês', muscleGroup: 'Tríceps', muscleSubGroup: 'Tríceps (cabeça longa)', location: 'gym', equipment: ['Halter'], sets: 3, reps: '12-15', rest: 60, difficulty: 'intermediate', contraindications: [], category: 'free-weight' },
  { id: 'g-triceps-5', name: 'Tríceps coice', muscleGroup: 'Tríceps', muscleSubGroup: 'Tríceps (cabeça lateral)', location: 'gym', equipment: ['Halteres'], sets: 3, reps: '12-15', rest: 60, difficulty: 'beginner', contraindications: [], category: 'free-weight' },
  { id: 'g-triceps-6', name: 'Mergulho paralela', muscleGroup: 'Tríceps', muscleSubGroup: 'Tríceps (todas cabeças)', location: 'gym', equipment: ['Paralelas'], sets: 3, reps: '8-12', rest: 90, difficulty: 'intermediate', contraindications: ['ombro'], category: 'bodyweight' },
  // Cabos
  { id: 'g-triceps-7', name: 'Tríceps corda', muscleGroup: 'Tríceps', muscleSubGroup: 'Tríceps (cabeça lateral)', location: 'gym', equipment: ['Cabo'], sets: 3, reps: '12-15', rest: 60, difficulty: 'beginner', contraindications: [], category: 'cable' },
  { id: 'g-triceps-8', name: 'Tríceps barra reta', muscleGroup: 'Tríceps', muscleSubGroup: 'Tríceps (cabeça medial)', location: 'gym', equipment: ['Cabo'], sets: 3, reps: '12-15', rest: 60, difficulty: 'beginner', contraindications: [], category: 'cable' },
  { id: 'g-triceps-9', name: 'Tríceps invertido', muscleGroup: 'Tríceps', muscleSubGroup: 'Tríceps (cabeça medial)', location: 'gym', equipment: ['Cabo'], sets: 3, reps: '12-15', rest: 60, difficulty: 'intermediate', contraindications: [], category: 'cable' },
  { id: 'g-triceps-10', name: 'Tríceps unilateral', muscleGroup: 'Tríceps', muscleSubGroup: 'Tríceps (isolamento)', location: 'gym', equipment: ['Cabo'], sets: 3, reps: '12-15', rest: 60, difficulty: 'intermediate', contraindications: [], category: 'cable' },
];

// PERNAS (Quadríceps: 4 músculos / Posterior: isquiotibiais / Glúteos / Panturrilha)
const gymLegsExercises: Exercise[] = [
  // Máquinas
  { id: 'g-legs-1', name: 'Cadeira extensora', muscleGroup: 'Pernas', muscleSubGroup: 'Quadríceps (4 músculos)', location: 'gym', equipment: ['Cadeira extensora'], sets: 3, reps: '12-15', rest: 60, difficulty: 'beginner', contraindications: [], category: 'machine' },
  { id: 'g-legs-2', name: 'Cadeira flexora', muscleGroup: 'Pernas', muscleSubGroup: 'Posterior (isquiotibiais)', location: 'gym', equipment: ['Cadeira flexora'], sets: 3, reps: '12-15', rest: 60, difficulty: 'beginner', contraindications: [], category: 'machine' },
  { id: 'g-legs-3', name: 'Mesa flexora', muscleGroup: 'Pernas', muscleSubGroup: 'Posterior (isquiotibiais)', location: 'gym', equipment: ['Mesa flexora'], sets: 3, reps: '12-15', rest: 60, difficulty: 'beginner', contraindications: [], category: 'machine' },
  { id: 'g-legs-4', name: 'Leg press 45°', muscleGroup: 'Pernas', muscleSubGroup: 'Quadríceps/glúteos', location: 'gym', equipment: ['Leg press 45°'], sets: 4, reps: '12-15', rest: 90, difficulty: 'beginner', contraindications: [], category: 'machine' },
  { id: 'g-legs-5', name: 'Leg press horizontal', muscleGroup: 'Pernas', muscleSubGroup: 'Quadríceps/glúteos', location: 'gym', equipment: ['Leg press horizontal'], sets: 4, reps: '12-15', rest: 90, difficulty: 'beginner', contraindications: [], category: 'machine' },
  { id: 'g-legs-6', name: 'Hack machine', muscleGroup: 'Pernas', muscleSubGroup: 'Quadríceps (ênfase vasto lateral)', location: 'gym', equipment: ['Hack machine'], sets: 4, reps: '10-12', rest: 90, difficulty: 'intermediate', contraindications: [], category: 'machine' },
  { id: 'g-legs-7', name: 'Adutora', muscleGroup: 'Pernas', muscleSubGroup: 'Adutores (parte interna)', location: 'gym', equipment: ['Adutora'], sets: 3, reps: '15-20', rest: 60, difficulty: 'beginner', contraindications: [], category: 'machine' },
  { id: 'g-legs-8', name: 'Abdutora', muscleGroup: 'Pernas', muscleSubGroup: 'Abdutores/glúteo médio', location: 'gym', equipment: ['Abdutora'], sets: 3, reps: '15-20', rest: 60, difficulty: 'beginner', contraindications: [], category: 'machine' },
  { id: 'g-legs-9', name: 'Glúteo máquina', muscleGroup: 'Glúteos', muscleSubGroup: 'Glúteo máximo', location: 'gym', equipment: ['Glúteo máquina'], sets: 3, reps: '12-15', rest: 60, difficulty: 'beginner', contraindications: [], category: 'machine' },
  { id: 'g-legs-10', name: 'Panturrilha sentado/máquina', muscleGroup: 'Pernas', muscleSubGroup: 'Panturrilha (sóleo)', location: 'gym', equipment: ['Panturrilha máquina'], sets: 4, reps: '15-20', rest: 60, difficulty: 'beginner', contraindications: [], category: 'machine' },
  // Pesos livres
  { id: 'g-legs-11', name: 'Agachamento livre', muscleGroup: 'Pernas', muscleSubGroup: 'Quadríceps/glúteos', location: 'gym', equipment: ['Barra olímpica', 'Rack'], sets: 4, reps: '8-12', rest: 120, difficulty: 'intermediate', contraindications: ['joelho', 'lombar'], category: 'free-weight' },
  { id: 'g-legs-12', name: 'Agachamento frontal', muscleGroup: 'Pernas', muscleSubGroup: 'Quadríceps (ênfase vasto medial)', location: 'gym', equipment: ['Barra olímpica', 'Rack'], sets: 4, reps: '8-12', rest: 120, difficulty: 'advanced', contraindications: ['joelho'], category: 'free-weight' },
  { id: 'g-legs-13', name: 'Afundo', muscleGroup: 'Pernas', muscleSubGroup: 'Quadríceps/glúteos', location: 'gym', equipment: ['Halteres'], sets: 3, reps: '12-15', rest: 60, difficulty: 'intermediate', contraindications: ['joelho'], category: 'free-weight' },
  { id: 'g-legs-14', name: 'Avanço com halteres', muscleGroup: 'Pernas', muscleSubGroup: 'Quadríceps/glúteos', location: 'gym', equipment: ['Halteres'], sets: 3, reps: '12-15', rest: 60, difficulty: 'intermediate', contraindications: ['joelho'], category: 'free-weight' },
  { id: 'g-legs-15', name: 'Stiff', muscleGroup: 'Pernas', muscleSubGroup: 'Posterior (isquiotibiais)/glúteos', location: 'gym', equipment: ['Barra/Halteres'], sets: 3, reps: '10-12', rest: 90, difficulty: 'intermediate', contraindications: ['lombar'], category: 'free-weight' },
  { id: 'g-legs-16', name: 'Levantamento terra', muscleGroup: 'Pernas', muscleSubGroup: 'Posterior/glúteos/lombar', location: 'gym', equipment: ['Barra olímpica'], sets: 4, reps: '6-10', rest: 120, difficulty: 'advanced', contraindications: ['lombar', 'coluna'], category: 'free-weight' },
  { id: 'g-legs-17', name: 'Step-up', muscleGroup: 'Pernas', muscleSubGroup: 'Quadríceps/glúteos', location: 'gym', equipment: ['Banco', 'Halteres'], sets: 3, reps: '12-15', rest: 60, difficulty: 'intermediate', contraindications: [], category: 'free-weight' },
  // Cabos
  { id: 'g-legs-18', name: 'Extensão de quadril cabo', muscleGroup: 'Glúteos', muscleSubGroup: 'Glúteo máximo', location: 'gym', equipment: ['Cabo'], sets: 3, reps: '15-20', rest: 60, difficulty: 'beginner', contraindications: [], category: 'cable' },
  { id: 'g-legs-19', name: 'Abdução cabo', muscleGroup: 'Glúteos', muscleSubGroup: 'Glúteo médio', location: 'gym', equipment: ['Cabo'], sets: 3, reps: '15-20', rest: 60, difficulty: 'beginner', contraindications: [], category: 'cable' },
  { id: 'g-legs-20', name: 'Adução cabo', muscleGroup: 'Pernas', muscleSubGroup: 'Adutores (parte interna)', location: 'gym', equipment: ['Cabo'], sets: 3, reps: '15-20', rest: 60, difficulty: 'beginner', contraindications: [], category: 'cable' },
  { id: 'g-legs-21', name: 'Glúteo no cabo', muscleGroup: 'Glúteos', muscleSubGroup: 'Glúteo máximo', location: 'gym', equipment: ['Cabo'], sets: 3, reps: '15-20', rest: 60, difficulty: 'beginner', contraindications: [], category: 'cable' },
  { id: 'g-legs-22', name: 'Flexão de perna no cabo', muscleGroup: 'Pernas', muscleSubGroup: 'Posterior (isquiotibiais)', location: 'gym', equipment: ['Cabo'], sets: 3, reps: '12-15', rest: 60, difficulty: 'intermediate', contraindications: [], category: 'cable' },
];

// ABDÔMEN
const gymAbsExercises: Exercise[] = [
  // Máquinas
  { id: 'g-abs-1', name: 'Abdutora abdominal', muscleGroup: 'Abdômen', muscleSubGroup: 'Abdômen superior', location: 'gym', equipment: ['Abdominal máquina'], sets: 3, reps: '15-20', rest: 60, difficulty: 'beginner', contraindications: [], category: 'machine' },
  { id: 'g-abs-2', name: 'Crunch máquina', muscleGroup: 'Abdômen', muscleSubGroup: 'Abdômen superior', location: 'gym', equipment: ['Crunch máquina'], sets: 3, reps: '15-20', rest: 60, difficulty: 'beginner', contraindications: [], category: 'machine' },
  { id: 'g-abs-3', name: 'Rotação máquina', muscleGroup: 'Abdômen', muscleSubGroup: 'Oblíquos', location: 'gym', equipment: ['Rotação máquina'], sets: 3, reps: '15-20', rest: 60, difficulty: 'intermediate', contraindications: ['lombar'], category: 'machine' },
  // Pesos livres
  { id: 'g-abs-4', name: 'Crunch', muscleGroup: 'Abdômen', muscleSubGroup: 'Abdômen superior', location: 'gym', equipment: [], sets: 3, reps: '15-20', rest: 45, difficulty: 'beginner', contraindications: [], category: 'bodyweight' },
  { id: 'g-abs-5', name: 'Leg raise', muscleGroup: 'Abdômen', muscleSubGroup: 'Abdômen inferior', location: 'gym', equipment: [], sets: 3, reps: '12-15', rest: 60, difficulty: 'intermediate', contraindications: ['lombar'], category: 'bodyweight' },
  { id: 'g-abs-6', name: 'Abdominal infra', muscleGroup: 'Abdômen', muscleSubGroup: 'Abdômen inferior', location: 'gym', equipment: [], sets: 3, reps: '15-20', rest: 45, difficulty: 'beginner', contraindications: [], category: 'bodyweight' },
  { id: 'g-abs-7', name: 'Prancha', muscleGroup: 'Abdômen', muscleSubGroup: 'Core completo', location: 'gym', equipment: [], sets: 3, reps: '30-60s', rest: 60, difficulty: 'beginner', contraindications: [], category: 'bodyweight' },
  { id: 'g-abs-8', name: 'Elevação de pernas na barra', muscleGroup: 'Abdômen', muscleSubGroup: 'Abdômen inferior', location: 'gym', equipment: ['Barra fixa'], sets: 3, reps: '10-15', rest: 60, difficulty: 'advanced', contraindications: ['lombar'], category: 'bodyweight' },
  // Cabos
  { id: 'g-abs-9', name: 'Crunch no cabo', muscleGroup: 'Abdômen', muscleSubGroup: 'Abdômen superior', location: 'gym', equipment: ['Cabo'], sets: 3, reps: '15-20', rest: 60, difficulty: 'intermediate', contraindications: [], category: 'cable' },
  { id: 'g-abs-10', name: 'Lenhador (wood chop)', muscleGroup: 'Abdômen', muscleSubGroup: 'Oblíquos', location: 'gym', equipment: ['Cabo'], sets: 3, reps: '12-15', rest: 60, difficulty: 'intermediate', contraindications: [], category: 'cable' },
  { id: 'g-abs-11', name: 'Giro no cabo', muscleGroup: 'Abdômen', muscleSubGroup: 'Oblíquos', location: 'gym', equipment: ['Cabo'], sets: 3, reps: '15-20', rest: 60, difficulty: 'intermediate', contraindications: ['lombar'], category: 'cable' },
];

// ========================================
// CONSOLIDAÇÃO DO BANCO DE DADOS
// ========================================

export const exerciseDatabase: Exercise[] = [
  // EXERCÍCIOS DE CASA
  ...homeChestExercises,
  ...homeBackExercises,
  ...homeLegsExercises,
  ...homeGlutesExercises,
  ...homeShouldersExercises,
  ...homeArmsExercises,
  ...homeAbsExercises,
  // EXERCÍCIOS DE ACADEMIA
  ...gymChestExercises,
  ...gymBackExercises,
  ...gymShouldersExercises,
  ...gymBicepsExercises,
  ...gymTricepsExercises,
  ...gymLegsExercises,
  ...gymAbsExercises,
];

// ========================================
// EQUIPAMENTOS DISPONÍVEIS
// ========================================

export const gymEquipment = [
  'Esteira',
  'Bicicleta ergométrica',
  'Peck deck',
  'Puxada frente',
  'Supino máquina',
  'Cadeira extensora',
  'Cadeira flexora',
  'Leg press',
  'Smith Machine',
  'Crossover',
  'Halteres',
  'Barra olímpica',
  'Banco ajustável',
  'Rack de agachamento',
  'Cabos',
];

export const homeEquipment = [
  'Sem equipamento',
  'Halteres',
  'Elásticos',
  'Barra fixa',
  'Banco/cadeira',
  'Garrafa com água/areia',
  'Toalha',
  'Tapete',
];

// ========================================
// TAREFAS DIÁRIAS
// ========================================

export interface DailyTask {
  id: string;
  title: string;
  description: string;
  points: number;
  proofType: 'photo' | 'video' | 'check-in';
  completed: boolean;
}

export const dailyTasksTemplate: Omit<DailyTask, 'id' | 'completed'>[] = [
  {
    title: 'Complete seu treino',
    description: 'Finalize todos os exercícios programados para hoje',
    points: 50,
    proofType: 'photo'
  },
  {
    title: 'Beba 2L de água',
    description: 'Mantenha-se hidratado durante o dia',
    points: 20,
    proofType: 'check-in'
  },
  {
    title: 'Siga sua dieta',
    description: 'Cumpra todas as refeições planejadas',
    points: 30,
    proofType: 'photo'
  },
  {
    title: 'Durma 8 horas',
    description: 'Descanso é essencial para recuperação',
    points: 25,
    proofType: 'check-in'
  },
  {
    title: 'Alongamento',
    description: 'Faça 10 minutos de alongamento',
    points: 15,
    proofType: 'video'
  },
  {
    title: 'Cardio 20min',
    description: 'Caminhada, corrida ou bicicleta',
    points: 30,
    proofType: 'photo'
  }
];

// ========================================
// SISTEMA DE BADGES
// ========================================

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: number;
  type: 'streak' | 'points' | 'tasks';
}

export const badgeSystem: Badge[] = [
  { id: 'badge-1', name: 'Iniciante', description: 'Complete 7 dias consecutivos', icon: '🔥', requirement: 7, type: 'streak' },
  { id: 'badge-2', name: 'Dedicado', description: 'Complete 30 dias consecutivos', icon: '💪', requirement: 30, type: 'streak' },
  { id: 'badge-3', name: 'Guerreiro', description: 'Complete 100 tarefas', icon: '⚔️', requirement: 100, type: 'tasks' },
  { id: 'badge-4', name: 'Lendário', description: 'Alcance 1000 pontos', icon: '👑', requirement: 1000, type: 'points' },
  { id: 'badge-5', name: 'Imparável', description: 'Complete 90 dias consecutivos', icon: '🏆', requirement: 90, type: 'streak' },
  { id: 'badge-6', name: 'Mestre', description: 'Complete 500 tarefas', icon: '🎯', requirement: 500, type: 'tasks' },
];
