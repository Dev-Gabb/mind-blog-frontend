import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { NewArticle } from './pages/NewArticle';
import { ArticleDetail } from './pages/ArticleDetail';
import { EditArticle } from './pages/EditArticle';
import { ProtectedRoute } from './components/ProtectedRoute';

export default function App() {
  return (
    <AuthProvider>
      <Router
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <div className="min-h-screen bg-slate-50 text-slate-800">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/articles/:id" element={<ArticleDetail />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/new-article" element={<NewArticle />} />
              <Route path="/articles/:id/edit" element={<EditArticle />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}
