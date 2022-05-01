import type { FC } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import Link from 'next/link';

import { LinkContainer } from './linkContainer';
import { Title } from './title';

interface Post {
  title: string;
  createdAt: number;
  filename: string;
}

export interface PostListProps {
  data: Post[];
}

export const PostList: FC<PostListProps> = ({ data }) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <Title
      sx={{
        marginBottom: '2em',
      }}
    >{`共计 ${data.length} 篇文章`}</Title>
    <Stack direction="column" spacing={2}>
      {Object.entries(
        data
          .sort((a, b) => b.createdAt - a.createdAt)
          .reduce<Record<number, Post[]>>((pre, cur) => {
            const date = new Date(cur.createdAt);
            const year = date.getFullYear();
            if (pre[year] !== undefined) {
              pre[year].push(cur);
            } else {
              pre[year] = [cur];
            }
            return pre;
          }, {})
      )
        .map(
          ([year, posts]) =>
            [
              Number(year),
              posts.sort((a, b) => b.createdAt - a.createdAt),
            ] as const
        )
        .map(([year, posts], index) => (
          <Box key={index}>
            <Title
              sx={{
                fontSize: '1.25em',
              }}
            >
              {year}
            </Title>
            <Box>
              {posts.map((post, index) => (
                <Link
                  href={`/post/${post.filename.slice(0, -3)}`}
                  passHref
                  key={index}
                >
                  <LinkContainer
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      p: '0.75em 1.25em',
                    }}
                  >
                    <Typography
                      sx={{
                        flex: '0 0 5em',
                      }}
                    >
                      {dayjs(post.createdAt).format('MM-DD')}
                    </Typography>
                    <Typography>{post.title}</Typography>
                  </LinkContainer>
                </Link>
              ))}
            </Box>
          </Box>
        ))}
    </Stack>
  </Box>
);
