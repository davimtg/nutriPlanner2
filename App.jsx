import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout.jsx';
import { ToastContainer } from './components/ui/Toast.jsx';
import { useToast } from './hooks/useToast.js';
import Dashboard from './pages/Dashboard.jsx';
import './App.css';

// Placeholder components for other pages
const PlaceholderPage = ({ title }) => (
  <div className="text-center py-12">
    <h1 className="text-3xl font-bold text-slate-800 mb-4">{title}</h1>
    <p className="text-slate-600">Esta página está em desenvolvimento.</p>
  </div>
);

function App() {
  const { toasts, removeToast } = useToast();

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/planner" element={<PlaceholderPage title="Planejador de Refeições" />} />
          <Route path="/recipes" element={<PlaceholderPage title="Biblioteca de Receitas" />} />
          <Route path="/recipe/:id" element={<PlaceholderPage title="Detalhes da Receita" />} />
          <Route path="/smart-recipe" element={<PlaceholderPage title="Sugestões com IA" />} />
          <Route path="/calculators" element={<PlaceholderPage title="Calculadoras Nutricionais" />} />
          <Route path="/manage-data" element={<PlaceholderPage title="Gerenciar Dados" />} />
          <Route path="/shopping-list" element={<PlaceholderPage title="Lista de Compras" />} />
          <Route path="/shopping-list-sheet" element={<PlaceholderPage title="Planilha de Compras" />} />
          <Route path="/diet-history" element={<PlaceholderPage title="Histórico de Dietas" />} />
          <Route path="/plan-settings" element={<PlaceholderPage title="Configurações do Plano" />} />
        </Routes>
      </Layout>
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </Router>
  );
}

export default App;

