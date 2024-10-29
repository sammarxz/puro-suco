export interface MetaProps {
  title: string;
  description: string;
  href: string;
  imageUrl: string;
}

export default function Meta(props: MetaProps) {
  const encodedTitle = encodeURIComponent(props.title);
  const ogImage =
    `https://dynamic-og-image-generator.vercel.app/api/generate?title=${encodedTitle}&author=&websiteUrl=&avatar=https%3A%2F%2Fraw.githubusercontent.com%2Fsammarxz%2Fpuro-suco%2Frefs%2Fheads%2Fmain%2Fstatic%2Flogo-symbol.svg&theme=github`;

  return (
    <>
      {/* HTML Meta Tags */}
      <title>{props.title}</title>
      <meta name="description" content={props.description} />

      {/* Google / Search Engine Tags */}
      <meta itemProp="name" content={props.title} />
      <meta itemProp="description" content={props.description} />
      {props.imageUrl && <meta itemProp="image" content={props.imageUrl} />}

      {/* Facebook Meta Tags */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={props.title} />
      <meta property="og:locale" content="pt-br" />
      <meta property="og:title" content={props.title} />
      <meta property="og:description" content={props.description} />
      <meta property="og:url" content={props.href} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={props.title} />
      <meta name="twitter:description" content={props.description} />
      <meta name="twitter:image" content={ogImage} />
    </>
  );
}
