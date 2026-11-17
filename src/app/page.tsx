"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  AtomicModelDiagram,
  TaxonomyTreeDiagram,
  CopydeckDiagram,
  LocalePipelineDiagram,
} from "./diagrams";

/* ─── Theme toggle ─── */
function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    if (current === "dark" || current === "light") {
      setTheme(current);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    }
  }, []);

  function toggle() {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch {}
  }

  return (
    <button
      onClick={toggle}
      className="theme-toggle"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      )}
    </button>
  );
}

/* ─── Tabs ─── */
const tabs = [
  { id: "process", label: "Processes" },
  { id: "ux-writing", label: "UX Writing" },
  { id: "conversational-ai", label: "Conversational AI" },
  { id: "content-strategy", label: "Content Strategy" },
  { id: "e-commerce", label: "E-commerce" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabId>("process");

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header bar */}
      <header className="border-b border-border">
        <div className="max-w-[680px] mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
          {/* Badge */}
          <div className="reveal mb-8">
            <span className="badge">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Content &amp; Conversation Design
            </span>
          </div>

          {/* Headline */}
          <h1 className="reveal reveal-delay-1 text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.1] tracking-tight mb-6">
            Lea{" "}
            <span className="gradient-text">Welch</span>
          </h1>

          {/* Subline */}
          <p className="reveal reveal-delay-2 text-lg sm:text-xl text-muted max-w-lg mx-auto leading-relaxed">
            Senior Content Designer and Conversation Designer. Making
            complicated things simple across government digital services and
            regulated financial services.
          </p>

          {/* Tags */}
          <div className="reveal reveal-delay-3 flex flex-wrap justify-center gap-2 mt-8">
            {["GDS", "Conversational AI", "Gov.UK", "Localisation", "Taxonomy"].map(
              (tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 text-xs font-mono tracking-wide border border-border rounded-full text-muted"
                >
                  {tag}
                </span>
              )
            )}
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border" style={{ background: "var(--backdrop)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <div className="flex gap-0 overflow-x-auto flex-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 sm:px-5 py-4 text-sm font-medium whitespace-nowrap transition-colors cursor-pointer
                  ${
                    activeTab === tab.id
                      ? "text-accent tab-active"
                      : "text-muted hover:text-foreground"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <ThemeToggle />
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-3xl mx-auto w-full px-4 sm:px-6 py-14 sm:py-20 flex-1">
        {activeTab === "process" && <ProcessContent />}
        {activeTab === "ux-writing" && <PlaceholderContent title="UX Writing" />}
        {activeTab === "conversational-ai" && (
          <PlaceholderContent title="Conversational AI" />
        )}
        {activeTab === "content-strategy" && <ContentStrategyContent />}
        {activeTab === "e-commerce" && <EcommerceContent />}
      </main>

      {/* Footer */}
      <footer className="border-t border-border text-muted py-10 mt-auto">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-mono text-sm">
            &copy; 2026 Lea Welch
          </p>
          <ThemeToggle />
        </div>
      </footer>
    </div>
  );
}

