import * as path from 'path';

export const BlogPostPath = path.resolve(
  path.join(process.cwd(), './posts/blog')
);

export const FriendsFilePath = path.resolve(
  path.join(process.cwd(), './posts/friend.json')
);

export const BlogPostIgnore: string[] = [];
