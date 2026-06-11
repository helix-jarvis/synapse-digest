import { getSortedPostsData } from "@/lib/markdown";
import Link from "next/link";

export default async function Home() {
  const posts = await getSortedPostsData();

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="py-20 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight text-white md:text-7xl">
          AI Intelligence <span className="bg-gradient-to-r from-blue-500 to-emerald-500 bg-clip-text text-transparent">Delivered.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400">
          The daily pulse of artificial intelligence. Research, trends, and technical breakthroughs, summarized for the curious mind.
        </p>
      </section>

      {/* Article Grid */}
      <section>
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl font-bold text-white">Latest Updates</h2>
          <div className="h-px flex-1 bg-zinc-800 ml-6"></div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link 
              key={post.id} 
              href={`/post/${post.id}`}
              className="group relative flex flex-col rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 transition-all hover:border-zinc-600 hover:shadow-2xl hover:shadow-blue-500/5"
            >
              <div className="mb-4 flex items-center gap-3 text-xs font-medium uppercase tracking-wider text-blue-500">
                {post.category}
                <span className="h-1 w-1 rounded-full bg-zinc-700"></span>
                <time dateTime={post.date}>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</time>
              </div>
              <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
                {post.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400 line-clamp-3">
                {post.summary}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
