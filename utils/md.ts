import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from "remark";
import html from 'remark-html';

export const getPath = (folder: string) => {
    return path.join(process.cwd(), `/${process.env.NEXT_PUBLIC_MD}/${folder}`);
}

export const getFileContent = (filename: string, folder: string) => {
    const POSTS_PATH = getPath(folder);
    return fs.readFileSync(path.join(POSTS_PATH, filename), "utf-8");
}

export const getAllPosts = (folder: string) => {
    const POSTS_PATH = getPath(folder);

    return fs
    .readdirSync(POSTS_PATH)
    .filter((path) => /\\.md?$/.test(path))
    .map((filename) => {
        const source = getFileContent(filename, folder);
        const slug = filename.replace(/\\.md?$/, "");
        const { data } = matter(source);
       return {
        frontmatter: data,
        slug: slug
       }
    })
}

export const getSinglePost = async (slug: string, folder:string) => {
    const source = getFileContent(`${slug}.md`, folder);
    const { data: frontmatter, content } = matter(source);
   
    return {
        frontmatter,
        content
    }
}

export async function markdownToHtml(markdown: string) {
    const result = await remark().use(html).process(markdown);
    return result.toString();
  }

  export const renderMarkdown = async (
    markdownContent: string
  ): Promise<string> => {
    return await markdownToHtml(markdownContent || '');
  };