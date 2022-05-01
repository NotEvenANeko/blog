export interface BaseResponseWithData<T = undefined> {
  statusCode: number;
  message?: string;
  data?: T;
}

export type BaseResponse<T = undefined> = undefined | BaseResponseWithData<T>;
