import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Helmet from '../components/common/Helmet';
import Header from '../components/common/Header';
import BlogAdminList from '../components/Blog/BlogAdminList';
import CreateBlogPage from './admin/new/page';
import EditBlogPage from './EditBlogPage';

const BlogAdminPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#323437] text-[#646669] flex flex-col">
      <Helmet>
        <title>Blog Admin | MonkeyType</title>
      </Helmet>
      
      <Header />
      
      <main className="flex-1 flex flex-col items-center w-full px-6 mt-4">
        <div className="w-full max-w-[850px] mb-12">
          <h1 className="text-2xl font-bold text-white mb-6">Blog Administration</h1>
          
          <Routes>
            <Route path="/" element={<BlogAdminList />} />
            <Route path="/new" element={<CreateBlogPage />} />
            <Route path="/edit/:id" element={<EditBlogPage />} />
            <Route path="*" element={<Navigate to="/blog/admin" />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default BlogAdminPage;