import { describe, expect, it } from "vitest";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { compile } from "@mdx-js/mdx";

import remarkMdxToc from "../src";

describe("remark-mdx-toc", () => {
  it("should extract headings", async () => {
    const md = await fs.readFile(
      path.join(import.meta.dirname, "./fixtures/test-case-1.md"),
      "utf-8"
    );

    const result = (
      await compile(md, {
        remarkPlugins: [remarkMdxToc],
        rehypePlugins: [],
      })
    ).toString();

    expect(result).toMatchSnapshot();
  });
});
