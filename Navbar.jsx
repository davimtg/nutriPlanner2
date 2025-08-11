import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Icon } from '../Icon.jsx';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { path: '/', label: 'Dashboard', icon: 'home' },
    { path: '/planner', label: 'Planejador', icon: 'calendar' },
    { path: '/recipes', label: 'Receitas', icon: 'book' },
    { path: '/smart-recipe', label: 'Sugestões IA', icon: 'brain' },
    { path: '/calculators', label: 'Calculadoras', icon: 'calculator' },
    { path: '/manage-data', label: 'Gerenciar Dados', icon: 'database' },
    { path: '/shopping-list', label: 'Lista de Compras', icon: 'shopping-cart' },
    { path: '/diet-history', label: 'Histórico', icon: 'history' },
    { path: '/plan-settings', label: 'Config. Plano', icon: 'settings' }
  ];

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-lg border-b border-slate-200 sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-700 transition-colors"
          >
            <span className="text-2xl">🥗</span>
            <span className="text-xl font-bold">NutriPlanner</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActiveLink(item.path)
                    ? 'bg-emerald-600 text-white'
                    : 'text-slate-600 hover:text-slate-800 hover:bg-slate-100'
                }`}
                aria-current={isActiveLink(item.path) ? 'page' : undefined}
              >
                <Icon name={item.icon} size={18} />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-800 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            aria-expanded={isMobileMenuOpen}
            aria-label="Abrir menu de navegação"
          >
            <Icon name="menu" size={24} />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-slate-200">
            <div className="space-y-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    isActiveLink(item.path)
                      ? 'bg-emerald-600 text-white'
                      : 'text-slate-600 hover:text-slate-800 hover:bg-slate-100'
                  }`}
                  aria-current={isActiveLink(item.path) ? 'page' : undefined}
                >
                  <Icon name={item.icon} size={20} />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

