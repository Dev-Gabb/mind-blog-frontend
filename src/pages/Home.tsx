import { SyntheticEvent, useEffect, useState } from 'react';
import { Article } from '../types';
import { articleService } from '../services/api';
import { Link } from 'react-router-dom';

const FALLBACK_IMAGE_URL =
  'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&auto=format&fit=crop&q=60';

const handleImageError = (event: SyntheticEvent<HTMLImageElement>) => {
  const img = event.currentTarget;
  if (img.src !== FALLBACK_IMAGE_URL) {
    img.src = FALLBACK_IMAGE_URL;
  }
};

export const Home = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await articleService.list();
        setArticles(response.data);
      } catch {
        setError('Erro ao carregar artigos.');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center text-slate-500">
        Carregando artigos...
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Artigos recentes</h1>

      {articles.length === 0 ? (
        <p className="text-slate-500 text-center py-12">
          Nenhum artigo publicado ainda.
        </p>
      ) : (
        <div className="space-y-6">
          {articles.map((article) => (
            <article
              key={article.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
            >
              {article.image_url && (
                <img
                  src={article.image_url}
                  alt={article.title}
                  loading="lazy"
                  onError={handleImageError}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <Link to={`/articles/${article.id}`} className="text-xl font-bold text-slate-900 mb-2 hover:text-red-600 block">
                  {article.title}
                </Link>
                <p className="text-sm text-slate-500 mb-4">
                  Por {article.author_name} ·{' '}
                  {new Date(article.created_at).toLocaleDateString('pt-BR')}
                </p>
                <p className="text-slate-700 whitespace-pre-wrap">{article.content}</p>
                <Link to={`/articles/${article.id}`} className="inline-block mt-4 text-red-600 font-medium hover:underline">Ler artigo completo</Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
};
