import Link from "next/link";
import type { SiteEntity } from "@/types/site";

type EntityCardProps = {
  entity: SiteEntity;
  href: string;
  label?: string;
};

export function EntityCard({ entity, href, label = "Read More" }: EntityCardProps) {
  return (
    <article className="entity-card">
      {entity.image ? (
        <img src={entity.image} alt={entity.title} />
      ) : (
        <div className="image-fallback" aria-hidden="true">{entity.title.slice(0, 2)}</div>
      )}
      <div className="card-body">
        {entity.category ? <span className="card-kicker">{entity.category}</span> : null}
        <h3>{entity.title}</h3>
        <p>{entity.description}</p>
        <Link href={href}>{label}</Link>
      </div>
    </article>
  );
}