/* ─── Process Case Study ─── */
function ProcessContent() {
  return (
    <article>
      {/* Case Study Header */}
      <div className="mb-14 sm:mb-20">
        <span className="badge mb-6">Case Study</span>
        <h2 className="text-3xl sm:text-[2.75rem] font-semibold mb-5 leading-tight tracking-tight">
          Improving the UK
          <br />
          <span className="gradient-text">export journey</span>
        </h2>
        <p className="text-muted text-lg max-w-xl leading-relaxed">
          Working with the UK government to help increase exporting and
          strengthen the UK economy.
        </p>
      </div>

      {/* Hero Image */}
      <div className="card overflow-hidden mb-16">
        <Image
          src="/images/process/page2_img0.png"
          alt="UK economy and exports, London skyline with Union Jack"
          width={1200}
          height={600}
          className="w-full h-64 sm:h-96 object-cover"
          priority
        />
      </div>

      {/* The Challenge */}
      <Section number="01" title="The challenge">
        <div className="grid sm:grid-cols-2 gap-8 items-start">
          <div>
            <p className="text-lg leading-relaxed mb-6">
              I was part of a service team charged with creating a new system to
              help increase exports from the UK. My role as Senior Content
              Designer was to audit current content, assess user needs and find
              the gaps. Then develop, test and refine content until it was ready
              for the Beta phase.
            </p>
            <div className="space-y-1">
              <Stat label="Export licences available" value="22" />
              <Stat label="Previous system age" value="16 years" />
              <p className="py-3 text-muted text-sm">
                Exporters were confused about which licence to apply for.
              </p>
            </div>
          </div>
          <Card>
            <CardLabel>The impact</CardLabel>
            <p className="leading-relaxed text-muted">
              The benefit of the new system would be twofold: saving the
              government millions of pounds, and enabling exporters to do
              business with the rest of the world more easily, helping boost the
              UK economy.
            </p>
          </Card>
        </div>
      </Section>

      {/* The Old System */}
      <Section number="02" title="The current system (SPIRE)">
        <p className="text-lg leading-relaxed mb-8 max-w-xl">
          The current system was overwhelming, out-of-date and utterly
          confusing. It didn&apos;t fit with the GDS pattern library and was
          simply unusable to most people.
        </p>
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="card overflow-hidden">
            <Image
              src="/images/process/page3_img0.png"
              alt="The old SPIRE export licensing system homepage"
              width={702}
              height={777}
              className="w-full"
            />
            <div className="p-4 border-t border-border">
              <p className="text-sm text-muted font-mono">
                The SPIRE sign-in page: dense, cluttered, broken
              </p>
            </div>
          </div>
          <div className="space-y-6">
            <div className="card overflow-hidden">
              <Image
                src="/images/process/page3_img1.png"
                alt="SPIRE system interior showing cluttered interface"
                width={842}
                height={727}
                className="w-full"
              />
            </div>
            <div className="card overflow-hidden">
              <Image
                src="/images/process/page3_img2.png"
                alt="SPIRE system tooltip showing badly-worded help content"
                width={839}
                height={661}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* How I Started */}
      <Section number="03" title="How I started">
        <div className="grid sm:grid-cols-2 gap-8 items-start">
          <div>
            <p className="text-lg leading-relaxed mb-6">
              I started from scratch. The &lsquo;helpful&rsquo; content was
              written in PDFs and hosted on the sign-in page. Once inside the
              system, the contextual help appeared in long, badly-worded
              tooltips.
            </p>
            <Card>
              <CardLabel>Key questions</CardLabel>
              <ul className="space-y-3">
                <ListItem>What would be most helpful to our users to know?</ListItem>
                <ListItem>When was the right time to give them that info?</ListItem>
                <ListItem>Which format would be best?</ListItem>
              </ul>
            </Card>
          </div>
          <div className="card overflow-hidden">
            <Image
              src="/images/process/page4_img0.png"
              alt="Initial content mapping and flow sketching"
              width={570}
              height={880}
              className="w-full"
            />
            <div className="p-4 border-t border-border">
              <p className="text-sm text-muted font-mono">
                Mapping the main questions for the user flow with PM, BA and
                user researcher
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Mapping the Flow */}
      <Section number="04" title="Mapping the flow in Sketch">
        <p className="text-lg leading-relaxed mb-8 max-w-xl">
          Based on the type of answer, I decided on the interaction along with
          the interaction designer and the amount of content needed to guide a
          user through to the next screen. I use Sketch, Figma or Miro for this
          type of work as it&apos;s easily shared with the designers and good for
          stakeholder workshops.
        </p>
        <div className="card overflow-hidden">
          <Image
            src="/images/process/page5_img0.png"
            alt="User flow mapped in Sketch using GDS components"
            width={912}
            height={926}
            className="w-full"
          />
          <div className="p-4 border-t border-border">
            <p className="text-sm text-muted font-mono">
              A quick flow using Sketch with GDS pattern library components
            </p>
          </div>
        </div>
      </Section>

      {/* Content in Github */}
      <Section number="05" title="Content workflow using GitHub">
        <div className="grid sm:grid-cols-2 gap-8 items-start">
          <div>
            <p className="text-lg leading-relaxed mb-6">
              I taught myself how to write content strings in JSON and set up a
              GitHub account. This helped speed up the delivery and sign off. I
              then created a local content repository for the dev team when
              they were building prototypes.
            </p>
            <Card>
              <CardLabel>Why this matters</CardLabel>
              <p className="leading-relaxed text-muted">
                It means the right content gets in for testing without faffing
                about with versioning in Word or Excel. The developers have
                everything they need to build a good prototype, which means the
                user researcher has something meaty to test.
              </p>
            </Card>
          </div>
          <div className="card overflow-hidden">
            <Image
              src="/images/process/page7_img0.png"
              alt="Content strings written in JSON in a GitHub repository"
              width={1264}
              height={814}
              className="w-full"
            />
            <div className="p-4 border-t border-border">
              <p className="text-sm text-muted font-mono">
                Content strings in JSON, managed in GitHub
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* User Testing */}
      <Section number="06" title="User testing with content">
        <div className="grid sm:grid-cols-2 gap-8 items-start">
          <div>
            <p className="text-lg leading-relaxed mb-6">
              I devised the screens for the user journey and worked with the
              developer to create prototypes. I also worked with the user
              researcher to develop the discussion guide questionnaire.
            </p>
            <p className="text-lg leading-relaxed">
              Where were the sticking points? Was the content easily understood?
              How long did it take for the journey to be completed? I took
              in-depth notes during the interviews with screenshots of the
              prototype to get a deeper understanding of the users.
            </p>
          </div>
          <div className="card overflow-hidden">
            <Image
              src="/images/process/page8_img0.png"
              alt="User testing session notes with prototype screenshots"
              width={1041}
              height={728}
              className="w-full"
            />
          </div>
        </div>
      </Section>

      {/* Handover */}
      <Section number="07" title="Building a handover content doc">
        <p className="text-lg leading-relaxed mb-8 max-w-xl">
          All of the content to be reviewed with the government needs to be
          built in a secure environment. The only approved shared tools that all
          stakeholders had across sites were Confluence and Jira. Feedback and
          corrections are gathered and then this is used as a reference/handover
          document for stakeholders.
        </p>
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="card overflow-hidden">
            <Image
              src="/images/process/page9_img0.png"
              alt="Handover document in Confluence"
              width={973}
              height={767}
              className="w-full"
            />
          </div>
          <div className="card overflow-hidden">
            <Image
              src="/images/process/page9_img1.png"
              alt="Content review document detail"
              width={955}
              height={673}
              className="w-full"
            />
          </div>
        </div>
      </Section>

      {/* Results */}
      <Section number="08" title="Results">
        <div className="grid sm:grid-cols-2 gap-8 items-start">
          <div>
            <p className="text-lg leading-relaxed mb-6">
              The outcome of the initial round of testing was positive, but not
              without some sticking points.
            </p>
            <div className="space-y-4">
              <div className="rounded-xl border-l-[3px] border-accent p-5" style={{ background: "var(--accent-alpha)" }}>
                <p className="font-medium mb-1 text-sm">The challenge</p>
                <p className="text-muted text-sm">
                  Even though we tested with &lsquo;experts&rsquo;, some of the
                  technical language made them struggle. It needs more
                  refinement and perhaps more interviews to focus on the
                  language.
                </p>
              </div>
              <div className="rounded-xl border-l-[3px] border-green-500 p-5" style={{ background: "rgba(34, 197, 94, 0.06)" }}>
                <p className="font-medium mb-1 text-sm">The win</p>
                <p className="text-muted text-sm">
                  All test participants managed to complete the task and apply
                  for an export licence in under 10 minutes. That&apos;s a
                  massive leap from the standard 45 minutes using the
                  out-of-date system.
                </p>
              </div>
            </div>
          </div>
          <div className="card flex flex-col items-center justify-center p-10 sm:p-14 text-center">
            <p className="text-5xl sm:text-6xl font-semibold gradient-text mb-2">
              78%
            </p>
            <p className="text-muted font-mono text-sm">
              time reduction
            </p>
            <div className="mt-6 flex items-center gap-3 text-muted">
              <span className="text-2xl line-through opacity-50">45 min</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
              <span className="text-2xl text-foreground font-medium">10 min</span>
            </div>
          </div>
        </div>
      </Section>

      {/* Reflection */}
      <Section number="09" title="What I'd do differently">
        <Card className="max-w-xl">
          <p className="text-lg leading-relaxed text-muted italic">
            &ldquo;I would test with complete novices earlier on because
            that&apos;s where I know I&apos;ll get some gold dust. A rising
            tide floats all boats.&rdquo;
          </p>
        </Card>
      </Section>
    </article>
  );
}

