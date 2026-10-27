import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import type { SiteEntity } from "@/types/site";

type EntityCardProps = {
  entity: SiteEntity;
  href: string;
  label?: string;
};

export function EntityCard({ entity, href, label = "Read More" }: EntityCardProps) {
  return (
    <Reveal as="article" className="entity-card">
      {entity.image ? (
        <img src={entity.image} alt={entity.title} />
      ) : (
        <div className="image-fallback" aria-hidden="true">{entity.title.slice(0, 2)}</div>
      )}
      <div className="card-body">
        {entity.category ? <span className="card-kicker">{entity.category}</span> : null}
        <h3>{entity.title}</h3>
        <p
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 4,
            overflow: "hidden"
          }}
        >
          {entity.description}
        </p>
        <Link
          href={href}
          className="inline-flex items-center rounded-full border border-cyan-600 !bg-white px-4 py-2 text-sm font-bold !text-cyan-700 shadow-lg transition hover:!bg-cyan-600 hover:!text-white"
        >
          {label}
        </Link>
      </div>
    </Reveal>
  );
}
