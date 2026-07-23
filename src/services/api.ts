import axios from 'axios';
import { Article, ArticlePayload } from '../types';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('@MindBlog:token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const articleService = {
  list: () => api.get<Article[]>('/articles'),
  getById: (id: number | string) => api.get<Article>(`/articles/${id}`),
  create: (data: ArticlePayload) => api.post('/articles', data),
  update: (id: number | string, data: ArticlePayload) => api.put(`/articles/${id}`, data),
  remove: (id: number | string) => api.delete(`/articles/${id}`),
};
