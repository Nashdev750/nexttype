"use client"
import React, { useEffect, useState, useRef } from 'react';
import { BlogFormData, BlogPost } from '../../types/blog';
import RichTextEditor from '../RichTextEditor/RichTextEditor';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header'; 
import List from '@editorjs/list'; 
import LinkTool from '@editorjs/link';
import Raw from '@editorjs/raw';
import SimpleImage from '@editorjs/simple-image';
import ImageTool from '@editorjs/image';
import Checklist from '@editorjs/checklist';
import Embed from '@editorjs/embed';
import Quote from '@editorjs/quote';

interface BlogFormProps {
  initialData?: BlogPost;
  onSubmit: (formData: BlogFormData) => void;
  isSubmitting: boolean;
}

const BlogForm: React.FC<BlogFormProps> = ({ 
  initialData, 
  onSubmit, 
  isSubmitting 
}) => {
  const [blocks, setBlocks] = useState([])
  const [formData, setFormData] = useState<BlogFormData>({
    title: initialData?.title || '',
    content: initialData?.content || '',
    excerpt: initialData?.excerpt || '',
    author: initialData?.author || '',
    tags: initialData?.tags.join(', ') || '',
    category: initialData?.category || '',
    featured: initialData?.featured || false,
    published: initialData?.published || false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleEditorChange = (html: string) => {
    setFormData(prev => ({ ...prev, content: html }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    formData.content = blocks
    onSubmit(formData);
  };

  
 const editorRef = useRef(null);

 useEffect(() => {
  if (!editorRef.current) {
    editorRef.current = new EditorJS({
      holder: 'editorjs',
      autofocus: true,
      tools: {
        header: Header,
        simpleImage: SimpleImage,
        image: {
          class: ImageTool,
          config: {
            endpoints: {
              byFile: 'https://www.monkeytype.live/api/upload'
            },
          },
        },
        list: List,
        embed: Embed,
      },
      onReady: () => {
        console.log('Editor.js is ready!');
      },
      onChange: async () => {
        const content = await editorRef.current.save();
        setBlocks(content.blocks)
        console.log('Content:', content.blocks);
      },
    });
  }

  return () => {
    if (editorRef.current?.destroy) {
      editorRef.current.destroy();
      editorRef.current = null;
    }
  };
}, []);


  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-200">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter blog title"
          />
        </div>

        <div>
          <label htmlFor="excerpt" className="block text-sm font-medium text-gray-200">
            Excerpt
          </label>
          <textarea
            id="excerpt"
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            rows={2}
            className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Brief summary of your blog post"
          />
        </div>

        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-200">
            Author
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Your name"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-200">
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="E.g., Typing Tips, Keyboard Reviews"
            />
          </div>

          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-200">
              Tags (comma separated)
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="E.g., typing, speed, practice"
            />
          </div>
        </div>

        <div className="flex space-x-6">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="featured"
              name="featured"
              checked={formData.featured}
              onChange={handleCheckboxChange}
              className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-600 rounded"
            />
            <label htmlFor="featured" className="ml-2 block text-sm text-gray-200">
              Featured post
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="published"
              name="published"
              checked={formData.published}
              onChange={handleCheckboxChange}
              className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-600 rounded"
            />
            <label htmlFor="published" className="ml-2 block text-sm text-gray-200">
              Publish immediately
            </label>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-200 mb-2">
          Content
        </label>
        <div id="editorjs" className="editorjs w-full" />
        {/* <RichTextEditor 
          content={formData.content} 
          onChange={handleEditorChange} 
        /> */}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Saving...' : initialData ? 'Update Post' : 'Create Post'}
        </button>
      </div>
    </form>
  );
};

export default BlogForm;