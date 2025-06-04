import type { Plugin } from "unified";
import type { Root, RootContent } from "mdast";
import { find } from "unist-util-find";
import { findAfter } from "unist-util-find-after";
import { define } from "unist-util-mdx-define";
import { remove } from "unist-util-remove";
import { toString } from "mdast-util-to-string";
import { valueToEstree } from "estree-util-value-to-estree";

export interface RemarkMdxH1Options {
  includeSubHeading?: boolean;
  exportIdentifier?: string;
  subHeadingType?: RootContent["type"];
  removeHeading?: boolean;
}

export type RemarkMdxH1Result =
  | { heading: string; subHeading?: string }
  | undefined;

const remarkMdxH1: Plugin<[RemarkMdxH1Options?], Root> = ({
  includeSubHeading = true,
  subHeadingType = "paragraph",
  exportIdentifier = "h1",
  removeHeading = true,
}: RemarkMdxH1Options = {}) => {
  return (ast, file) => {
    const h1 = find(ast, { type: "heading", depth: 1 }) as
      | (RootContent & { type: "heading" })
      | undefined;

    if (!h1) {
      define(ast, file, { [exportIdentifier]: valueToEstree(undefined) });
      return;
    }

    const subHeading = includeSubHeading
      ? (findAfter(ast, h1, { type: subHeadingType }) as RootContent)
      : undefined;

    if (removeHeading) {
      remove(ast, h1);
      subHeading && remove(ast, subHeading);
    }

    define(ast, file, {
      [exportIdentifier]: valueToEstree({
        heading: toString(h1, { includeImageAlt: false }),
        subHeading:
          subHeading && toString(subHeading, { includeImageAlt: false }),
      } satisfies RemarkMdxH1Result),
    });
  };
};

export default remarkMdxH1;
