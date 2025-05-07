import { base_url } from '@/constants/utils';
import axios from 'axios';
import { BlogPost } from '@/types/blog';

export interface PaginatedResponse {
  total: number;
  page: number;
  pageSize: number;
  posts: BlogPost[];
}

const API_BASE = `${base_url}/blog`;

export const fetchBlogPosts = async (page = 1, limit = 10): Promise<PaginatedResponse> => {
  const res = await axios.get<PaginatedResponse>(`${API_BASE}?page=${page}&limit=${limit}`);
  return res.data;
};

export const fetchBlogPostById = async (id: string): Promise<BlogPost> => {
  const res = await axios.get<BlogPost>(`${API_BASE}/${id}`);
  return res.data;
};

export const createBlogPost = async (data: Omit<BlogPost, '_id'>): Promise<BlogPost> => {
  const res = await axios.post<BlogPost>(API_BASE, data);
  return res.data;
};

export const updateBlogPost = async (id: string, data: Partial<BlogPost>): Promise<BlogPost> => {
  const res = await axios.put<BlogPost>(`${API_BASE}/${id}`, data);
  return res.data;
};

export const deleteBlogPost = async (id: string): Promise<BlogPost> => {
  const res = await axios.delete<BlogPost>(`${API_BASE}/${id}`);
  return res.data;
};
