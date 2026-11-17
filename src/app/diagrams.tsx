/* ─── Content Strategy diagrams ───
   Drawn in HTML and CSS so they stay sharp at any size
   and follow the light and dark themes. */

function Figure({
  caption,
  children,
}: {
  caption: string;
  children: React.ReactNode;
}) {
  return (
    <figure className="my-10">
      <div className="card p-5 sm:p-8 overflow-x-auto">{children}</div>
      <figcaption className="font-mono text-xs text-muted mt-3">{caption}</figcaption>
    </figure>
  );
}

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      width="28"
      height="16"
      viewBox="0 0 28 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={`text-accent flex-shrink-0 ${className}`}
      aria-hidden="true"
    >
      <path d="M1 8h25M19 1l7 7-7 7" />
    </svg>
  );
}

/* Each atom type gets its own strength of the accent colour,
   so it can be traced from the source into each output. */
const atoms = [
  { id: "1a", name: "Heading", tone: "bg-accent text-background", bar: "bg-accent", width: "75%" },
  { id: "1b", name: "Body copy", tone: "bg-accent-alpha-strong text-foreground", bar: "bg-accent-alpha-strong", width: "100%" },
  { id: "1c", name: "CTA label", tone: "bg-accent-alpha text-accent border border-accent", bar: "bg-accent-alpha border border-accent", width: "45%" },
  { id: "URL", name: "Destination link", tone: "bg-surface-hover text-muted border border-border-medium", bar: "bg-surface-hover border border-border-medium", width: "60%" },
];

