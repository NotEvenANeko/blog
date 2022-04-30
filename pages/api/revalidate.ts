import type { NextApiHandler } from 'next';
import { plainToInstance } from 'class-transformer';
import { validateOrReject, ValidationError } from 'class-validator';
import * as fs from 'fs';
import * as path from 'path';

import { RevalidateHeaderDto, RevalidateBodyDto } from 'lib/dtos';
import type { BaseResponse } from 'lib/interfaces';
import { BlogPostPath, getPostContent } from 'lib';

// TODO: now using unstable api
const handler: NextApiHandler<BaseResponse> = async (req, res) => {
  if (req.method === 'POST') {
    const headers = plainToInstance(RevalidateHeaderDto, req.headers);
    const body = plainToInstance(RevalidateBodyDto, req.body);

    try {
      await validateOrReject(headers);
      await validateOrReject(body);

      if (headers.authorization !== process.env.REVALIDATE_TOKEN) {
        res.status(401).json({
          statusCode: 401,
          message: 'Unauthorized',
        });
      } else {
        let postRevalidate = false;

        const revalidatePaths = body.paths.filter((item) => {
          if (item === '/friend') return true;
          if (item === '/') return true;
          if (item === '/archive') return true;
          if (item.endsWith('.md')) {
            if (fs.existsSync(path.join(BlogPostPath, path.basename(item)))) {
              postRevalidate = true;
              return true;
            }
          }
          return false;
        });
        console.log(`Starting revalidate paths ${revalidatePaths.join(', ')}`);
        await Promise.all(
          revalidatePaths.map(async (item) => {
            if (item.endsWith('.md')) {
              await res.unstable_revalidate(
                `/post/${path.basename(item.slice(0, -3))}`
              );
              const post = getPostContent(item);
              if (post?.categories) {
                await Promise.all(
                  post.categories.map(async (category) => {
                    await res.unstable_revalidate(`/tag/${category}`);
                  })
                );
              }
            } else {
              await res.unstable_revalidate(`${item}`);
            }
          })
        );
        if (postRevalidate) {
          await res.unstable_revalidate('/');
          await res.unstable_revalidate('/archive');
        }
        console.log('Revalidate success');
        res.status(204).send(undefined);
      }
    } catch (err) {
      console.error('Revalidate failed');
      console.error(err);
      if (err instanceof ValidationError) {
        res.status(400).json({
          statusCode: 400,
          message: 'Bad Request',
        });
      } else {
        res.status(500).json({
          statusCode: 500,
          message: 'Revalidate Failed',
        });
      }
    }
  } else {
    res.status(405).setHeader('Allow', 'POST').send(undefined);
  }
};

export default handler;
