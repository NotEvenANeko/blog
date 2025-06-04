import { ImageResponse } from "next/og";

import { createMarkdownProvider } from "@/lib/markdown";
import type { Props } from "./page";
import type { StaticImageData } from "next/image";

export { generateStaticParams } from "./page";

export const dynamicParams = false;

// FIXME: we need dynamic :(
export const contentType = "image/jpeg";

const Image = async ({ params }: Props) => {
  const markdownProvider = await createMarkdownProvider();
  const {
    metadata: { banner, alt },
  } = await markdownProvider.getMarkdownMetadata((await params).slug);

  const { default: Picture } = (await import(`@/public/${banner}`)) as {
    default: StaticImageData;
  };

  const src = new URL(Picture.src, process.env.NEXT_PUBLIC_URL);

  return new ImageResponse(
    <img {...Picture} src={src.toString()} alt={alt} />,
    {
      width: Picture.width,
      height: Picture.height,
      headers: {
        "content-type":
          banner.endsWith(".jpg") || banner.endsWith(".jpeg")
            ? "image/jpeg"
            : banner.endsWith(".webp")
            ? "image/webp"
            : "image/png",
      },
    }
  );
};

export default Image;
