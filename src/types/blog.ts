export interface BlogPost {
  _id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  slug: string;
  tags: string[];
  category: string;
  featured: boolean;
  published: boolean;
  content?: string;
}

export interface BlogFormData {
  title: string;
  content: any;
  excerpt: string;
  author: string;
  tags: string;
  category: string;
  featured: boolean;
  published: boolean;
}