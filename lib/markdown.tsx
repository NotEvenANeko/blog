import * as path from "node:path";
import * as fs from "node:fs/promises";

import { z } from "zod";
import type { ComponentProps, ReactElement } from "react";
import Image, { type StaticImageData } from "next/image";

interface RawMetadata {
  frontmatter: unknown;
  toc: unknown;
  h1: unknown;
}

const H1Schema = z.object({
  heading: z.string(),
  subHeading: z.string().optional(),
});

const TocSchema = z
  .array(
    z.object({
      depth: z.number().int(),
      heading: z.string(),
      data: z.unknown(),
    })
  )
  .optional();

const FrontMatterSchema = z.object({
  banner: z.string(),
  alt: z.string(),
});

interface Metadata {
  title: string;
  subTitle: string | undefined;
  toc: z.infer<typeof TocSchema>;
  banner: string;
  alt: string;
  createdAt: Date;
  updatedAt: Date;
}

interface FileStatExtra {
  createdAt: Date;
  updatedAt: Date;
}

const parseMetadata = async (
  { frontmatter, h1, toc }: RawMetadata,
  extra: FileStatExtra
) => {
  const parsedFrontMatter = await FrontMatterSchema.parseAsync(frontmatter);
  const parsedH1 = await H1Schema.parseAsync(h1);
  const parsedToc = await TocSchema.parseAsync(toc);

  return {
    title: parsedH1.heading,
    subTitle: parsedH1.subHeading,
    toc: parsedToc,
    banner: parsedFrontMatter.banner,
    alt: parsedFrontMatter.alt,
    ...extra,
  } satisfies Metadata;
};

const getFsStatExtra = async (file: string) => {
  const stat = await fs.stat(file);

  return {
    createdAt: stat.ctime,
    updatedAt: stat.mtime,
  } satisfies FileStatExtra;
};

const getBannerComponent = async ({
  alt,
  banner,
}: Pick<Metadata, "alt" | "banner">) => {
  const { default: Picture } = (await import(`@/public/${banner}`)) as {
    default: StaticImageData;
  };

  return function Banner(
    props: Omit<ComponentProps<typeof Image>, "src" | "alt">
  ) {
    return <Image src={Picture} alt={alt} {...props} />;
  };
};

export type BannerType = Awaited<ReturnType<typeof getBannerComponent>>;

export const createMarkdownProvider = async (
  rootDir = path.join(process.cwd(), "./markdown")
) => {
  const paths: Map<string, string> = new Map();

  const dir = path.resolve(rootDir);

  const files = await fs.readdir(dir, "utf-8");

  files.forEach((f) => {
    paths.set(path.basename(f, path.extname(f)), path.join(dir, f));
  });

  return {
    getMarkdownList: () => {
      return [...paths.keys()];
    },

    getMarkdownMetadata: async (name: string) => {
      const file = paths.get(name);

      if (!file) {
        throw new Error(`can't find file ${name}`);
      }

      const mdx = (await import(`@/markdown/${name}.mdx`)) as RawMetadata;

      const metadata = await parseMetadata(mdx, await getFsStatExtra(file));

      return { metadata, Banner: await getBannerComponent(metadata) };
    },

    getMarkdown: async (name: string) => {
      const file = paths.get(name);

      if (!file) {
        throw new Error(`can't find file ${name}`);
      }

      const { default: Component, ...raw } = (await import(
        `@/markdown/${name}.mdx`
      )) as {
        default: () => ReactElement;
      } & RawMetadata;

      const metadata = await parseMetadata(raw, await getFsStatExtra(file));

      return {
        Component,
        Banner: await getBannerComponent(metadata),
        metadata,
      };
    },
  };
};
