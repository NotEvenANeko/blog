/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { NextConfig } from "next";
import createMdx from "@next/mdx";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  images: {
    unoptimized: true,
  },
  experimental: {
    mdxRs: false,
  },
};

const withMdx = createMdx({
  options: {
    remarkPlugins: [
      // @ts-expect-error turbopack allows string-based plugin configuration
      ["remark-frontmatter"],
      // @ts-expect-error
      ["remark-mdx-frontmatter"],
      // @ts-expect-error
      ["remark-gfm"],
      // @ts-expect-error
      ["remark-math"],
      // @ts-expect-error
      ["@notevenaneko/remark-mdx-toc"],
      // @ts-expect-error
      ["@notevenaneko/remark-mdx-h1"],
    ],
    rehypePlugins: [
      // @ts-expect-error
      ["@daiji256/rehype-mathml"],
      // @ts-expect-error
      ["rehype-prism-plus", { showLineNumbers: true }],
    ],
  },
});

export default withMdx(nextConfig);
