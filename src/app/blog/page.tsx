"use client"
import BlogList from "@/components/Blog/BlogList"
import PageLayout from "../_layout"

const Page = ()=>{
     return(
        <PageLayout>
        <div className="w-full max-w-[850px] flex flex-col items-center mb-12">
          <div className="w-full">
            <h1 className="text-3xl font-bold text-white mb-8 text-center">Typing Tips & Articles</h1>
            <BlogList/>
          </div>
        </div>
        </PageLayout>
     )
}

export default Page