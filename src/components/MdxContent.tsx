import { MDXRemote } from "next-mdx-remote/rsc";

const components = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h2 className="article-heading" {...props} />,
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h3 className="article-subheading" {...props} />,
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => <p className="article-paragraph" {...props} />,
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => <ul className="article-list" {...props} />,
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => <ol className="article-list ordered" {...props} />,
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => <a className="article-link" {...props} />,
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img className="article-image" {...props} alt={props.alt || ""} />
};

export function MdxContent({ source }: { source: string }) {
  return <MDXRemote source={source} components={components} />;
}