/* ─── Content Strategy Case Study ─── */
function ContentStrategyContent() {
  return (
    <article>
      {/* Case Study Header */}
      <div className="mb-14 sm:mb-20">
        <span className="badge mb-6">Case Study</span>
        <h2 className="text-3xl sm:text-[2.75rem] font-semibold mb-5 leading-tight tracking-tight">
          Structured content,
          <br />
          <span className="gradient-text">taxonomy and localisation at scale</span>
        </h2>
        <p className="text-muted text-lg max-w-xl leading-relaxed">
          Designing reusable content structures, hierarchical taxonomies and
          localisation workflows across 26+ locales at Sage.
        </p>
      </div>

      {/* Atomic Content Modelling */}
      <Section number="01" title="The approach: atomic content modelling">
        <div className="grid sm:grid-cols-2 gap-8 items-start">
          <div>
            <p className="text-lg leading-relaxed mb-6">
              Atomic content modelling treats every piece of content as a
              discrete, reusable unit rather than a page-bound block of text. A
              heading, a body paragraph, a call-to-action label and its
              destination URL each become independent atoms that can be
              assembled, translated and governed separately.
            </p>
            <p className="text-lg leading-relaxed">
              The practical benefits are straightforward: translators work on
              isolated strings rather than full pages, governance teams review
              one source of truth instead of dozens of locale copies, and
              content can be updated in a single place and flow outward.
            </p>
          </div>
          <Card>
            <CardLabel>How it works</CardLabel>
            <ul className="space-y-3">
              <ListItem>Break content into smallest meaningful units (atoms)</ListItem>
              <ListItem>Each atom is independently translatable and governable</ListItem>
              <ListItem>Assemble atoms into pages, channels and locales from one source</ListItem>
              <ListItem>Update once, publish everywhere</ListItem>
            </ul>
          </Card>
        </div>
        <AtomicModelDiagram />
      </Section>

      {/* Sage Blog Taxonomy */}
      <Section number="02" title="Sage blog taxonomy: 76 categories across six languages">
        <p className="text-lg leading-relaxed mb-8 max-w-xl">
          The Sage blog taxonomy mapped 215 content items to 76 unique
          categories across six language variants: EN-GB, EN-US, DE-DE, ES-ES,
          FR-FR and EN-FR. Each item carried a structured path, a legacy URL,
          its taxonomy classification and a language tag.
        </p>
        <div className="grid grid-cols-3 gap-4 mb-10">
          <StatCard value="215" label="content items mapped" />
          <StatCard value="76" label="unique categories" />
          <StatCard value="6" label="language variants" />
        </div>
        <TaxonomyTreeDiagram />
        <p className="text-lg leading-relaxed mt-8 max-w-xl">
          This separation meant any blog post could be classified by what it was
          about, which part of the business it served and which industry it
          addressed, all independently. Category and Business Area labels stayed
          in English across locales as the shared skeleton, while Industry labels
          were translated to match local market expectations.
        </p>
      </Section>

      {/* Sage Home Page */}
      <Section number="03" title="Sage home page: atomised content across five markets">
        <p className="text-lg leading-relaxed mb-8 max-w-xl">
          The sage.com home page content was structured as a copydeck of
          discrete, numbered atoms replicated across GB, US, DE, ES and FR.
        </p>
        <Card className="mb-8">
          <CardLabel>Atom structure per content block</CardLabel>
          <div className="space-y-0">
            <div className="flex items-center gap-4 py-3 border-b border-border">
              <span className="font-mono text-accent font-semibold text-sm min-w-[48px]">1a</span>
              <span className="text-muted text-sm flex-1">Heading</span>
              <span className="text-foreground/70 text-sm">&ldquo;Sage Business Cloud&rdquo;</span>
            </div>
            <div className="flex items-center gap-4 py-3 border-b border-border">
              <span className="font-mono text-accent font-semibold text-sm min-w-[48px]">1b</span>
              <span className="text-muted text-sm flex-1">Body copy</span>
              <span className="text-foreground/70 text-sm max-w-xs truncate">&ldquo;Whether you&apos;re running a startup or a global enterprise&hellip;&rdquo;</span>
            </div>
            <div className="flex items-center gap-4 py-3 border-b border-border">
              <span className="font-mono text-accent font-semibold text-sm min-w-[48px]">1c</span>
              <span className="text-muted text-sm flex-1">CTA label</span>
              <span className="text-foreground/70 text-sm">&ldquo;Learn more&rdquo;</span>
            </div>
            <div className="flex items-center gap-4 py-3">
              <span className="font-mono text-accent font-semibold text-sm min-w-[48px]">URL</span>
              <span className="text-muted text-sm flex-1">Destination link</span>
              <span className="text-foreground/70 text-sm">locale-specific path</span>
            </div>
          </div>
        </Card>
        <CopydeckDiagram />
        <div className="grid sm:grid-cols-2 gap-8 items-start">
          <div>
            <p className="text-lg leading-relaxed mb-6">
              Product cards followed the same pattern: segment, audience line,
              tab structure, product name, one-liner and URL. A translator
              working on the German home page received the same numbered grid
              and could translate each field without interpreting page layout.
            </p>
            <p className="text-lg leading-relaxed">
              Updating a CTA label globally was a single-column change across
              five locale sheets rather than a find-and-replace across five
              separate page files.
            </p>
          </div>
          <Card>
            <CardLabel>Why this matters</CardLabel>
            <p className="leading-relaxed text-muted">
              The copydeck functioned as both a translation brief and a content
              inventory. Any stakeholder could open it, find the exact string
              for any market and trace it back to the source-language original.
            </p>
          </Card>
        </div>
      </Section>

      {/* Localisation Operations */}
      <Section number="04" title="Localisation operations: 26+ locales, six regional groups">
        <p className="text-lg leading-relaxed mb-8 max-w-xl">
          Sage&apos;s global website served content in more than 26 locales,
          organised into six regional groups for workflow management.
        </p>
        <LocalePipelineDiagram />
        <div className="grid sm:grid-cols-2 gap-8 items-start">
          <div>
            <p className="text-lg leading-relaxed mb-6">
              The grouping reflected shared translation vendors, review cycles
              and regulatory requirements. Group E bundled the DACH markets with
              Poland and Swiss French and Italian because those locales shared an
              agency relationship and similar compliance timelines.
            </p>
            <p className="text-lg leading-relaxed">
              This turned what could have been 26 independent workflows into six
              coordinated pipelines.
            </p>
          </div>
          <Card>
            <CardLabel>Operational backbone</CardLabel>
            <ul className="space-y-3">
              <ListItem>BAU content requests tracker</ListItem>
              <ListItem>Master translation tracker</ListItem>
              <ListItem>Proofing tracker per market</ListItem>
              <ListItem>Reviewers list covering all markets</ListItem>
            </ul>
          </Card>
        </div>
      </Section>

      {/* What This Demonstrates */}
      <Section number="05" title="What this work demonstrates">
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            {
              title: "Knowledge management",
              desc: "Taxonomies and controlled vocabularies that define how an organisation classifies, finds and governs its content across markets and languages.",
            },
            {
              title: "Reusable content structures",
              desc: "Atomised copydecks that serve translation, governance and multi-channel publishing from a single source of truth.",
            },
            {
              title: "Content operations at scale",
              desc: "Regional grouping models, BAU trackers and review workflows that turn 26+ independent locale pipelines into six coordinated ones.",
            },
          ].map((item) => (
            <Card key={item.title}>
              <CardLabel>{item.title}</CardLabel>
              <p className="leading-relaxed text-muted text-sm">{item.desc}</p>
            </Card>
          ))}
        </div>
      </Section>
    </article>
  );
}

