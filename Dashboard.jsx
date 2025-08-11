import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../hooks/useData.js';
import { Icon } from '../components/Icon.jsx';
import DonutChart from '../components/charts/DonutChart.jsx';
import { NUTRIENT_LABELS, NUTRIENT_UNITS } from '../types/index.js';

const Dashboard = () => {
  const { getDailyNutrients, getMealsForDate, goals } = useData();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const dailyNutrients = getDailyNutrients(selectedDate);
  const meals = getMealsForDate(selectedDate);

  // Quick actions data
  const quickActions = [
    {
      title: 'Planejar Refeições',
      description: 'Organize suas refeições do dia',
      icon: 'calendar',
      link: '/planner',
      color: 'bg-emerald-500'
    },
    {
      title: 'Adicionar Receita',
      description: 'Crie uma nova receita',
      icon: 'plus',
      link: '/recipes',
      color: 'bg-blue-500'
    },
    {
      title: 'Lista de Compras',
      description: 'Gere sua lista de compras',
      icon: 'shopping-cart',
      link: '/shopping-list',
      color: 'bg-orange-500'
    },
    {
      title: 'Sugestões IA',
      description: 'Receba sugestões inteligentes',
      icon: 'brain',
      link: '/smart-recipe',
      color: 'bg-purple-500'
    }
  ];

  // Macronutrients data for donut chart
  const macroData = [
    {
      name: 'Proteína',
      value: dailyNutrients.protein,
      unit: 'g',
      total: dailyNutrients.protein + dailyNutrients.carbs + dailyNutrients.fat
    },
    {
      name: 'Carboidratos',
      value: dailyNutrients.carbs,
      unit: 'g',
      total: dailyNutrients.protein + dailyNutrients.carbs + dailyNutrients.fat
    },
    {
      name: 'Gordura',
      value: dailyNutrients.fat,
      unit: 'g',
      total: dailyNutrients.protein + dailyNutrients.carbs + dailyNutrients.fat
    }
  ].filter(item => item.value > 0);

  // Progress calculation
  const getProgress = (current, goal) => {
    if (!goal) return 0;
    return Math.min((current / goal) * 100, 100);
  };

  const getProgressColor = (progress) => {
    if (progress >= 90) return 'bg-emerald-500';
    if (progress >= 70) return 'bg-orange-500';
    return 'bg-slate-300';
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getTotalMealItems = () => {
    return Object.values(meals).reduce((total, mealItems) => total + mealItems.length, 0);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-slate-800 mb-2">
          Bem-vindo ao NutriPlanner
        </h1>
        <p className="text-slate-600 text-lg">
          Seu painel de controle para uma alimentação saudável e organizada
        </p>
      </div>

      {/* Date Selector */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-slate-700">
            Resumo do Dia
          </h2>
          <input
            type="date"
            value={selectedDate.toISOString().split('T')[0]}
            onChange={(e) => setSelectedDate(new Date(e.target.value))}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
        <p className="text-slate-600 capitalize">
          {formatDate(selectedDate)}
        </p>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-slate-700 mb-6">
          Ações Rápidas
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              to={action.link}
              className="group p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-105 transition-transform`}>
                <Icon name={action.icon} size={24} className="text-white" />
              </div>
              <h3 className="font-semibold text-slate-800 mb-1">
                {action.title}
              </h3>
              <p className="text-sm text-slate-600">
                {action.description}
              </p>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Nutrition Overview */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-slate-700 mb-6">
            Resumo Nutricional
          </h2>
          
          {macroData.length > 0 ? (
            <div className="flex flex-col items-center">
              <DonutChart
                data={macroData}
                colors={['#3B82F6', '#F97316', '#10B981']}
                size={250}
                centerText={
                  <div>
                    <p className="text-2xl font-bold text-slate-800">
                      {Math.round(dailyNutrients.calories)}
                    </p>
                    <p className="text-sm text-slate-600">kcal</p>
                  </div>
                }
              />
              
              {/* Progress bars for main nutrients */}
              <div className="w-full mt-6 space-y-4">
                {['calories', 'protein', 'carbs', 'fat'].map((nutrient) => {
                  const current = dailyNutrients[nutrient];
                  const goal = goals[nutrient];
                  const progress = getProgress(current, goal);
                  
                  return (
                    <div key={nutrient}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-700 font-medium">
                          {NUTRIENT_LABELS[nutrient]}
                        </span>
                        <span className="text-slate-600">
                          {Math.round(current)}/{goal} {NUTRIENT_UNITS[nutrient]}
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(progress)}`}
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <Icon name="pie-chart" size={48} className="text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 mb-4">
                Nenhuma refeição planejada para hoje
              </p>
              <Link
                to="/planner"
                className="inline-flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
              >
                <Icon name="plus" size={16} />
                <span>Planejar Refeições</span>
              </Link>
            </div>
          )}
        </div>

        {/* Today's Meals */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-slate-700">
              Refeições de Hoje
            </h2>
            <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium">
              {getTotalMealItems()} itens
            </span>
          </div>

          {getTotalMealItems() > 0 ? (
            <div className="space-y-4">
              {Object.entries(meals).map(([mealType, mealItems]) => {
                if (mealItems.length === 0) return null;
                
                const mealLabels = {
                  breakfast: 'Café da Manhã',
                  lunch: 'Almoço',
                  dinner: 'Jantar',
                  snack: 'Lanche'
                };

                return (
                  <div key={mealType} className="border border-slate-200 rounded-lg p-4">
                    <h3 className="font-semibold text-slate-800 mb-2">
                      {mealLabels[mealType]} ({mealItems.length})
                    </h3>
                    <div className="space-y-2">
                      {mealItems.slice(0, 3).map((item, index) => (
                        <div key={index} className="flex items-center space-x-2 text-sm">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                          <span className="text-slate-600">
                            {item.name} - {item.quantity || item.servings}
                            {item.type === 'ingredient' ? 'g' : ' porções'}
                          </span>
                        </div>
                      ))}
                      {mealItems.length > 3 && (
                        <p className="text-xs text-slate-500 ml-4">
                          +{mealItems.length - 3} mais itens
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
              
              <Link
                to="/planner"
                className="block w-full text-center py-3 border-2 border-dashed border-slate-300 rounded-lg text-slate-600 hover:border-emerald-500 hover:text-emerald-600 transition-colors"
              >
                Ver Planejador Completo
              </Link>
            </div>
          ) : (
            <div className="text-center py-12">
              <Icon name="calendar" size={48} className="text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 mb-4">
                Nenhuma refeição planejada
              </p>
              <Link
                to="/planner"
                className="inline-flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
              >
                <Icon name="plus" size={16} />
                <span>Adicionar Refeição</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