/* 01: atoms assembled into different outputs */
export function AtomicModelDiagram() {
  const outputs = [
    { name: "Web page", order: [0, 1, 2, 3] },
    { name: "Email", order: [0, 2, 3] },
    { name: "German page", order: [0, 1, 2, 3] },
  ];
  return (
    <Figure caption="One set of atoms, assembled into different pages, channels and languages">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6">
        <div className="flex-1">
          <p className="font-mono text-xs text-accent uppercase tracking-widest mb-3">Atoms</p>
          <ul className="space-y-2">
            {atoms.map((a) => (
              <li key={a.id} className={`rounded-lg px-3 py-2 text-sm flex gap-3 ${a.tone}`}>
                <span className="font-mono font-semibold min-w-[32px]">{a.id}</span>
                <span>{a.name}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex sm:flex-col items-center justify-center gap-2 text-xs text-muted font-mono">
          <Arrow className="rotate-90 sm:rotate-0" />
          <span>assemble</span>
        </div>

        <div className="flex-1">
          <p className="font-mono text-xs text-accent uppercase tracking-widest mb-3">Outputs</p>
          <div className="grid grid-cols-3 gap-3">
            {outputs.map((o) => (
              <div key={o.name} className="rounded-lg border border-border-medium p-2">
                <div className="space-y-1.5 mb-2">
                  {o.order.map((i) => (
                    <div
                      key={i}
                      className={`h-3 rounded ${atoms[i].bar}`}
                      style={{ width: atoms[i].width }}
                    />
                  ))}
                </div>
                <p className="text-xs text-muted leading-tight">{o.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Figure>
  );
}

/* 02: three independent branches for each blog post */
export function TaxonomyTreeDiagram() {
  const branches = [
    {
      name: "Category",
      what: "What it is about",
      examples: ["Cloud", "GDPR", "Making Tax Digital"],
      lang: "Stays in English",
    },
    {
      name: "Business Area",
      what: "Which part of the business",
      examples: ["HR and Payroll", "Accounting", "CRM"],
      lang: "Stays in English",
    },
    {
      name: "Industry",
      what: "Which sector",
      examples: ["Financial services → Servicios financieros"],
      lang: "Translated per market",
      translated: true,
    },
  ];
  return (
    <Figure caption="Every blog post is tagged on three branches, each one independent of the others">
      <div className="flex flex-col items-center">
        <div className="rounded-lg bg-accent text-background px-5 py-2 text-sm font-semibold">
          Blog post
        </div>
        <div className="w-px h-6 bg-border-medium" />
        <div className="hidden sm:block h-px bg-border-medium w-2/3" />
        <div className="grid sm:grid-cols-3 gap-4 w-full">
          {branches.map((b) => (
            <div key={b.name} className="flex flex-col items-center">
              <div className="hidden sm:block w-px h-6 bg-border-medium" />
              <div className="rounded-lg border border-border-medium p-4 w-full h-full flex flex-col">
                <p className="font-mono text-sm text-accent font-semibold">{b.name}</p>
                <p className="text-xs text-muted mb-3">{b.what}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {b.examples.map((e) => (
                    <span key={e} className="text-xs rounded-full px-2.5 py-1 bg-surface-hover text-foreground/80">
                      {e}
                    </span>
                  ))}
                </div>
                <span
                  className={`mt-auto self-start text-[11px] font-mono rounded px-2 py-0.5 ${
                    b.translated ? "bg-accent-alpha-strong text-accent" : "bg-surface-hover text-muted"
                  }`}
                >
                  {b.lang}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Figure>
  );
}

/* 03: the copydeck grid, atoms down the side and markets across the top */
export function CopydeckDiagram() {
  const markets = ["GB", "US", "DE", "ES", "FR"];
  const rows = [
    { id: "1a", name: "Heading" },
    { id: "1b", name: "Body copy" },
    { id: "1c", name: "CTA label", highlight: true },
    { id: "URL", name: "Link" },
  ];
  return (
    <Figure caption="Illustration of the copydeck layout: the same numbered grid for every market">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr>
            <th className="text-left font-mono text-xs text-muted font-medium pb-3 pr-3">Atom</th>
            {markets.map((m) => (
              <th key={m} className="font-mono text-xs text-accent font-semibold pb-3 px-1">
                {m}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="border-t border-border">
              <td className="py-2.5 pr-3 whitespace-nowrap">
                <span className="font-mono text-accent font-semibold mr-2">{r.id}</span>
                <span className="text-muted text-xs hidden sm:inline">{r.name}</span>
              </td>
              {markets.map((m) => (
                <td key={m} className="py-2.5 px-1">
                  <div
                    className={`h-6 rounded ${
                      r.highlight ? "bg-accent-alpha-strong border border-accent" : "bg-surface-hover"
                    }`}
                    aria-hidden="true"
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-xs text-muted mt-4 flex items-center gap-2">
        <span className="inline-block w-3 h-3 rounded-sm bg-accent-alpha-strong border border-accent" />
        Changing a CTA label is one row, across five columns
      </p>
    </Figure>
  );
}

/* 04: 28 locales feeding into six pipelines */
export const localeGroups = [
  { group: "A", locales: ["fr-CA", "en-CA", "en-US"] },
  { group: "B", locales: ["en-AU", "id-ID", "th-TH", "zh-CN", "en-HK", "en-SG", "en-MY"] },
  { group: "C", locales: ["es-ES", "pt-PT"] },
  { group: "D", locales: ["fr-FR", "fr-MA", "fr-BE", "nl-BE"] },
  { group: "E", locales: ["de-DE", "de-AT", "pl-PL", "de-CH", "fr-CH", "it-CH"] },
  { group: "F", locales: ["en-ZA", "en-KE", "en-NG", "en-TV", "en-ZW", "en-AE"] },
];

export function LocalePipelineDiagram() {
  return (
    <Figure caption="Locales grouped by shared translation vendors, review cycles and regulatory requirements">
      <div className="flex justify-between font-mono text-xs uppercase tracking-widest mb-4">
        <span className="text-muted">Locales</span>
        <span className="text-accent">Pipelines</span>
      </div>
      <ul className="space-y-3">
        {localeGroups.map((g) => (
          <li key={g.group} className="flex items-center gap-3">
            <div className="flex flex-wrap gap-1.5 flex-1">
              {g.locales.map((l) => (
                <span
                  key={l}
                  className="font-mono text-[11px] rounded px-1.5 py-0.5 bg-surface-hover text-foreground/80"
                >
                  {l}
                </span>
              ))}
            </div>
            <Arrow />
            <div className="rounded-lg bg-accent-alpha-strong text-accent px-3 py-1.5 min-w-[96px] text-center">
              <span className="font-mono text-sm font-semibold">Group {g.group}</span>
            </div>
          </li>
        ))}
      </ul>
    </Figure>
  );
}
