import type { Root } from "mdast";
import type { Plugin } from "unified";
import { visit } from "unist-util-visit";
import { define } from "unist-util-mdx-define";
import { toString } from "mdast-util-to-string";
import { valueToEstree } from "estree-util-value-to-estree";

export interface RemarkMdxTocOptions {
  maxDepth?: number;
  exportIdentifier?: string;
}

export interface RemarkMdxTocItem {
  depth: number;
  heading: string;
  data?: unknown;
}

export type RemarkMdxTocResult = RemarkMdxTocItem[];

const remarkMdxToc: Plugin<[RemarkMdxTocOptions?], Root> = ({
  exportIdentifier = "toc",
  maxDepth = 6,
}: RemarkMdxTocOptions = {}) => {
  return (ast, file) => {
    const toc: RemarkMdxTocResult = [];

    visit(ast, "heading", (node) => {
      if (node.depth <= maxDepth) {
        toc.push({
          depth: node.depth,
          heading: toString(node.children, { includeImageAlt: false }),
          data: node.data,
        });
      }
    });

    define(ast, file, {
      [exportIdentifier]: valueToEstree(toc, { preserveReferences: true }),
    });
  };
};

export default remarkMdxToc;
