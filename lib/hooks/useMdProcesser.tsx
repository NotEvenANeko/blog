import { useEffect, useState, useMemo, createElement, Fragment } from 'react';

import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import remarkEmoji from 'remark-emoji';
import remarkHint from 'remark-hint';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import rehypeKatex from 'rehype-katex';
import rehypePrism from 'rehype-prism-plus';
import rehypeReact, { Options } from 'rehype-react';

export const useMdProcesser = (
  text: string,
  mapping?: Options['components']
) => {
  const [content, setContent] = useState(<></>);

  const processer = useMemo(
    () =>
      unified()
        .use(remarkParse)
        .use(remarkBreaks)
        .use(remarkEmoji)
        .use(remarkHint)
        .use(remarkGfm, {
          singleTilde: false,
        })
        .use(remarkMath)
        .use(remarkRehype)
        .use(rehypeKatex)
        .use(rehypePrism, { showLineNumbers: true })
        .use(rehypeSlug)
        .use(rehypeReact, {
          createElement,
          Fragment,
          components: mapping,
        } as Options),
    [mapping]
  );

  useEffect(() => {
    void processer.process(text).then((file) => {
      setContent(file.result);
    });
  }, [text, processer]);

  return content;
};
