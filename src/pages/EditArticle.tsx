import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { ArticleForm } from '../components/ArticleForm';
import { articleService } from '../services/api';
import { ArticlePayload } from '../types';

export const EditArticle = () => {
  const { id } = useParams<{ id: string }>();
  const [initialValues, setInitialValues] = useState<ArticlePayload | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    articleService.getById(id)
      .then(({ data }) => setInitialValues({ title: data.title, content: data.content, image_url: data.image_url }))
      .catch(() => setError('Não foi possível carregar o artigo.'));
  }, [id]);

  const handleSubmit = async (data: ArticlePayload) => {
    if (!id) return;
    setLoading(true);
    setError('');
    try {
      await articleService.update(id, data);
      navigate(`/articles/${id}`);
    } catch (err) {
      setError(axios.isAxiosError(err) ? err.response?.data?.error || 'Erro ao atualizar artigo.' : 'Erro ao atualizar artigo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Editar Artigo</h1>
      {error && <p className="bg-red-50 text-red-600 p-3 rounded-lg mb-4">{error}</p>}
      {initialValues ? <ArticleForm initialValues={initialValues} submitLabel="Salvar alterações" loading={loading} onSubmit={handleSubmit} /> : !error && <p className="text-slate-500">Carregando artigo...</p>}
    </main>
  );
};
