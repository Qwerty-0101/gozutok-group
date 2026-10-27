import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { POLICIES, getPolicy } from "../policies";

export const dynamicParams = false;

export function generateStaticParams() {
  return POLICIES.map((policy) => ({ slug: policy.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const policy = getPolicy(slug);
  if (!policy) return {};
  return {
    title: `${policy.title} | Gözütok Grup`,
    description: policy.description,
  };
}

export default async function PolicyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const policy = getPolicy(slug);
  if (!policy) notFound();

  return (
    <main className="bg-mist">
      <section className="border-b bg-white">
        <div className="shell py-16 sm:py-20 lg:py-24">
          <span className="eyebrow text-brick">Kurumsal politikalar</span>
          <h1 className="section-title mt-6 max-w-4xl">{policy.title}</h1>
          <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4 text-sm">
            <div>
              <dt className="text-[10px] font-bold tracking-[.18em] text-space/45 uppercase">Doküman No</dt>
              <dd className="mt-1 font-semibold">{policy.docNo}</dd>
            </div>
            <div>
              <dt className="text-[10px] font-bold tracking-[.18em] text-space/45 uppercase">Yayın Tarihi</dt>
              <dd className="mt-1 font-semibold">{policy.publishedAt}</dd>
            </div>
            <div>
              <dt className="text-[10px] font-bold tracking-[.18em] text-space/45 uppercase">Rev. No</dt>
              <dd className="mt-1 font-semibold">{policy.revision}</dd>
            </div>
          </dl>
        </div>
      </section>

      <div className="shell grid gap-12 py-14 sm:py-20 lg:grid-cols-[240px_1fr] lg:gap-20">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="text-[11px] font-bold tracking-[.18em] text-brick uppercase">Tüm politikalar</h2>
          <nav aria-label="Politikalar" className="mt-5 grid border-t text-sm">
            {POLICIES.map((item) => {
              const isActive = item.slug === policy.slug;
              return (
                <Link
                  key={item.slug}
                  href={`/politikalar/${item.slug}`}
                  aria-current={isActive ? "page" : undefined}
                  className={`border-b py-3 transition hover:text-brick ${isActive ? "font-semibold text-brick" : "text-space/65"}`}
                >
                  {item.title}
                </Link>
              );
            })}
          </nav>
        </aside>

        <article className="max-w-3xl rounded-[2rem] bg-white p-7 shadow-[0_24px_80px_-50px_rgba(0,48,73,.45)] sm:p-12">
          <div className="policy-prose">{policy.content}</div>

          <footer className="mt-14 border-t pt-8 text-sm">
            {policy.signature.company && (
              <p className="font-semibold">{policy.signature.company}</p>
            )}
            {policy.signature.name && (
              <p className="mt-4 font-semibold">{policy.signature.name}</p>
            )}
            <p className={policy.signature.name ? "text-space/60" : "font-semibold"}>
              {policy.signature.title}
            </p>
          </footer>
        </article>
      </div>
    </main>
  );
}
