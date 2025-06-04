import { describe, expect, it } from "vitest";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { compile } from "@mdx-js/mdx";

import remarkMdxH1 from "../src";

describe("remark-mdx-h1", () => {
  it("should extract h1 and remove it", async () => {
    const md = await fs.readFile(
      path.join(import.meta.dirname, "./fixtures/test-case-1.md"),
      "utf-8"
    );

    const result = (
      await compile(md, {
        remarkPlugins: [remarkMdxH1],
        rehypePlugins: [],
      })
    ).toString();

    expect(result).toMatchSnapshot();
  });

  it("should not extract sub heading if not exists", async () => {
    const md = await fs.readFile(
      path.join(import.meta.dirname, "./fixtures/test-case-2.md"),
      "utf-8"
    );

    const result = (
      await compile(md, {
        remarkPlugins: [remarkMdxH1],
        rehypePlugins: [],
      })
    ).toString();

    expect(result).toMatchSnapshot();
  });

  it("should not remove h1 if opt out of remove", async () => {
    const md = await fs.readFile(
      path.join(import.meta.dirname, "./fixtures/test-case-1.md"),
      "utf-8"
    );

    const result = (
      await compile(md, {
        remarkPlugins: [[remarkMdxH1, { removeHeading: false }]],
        rehypePlugins: [],
      })
    ).toString();

    expect(result).toMatchSnapshot();
  });
});
