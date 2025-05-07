"use client"
import React, { useEffect, useState } from 'react';
import { BlogPost } from '../../types/blog';
import { fetchBlogPosts } from '../../helpers/blogStorage';
import BlogCard from './BlogCard';
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const ITEMS_PER_PAGE = 6;

const BlogList = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [featuredBlog, setFeaturedBlog] = useState<BlogPost | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);


  
  useEffect(() => {
    fetchBlogPosts(currentPage, ITEMS_PER_PAGE)
    .then(data=>{
      console.log(data)
      setBlogs(data.posts);
      setTotalPages(data.total/data.pageSize)
      setLoading(false)
    })
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  if(loading){
    return (
      <div className="py-12 text-center">
        <p className="text-gray-400 mb-6">Loading...</p>
      </div>
    )
  }
  if (blogs.length === 0 && !featuredBlog) {
    return (
      <div className="py-12 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">No Blog Posts Yet</h2>
        <p className="text-gray-400 mb-6">Be the first to create a blog post!</p>
        <Link 
          href="/blog/admin/new" 
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus size={18} className="mr-2" />
          Create New Post
        </Link>
      </div>
    );
  }

  return (
    <div className="py-8">
      {featuredBlog && (
        <div className="mb-10">
          <h2 className="text-xl text-white font-semibold mb-4 border-b border-gray-700 pb-2">Featured Post</h2>
          <BlogCard blog={featuredBlog} />
        </div>
      )}
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl text-white font-semibold">Latest Posts</h2>
        <Link 
          href="/blog/admin/new" 
          className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-sm text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus size={16} className="mr-1" />
          New Post
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {blogs.map(blog => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-md bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={20} />
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 rounded-md ${
                currentPage === page
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
              }`}
            >
              {page}
            </button>
          ))}
          
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-md bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogList;