export interface User {
    id: number;
    name: string;
    email: string;
  }
  
  export interface Article {
    id: number;
    title: string;
    content: string;
    image_url?: string;
    created_at: string;
    updated_at: string;
    author_id: number;
    author_name: string;
    author_email: string;
  }

  export type ArticlePayload = Pick<Article, 'title' | 'content'> & {
    image_url?: string;
  };
  
  export interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (data: { email: string; password: string }) => Promise<void>;
    register: (data: { name: string; email: string; password: string }) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
  }
  