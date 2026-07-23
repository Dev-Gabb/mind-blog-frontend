import { FormEvent, useState } from 'react';
import { ArticlePayload } from '../types';

interface ArticleFormProps {
  initialValues?: ArticlePayload;
  submitLabel: string;
  loading?: boolean;
  onSubmit: (data: ArticlePayload) => Promise<void>;
}

export const ArticleForm = ({
  initialValues = { title: '', content: '', image_url: '' },
  submitLabel,
  loading = false,
  onSubmit,
}: ArticleFormProps) => {
  const [title, setTitle] = useState(initialValues.title);
  const [content, setContent] = useState(initialValues.content);
  const [imageUrl, setImageUrl] = useState(initialValues.image_url || '');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await onSubmit({ title, content, image_url: imageUrl || undefined });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Título</label>
        <input type="text" value={title} onChange={(event) => setTitle(event.target.value)} required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none" />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">URL da Imagem de Capa</label>
        <input type="url" value={imageUrl} onChange={(event) => setImageUrl(event.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none" />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Conteúdo</label>
        <textarea value={content} onChange={(event) => setContent(event.target.value)} required rows={8} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none" />
      </div>
      <button type="submit" disabled={loading} className="w-full bg-red-600 text-white py-2 rounded-lg font-medium hover:bg-red-700 transition-colors disabled:opacity-50">
        {loading ? 'Salvando...' : submitLabel}
      </button>
    </form>
  );
};
