import { Heading1, P } from "@/components/markdown/typography";
import { Separator } from "@/components/ui/separator";
import { createMarkdownProvider } from "@/lib/markdown";
import type { Metadata } from "next";

export const dynamicParams = false;

export const generateStaticParams = async () => {
  const markdownProvider = await createMarkdownProvider();
  return markdownProvider.getMarkdownList().map((f) => ({ slug: f }));
};

export type Props = { params: Promise<{ slug: string }> };

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const markdownProvider = await createMarkdownProvider();

  const { metadata } = await markdownProvider.getMarkdownMetadata(
    (
      await params
    ).slug
  );

  return {
    title: {
      template: "Neko's blog - %s",
      default: metadata.title,
    },

    description: metadata.subTitle,

    openGraph: {
      type: "article",
      publishedTime: metadata.createdAt.toUTCString(),
      authors: "NotEvenANeko",
      title: metadata.title,
      description: metadata.subTitle,
    },
  };
};

const Page = async ({ params }: Props) => {
  const { slug } = await params;

  const markdownProvider = await createMarkdownProvider();
  const { Component, Banner, metadata } = await markdownProvider.getMarkdown(
    slug
  );

  return (
    <article className="m-8">
      <header className="mt-5 mb-10">
        <hgroup className="mb-10">
          <Heading1 className="mb-8 text-5xl font-medium">
            {metadata.title}
          </Heading1>
          <P>{metadata.subTitle}</P>
        </hgroup>

        <div className="rounded-4xl overflow-hidden">
          <Banner />
        </div>
      </header>

      <Separator className="mb-5" />

      <Component />
    </article>
  );
};

export default Page;
