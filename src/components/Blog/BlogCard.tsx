"use client"
import React from 'react';
import { format } from 'date-fns';
import { BlogPost } from '../../types/blog';
import { Clock, User, Tag, Battery as Category } from 'lucide-react';
import Link from 'next/link';

interface BlogCardProps {
  blog: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }:any) => {
  // Create a plain text version of the HTML excerpt for the card
  const createTextFromHtml = (html: string) => {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  };

  return (
    
    <article className="bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-700">
      <Link href={`/${blog.slug}`} className="block">
        <div className="p-6">
          {blog.featured && (
            <span className="inline-block px-3 py-1 text-xs font-semibold bg-blue-600 text-white rounded-full mb-3">
              Featured
            </span>
          )}
          <h2 className="text-xl font-bold text-white mb-2 hover:text-blue-400 transition-colors">
            {blog.title}
          </h2>
          
          <div className="flex flex-wrap gap-3 text-xs text-gray-400 mb-3">
            <div className="flex items-center">
              <Clock size={14} className="mr-1" />
              {format(new Date(blog.updatedAt), 'MMM d, yyyy')}
            </div>
            
            <div className="flex items-center">
              <User size={14} className="mr-1" />
              {blog.author}
            </div>
            
            {blog.category && (
              <div className="flex items-center">
                <Category size={14} className="mr-1" />
                {blog.category}
              </div>
            )}
          </div>
          
          <p className="text-gray-300 mb-4 line-clamp-3">
            {blog.excerpt || createTextFromHtml(blog.content).substring(0, 150) + '...'}
          </p>
          
          {blog.tags.length > 0 && (
            <div className="flex items-center flex-wrap gap-2">
              <Tag size={14} className="text-gray-400" />
              {blog.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </article>
  );
};

export default BlogCard;