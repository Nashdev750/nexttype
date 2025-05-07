import React from 'react';
import { format } from 'date-fns';
import { Clock, User, Tag, Battery as Category, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const BlogDetail = ({blog}) => {

  const renderListItems = (items) => {
    return items.map((item, index) => (
      <li key={index} dangerouslySetInnerHTML={{ __html: item.content }} />
    ));
  };

  if (!blog) { 
    return (
      <div className="py-12 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Blog Post Not Found</h2>
        <p className="text-gray-400 mb-6">The blog post you're looking for doesn't exist or has been removed.</p>
        <Link
          href="/blog" 
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <ArrowLeft size={18} className="mr-2" />
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <article className="prose w-full mx-auto">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <Link 
            href="/blog" 
            className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to Blog
          </Link>
        </div>
        
        <h1 className="text-3xl font-bold text-white mb-4">{blog.title}</h1>
        
        <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-6">
          <div className="flex items-center">
            <Clock size={16} className="mr-1" />
            {format(new Date(blog.updatedAt), 'MMMM d, yyyy')}
          </div>
          
          <div className="flex items-center">
            <User size={16} className="mr-1" />
            {blog.author}
          </div>
          
          {blog.category && (
            <div className="flex items-center">
              <Category size={16} className="mr-1" />
              {blog.category}
            </div>
          )}
        </div>
      </div>

       {blog.content.map((block) => {
        switch (block.type) {
          case 'paragraph':
            return (
              <p
                key={block.id}
                className="text-[#646669] leading-relaxed mb-6"
                dangerouslySetInnerHTML={{ __html: block.data.text }}
              />
            );

          case 'header': {
            const Tag = `h${block.data.level}`;
            const isH1 = block.data.level === 1;
            const className = isH1
              ? 'text-[#d1d0c5] text-4xl font-bold mb-6'
              : 'text-[#d1d0c5] text-2xl font-bold mt-12 mb-6';

            return (
              <Tag
                key={block.id}
                className={className}
                dangerouslySetInnerHTML={{ __html: block.data.text }}
              />
            );
          }

          case 'image':
            return (
              <div key={block.id} className="mb-12">
                <img
                  src={block.data.file?.url}
                  alt={block.data.caption || 'Blog image'}
                  className="w-full h-[400px] object-cover rounded-lg"
                />
              </div>
            );

          case 'list': {
            const isUnordered = block.data.style === 'unordered';
            const ListTag = isUnordered ? 'ul' : 'ol';
            const className = isUnordered
              ? 'list-disc list-inside text-[#646669] mb-6'
              : 'list-decimal list-inside text-[#646669] mb-6';

            return (
              <ListTag key={block.id} className={className}>
                {renderListItems(block.data.items)}
              </ListTag>
            );
          }

          default:
            return null;
        }
      })}
      
      {blog.tags.length > 0 && (
        <div className="border-t border-gray-700 pt-6 mt-8">
          <div className="flex items-center flex-wrap gap-2">
            <span className="text-gray-400 flex items-center mr-2">
              <Tag size={16} className="mr-1" />
              Tags:
            </span>
            {blog.tags.map((tag, index) => (
              <span 
                key={index}
                className="text-sm bg-gray-700 text-gray-300 px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </article>
  );
};

export default BlogDetail;