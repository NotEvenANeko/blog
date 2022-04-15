import type { NextApiHandler } from 'next';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';

import { GetPostListsDto } from 'lib/dtos';
import { getPostsDetail } from 'lib';

import type { BaseResponse, GetPostListsResponse } from 'lib/interfaces';

const handler: NextApiHandler<BaseResponse<GetPostListsResponse>> = async (
  req,
  res
) => {
  if (req.method === 'GET') {
    const queryParams = plainToInstance(GetPostListsDto, req.query, {
      enableImplicitConversion: true,
    });
    try {
      await validateOrReject(queryParams);
      res.status(200).json({
        statusCode: 200,
        message: 'OK',
        data: getPostsDetail(queryParams.offset, queryParams.pageSize),
      });
    } catch (error) {
      res.status(400).send(undefined);
    }
  } else {
    res.status(405).setHeader('Allow', 'GET').send(undefined);
  }
};

export default handler;