/* ─── E-commerce Case Study ─── */
function EcommerceContent() {
  return (
    <article>
      {/* Case Study Header */}
      <div className="mb-14 sm:mb-20">
        <span className="badge mb-6">Case Study</span>
        <h2 className="text-3xl sm:text-[2.75rem] font-semibold mb-5 leading-tight tracking-tight">
          Handshake at Shopify,
          <br />
          <span className="gradient-text">a B2B wholesale marketplace</span>
        </h2>
        <p className="text-muted text-lg max-w-xl leading-relaxed">
          Product taxonomy and brand content architecture for Shopify&apos;s
          B2B wholesale marketplace Handshake.
        </p>
      </div>

      {/* Handshake */}
      <Section number="01" title="Taxonomy and brand architecture">
        <div className="grid sm:grid-cols-2 gap-8 items-start">
          <div>
            <p className="text-lg leading-relaxed mb-6">
              Handshake was Shopify&apos;s B2B wholesale marketplace. The content
              design consultancy covered product taxonomy and brand content
              architecture.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              <strong>Taxonomy V2</strong> was a reclassification of the
              marketplace&apos;s product categorisation system, restructuring how
              wholesale products were organised, browsed and filtered.
            </p>
            <p className="text-lg leading-relaxed">
              <strong>The Brand Refresh</strong> addressed brand dilution across
              product, email, social and blog. Deliverables included Shopify
              connection guidelines, logo usage rules, typography hierarchy, art
              direction, colour palette and a consolidated brand book. Each was a
              reusable content governance artefact.
            </p>
          </div>
          <div className="space-y-4">
            <Card>
              <CardLabel>Content strategy insight</CardLabel>
              <p className="leading-relaxed text-muted">
                The ambiguous connection between Handshake and Shopify was
                causing merchant confusion. New sign-ups received Handshake
                emails without understanding the relationship, pointing to a gap
                in onboarding content architecture rather than just a visual
                identity problem.
              </p>
            </Card>
            <div className="space-y-1">
              <Stat label="Email open rate (Merchant Outreach)" value="24%" />
              <Stat label="Email open rate (Trending Products)" value="22.6%" />
            </div>
          </div>
        </div>
      </Section>

      {/* What This Demonstrates */}
      <Section number="02" title="What this work demonstrates">
        <div className="grid sm:grid-cols-2 gap-4">
          <Card>
            <CardLabel>Brand as a content system</CardLabel>
            <p className="leading-relaxed text-muted text-sm">
              Brand identity treated as reusable content components: guidelines,
              templates and rules rather than a one-off design project.
            </p>
          </Card>
        </div>
      </Section>
    </article>
  );
}

