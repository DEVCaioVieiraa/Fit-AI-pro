'use client';

import { useState } from 'react';
import { 
  Users, 
  Plus, 
  Search, 
  TrendingUp, 
  MessageSquare, 
  Edit, 
  Eye,
  Calendar,
  Activity,
  Target,
  Award,
  ChevronRight,
  Filter,
  MoreVertical,
  Dumbbell,
  Apple
} from 'lucide-react';

interface Client {
  id: string;
  name: string;
  email: string;
  avatar: string;
  goal: string;
  progress: number;
  lastWorkout: string;
  streak: number;
  status: 'active' | 'inactive';
}

export default function PTDashboardPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'clients' | 'analytics'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  // Mock data - em produção viria do backend
  const clients: Client[] = [
    {
      id: '1',
      name: 'João Silva',
      email: 'joao@email.com',
      avatar: '👨',
      goal: 'Hipertrofia',
      progress: 75,
      lastWorkout: 'Hoje',
      streak: 15,
      status: 'active'
    },
    {
      id: '2',
      name: 'Maria Santos',
      email: 'maria@email.com',
      avatar: '👩',
      goal: 'Emagrecimento',
      progress: 60,
      lastWorkout: 'Ontem',
      streak: 8,
      status: 'active'
    },
    {
      id: '3',
      name: 'Pedro Costa',
      email: 'pedro@email.com',
      avatar: '👨‍🦱',
      goal: 'Definição',
      progress: 45,
      lastWorkout: '2 dias atrás',
      streak: 5,
      status: 'active'
    },
    {
      id: '4',
      name: 'Ana Lima',
      email: 'ana@email.com',
      avatar: '👩‍🦰',
      goal: 'Saúde Geral',
      progress: 90,
      lastWorkout: 'Hoje',
      streak: 30,
      status: 'active'
    }
  ];

  const stats = {
    totalClients: clients.length,
    activeClients: clients.filter(c => c.status === 'active').length,
    avgProgress: Math.round(clients.reduce((acc, c) => acc + c.progress, 0) / clients.length),
    totalWorkouts: 156
  };

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      {/* Header */}
      <header className="bg-slate-950/80 backdrop-blur-lg border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Dashboard PT Pro</h1>
                <p className="text-sm text-gray-400">Gerencie seus clientes</p>
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300">
              <Plus className="w-5 h-5" />
              Novo Cliente
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-slate-900/50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1">
            {[
              { id: 'overview', label: 'Visão Geral', icon: Activity },
              { id: 'clients', label: 'Clientes', icon: Users },
              { id: 'analytics', label: 'Análises', icon: TrendingUp }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-all duration-300 ${
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
                  <Users className="w-8 h-8 text-purple-400" />
                  <span className="text-2xl font-bold text-white">{stats.totalClients}</span>
                </div>
                <div className="text-sm text-gray-300">Total de Clientes</div>
              </div>

              <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <Activity className="w-8 h-8 text-green-400" />
                  <span className="text-2xl font-bold text-white">{stats.activeClients}</span>
                </div>
                <div className="text-sm text-gray-300">Clientes Ativos</div>
              </div>

              <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <Target className="w-8 h-8 text-blue-400" />
                  <span className="text-2xl font-bold text-white">{stats.avgProgress}%</span>
                </div>
                <div className="text-sm text-gray-300">Progresso Médio</div>
              </div>

              <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <Dumbbell className="w-8 h-8 text-orange-400" />
                  <span className="text-2xl font-bold text-white">{stats.totalWorkouts}</span>
                </div>
                <div className="text-sm text-gray-300">Treinos Este Mês</div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Atividade Recente</h2>
              <div className="space-y-4">
                {clients.slice(0, 5).map((client) => (
                  <div key={client.id} className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300">
                    <div className="text-3xl">{client.avatar}</div>
                    <div className="flex-1">
                      <div className="text-white font-semibold">{client.name}</div>
                      <div className="text-sm text-gray-400">Completou treino - {client.lastWorkout}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 bg-purple-500/20 border border-purple-500/50 text-purple-300 rounded-lg hover:bg-purple-500/30 transition-all duration-300">
                        <MessageSquare className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-blue-500/20 border border-blue-500/50 text-blue-300 rounded-lg hover:bg-blue-500/30 transition-all duration-300">
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <button className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-6 text-left hover:border-purple-500 transition-all duration-300 group">
                <Dumbbell className="w-8 h-8 text-purple-400 mb-3" />
                <h3 className="text-lg font-bold text-white mb-2">Criar Treino</h3>
                <p className="text-sm text-gray-400 mb-4">
                  Crie um treino personalizado para seus clientes
                </p>
                <div className="flex items-center gap-2 text-purple-400 group-hover:gap-3 transition-all duration-300">
                  <span className="text-sm font-medium">Começar</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </button>

              <button className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl p-6 text-left hover:border-green-500 transition-all duration-300 group">
                <Apple className="w-8 h-8 text-green-400 mb-3" />
                <h3 className="text-lg font-bold text-white mb-2">Criar Dieta</h3>
                <p className="text-sm text-gray-400 mb-4">
                  Monte um plano alimentar customizado
                </p>
                <div className="flex items-center gap-2 text-green-400 group-hover:gap-3 transition-all duration-300">
                  <span className="text-sm font-medium">Começar</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </button>

              <button className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-xl p-6 text-left hover:border-blue-500 transition-all duration-300 group">
                <Calendar className="w-8 h-8 text-blue-400 mb-3" />
                <h3 className="text-lg font-bold text-white mb-2">Agendar Avaliação</h3>
                <p className="text-sm text-gray-400 mb-4">
                  Marque avaliações físicas com clientes
                </p>
                <div className="flex items-center gap-2 text-blue-400 group-hover:gap-3 transition-all duration-300">
                  <span className="text-sm font-medium">Agendar</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Clients Tab */}
        {activeTab === 'clients' && (
          <div className="space-y-6">
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar clientes..."
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-3 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 transition-all duration-300">
                <Filter className="w-5 h-5" />
                Filtros
              </button>
            </div>

            {/* Clients Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredClients.map((client) => (
                <div 
                  key={client.id}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedClient(client)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="text-4xl">{client.avatar}</div>
                      <div>
                        <h3 className="text-white font-semibold">{client.name}</h3>
                        <p className="text-sm text-gray-400">{client.email}</p>
                      </div>
                    </div>
                    <button className="p-2 hover:bg-white/10 rounded-lg transition-all duration-300">
                      <MoreVertical className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Objetivo:</span>
                      <span className="text-white font-medium">{client.goal}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Último treino:</span>
                      <span className="text-white font-medium">{client.lastWorkout}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Sequência:</span>
                      <span className="text-orange-400 font-medium">🔥 {client.streak} dias</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-400">Progresso</span>
                      <span className="text-white font-semibold">{client.progress}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${client.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-purple-500/20 border border-purple-500/50 text-purple-300 rounded-lg hover:bg-purple-500/30 transition-all duration-300">
                      <Edit className="w-4 h-4" />
                      <span className="text-sm font-medium">Editar</span>
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-500/20 border border-blue-500/50 text-blue-300 rounded-lg hover:bg-blue-500/30 transition-all duration-300">
                      <MessageSquare className="w-4 h-4" />
                      <span className="text-sm font-medium">Chat</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Análises e Relatórios</h2>

            {/* Performance Overview */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold">Taxa de Adesão</h3>
                  <TrendingUp className="w-5 h-5 text-purple-400" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">87%</div>
                <div className="text-sm text-gray-400">+5% vs mês anterior</div>
              </div>

              <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold">Satisfação</h3>
                  <Award className="w-5 h-5 text-green-400" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">4.8/5</div>
                <div className="text-sm text-gray-400">Baseado em 24 avaliações</div>
              </div>

              <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold">Retenção</h3>
                  <Users className="w-5 h-5 text-blue-400" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">92%</div>
                <div className="text-sm text-gray-400">Últimos 6 meses</div>
              </div>
            </div>

            {/* Top Performers */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Melhores Desempenhos</h3>
              <div className="space-y-4">
                {clients
                  .sort((a, b) => b.progress - a.progress)
                  .slice(0, 5)
                  .map((client, index) => (
                    <div key={client.id} className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-sm">
                        {index + 1}
                      </div>
                      <div className="text-3xl">{client.avatar}</div>
                      <div className="flex-1">
                        <div className="text-white font-semibold">{client.name}</div>
                        <div className="text-sm text-gray-400">{client.goal}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-white">{client.progress}%</div>
                        <div className="text-xs text-gray-400">progresso</div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Monthly Trends */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Tendências Mensais</h3>
              <div className="h-64 flex items-end justify-between gap-2">
                {[65, 72, 68, 78, 85, 82, 90, 87, 92, 88, 95, 93].map((value, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2">
                    <div 
                      className="w-full bg-gradient-to-t from-purple-500 to-pink-500 rounded-t-lg transition-all duration-500 hover:opacity-80"
                      style={{ height: `${value}%` }}
                    />
                    <div className="text-xs text-gray-400">
                      {['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'][index]}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
