"use client"
import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { BlogFormData } from '../../../../types/blog';
import { createBlogPost } from '@/helpers/blogStorage';
import BlogForm from '@/components/Blog/BlogForm';
import Link from 'next/link';
import { Header } from '@/components/Header';


const Page = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const navigate = useRouter();
  
  const handleSubmit = async (formData: BlogFormData) => {
    setIsSubmitting(true);
    
    try {
      // Convert comma-separated tags to array
      const tags = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);
      
      // Create the blog post
      const newBlog = await createBlogPost({
        ...formData,
        tags,
      } as any);
      
      // Redirect to the new blog post
      if (formData.published) {
        // navigate.push(`/blog/${newBlog.slug}`);
      } else {
        // navigate.push('/blog/admin');
      }
      setIsSubmitting(false);
      alert("Blog created")
    } catch (error) {
      console.error('Error creating blog post:', error);
      setIsSubmitting(false);
    }
  };
  
  return (
    <div>
      <Header/>
      <div className="mb-6">
        <Link 
          href="/blog/admin" 
          className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to Admin
        </Link>
        <h2 className="text-2xl font-bold text-white mt-2">Create New Blog Post</h2>
      </div>
      
      <div className="bg-gray-800 rounded-lg p-6">
        <BlogForm 
          onSubmit={handleSubmit} 
          isSubmitting={isSubmitting} 
        />
      </div>
    </div>
  );
};

export default Page;