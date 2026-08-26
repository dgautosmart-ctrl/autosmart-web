import Link from "next/link";

export default function TagPill({ tag }: { tag: string }) {
  return (
    <Link
      href={`/tags/${encodeURIComponent(tag)}`}
      className="rounded-full bg-brand-blue/10 px-2.5 py-1 text-brand-blue transition-colors hover:bg-brand-blue/20"
    >
      {tag}
    </Link>
  );
}
