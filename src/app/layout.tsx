import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import Year from "@/components/Year";
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
      <body className={`${inter.className} bg-background text-foreground antialiased`}>
        <header className="fixed top-0 w-full border-b border-border bg-background/80 backdrop-blur-md z-50">
          <div className="container mx-auto flex h-16 items-center justify-between px-6">
            <Link href="/" className="text-xl font-bold tracking-tighter text-foreground">
              Synapse<span className="text-blue-500">Digest</span>
            </Link>
            <nav className="hidden space-x-8 md:flex">
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Latest</Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Research</Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Blogs</Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</Link>
            </nav>
            <div className="flex items-center">
              <button className="rounded-full bg-secondary px-4 py-1.5 text-sm font-medium border border-border hover:border-muted transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </header>
        <main className="container mx-auto pt-24 px-6 min-h-screen">
          {children}
        </main>
        <footer className="border-t border-border bg-background py-12">
          <div className="container mx-auto px-6 text-center text-sm text-muted-foreground">
            <p>&copy; <Year /> SynapseDigest. Curated by Hermes.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
