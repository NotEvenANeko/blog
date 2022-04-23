import { Box, CircularProgress } from '@mui/material';
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next';
import { useRouter } from 'next/router';

import { PostList, type PostListProps } from 'components/postList';
import { getPostsDetailByTag } from 'lib/getPostLists';
import type { NextPageWithLayout } from 'pages/_app';
import { HeaderTitle } from 'components/layout';

const TagPage: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ data }) => {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <CircularProgress
        sx={{
          alignSelf: 'center',
          margin: '0 auto',
        }}
      />
    );
  }

  return (
    <Box
      sx={{
        paddingTop: '1.5rem',
        px: '10%',
        width: '100%',
      }}
    >
      <PostList data={data} />
    </Box>
  );
};

TagPage.headerHeight = 70;
TagPage.headerTitle = ({
  tag,
}: InferGetStaticPropsType<typeof getStaticProps>) => (
  <HeaderTitle>{`${tag ? `标签 - ${tag}` : '加载中...'}`}</HeaderTitle>
);

export const getStaticPaths: GetStaticPaths = () => ({
  paths: [],
  fallback: true,
});

export const getStaticProps: GetStaticProps<
  PostListProps & { tag: string },
  { tag: string }
> = (context) => ({
  props: {
    data: getPostsDetailByTag(context.params?.tag ?? ''),
    tag: context.params?.tag ?? '',
  },
});

export default TagPage;
