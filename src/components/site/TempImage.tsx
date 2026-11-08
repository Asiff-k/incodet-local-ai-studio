import { tempImages, tempImageSrc, type TempImageId } from "@/content/tempImages";
import { cn } from "@/lib/utils";

/** Self-hosted temporary image (see docs/temp-images.md), served at 1x and 2x via srcset. */
export function TempImage({
  id,
  sizes,
  eager = false,
  className,
}: {
  id: TempImageId;
  sizes: string;
  eager?: boolean;
  className?: string;
}) {
  const { widths, alt } = tempImages[id];
  const smallest = widths[0] ?? 300;
  return (
    <img
      src={tempImageSrc(id, smallest)}
      srcSet={widths.map((w) => `${tempImageSrc(id, w)} ${w}w`).join(", ")}
      sizes={sizes}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      className={cn("size-full object-cover", className)}
    />
  );
}
