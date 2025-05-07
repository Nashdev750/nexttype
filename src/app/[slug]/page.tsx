"use client"
import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
import Helmet from '../../components/common/Helmet';
import BlogDetail from '../../components/Blog/BlogDetail';
import { useParams } from 'next/navigation';
import PageLayout from '../_layout';
import { fetchBlogPostById } from '@/helpers/blogStorage';


const BlogPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [loading, setLoading] = useState(true)
  const [blog, setBlog] = useState(null)
  useEffect(()=>{
      fetchBlogPostById(slug)
      .then(data=>{
        setLoading(false)
        setBlog(data)
      })
  },[])

  if(loading){
    return (
      <div className="py-12 text-center">
        <p className="text-gray-400 mb-6">Loading...</p>
      </div>
    )
  }
  return (
    <PageLayout>
      <Helmet>
        <title>{blog ? `${blog.title} | MonkeyType Blog` : 'Blog Post | MonkeyType'}</title>
        <link rel="canonical" href={`https://monkeytype.live/${slug}`} />
      </Helmet>
      <div className="w-full">
            <BlogDetail blog={blog}/>
     </div>
    </PageLayout>
  );
};

export default BlogPage;