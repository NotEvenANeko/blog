import { InferGetStaticPropsType } from 'next';
import Image from 'next/image';
import {
  Box,
  Stack,
  styled,
  Typography,
  Theme,
  SxProps,
  Fade,
} from '@mui/material';
import { CalendarMonth, LocalOffer } from '@mui/icons-material';
import dayjs from 'dayjs';

import { getPostsDetail } from 'lib';
import type { NextPageWithLayout } from './_app';
import Link from 'next/link';
import { FC } from 'react';
import { useLoadMore } from 'lib/hooks';

const TagContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  line-height: 1.5;
`;

const LinkContainer = styled(Box)(
  ({ theme }) => `
  transition: ${theme.transitions.create(['color'], {
    duration: theme.transitions.duration.short,
  })};
  cursor: pointer;
  &:hover {
    color: #30a9de;
    transition: ${theme.transitions.create(['color'], {
      duration: theme.transitions.duration.short,
    })};
  }
`
);

interface PostLinkWrapperProps {
  filename: string;
  sx?: SxProps<Theme>;
}

const PostLinkWrapper: FC<PostLinkWrapperProps> = (props) => (
  <Link href={`/posts/${props.filename.slice(0, -3)}`} passHref>
    <LinkContainer sx={props.sx}>{props.children}</LinkContainer>
  </Link>
);

const Home: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = (props) => {
  const { data, loading, noMore } = useLoadMore(`api/posts`, props.postsData);

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
                  src={item.banner}
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
          {loading ? '加载中' : noMore ? '没有更多了' : '下滑以加载更多'}
        </Typography>
      </Box>
    </Stack>
  );
};

Home.headerTitle = '归档';
Home.headerHeight = 100;

export const getStaticProps = () => ({
  props: {
    postsData: getPostsDetail(),
  },
});

export default Home;
