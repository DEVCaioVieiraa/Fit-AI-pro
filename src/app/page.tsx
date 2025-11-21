'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Dumbbell, Brain, Trophy, Users, CheckCircle, Zap, Shield, TrendingUp, Star, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  const [selectedPlan, setSelectedPlan] = useState<'client' | 'pt'>('client');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      {/* Header/Navigation */}
      <nav className="fixed top-0 w-full bg-slate-950/80 backdrop-blur-lg border-b border-purple-500/20 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg">
                <Dumbbell className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                FitAI Pro
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link 
                href="/onboarding"
                className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
              >
                Começar Agora
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 rounded-full px-4 py-2 mb-8">
            <Zap className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-300">Powered by AI • Baseado em Ciência</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6">
            Seu Personal Trainer
            <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              Movido por IA
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Planos personalizados de treino e nutrição gerados por inteligência artificial, 
            adaptados às suas necessidades, objetivos e restrições médicas.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link 
              href="/onboarding"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Iniciar Teste Grátis (7 dias)
              <ArrowRight className="w-5 h-5" />
            </Link>
            <button className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 text-white rounded-xl font-semibold text-lg hover:bg-white/10 transition-all duration-300">
              Ver Demonstração
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { value: '50k+', label: 'Usuários Ativos' },
              { value: '1M+', label: 'Treinos Gerados' },
              { value: '98%', label: 'Satisfação' },
              { value: '24/7', label: 'Suporte IA' }
            ].map((stat, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Recursos Inteligentes
            </h2>
            <p className="text-xl text-gray-400">
              Tecnologia de ponta para resultados reais
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: 'IA Personalizada',
                description: 'Algoritmo avançado que cria planos únicos baseados em seus dados, objetivos e restrições médicas.'
              },
              {
                icon: Shield,
                title: 'Segurança Primeiro',
                description: 'Sistema inteligente que exclui exercícios perigosos baseado em suas lesões e condições médicas.'
              },
              {
                icon: Trophy,
                title: 'Gamificação',
                description: 'Sistema de pontos, badges e níveis que torna sua jornada fitness divertida e motivadora.'
              },
              {
                icon: TrendingUp,
                title: 'Progresso Adaptativo',
                description: 'Planos que evoluem com você, aplicando sobrecarga progressiva baseada em ciência.'
              },
              {
                icon: Users,
                title: 'Dashboard PT',
                description: 'Plataforma completa para Personal Trainers gerenciarem múltiplos clientes.'
              },
              {
                icon: CheckCircle,
                title: 'Comprovação Visual',
                description: 'Envie fotos e vídeos das refeições e exercícios para validar suas tarefas diárias.'
              }
            ].map((feature, i) => (
              <div 
                key={i}
                className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300 group"
              >
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Como Funciona
            </h2>
            <p className="text-xl text-gray-400">
              Simples, rápido e eficiente
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Onboarding', description: 'Responda perguntas sobre seus objetivos, experiência e restrições médicas.' },
              { step: '2', title: 'IA Gera Plano', description: 'Algoritmo cria treino e dieta personalizados em segundos.' },
              { step: '3', title: 'Execute & Comprove', description: 'Siga o plano e complete tarefas diárias com comprovação visual.' },
              { step: '4', title: 'Evolua', description: 'Ganhe pontos, badges e veja seu plano se adaptar ao seu progresso.' }
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-2xl p-8 text-center">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto mb-6">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </div>
                {i < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-purple-500/50" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Planos para Todos
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Escolha o plano ideal para você
            </p>
            
            <div className="inline-flex bg-white/5 border border-white/10 rounded-xl p-1">
              <button
                onClick={() => setSelectedPlan('client')}
                className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  selectedPlan === 'client'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Para Você
              </button>
              <button
                onClick={() => setSelectedPlan('pt')}
                className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  selectedPlan === 'pt'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Para Personal Trainers
              </button>
            </div>
          </div>

          {selectedPlan === 'client' ? (
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Free Trial */}
              <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">Teste Grátis</h3>
                  <div className="text-5xl font-bold text-white mb-2">R$ 0</div>
                  <p className="text-gray-400">7 dias completos</p>
                </div>
                <ul className="space-y-4 mb-8">
                  {[
                    'Plano de treino personalizado',
                    'Plano de nutrição completo',
                    'Sistema de gamificação',
                    'Tarefas diárias',
                    'Suporte por email'
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-300">
                      <CheckCircle className="w-5 h-5 text-purple-400 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link 
                  href="/onboarding"
                  className="block w-full py-3 bg-white/10 border border-white/20 text-white rounded-xl font-semibold text-center hover:bg-white/20 transition-all duration-300"
                >
                  Começar Teste
                </Link>
              </div>

              {/* Premium */}
              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-2 border-purple-500 rounded-2xl p-8 relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-1 rounded-full text-sm font-bold text-white flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    Mais Popular
                  </div>
                </div>
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">Premium</h3>
                  <div className="text-5xl font-bold text-white mb-2">R$ 49</div>
                  <p className="text-gray-400">por mês</p>
                </div>
                <ul className="space-y-4 mb-8">
                  {[
                    'Tudo do Teste Grátis',
                    'Planos ilimitados',
                    'Edição completa de treinos',
                    'Upload de dieta personalizada',
                    'Análise de fotos com IA',
                    'Conexão com wearables',
                    'Suporte prioritário 24/7'
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-300">
                      <CheckCircle className="w-5 h-5 text-purple-400 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link 
                  href="/onboarding"
                  className="block w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold text-center hover:shadow-xl hover:shadow-purple-500/50 transition-all duration-300"
                >
                  Assinar Premium
                </Link>
              </div>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto">
              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-2 border-purple-500 rounded-2xl p-8">
                <div className="text-center mb-8">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">PT Pro</h3>
                  <div className="text-5xl font-bold text-white mb-2">R$ 149</div>
                  <p className="text-gray-400">por mês</p>
                </div>
                <ul className="space-y-4 mb-8">
                  {[
                    'Dashboard completo de gestão',
                    'Até 50 clientes ativos',
                    'Criação de treinos customizados',
                    'Criação de dietas customizadas',
                    'Acompanhamento em tempo real',
                    'Histórico completo de progresso',
                    'Chat interno com clientes',
                    'Relatórios e análises',
                    'Suporte dedicado'
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-300">
                      <CheckCircle className="w-5 h-5 text-purple-400 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link 
                  href="/pt-dashboard"
                  className="block w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold text-center hover:shadow-xl hover:shadow-purple-500/50 transition-all duration-300"
                >
                  Começar como PT
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Pronto para Transformar
            <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Seu Corpo e Mente?
            </span>
          </h2>
          <p className="text-xl text-gray-400 mb-12">
            Junte-se a milhares de pessoas que já estão alcançando seus objetivos com FitAI Pro
          </p>
          <Link 
            href="/onboarding"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300"
          >
            Começar Agora - 7 Dias Grátis
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg">
                  <Dumbbell className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold text-white">FitAI Pro</span>
              </div>
              <p className="text-gray-400 text-sm">
                Seu personal trainer movido por IA, disponível 24/7.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Produto</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-purple-400 transition-colors">Recursos</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Preços</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-purple-400 transition-colors">Sobre</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Contato</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-purple-400 transition-colors">Privacidade</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Termos</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">LGPD</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-gray-400 text-sm">
            <p className="mb-2">
              ⚠️ <strong>Aviso Legal:</strong> Este aplicativo não substitui o conselho médico, nutricional ou de educador físico profissional. 
              Consulte sempre um profissional de saúde antes de iniciar qualquer programa de exercícios ou dieta.
            </p>
            <p>© 2024 FitAI Pro. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
