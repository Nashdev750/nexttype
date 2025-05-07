import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { BlogFormData } from '../types/blog';
import BlogForm from '../components/Blog/BlogForm';
import { getBlogById, updateBlog } from '../utils/blogStorage';

const EditBlogPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const navigate = useNavigate();
  
  const blog = id ? getBlogById(id) : null;
  
  useEffect(() => {
    if (id && !blog) {
      setNotFound(true);
    }
  }, [id, blog]);
  
  const handleSubmit = (formData: BlogFormData) => {
    if (!id) return;
    
    setIsSubmitting(true);
    
    try {
      // Convert comma-separated tags to array
      const tags = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);
      
      // Update the blog post
      const updatedBlog = updateBlog(id, {
        ...formData,
        tags,
      });
      
      if (updatedBlog) {
        // Redirect to the blog post or admin page
        if (updatedBlog.published) {
          navigate(`/blog/${updatedBlog.slug}`);
        } else {
          navigate('/blog/admin');
        }
      }
    } catch (error) {
      console.error('Error updating blog post:', error);
      setIsSubmitting(false);
    }
  };
  
  if (notFound) {
    return (
      <div className="py-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Blog Post Not Found</h2>
        <p className="text-gray-400 mb-6">The blog post you're trying to edit doesn't exist.</p>
        <Link 
          to="/blog/admin" 
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <ArrowLeft size={18} className="mr-2" />
          Back to Admin
        </Link>
      </div>
    );
  }
  
  return (
    <div>
      <div className="mb-6">
        <Link 
          to="/blog/admin" 
          className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to Admin
        </Link>
        <h2 className="text-2xl font-bold text-white mt-2">Edit Blog Post</h2>
      </div>
      
      {blog && (
        <div className="bg-gray-800 rounded-lg p-6">
          <BlogForm 
            initialData={blog}
            onSubmit={handleSubmit} 
            isSubmitting={isSubmitting} 
          />
        </div>
      )}
    </div>
  );
};

export default EditBlogPage;