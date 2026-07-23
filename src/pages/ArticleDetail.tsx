import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { articleService } from '../services/api';
import { Article } from '../types';
import { useAuth } from '../contexts/AuthContext';

export const ArticleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!id) return;
    articleService.getById(id)
      .then((response) => setArticle(response.data))
      .catch(() => setError('Artigo não encontrado.'));
  }, [id]);

  const handleDelete = async () => {
    if (!id || !window.confirm('Deseja realmente excluir este artigo?')) return;
    try {
      await articleService.remove(id);
      navigate('/');
    } catch {
      setError('Não foi possível excluir o artigo.');
    }
  };

  if (error) return <p className="max-w-4xl mx-auto px-4 py-12 text-center text-red-600">{error}</p>;
  if (!article) return <p className="max-w-4xl mx-auto px-4 py-12 text-center text-slate-500">Carregando artigo...</p>;

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <button onClick={() => navigate(-1)} className="text-red-600 hover:underline mb-6">← Voltar</button>
      {article.image_url && <img src={article.image_url} alt={article.title} className="w-full max-h-96 object-cover rounded-2xl mb-6" />}
      <h1 className="text-4xl font-bold text-slate-900 mb-3">{article.title}</h1>
      <p className="text-sm text-slate-500 mb-8">Por {article.author_name} · {new Date(article.created_at).toLocaleDateString('pt-BR')}</p>
      <p className="text-lg text-slate-700 whitespace-pre-wrap leading-relaxed">{article.content}</p>
      {user?.id === article.author_id && (
        <div className="flex gap-3 mt-8">
          <Link to={`/articles/${article.id}/edit`} className="bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-700">Editar</Link>
          <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">Excluir</button>
        </div>
      )}
      <Link to="/" className="inline-block mt-8 text-red-600 hover:underline">Ver todos os artigos</Link>
    </main>
  );
};
