import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import { Box, styled, Typography } from '@mui/material';
import { CalendarMonth, LocalOffer, Copyright } from '@mui/icons-material';
import { useMemo } from 'react';
import dayjs from 'dayjs';

import { getPostContent, getPostLists, PostContent } from 'lib';
import { useMdProcesser } from 'lib/hooks';
import {
  H1Title,
  H2Title,
  H3Title,
  H4Title,
  H5Title,
  H6Title,
} from 'components/markdown';
import { TagContainer, LinkContainer } from 'components';
import { NextPageWithLayout } from '../_app';

const MarkdownContainer = styled(Box)(({ theme }) => ({
  padding: '0 5%',
  overflow: 'auto',
  '& blockquote': {
    color: theme.palette.text.secondary,
    padding: '0 1em',
    borderLeft: '0.25em solid #dfe2e5',
    margin: 0,
  },
  '& code': {
    backgroundColor: 'rgba(175, 184, 193, 0.2)',
    padding: '0.2em 0.4em',
    fontSize: '0.85em',
    borderRadius: '3px',
    fontFamily: 'SFMono-Regular,Consolas,Liberation Mono,Menlo,monospace',
  },
  '& a': {
    color: '#0366d6',
    transition: theme.transitions.create(['color'], {
      duration: theme.transitions.duration.standard,
    }),
  },
  '& a:hover': {
    textDecoration: 'underline',
    color: '#30a9de',
    transition: theme.transitions.create(['color'], {
      duration: theme.transitions.duration.standard,
    }),
  },
  '& > .contains-task-list': {
    listStyle: 'none',
    paddingLeft: 0,
  },
  '& > .hint': {
    padding: '0.75em',
    borderLeft: '0.35em solid',
    borderRadius: '0.25em',
    margin: '1.5em 0',
    color: theme.palette.text.primary,
    fontSize: '0.9em',
  },
  '& > .hint.tip': {
    backgroundColor: 'rgba(160,197,228,0.25)',
    borderColor: '#428bca',
  },
  '& > .hint.warn': {
    backgroundColor: 'rgba(248,214,166,0.25)',
    borderColor: '#f0ad4e',
  },
  '& > .hint.error': {
    backgroundColor: 'rgba(255,51,51,0.25)',
    borderColor: '#ff3333',
  },
  '& li + li': {
    marginTop: '0.25em',
  },
  '& table': {
    borderSpacing: 0,
    borderCollapse: 'collapse',
  },
  '& table tr': {
    borderTop: '1px solid #c6cbd1',
  },
  '& table th': {
    fontWeight: 600,
  },
  '& table th, & table td': {
    borderColor: '#eaecef',
    padding: '6px 13px',
    border: '1px solid #dfe2e5',
  },
  '& img': {
    maxWidth: '90%',
    margin: '1.5em auto',
    display: 'block',
    boxShadow: theme.shadows[10],
    borderRadius: '4px',
  },
  '& > .math.math-display': {
    overflowX: 'auto',
  },
}));

const PostPage: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ data }) => {
  const componentMapping = useMemo(
    () => ({
      h1: H1Title,
      h2: H2Title,
      h3: H3Title,
      h4: H4Title,
      h5: H5Title,
      h6: H6Title,
    }),
    []
  );

  const content = useMdProcesser(data.content, componentMapping);

  return <MarkdownContainer>{content}</MarkdownContainer>;
};

PostPage.headerTitle = ({ data }: { data: PostContent }) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'common.white',
    }}
  >
    <Typography
      sx={{
        fontSize: '2.5rem',
        fontWeight: 500,
        lineHeight: '1.2',
      }}
    >
      {data.title}
    </Typography>
    <TagContainer
      sx={{
        marginTop: '1rem',
      }}
    >
      <CalendarMonth
        sx={{
          marginRight: '0.2rem',
          fontSize: '1rem',
          lineHeight: 1,
        }}
      />
      <Typography>{dayjs(data.createdAt).format('YYYY-M-D HH:mm')}</Typography>
    </TagContainer>
    {data.categories.length > 0 && (
      <TagContainer
        sx={{
          marginTop: '0.2rem',
        }}
      >
        <LocalOffer
          sx={{
            marginRight: '0.2rem',
            fontSize: '1rem',
            lineHeight: 1,
          }}
        />
        {data.categories.map((tag, index) => (
          <Link key={index} href={`/tag/${tag}`} passHref>
            <LinkContainer>
              <Typography
                sx={{
                  marginRight:
                    index === data.categories.length - 1 ? 0 : '0.2rem',
                  fontSize: 'inherit',
                }}
              >
                {`#${tag}`}
              </Typography>
            </LinkContainer>
          </Link>
        ))}
      </TagContainer>
    )}
    <TagContainer
      sx={{
        marginTop: '0.2rem',
      }}
    >
      <Copyright
        sx={{ marginRight: '0.2rem', fontSize: '1rem', lineHeight: 1 }}
      />
      <Typography
        component="a"
        href={data.license.url}
        sx={{
          cursor: 'pointer',
        }}
      >
        {data.license.name}
      </Typography>
    </TagContainer>
  </Box>
);

PostPage.headerHeight = 60;
PostPage.headerBanner = (props) => (props as { data: PostContent }).data.banner;

export const getStaticPaths: GetStaticPaths = () => ({
  paths: getPostLists().map((item) => ({
    params: {
      id: item.slice(0, -3),
    },
  })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<
  { data: PostContent },
  { id: string }
> = (context) => {
  const filename = context.params?.id ?? '';
  const postContent = getPostContent(`${filename}.md`);
  return {
    props: {
      data: {
        ...postContent,
      },
    },
  };
};

export default PostPage;
