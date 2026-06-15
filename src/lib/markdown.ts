import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'src', 'content');

export interface PostData {
  id: string;
  date: string;
  title: string;
  summary: string;
  category: string;
  headings?: { id: string; text: string; level: number }[];
}

export function getSortedPostsData(): PostData[] {
  const fileNames = fs.readdirSync(contentDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(contentDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    return {
      id,
      date: matterResult.data.date,
      title: matterResult.data.title,
      summary: matterResult.data.summary,
      category: matterResult.data.category,
      content: matterResult.content,
    };
  });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostData(id: string): PostData & { content: string } {
  const fullPath = path.join(contentDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);
  const content = matterResult.content;

  const headingRegex = /^#{2,3}\s+(.+)$/gm;
  const headings: { id: string; text: string; level: number }[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const text = match[1].trim();
    const actualLevel = match[0].match(/#/g)?.length || 2;

    headings.push({
      id: text.toLowerCase().replace(/[^\w]+/g, '-'),
      text,
      level: actualLevel,
    });
  }

  return {
    id: matterResult.data.id || id,
    date: matterResult.data.date,
    title: matterResult.data.title,
    summary: matterResult.data.summary,
    category: matterResult.data.category,
    content,
    headings,
  };
}
