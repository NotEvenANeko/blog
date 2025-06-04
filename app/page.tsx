import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createMarkdownProvider, type BannerType } from "@/lib/markdown";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Fragment } from "react";

interface Post {
  id: string;
  Banner: BannerType;
  title: string;
  subTitle?: string;
  createdAt: Date;
}

interface PostCardProps extends Post {
  type?: "vertical" | "horizontal";
  className?: string;
}

const PostCard = ({
  id,
  Banner,
  title,
  subTitle,
  className,
  createdAt,
  type = "vertical",
}: PostCardProps) => {
  return (
    <Link href={`/article/${id}`} className={cn("w-full h-full", className)}>
      <Card
        className={cn(
          "hover:shadow-md hover:shadow-border flex py-0 w-full h-full transition flex-col",
          type === "horizontal" && "md:flex-row"
        )}
      >
        <div className="overflow-hidden rounded-xl basis-1/2">
          <Banner className="w-full h-full object-cover" />
        </div>
        <CardHeader className="grow justify-center flex flex-col pb-6">
          <CardDescription className="mb-2">
            {createdAt.toISOString()}
          </CardDescription>
          <CardTitle className="text-2xl">{title}</CardTitle>
          <CardDescription className="wrap-anywhere">
            {subTitle}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
};

interface PostGridProps {
  posts: Post[];
}

const PostGrid = ({ posts }: PostGridProps) => {
  const [first, ...rest] = posts;

  if (!first) {
    return null;
  }

  return (
    <div className="grid grid-flow-row md:grid-rows-[12rem_24rem] grid-rows-[24rem] md:grid-cols-2 grid-cols-1 gap-4">
      <PostCard className="col-span-2" type="horizontal" {...first} />
      {rest.map(({ id, ...post }) => (
        <PostCard key={id} id={id} {...post} />
      ))}
    </div>
  );
};

const PostList = ({ posts }: { posts: Post[] }) => {
  const postsByYear = [...posts]
    .sort(({ createdAt: a }, { createdAt: b }) => (a > b ? -1 : a < b ? 1 : 0))
    .reduce<[year: number, posts: Post[]][]>((acc, cur) => {
      const year = cur.createdAt.getUTCFullYear();
      const [prevYear, prevPosts] = acc.at(-1) ?? [year, []];

      if (prevPosts.length === 0) {
        return [...acc, [prevYear, [cur]] as const];
      }

      return [...acc.slice(1, -1), [prevYear, [...prevPosts, cur]]];
    }, []);

  return (
    <div className="px-8 min-h-full mt-[4rem]">
      {postsByYear.map(([year, posts], i) => (
        <Fragment key={year}>
          <p className="font-medium text-2xl mb-8">{i ? year : "This year"}</p>
          <PostGrid posts={posts} />
        </Fragment>
      ))}
    </div>
  );
};

const Posts = async () => {
  const markdownProvider = await createMarkdownProvider();
  const files = markdownProvider.getMarkdownList();

  const posts = await Promise.all(
    files.map(async (f) => {
      const metadata = await markdownProvider.getMarkdownMetadata(f);

      return {
        id: f,
        ...metadata.metadata,
        Banner: metadata.Banner,
      };
    })
  );

  return <PostList posts={posts} />;
};

export default Posts;
