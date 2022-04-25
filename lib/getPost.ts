import * as path from 'path';
import * as fs from 'fs';
import matter from 'gray-matter';
import spdxLicenseList from 'spdx-license-list';

import { BlogPostPath } from './constants';

export interface PostContent {
  content: string;
  title: string;
  createdAt: number;
  categories: string[];
  banner: string;
  license: typeof spdxLicenseList[number];
}

export const getPostContent = (filename: string): PostContent => {
  const frontMatter = matter(
    fs.readFileSync(path.join(BlogPostPath, path.basename(filename)), 'utf-8')
  );
  return {
    content: frontMatter.content,
    title: frontMatter.data.title as string,
    createdAt: fs.statSync(path.join(BlogPostPath, path.basename(filename)))
      .birthtimeMs,
    categories: (frontMatter.data.categories as string[] | undefined) || [],
    banner: frontMatter.data.banner as string,
    license: {
      ...spdxLicenseList[
        (frontMatter.data.license as string | undefined) ?? 'CC-BY-NC-SA-4.0'
      ],
      name:
        (frontMatter.data.license as string | undefined) ?? 'CC-BY-NC-SA-4.0',
    },
  };
};
