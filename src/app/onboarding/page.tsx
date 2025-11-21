'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import { OnboardingData, ExperienceLevel, Goal, TrainingEnvironment, DietType } from '@/lib/types';
import { gymEquipment, homeEquipment, commonRestrictions, commonAllergies } from '@/lib/fitness-data';

const steps = [
  'Dados Pessoais',
  'Objetivos',
  'Recursos',
  'Rotina',
  'Saúde e Segurança',
  'Restrições Alimentares'
];

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<OnboardingData>>({
    availableEquipment: [],
    restDays: [],
    medicalRestrictions: [],
    injuries: [],
    allergies: [],
    foodRestrictions: [],
    goals: []
  });

  const updateFormData = (field: keyof OnboardingData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleArrayItem = (field: keyof OnboardingData, item: string) => {
    const currentArray = (formData[field] as string[]) || [];
    const newArray = currentArray.includes(item)
      ? currentArray.filter(i => i !== item)
      : [...currentArray, item];
    updateFormData(field, newArray);
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Salvar dados e redirecionar para dashboard
      localStorage.setItem('onboardingData', JSON.stringify(formData));
      router.push('/dashboard');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      router.push('/');
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return formData.age && formData.gender && formData.currentWeight && formData.targetWeight && formData.height && formData.experienceLevel;
      case 1:
        return formData.goals && formData.goals.length > 0;
      case 2:
        return formData.trainingEnvironment && formData.availableEquipment && formData.availableEquipment.length > 0;
      case 3:
        return formData.weeklyFrequency && formData.maxWorkoutDuration;
      case 4:
        return true; // Opcional
      case 5:
        return formData.dietType;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Vamos Personalizar Seu Plano
          </h1>
          <p className="text-gray-400">
            Passo {currentStep + 1} de {steps.length}: {steps[currentStep]}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            {steps.map((step, index) => (
              <div key={index} className="flex-1">
                <div className={`h-2 rounded-full transition-all duration-300 ${
                  index <= currentStep 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
                    : 'bg-white/10'
                }`} />
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8 mb-8">
          {/* Step 0: Dados Pessoais */}
          {currentStep === 0 && (
            <div className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Idade *
                  </label>
                  <input
                    type="number"
                    value={formData.age || ''}
                    onChange={(e) => updateFormData('age', parseInt(e.target.value))}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
                    placeholder="Ex: 25"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Sexo *
                  </label>
                  <select
                    value={formData.gender || ''}
                    onChange={(e) => updateFormData('gender', e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
                  >
                    <option value="">Selecione</option>
                    <option value="male">Masculino</option>
                    <option value="female">Feminino</option>
                    <option value="other">Outro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Peso Atual (kg) *
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.currentWeight || ''}
                    onChange={(e) => updateFormData('currentWeight', parseFloat(e.target.value))}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
                    placeholder="Ex: 75.5"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Peso Meta (kg) *
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.targetWeight || ''}
                    onChange={(e) => updateFormData('targetWeight', parseFloat(e.target.value))}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
                    placeholder="Ex: 70.0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Altura (cm) *
                  </label>
                  <input
                    type="number"
                    value={formData.height || ''}
                    onChange={(e) => updateFormData('height', parseInt(e.target.value))}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
                    placeholder="Ex: 175"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Nível de Experiência *
                  </label>
                  <select
                    value={formData.experienceLevel || ''}
                    onChange={(e) => updateFormData('experienceLevel', e.target.value as ExperienceLevel)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
                  >
                    <option value="">Selecione</option>
                    <option value="beginner">Iniciante</option>
                    <option value="intermediate">Intermediário</option>
                    <option value="advanced">Avançado</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 1: Objetivos */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-4">
                  Quais são seus objetivos? (Selecione um ou mais) *
                </label>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { value: 'hypertrophy', label: 'Hipertrofia (Ganho de Massa)', icon: '💪' },
                    { value: 'weight-loss', label: 'Emagrecimento', icon: '🔥' },
                    { value: 'definition', label: 'Definição Muscular', icon: '✨' },
                    { value: 'general-health', label: 'Saúde Geral', icon: '❤️' },
                    { value: 'performance', label: 'Performance Específica', icon: '🏃' }
                  ].map((goal) => (
                    <button
                      key={goal.value}
                      onClick={() => toggleArrayItem('goals', goal.value)}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                        formData.goals?.includes(goal.value as Goal)
                          ? 'border-purple-500 bg-purple-500/20'
                          : 'border-white/10 bg-white/5 hover:border-white/30'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{goal.icon}</span>
                        <span className="text-white font-medium">{goal.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Recursos */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-4">
                  Onde você vai treinar? *
                </label>
                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  <button
                    onClick={() => updateFormData('trainingEnvironment', 'gym')}
                    className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                      formData.trainingEnvironment === 'gym'
                        ? 'border-purple-500 bg-purple-500/20'
                        : 'border-white/10 bg-white/5 hover:border-white/30'
                    }`}
                  >
                    <div className="text-4xl mb-2">🏋️</div>
                    <div className="text-white font-semibold">Academia</div>
                  </button>
                  <button
                    onClick={() => updateFormData('trainingEnvironment', 'home')}
                    className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                      formData.trainingEnvironment === 'home'
                        ? 'border-purple-500 bg-purple-500/20'
                        : 'border-white/10 bg-white/5 hover:border-white/30'
                    }`}
                  >
                    <div className="text-4xl mb-2">🏠</div>
                    <div className="text-white font-semibold">Casa</div>
                  </button>
                </div>
              </div>

              {formData.trainingEnvironment && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-4">
                    Equipamentos Disponíveis *
                  </label>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {(formData.trainingEnvironment === 'gym' ? gymEquipment : homeEquipment).map((equipment) => (
                      <button
                        key={equipment}
                        onClick={() => toggleArrayItem('availableEquipment', equipment)}
                        className={`p-3 rounded-lg border transition-all duration-300 text-left ${
                          formData.availableEquipment?.includes(equipment)
                            ? 'border-purple-500 bg-purple-500/20 text-white'
                            : 'border-white/10 bg-white/5 text-gray-400 hover:text-white hover:border-white/30'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {formData.availableEquipment?.includes(equipment) && (
                            <CheckCircle className="w-4 h-4 text-purple-400" />
                          )}
                          <span className="text-sm">{equipment}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Rotina */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Frequência Semanal *
                  </label>
                  <select
                    value={formData.weeklyFrequency || ''}
                    onChange={(e) => updateFormData('weeklyFrequency', parseInt(e.target.value))}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
                  >
                    <option value="">Selecione</option>
                    <option value="3">3x por semana</option>
                    <option value="4">4x por semana</option>
                    <option value="5">5x por semana</option>
                    <option value="6">6x por semana</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Duração Máxima do Treino *
                  </label>
                  <select
                    value={formData.maxWorkoutDuration || ''}
                    onChange={(e) => updateFormData('maxWorkoutDuration', parseInt(e.target.value))}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
                  >
                    <option value="">Selecione</option>
                    <option value="45">45 minutos</option>
                    <option value="60">60 minutos</option>
                    <option value="75">75 minutos</option>
                    <option value="90">90 minutos</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-4">
                  Dias de Descanso Preferenciais
                </label>
                <div className="grid grid-cols-7 gap-2">
                  {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
                    <button
                      key={day}
                      onClick={() => toggleArrayItem('restDays', day)}
                      className={`p-3 rounded-lg border transition-all duration-300 ${
                        formData.restDays?.includes(day)
                          ? 'border-purple-500 bg-purple-500/20 text-white'
                          : 'border-white/10 bg-white/5 text-gray-400 hover:text-white hover:border-white/30'
                      }`}
                    >
                      <span className="text-xs font-medium">{day}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Saúde e Segurança */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-orange-200">
                  <strong>Importante:</strong> Informe todas as suas restrições médicas e lesões. 
                  O algoritmo irá excluir ou modificar exercícios que possam agravar essas condições.
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-4">
                  Restrições Médicas e Lesões
                </label>
                <div className="grid sm:grid-cols-2 gap-3">
                  {commonRestrictions.map((restriction) => (
                    <button
                      key={restriction}
                      onClick={() => toggleArrayItem('medicalRestrictions', restriction)}
                      className={`p-3 rounded-lg border transition-all duration-300 text-left ${
                        formData.medicalRestrictions?.includes(restriction)
                          ? 'border-orange-500 bg-orange-500/20 text-white'
                          : 'border-white/10 bg-white/5 text-gray-400 hover:text-white hover:border-white/30'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {formData.medicalRestrictions?.includes(restriction) && (
                          <AlertCircle className="w-4 h-4 text-orange-400" />
                        )}
                        <span className="text-sm">{restriction}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Outras Condições (opcional)
                </label>
                <textarea
                  value={formData.injuries?.join(', ') || ''}
                  onChange={(e) => updateFormData('injuries', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all resize-none"
                  rows={3}
                  placeholder="Descreva outras condições médicas ou lesões..."
                />
              </div>
            </div>
          )}

          {/* Step 5: Restrições Alimentares */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-4">
                  Tipo de Dieta *
                </label>
                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    { value: 'omnivore', label: 'Onívoro', icon: '🍖' },
                    { value: 'vegetarian', label: 'Vegetariano', icon: '🥗' },
                    { value: 'vegan', label: 'Vegano', icon: '🌱' }
                  ].map((diet) => (
                    <button
                      key={diet.value}
                      onClick={() => updateFormData('dietType', diet.value as DietType)}
                      className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                        formData.dietType === diet.value
                          ? 'border-purple-500 bg-purple-500/20'
                          : 'border-white/10 bg-white/5 hover:border-white/30'
                      }`}
                    >
                      <div className="text-4xl mb-2">{diet.icon}</div>
                      <div className="text-white font-semibold">{diet.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-4">
                  Alergias e Intolerâncias
                </label>
                <div className="grid sm:grid-cols-2 gap-3">
                  {commonAllergies.map((allergy) => (
                    <button
                      key={allergy}
                      onClick={() => toggleArrayItem('allergies', allergy)}
                      className={`p-3 rounded-lg border transition-all duration-300 text-left ${
                        formData.allergies?.includes(allergy)
                          ? 'border-red-500 bg-red-500/20 text-white'
                          : 'border-white/10 bg-white/5 text-gray-400 hover:text-white hover:border-white/30'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {formData.allergies?.includes(allergy) && (
                          <AlertCircle className="w-4 h-4 text-red-400" />
                        )}
                        <span className="text-sm">{allergy}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Outras Restrições Alimentares (opcional)
                </label>
                <textarea
                  value={formData.foodRestrictions?.join(', ') || ''}
                  onChange={(e) => updateFormData('foodRestrictions', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all resize-none"
                  rows={3}
                  placeholder="Ex: Não gosto de brócolis, evito carne vermelha..."
                />
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl font-semibold hover:bg-white/10 transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            {currentStep === 0 ? 'Voltar' : 'Anterior'}
          </button>

          <button
            onClick={handleNext}
            disabled={!isStepValid()}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              isStepValid()
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-xl hover:shadow-purple-500/50'
                : 'bg-white/5 text-gray-500 cursor-not-allowed'
            }`}
          >
            {currentStep === steps.length - 1 ? 'Gerar Meu Plano' : 'Próximo'}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
