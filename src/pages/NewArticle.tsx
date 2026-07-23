import { useState } from 'react';
import { ArticleForm } from '../components/ArticleForm';
import { articleService } from '../services/api';
import { ArticlePayload } from '../types';
import { useNavigate } from 'react-router-dom';

export const NewArticle = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (data: ArticlePayload) => {
    setLoading(true);
    try {
      await articleService.create(data);
      navigate('/');
    } catch {
      alert('Erro ao publicar o artigo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Criar Novo Artigo</h1>
      <ArticleForm submitLabel="Publicar Artigo" loading={loading} onSubmit={handleSubmit} />
    </div>
  );
};
