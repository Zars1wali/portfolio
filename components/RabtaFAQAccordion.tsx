"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQItem {
  question: string;
  renderAnswer: () => React.ReactNode;
}

export default function RabtaFAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqItems: FAQItem[] = [
    {
      question: "1. What is the context window of Gemini 3.5 Flash Lite, and how does Rabita AI utilize it?",
      renderAnswer: () => (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <p>
            <strong>Google Gemini 3.5 Flash Lite</strong> features a massive <strong>1,048,576 token input context window</strong> (~750,000 to 800,000 English words, or ~500,000 words in Roman Urdu) with a 64k maximum output token budget.
          </p>
          <p>In Rabita AI, single LLM inference turns do not bloat this window:</p>
          <ul style={{ paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "6px", margin: 0 }}>
            <li>
              <strong>Master Sales Prompt (Part A + Injected Part B):</strong> Consumes <strong>~1,279 words / 2,393 tokens</strong>, which accounts for <strong>less than 0.23%</strong> of the model&apos;s total capacity.
            </li>
            <li>
              <strong>Owner Co-Pilot Prompt:</strong> Consumes <strong>~319 words / 532 tokens (0.05%)</strong>.
            </li>
            <li>
              <strong>Working Memory Headroom:</strong> Over <strong>99.7% of the context window remains free</strong> for multi-turn conversational history, customer entity memory, and database tool observations — keeping Time-to-First-Token (TTFT) ultra-fast (&lt;450ms) and preventing latency creep.
            </li>
          </ul>
        </div>
      ),
    },
    {
      question: "2. How does the context window limit retrieved data, and how does context volume impact response quality?",
      renderAnswer: () => (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <p>
            In LLM systems, the context window functions like <strong>active RAM</strong>, not persistent storage. While Gemini can physically accept 1 million tokens, dumping massive volumes of unstructured catalog data directly degrades output quality:
          </p>
          <ul style={{ paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "8px", margin: 0 }}>
            <li>
              <strong>The &quot;Lost in the Middle&quot; Effect:</strong> Modern transformer attention concentrates heavily at the prompt boundaries (the initial system rules and the most recent user messages). Middle-placed inventory items suffer attention decay, causing the model to miss specs and hallucinate.
            </li>
            <li>
              <strong>Instruction Dilution &amp; Rule Drift:</strong> As token volume increases, the model&apos;s adherence to negative constraints (e.g., <em>&quot;Never commit to unverified terms&quot;</em>, <em>&quot;Emit only the exact flag string&quot;</em>) weakens, causing conversational leakage.
            </li>
            <li>
              <strong>Attribute Cross-Contamination:</strong> When an LLM reads dozens of similar product snippets simultaneously, it risks blending attributes (e.g., quoting specifications of an entry-level smartphone for a flagship Pro Max variant, or confusing different model years and regional editions).
            </li>
            <li>
              <strong>Inference Latency:</strong> Processing a 50,000-token prompt increases Time-To-First-Token from 400ms to 2–4 seconds — an unacceptable delay on WhatsApp.
            </li>
          </ul>
          <p style={{ marginTop: "4px", color: "var(--color-cyan)" }}>
            <strong>Rabita&apos;s Rule:</strong> <em>Retrieval precision beats retrieval volume.</em> Rabita injects a clean, curated Part B context and uses on-demand tool calls (<code>search_catalog</code>) to supply only the 3–5 items relevant to the customer&apos;s immediate inquiry.
          </p>
        </div>
      ),
    },
    {
      question: "3. How does Rabita AI handle retrieval and prompt injection in practice?",
      renderAnswer: () => (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <p>Rabita avoids knowledge chaos using a clean <strong>three-layer architecture</strong>:</p>
          <ol style={{ paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "8px", margin: 0 }}>
            <li>
              <strong>The Part A / Part B Split:</strong>
              <div style={{ marginTop: "4px" }}>
                • <strong>Part A (Fixed Behavioral Contract):</strong> Core business identity, authentic Pakistani merchant tone, safety boundaries, and exact flag protocols (<code>OWNER_QUERY</code>, <code>ESCALATE</code>, <code>IMAGE_REQUEST</code>, <code>LIMIT_REACHED</code>).<br />
                • <strong>Part B (Live Business Context):</strong> Injected dynamically before every turn from PostgreSQL. Contains verified active inventory, today&apos;s confirmed prices, customer CRM profile, and active store policies.
              </div>
            </li>
            <li>
              <strong>The Daily Price Lock (<code>PRICES_CONFIRMED_TODAY</code>):</strong> High-value inventory prices fluctuate daily. If the merchant has not confirmed rates for the day, Part B marks <code>PRICES_CONFIRMED_TODAY: NO</code>. The AI is structurally forbidden from guessing; it immediately emits an <code>OWNER_QUERY</code> flag, preventing outdated price commitments.
            </li>
            <li>
              <strong>Deterministic Flag Signals:</strong> Instead of asking the LLM to search file servers or manage angry escalations, the model emits concise flags. Downstream webhook workers (in Python / n8n) handle image dispatch, quota enforcement, and owner paging, keeping the prompt clean.
            </li>
          </ol>
        </div>
      ),
    },
    {
      question: "4. How does Rabita AI's existing RAG (Retrieval-Augmented Generation) work?",
      renderAnswer: () => (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ margin: "4px 0" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/images/rag-pipeline-architecture.jpg" 
              alt="Rabita AI: Agentic Hybrid RAG Pipeline" 
              style={{ width: "100%", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.12)", boxShadow: "0 20px 40px -15px rgba(0,0,0,0.7)" }} 
            />
          </div>

          <p style={{ margin: 0, fontSize: "14.5px", lineHeight: "1.75", color: "var(--color-cloud)" }}>
            Rabita AI&apos;s Retrieval-Augmented Generation (RAG) system grounds customer conversations in 100% verified catalog data to eliminate AI hallucinations. When a shopper sends a WhatsApp message (such as <em>&quot;budget wireless earbuds with long battery life&quot;</em>), the system converts their words into a numerical &apos;meaning fingerprint&apos; (an <strong>embedding</strong>) and uses <strong>cosine similarity</strong> to measure how closely the request aligns with stored products like arrows pointing in the same direction on a compass. PostgreSQL performs a hybrid search—combining 60% exact keyword matching for specific model names with 40% conceptual meaning matching, while strictly filtering for in-stock inventory and today&apos;s confirmed prices. Instead of feeding the whole store to the AI, the database instantly <strong>retrieves</strong> only the top 3–5 matching product records, which Google Gemini then uses to <strong>generate</strong> an accurate, natural WhatsApp response with verified PKR pricing and photo links in under 850 milliseconds.
          </p>
        </div>
      ),
    },
    {
      question: "5. Is this a simple database or a vector database?",
      renderAnswer: () => (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <p>
            In simple words: <strong>It is a Hybrid Database — PostgreSQL doing both jobs at once.</strong>
          </p>
          <p>
            It is <strong>not</strong> an expensive standalone vector database (like Pinecone, Milvus, or Qdrant). Instead, Rabta uses <strong>PostgreSQL</strong> (the world&apos;s most popular relational database) and supercharges it with <strong>built-in vector intelligence</strong>.
          </p>

          <h4 style={{ margin: "4px 0 0", color: "var(--color-cyan)", fontSize: "14px", fontWeight: 600 }}>
            How Rabta Makes One Database Do Both:
          </h4>

          <div style={{ overflowX: "auto", margin: "4px 0 10px" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px", lineHeight: "1.6" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.15)", background: "rgba(255, 255, 255, 0.04)" }}>
                  <th style={{ textAlign: "left", padding: "10px 12px", color: "var(--color-cyan)", fontFamily: "var(--font-jetbrains), monospace", fontWeight: 600 }}>Database Job</th>
                  <th style={{ textAlign: "left", padding: "10px 12px", color: "var(--color-fog)", fontFamily: "var(--font-jetbrains), monospace", fontWeight: 600 }}>What Rabta Does In PostgreSQL</th>
                  <th style={{ textAlign: "left", padding: "10px 12px", color: "var(--color-mist)", fontFamily: "var(--font-jetbrains), monospace", fontWeight: 600 }}>Why It Matters</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.06)" }}>
                  <td style={{ padding: "10px 12px", fontWeight: 600, color: "var(--color-fog)", whiteSpace: "nowrap" }}>Simple / Relational Database</td>
                  <td style={{ padding: "10px 12px", color: "var(--color-fog)" }}>Stores customer phone numbers, orders, today&apos;s prices, and strict filters (<code>in_stock = True</code>, <code>tenant_id</code>).</td>
                  <td style={{ padding: "10px 12px", color: "var(--color-mist)" }}>Fast, rock-solid, and 100% reliable for numbers, tables, and exact product names.</td>
                </tr>
                <tr>
                  <td style={{ padding: "10px 12px", fontWeight: 600, color: "var(--color-fog)", whiteSpace: "nowrap" }}>Vector Database</td>
                  <td style={{ padding: "10px 12px", color: "var(--color-fog)" }}>Stores 768-dimensional AI math embeddings (<code>gemini-embedding-002</code>) inside an <code>embedding_data</code> JSON column.</td>
                  <td style={{ padding: "10px 12px", color: "var(--color-mist)" }}>Lets the system understand the <em>meaning</em> and <em>intent</em> behind vague customer questions using <strong>Cosine Similarity</strong>.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h4 style={{ margin: "4px 0 0", color: "var(--color-cyan)", fontSize: "14px", fontWeight: 600 }}>
            Why this is better than a separate vector database:
          </h4>

          <ol style={{ paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "6px", margin: 0 }}>
            <li>
              <strong>No Data Sync Lag:</strong> Every time a merchant updates an item&apos;s price or stock, the update is instantly reflected in PostgreSQL. There is zero synchronization lag or data drift between two separate servers.
            </li>
            <li>
              <strong>Speed &amp; Zero Extra Cost:</strong> No monthly subscriptions or network hops to external vector cloud clusters. Similarity queries run locally in <strong>&lt;5 milliseconds</strong>.
            </li>
            <li>
              <strong>Exact When Needed, Smart When Needed:</strong> Direct queries use fast exact SQL matching (60% weight), while descriptive customer inquiries activate Gemini vector embeddings (40% weight).
            </li>
          </ol>

          <blockquote style={{ margin: "10px 0 0", padding: "12px 16px", borderLeft: "3px solid var(--color-cyan)", background: "rgba(0, 240, 255, 0.05)", borderRadius: "0 8px 8px 0" }}>
            <p style={{ margin: 0, fontStyle: "italic", color: "var(--color-fog)", fontWeight: 500 }}>
              &quot;It has the brain of a vector database and the reliability of a traditional database, unified into a single PostgreSQL engine.&quot;
            </p>
          </blockquote>
        </div>
      ),
    },
    {
      question: "6. Is this a professional-grade standard RAG architecture?",
      renderAnswer: () => (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <p>
            <strong>Yes.</strong> For retail catalog commerce and conversational sales, Rabita AI&apos;s architecture aligns with current industry best practices (Hybrid Sparse + Dense retrieval as advocated by Pinecone, Cohere, and Azure AI Search):
          </p>

          <div style={{ overflowX: "auto", margin: "4px 0 10px" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px", lineHeight: "1.6" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.15)", background: "rgba(255, 255, 255, 0.04)" }}>
                  <th style={{ textAlign: "left", padding: "10px 12px", color: "var(--color-cyan)", fontFamily: "var(--font-jetbrains), monospace", fontWeight: 600 }}>Feature</th>
                  <th style={{ textAlign: "left", padding: "10px 12px", color: "var(--color-mist)", fontFamily: "var(--font-jetbrains), monospace", fontWeight: 600 }}>Naive / Tutorial RAG</th>
                  <th style={{ textAlign: "left", padding: "10px 12px", color: "var(--color-fog)", fontFamily: "var(--font-jetbrains), monospace", fontWeight: 600 }}>Rabita AI Production RAG</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.06)" }}>
                  <td style={{ padding: "10px 12px", fontWeight: 600, color: "var(--color-fog)" }}>Search Paradigm</td>
                  <td style={{ padding: "10px 12px", color: "var(--color-mist)" }}>Pure vector distance only.</td>
                  <td style={{ padding: "10px 12px", color: "var(--color-fog)" }}><strong>Hybrid Search:</strong> 60% exact keyword matching + 40% dense semantic similarity.</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.06)" }}>
                  <td style={{ padding: "10px 12px", fontWeight: 600, color: "var(--color-fog)" }}>Variant Disambiguation</td>
                  <td style={{ padding: "10px 12px", color: "var(--color-mist)" }}>Often confuses variants (e.g., 256GB vs. 512GB, regional warranty editions).</td>
                  <td style={{ padding: "10px 12px", color: "var(--color-fog)" }}>Strict token matching isolates exact storage, colorway, and regional SKU specifications.</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.06)" }}>
                  <td style={{ padding: "10px 12px", fontWeight: 600, color: "var(--color-fog)" }}>Spelling Robustness</td>
                  <td style={{ padding: "10px 12px", color: "var(--color-mist)" }}>Fails on typos (<em>&quot;samsng&quot;</em>, <em>&quot;ipon&quot;</em>).</td>
                  <td style={{ padding: "10px 12px", color: "var(--color-fog)" }}>Built-in phonetic Roman Urdu typo dictionary normalizes input before querying.</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.06)" }}>
                  <td style={{ padding: "10px 12px", fontWeight: 600, color: "var(--color-fog)" }}>Freshness &amp; State</td>
                  <td style={{ padding: "10px 12px", color: "var(--color-mist)" }}>Vectors get stale when SQL database updates.</td>
                  <td style={{ padding: "10px 12px", color: "var(--color-fog)" }}>Single-source PostgreSQL ensures zero price/stock drift.</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.06)" }}>
                  <td style={{ padding: "10px 12px", fontWeight: 600, color: "var(--color-fog)" }}>Context Strategy</td>
                  <td style={{ padding: "10px 12px", color: "var(--color-mist)" }}>Indiscriminately dumps top 10 chunks into prompt.</td>
                  <td style={{ padding: "10px 12px", color: "var(--color-fog)" }}><strong>Agentic Tool Calling:</strong> Fetches 3–5 items just-in-time via <code>search_catalog</code>.</td>
                </tr>
                <tr>
                  <td style={{ padding: "10px 12px", fontWeight: 600, color: "var(--color-fog)" }}>Tenant Boundary</td>
                  <td style={{ padding: "10px 12px", color: "var(--color-mist)" }}>In-memory filtering (risk of cross-tenant leakage).</td>
                  <td style={{ padding: "10px 12px", color: "var(--color-fog)" }}>Hard SQL-level multi-tenant boundary (<code>tenant_id == t_uuid</code>).</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p style={{ margin: 0 }}>
            <strong>Enterprise Scale Roadmap:</strong> For boutique and SME catalogs (50 to 2,000 SKUs), in-engine Python cosine ranking executes in under <strong>5 milliseconds</strong>. For enterprise catalogs with 50,000+ SKUs, the database is architectured for an in-place migration to native PostgreSQL <strong><code>pgvector</code></strong> with an <strong>HNSW index</strong>, executing vector math directly in the database engine at C-level performance.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px", margin: "2rem 0" }}>
      {faqItems.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            style={{
              background: isOpen ? "rgba(255, 255, 255, 0.04)" : "rgba(255, 255, 255, 0.02)",
              border: isOpen ? "1px solid rgba(0, 240, 255, 0.35)" : "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "16px",
              boxShadow: isOpen ? "0 10px 30px -10px rgba(0, 240, 255, 0.12)" : "none",
              transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
              overflow: "hidden",
            }}
          >
            {/* Header / Clickable Toggle */}
            <button
              onClick={() => toggleItem(index)}
              type="button"
              style={{
                width: "100%",
                padding: "18px 20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "16px",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
              }}
              aria-expanded={isOpen}
            >
              <span
                style={{
                  fontSize: "16px",
                  fontWeight: 600,
                  color: isOpen ? "var(--color-fog)" : "var(--color-mist)",
                  letterSpacing: "-0.01em",
                  lineHeight: "1.45",
                  transition: "color 0.2s ease",
                }}
              >
                {item.question}
              </span>
              <span
                style={{
                  flexShrink: 0,
                  width: "34px",
                  height: "34px",
                  borderRadius: "50%",
                  background: isOpen ? "rgba(0, 240, 255, 0.15)" : "rgba(255, 255, 255, 0.05)",
                  border: isOpen ? "1px solid rgba(0, 240, 255, 0.4)" : "1px solid rgba(255, 255, 255, 0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: isOpen ? "var(--color-cyan)" : "var(--color-mist)",
                  transition: "all 0.25s ease",
                }}
              >
                {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </span>
            </button>

            {/* Collapsible Content */}
            {isOpen && (
              <div
                style={{
                  padding: "0 20px 22px",
                  color: "var(--color-mist)",
                  fontSize: "14px",
                  lineHeight: "1.7",
                  borderTop: "1px solid rgba(255, 255, 255, 0.05)",
                  paddingTop: "16px",
                  animation: "fadeIn 0.25s ease-out",
                }}
              >
                {item.renderAnswer()}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
