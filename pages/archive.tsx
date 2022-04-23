import type { InferGetStaticPropsType } from 'next';
import { Box } from '@mui/material';

import { getPostsDetailByTag } from 'lib/getPostLists';
import { PostList } from 'components/postList';
import type { NextPageWithLayout } from './_app';

const ArchivePage: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ data }) => (
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

ArchivePage.headerTitle = '归档';

export const getStaticProps = () => ({
  props: {
    data: getPostsDetailByTag(''),
  },
});

export default ArchivePage;
