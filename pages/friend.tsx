import type { InferGetStaticPropsType } from 'next';
import { AccountCircle } from '@mui/icons-material';
import { Avatar, Grid, Box, Typography, type Theme } from '@mui/material';

import { getFriends } from 'lib';
import type { NextPageWithLayout } from './_app';
import { LinkContainer } from 'components/linkContainer';

const FriendPage: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ data }) => (
  <Box
    sx={{
      padding: '2rem 7.5%',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    {data.length > 0 ? (
      <Grid
        container
        spacing={2}
        sx={{
          m: 0,
        }}
      >
        {data.map((item, index) => (
          <Grid
            item
            xs={12}
            md={4}
            key={index}
            component="a"
            href={item.link}
            sx={{
              cursor: 'pointer',
              borderRadius: '0.3rem',
              p: '1rem',
              m: '1rem 0',
              transition: (theme: Theme) =>
                theme.transitions.create(['background-color'], {
                  duration: theme.transitions.duration.standard,
                }),
              '&:hover': {
                backgroundColor: '#f8f9fa',
                transition: (theme: Theme) =>
                  theme.transitions.create(['background-color'], {
                    duration: theme.transitions.duration.standard,
                  }),
              },
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Avatar
              alt="avatar"
              src={item.avatar}
              sx={{
                width: '3rem',
                height: '3rem',
                marginRight: '0.75rem',
              }}
            >
              <AccountCircle />
            </Avatar>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                height: '100%',
                flex: '1',
                lineHeight: '1.5rem',
              }}
            >
              <Typography
                sx={{
                  fontWeight: 'bold',
                }}
              >
                {item.name}
              </Typography>
              <Typography
                sx={{
                  maxHeight: '2rem',
                  fontSize: '0.85rem',
                  color: (theme: Theme) => theme.palette.text.secondary,
                  overflow: 'hidden',
                }}
              >
                {item.description ?? ''}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    ) : (
      <Typography
        sx={{
          fontSize: '1.5rem',
          marginBottom: '2rem',
          mx: 'auto',
        }}
      >
        还没有友链哦
      </Typography>
    )}
    <Typography
      sx={{
        color: (theme: Theme) => theme.palette.text.secondary,
        fontSize: '1rem',
        m: '0 auto',
      }}
    >
      想交换友链？请看
      <LinkContainer
        sx={{
          display: 'inline',
          color: '#0366d6',
        }}
      >
        <Typography
          component="a"
          href={`${process.env.NEXT_PUBLIC_GITHUB_REPO_LINK}`}
          target="_blank"
        >
          此处
        </Typography>
      </LinkContainer>
    </Typography>
  </Box>
);

FriendPage.headerHeight = 70;
FriendPage.headerTitle = '友情链接';

export const getStaticProps = () => ({
  props: {
    data: getFriends(),
  },
});

export default FriendPage;
