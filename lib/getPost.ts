import * as path from 'path';
import * as fs from 'fs';
import matter from 'gray-matter';

import { BlogPostPath } from './constants';

export interface PostContent {
  content: string;
  title: string;
  createdAt: number;
  categories: string[];
  banner: string;
}

export const getPostContent = (filename: string): PostContent => {
  const frontMatter = matter(
    fs.readFileSync(path.join(BlogPostPath, filename), 'utf-8')
  );
  return {
    content: frontMatter.content,
    title: frontMatter.data.title as string,
    createdAt: fs.statSync(path.join(BlogPostPath, filename)).birthtimeMs,
    categories: (frontMatter.data.categories as string[] | undefined) || [],
    banner: frontMatter.data.banner as string,
  };
};
