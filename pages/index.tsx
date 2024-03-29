import type { InferGetStaticPropsType } from 'next';
import Image from 'next/image';
import { Box, Stack, Typography, Theme, SxProps, Fade } from '@mui/material';
import { CalendarMonth, LocalOffer } from '@mui/icons-material';
import dayjs from 'dayjs';
import Link from 'next/link';
import type { FC, ReactNode } from 'react';

import { getPostsDetail } from 'lib';
import type { NextPageWithLayout } from './_app';
import { useLoadMore } from 'lib/hooks';
import { TagContainer, LinkContainer } from 'components';

interface PostLinkWrapperProps {
  filename: string;
  sx?: SxProps<Theme>;
  children: ReactNode;
}

const PostLinkWrapper: FC<PostLinkWrapperProps> = (props) => (
  <Link href={`/post/${props.filename.slice(0, -3)}`} passHref>
    <LinkContainer sx={props.sx}>{props.children}</LinkContainer>
  </Link>
);

const Home: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = (props) => {
  const { data, loading, noMore, error } = useLoadMore(
    `api/posts`,
    props.postsData
  );

  return (
    <Stack
      spacing={6}
      sx={{
        maxWidth: {
          xs: '100%',
          md: '83.3%',
        },
        flexBasis: {
          xs: '100%',
          md: '83.3%',
        },
        mx: {
          xs: '0',
          sm: 'auto',
        },
        padding: '1rem',
      }}
    >
      {data.map((item, index) => (
        <Fade key={index} in={true}>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
            }}
          >
            <PostLinkWrapper
              filename={item.filename}
              sx={{
                flexBasis: {
                  xs: '100%',
                  md: '33%',
                },
                px: '15px',
                height: '10rem',
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  boxShadow: 10,
                }}
              >
                <Image
                  alt="abc"
                  src={
                    item.banner ||
                    process.env.NEXT_PUBLIC_POST_LIST_PICTURE_FALLBACK ||
                    'https://images.unsplash.com/photo-1650420352149-0d7d449d44b8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80'
                  }
                  layout="fill"
                  objectFit="cover"
                />
              </Box>
            </PostLinkWrapper>
            <Box
              sx={{
                px: '1rem',
                paddingBottom: '0.5rem',
                paddingTop: {
                  xs: '1.25rem',
                  md: '0.5rem',
                },
                flexBasis: {
                  xs: '100%',
                  md: '66.7%',
                },
              }}
            >
              <PostLinkWrapper
                filename={item.filename}
                sx={{
                  color: (theme: Theme) => theme.palette.text.primary,
                }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: '1.5rem',
                    fontWeight: 600,
                    lineHeight: '1.4',
                    marginBottom: '0.25rem',
                  }}
                >
                  {item.title}
                </Typography>
              </PostLinkWrapper>
              <PostLinkWrapper
                filename={item.filename}
                sx={{
                  my: '0.5rem',
                  height: 'calc(1.4rem * 3)',
                  display: 'flex',
                  alignItems: 'center',
                  color: (theme: Theme) => theme.palette.text.secondary,
                }}
              >
                <Typography
                  sx={{
                    lineHeight: '1.4',
                  }}
                >
                  {item.description}
                </Typography>
              </PostLinkWrapper>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  color: (theme: Theme) => theme.palette.text.secondary,
                }}
              >
                <TagContainer
                  sx={{
                    marginRight: '1rem',
                  }}
                >
                  <CalendarMonth
                    fontSize="inherit"
                    sx={{
                      marginRight: '0.2rem',
                    }}
                  />
                  <Typography sx={{ fontSize: 'inherit' }}>
                    {dayjs(item.createdAt).format('YYYY-M-D')}
                  </Typography>
                </TagContainer>
                {item.categories.length > 0 && (
                  <TagContainer>
                    <LocalOffer
                      fontSize="inherit"
                      sx={{
                        marginRight: '0.2rem',
                      }}
                    />
                    {item.categories.map((tag, index) => (
                      <Link key={index} href={`/tag/${tag}`} passHref>
                        <LinkContainer>
                          <Typography
                            sx={{
                              marginRight:
                                index === item.categories.length - 1
                                  ? 0
                                  : '0.2rem',
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
              </Box>
            </Box>
          </Box>
        </Fade>
      ))}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Typography
          sx={{
            color: (theme: Theme) => theme.palette.text.secondary,
            fontSize: '1rem',
          }}
        >
          {loading
            ? '加载中'
            : error
            ? '加载失败'
            : noMore
            ? '没有更多了'
            : '下滑以加载更多'}
        </Typography>
      </Box>
    </Stack>
  );
};

Home.headerTitle = process.env.NEXT_PUBLIC_MAIN_HEADER;
Home.headerHeight = 100;

export const getStaticProps = () => ({
  props: {
    postsData: getPostsDetail(),
  },
});

export default Home;