/* ─── Placeholder for other tabs ─── */
function PlaceholderContent({ title }: { title: string }) {
  return (
    <div className="text-center py-24">
      <span className="badge mb-6">Coming soon</span>
      <h2 className="text-3xl sm:text-[2.75rem] font-semibold mb-5 tracking-tight">{title}</h2>
      <p className="text-muted text-lg max-w-md mx-auto">
        Case studies and examples for this section are on the way.
      </p>
    </div>
  );
}

/* ─── Reusable components ─── */
function Section({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-20 sm:mb-28">
      <div className="flex items-center gap-3 mb-5">
        <span className="text-accent font-mono text-sm font-medium">{number}</span>
        <div className="h-px flex-1 max-w-12" style={{ background: "var(--border-medium)" }} />
      </div>
      <h3 className="text-2xl sm:text-[1.75rem] font-semibold mb-8 tracking-tight">{title}</h3>
      {children}
    </section>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`card p-6 ${className}`}>
      {children}
    </div>
  );
}

function CardLabel({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="font-mono text-xs text-accent mb-4 uppercase tracking-widest font-medium">
      {children}
    </h4>
  );
}

function ListItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent mt-0.5 flex-shrink-0">
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
      <span className="text-foreground/80 text-sm">{children}</span>
    </li>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-4 py-3 border-b border-border">
      <span className="font-mono text-accent font-semibold text-base min-w-[72px]">
        {value}
      </span>
      <span className="text-muted text-sm">{label}</span>
    </div>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="card p-5 text-center">
      <p className="text-3xl font-semibold gradient-text mb-1">{value}</p>
      <p className="text-muted text-xs font-mono">{label}</p>
    </div>
  );
}
