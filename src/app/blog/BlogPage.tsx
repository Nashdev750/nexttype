import React from 'react';
import { useParams } from 'react-router-dom';
import Helmet from '../components/common/Helmet';
import Header from '../components/common/Header';
import BlogDetail from '../components/Blog/BlogDetail';
import { getBlogBySlug } from '../utils/blogStorage';

const PlaceholderTypingTest: React.FC = () => {
  return (
    <div className="w-full bg-gray-800 rounded-lg p-6 mb-8 text-center">
      <h3 className="text-xl text-white mb-2">Typing Test Tool</h3>
      <p className="text-gray-400">This is where your typing test component would be displayed.</p>
    </div>
  );
};

const BlogPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const blog = slug ? getBlogBySlug(slug) : null;

  return (
    <div className="min-h-screen bg-[#323437] text-[#646669] flex flex-col">
      <Helmet>
        <title>{blog ? `${blog.title} | MonkeyType Blog` : 'Blog Post | MonkeyType'}</title>
        <link rel="canonical" href={`https://monkeytype.live/blog/${slug}`} />
      </Helmet>
      
      <Header />
      
      <main className="flex-1 flex flex-col items-center w-full px-6 mt-4">
        <div className="w-full max-w-[850px] flex flex-col items-center mb-12">
          {/* Typing Test Component */}
          <div className="w-full mb-12">
            <PlaceholderTypingTest />
          </div>
          
          {/* Blog Content */}
          <div className="w-full">
            <BlogDetail />
          </div>
        </div>
      </main>
    </div>
  );
};

export default BlogPage;