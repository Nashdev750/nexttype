import React from 'react';
import Helmet from '../../components/common/Helmet';
import {Header} from '../../components/Header';
import BlogList from '../../components/Blog/BlogList';

const PlaceholderTypingTest: React.FC = () => {
  return (
    <div className="w-full bg-gray-800 rounded-lg p-6 mb-8 text-center">
      <h3 className="text-xl text-white mb-2">Typing Test Tool</h3>
      <p className="text-gray-400">This is where your typing test component would be displayed.</p>
    </div>
  );
};

const BlogListPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#323437] text-[#646669] flex flex-col">
      <Helmet>
        <title>Blog | MonkeyType</title>
        <link rel="canonical" href="https://monkeytype.live/blog" />
      </Helmet>
      
      <Header />
      
      <main className="flex-1 flex flex-col items-center w-full px-6 mt-4">
        <div className="w-full max-w-[850px] flex flex-col items-center mb-12">
          {/* Typing Test Component */}
          <div className="w-full mb-12">
            <PlaceholderTypingTest />
          </div>
          
          {/* Blog List */}
          <div className="w-full">
            <h1 className="text-3xl font-bold text-white mb-8 text-center">Typing Tips & Articles</h1>
            <BlogList />
          </div>
        </div>
      </main>
    </div>
  );
};

export default BlogListPage;