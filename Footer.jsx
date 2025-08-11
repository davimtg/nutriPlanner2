const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <p className="text-slate-600 text-sm">
              © 2025 NutriPlanner. Todos os direitos reservados.
            </p>
          </div>
          <div className="text-center md:text-right">
            <p className="text-emerald-600 font-medium text-sm">
              Planeje sua dieta, viva melhor! 🌱
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

