import { getPostData, getSortedPostsData } from "@/lib/markdown";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { Calendar, Clock, ChevronLeft, Tag } from "lucide-react";

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    id: post.id,
  }));
}

export default async function PostPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const postData = await getPostData(id);

  // Simple reading time estimation
  const wordsPerMinute = 200;
  const readingTime = Math.ceil(postData.content.split(/\s+/).length / wordsPerMinute);

  return (
    <article className="mx-async-max-w-3xl mx-auto pb-24">
      <nav className="mb-12 flex items-center justify-between">
        <Link 
          href="/" 
          className="group flex items-center text-sm text-zinc-500 hover:text-white transition-colors"
        >
          <ChevronLeft className="mr-1 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Feed
        </Link>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center text-sm text-zinc-500 bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800">
            <Tag className="mr-1.5 h-3.5 w-3.5 text-blue-500" />
            {postData.category}
          </div>
        </div>
      </nav>
      
      <header className="mb-16 space-y-6">
        <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-6xl">
          {postData.title}
        </h1>
        
        <div className="flex flex-wrap items-center gap-6 text-sm text-zinc-500 border-y border-zinc-900 py-4">
          <div className="flex items-center">
            <Calendar className="mr-2 h-4 w-4 text-blue-500" />
            {new Date(postData.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </div>
          <div className="flex items-center">
            <Clock className="mr-2 h-4 w-4 text-blue-500" />
            {readingTime} min read
          </div>
        </div>
      </header>

      <div className="prose prose-invert max-w-none
        prose-headings:text-white prose-headings:font-bold prose-headings:tracking-tight
        prose-p:text-zinc-400 prose-p:leading-relaxed
        prose-strong:text-white
        prose-a:text-blue-500 hover:prose-a:text-blue-400
        prose-code:text-blue-400 prose-code:bg-zinc-900 prose-code:px-1 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
        prose-img:rounded-2xl prose-img:border prose-img:border-zinc-800
      ">
        <ReactMarkdown>{postData.content}</ReactMarkdown>
      </div>

      <footer className="mt-16 pt-8 border-t border-zinc-900">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="text-sm text-zinc-500">
            Thanks for reading. Stay curious.
          </div>
          <div className="flex gap-2">
            <button className="text-xs bg-zinc-900 hover:bg-zinc-800 text-zinc-300 px-4 py-2 rounded-lg border border-zinc-800 transition-colors">
              Share on X
            </button>
            <button className="text-xs bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </footer>
    </article>
  );
}
