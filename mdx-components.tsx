import type { MDXComponents } from "mdx/types";
import {
  A,
  Blockquote,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  P,
  UL,
} from "./components/markdown/typography";

export const useMDXComponents = (components: MDXComponents): MDXComponents => ({
  ...components,
  h1: Heading1,
  h2: Heading2,
  h3: Heading3,
  h4: Heading4,
  p: P,
  blockquote: Blockquote,
  ul: UL,
  a: A,
});
