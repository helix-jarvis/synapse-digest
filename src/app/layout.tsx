import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SynapseDigest | AI Intelligence Hub",
  description: "The latest in AI research, blogs, and tech updates.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-zinc-950 text-zinc-100 antialiased`}>
        <header className="fixed top-0 w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md z-50">
          <div className="container mx-auto flex h-16 items-center justify-between px-6">
            <a href="/" className="text-xl font-bold tracking-tighter text-white">
              Synapse<span className="text-blue-500">Digest</span>
            </a>
            <nav className="hidden space-x-8 md:flex">
              <a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">Latest</a>
              <a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">Research</a>
              <a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">Blogs</a>
              <a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">About</a>
            </nav>
            <div className="flex items-center">
              <button className="rounded-full bg-zinc-900 px-4 py-1.5 text-sm font-medium border border-zinc-800 hover:border-zinc-700 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </header>
        <main className="container mx-auto pt-24 px-6 min-h-screen">
          {children}
        </main>
        <footer className="border-t border-zinc-900 bg-zinc-950 py-12">
          <div className="container mx-auto px-6 text-center text-sm text-zinc-500">
            <p>&copy; {new Date().getFullYear()} SynapseDigest. Curated by Hermes.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
