import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, PlusSquare, User as UserIcon } from 'lucide-react';

export const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-red-500 tracking-wider">
          MIND<span className="text-white">BLOG</span>
        </Link>

        <nav className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <Link 
                to="/new-article" 
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-medium text-sm transition-colors"
              >
                <PlusSquare size={18} />
                Novo Artigo
              </Link>
              <div className="flex items-center gap-2 text-slate-300 text-sm border-l border-slate-700 pl-4">
                <UserIcon size={16} />
                <span>{user?.name}</span>
              </div>
              <button 
                onClick={handleLogout} 
                className="text-slate-400 hover:text-red-400 p-2 transition-colors"
                title="Sair"
              >
                <LogOut size={18} />
              </button>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login" className="text-slate-300 hover:text-white text-sm px-3 py-2">
                Entrar
              </Link>
              <Link to="/register" className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded-lg font-medium">
                Criar Conta
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};
