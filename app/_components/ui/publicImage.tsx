import Image, { type ImageProps } from "next/image";

const PRODUCTION_PREFIX = "/terrenos/mazatlan-02";

export function PublicImage({ src, alt, ...props }: ImageProps) {
    const isProduction = process.env.NODE_ENV === "production";
    const imageSrc = typeof src === "string" && src.startsWith("/") && isProduction
        ? `${PRODUCTION_PREFIX}${src}`
        : src;
    const imageAlt = alt ?? "Image";

    return <Image src={imageSrc} alt={imageAlt} {...props} />;
}
