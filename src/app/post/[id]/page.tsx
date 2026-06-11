import { getPostData } from "@/lib/markdown";
import ReactMarkdown from "react-markdown";
import Link from "next/link";

export default async function PostPage({ params }: { params: { id: string } }) {
  const postData = await getPostData(params.id);

  return (
    <article className="mx-auto max-w-3xl">
      <Link 
        href="/" 
        className="mb-8 inline-block text-sm text-zinc-500 hover:text-white transition-colors"
      >
        ← Back to Feed
      </Link>
      
      <header className="mb-12">
        <div className="mb-4 flex items-center gap-3 text-sm font-medium text-blue-500 uppercase tracking-wider">
          {postData.category}
          <span className="h-1 w-1 rounded-full bg-zinc-700"></span>
          <time>{new Date(postData.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</time>
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
          {postData.title}
        </h1>
      </header>

      <div className="prose prose-invert max-w-none
        prose-headings:text-white prose-headings:font-bold
        prose-p:text-zinc-400 prose-p:leading-relaxed
        prose-strong:text-white
        prose-a:text-blue-500 hover:prose-a:text-blue-400
      ">
        <ReactMarkdown>{postData.content}</ReactMarkdown>
      </div>
    </article>
  );
}
