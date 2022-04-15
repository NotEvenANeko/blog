import { BaseResponse } from 'lib/interfaces';
import { useCallback, useEffect, useState } from 'react';
import { throttle } from 'throttle-debounce';

export const useLoadMore = <T = unknown>(
  url: string,
  initialData?: T[],
  pageSize = 10
) => {
  const [curPage, setCurPage] = useState(1);
  const [data, setData] = useState<T[]>(initialData ?? []);
  const [loading, setLoading] = useState(false);
  const [noMore, setNoMore] = useState(false);

  const loadMore = useCallback(async () => {
    setLoading(true);
    console.log('loading...');
    const prePage = curPage;
    setCurPage((cur) => cur + 1);
    try {
      const newData =
        (
          (await (
            await fetch(
              `${url}?pageSize=${pageSize}&offset=${prePage * pageSize}`
            )
          ).json()) as BaseResponse<T[]>
        )?.data ?? [];
      setData((data) => [...data, ...newData]);
      if (newData.length === 0) setNoMore(true);
      console.log(newData);
    } finally {
      setLoading(false);
    }
  }, [curPage, pageSize, url]);

  useEffect(() => {
    const onScroll = throttle(50, () => {
      if (
        document.documentElement.scrollTop +
          document.documentElement.clientHeight +
          0.02 * window.innerHeight >
          document.documentElement.scrollHeight &&
        !loading &&
        !noMore
      ) {
        void loadMore();
      }
    });
    document.addEventListener('scroll', onScroll);
    return () => document.removeEventListener('scroll', onScroll);
  }, [loadMore, loading, noMore]);

  return {
    data,
    loadMore,
    loading,
    noMore,
  };
};
