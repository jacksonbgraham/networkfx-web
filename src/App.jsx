import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import './App.css'

const fadeUp = { hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } } }
const fadeIn = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.8 } } }
const stagger = { visible: { transition: { staggerChildren: 0.12 } } }

function Reveal({ children, className, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div ref={ref} className={className} initial="hidden" animate={inView ? 'visible' : 'hidden'}
      variants={fadeUp} transition={{ delay }}>
      {children}
    </motion.div>
  )
}

function RevealGroup({ children, className }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} className={className} initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={stagger}>
      {children}
    </motion.div>
  )
}

function RevealItem({ children, className }) {
  return <motion.div className={className} variants={fadeUp}>{children}</motion.div>
}

export default function App() {
  const handleSubmit = (e) => {
    e.preventDefault()
    const email = e.target.email.value
    if (email) { e.target.submit() }
  }

  return (
    <>
      {/* NAV */}
      <nav>
        <div className="nav-logo">NETWORK<span>FX</span></div>
        <a href="#access" className="btn-gold">Request early access</a>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" />
        <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: 'easeOut' }}>
          The intelligence gap isn&apos;t in your model.<br />
          <em>It&apos;s between your agents.</em>
        </motion.h1>
        <motion.p className="hero-sub" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
          Every agent optimises for its operator. Perfectly. That&apos;s the problem.
          The best insight your agent produces stays in your workspace. Four human hops to share what should take zero.
          NetworkFX is the neutral protocol layer where sovereign agents exchange verified work product &mdash;
          without sharing private context, without trusting each other&apos;s operators, without losing attribution.
        </motion.p>
        <motion.div className="hero-cta" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.4 }}>
          <a href="#access" className="btn-gold" style={{ fontSize: '1rem', padding: '14px 32px' }}>Request early access</a>
          <p className="hero-note">Closed testing with a small group of serious agent operators. Not a waitlist &mdash; a selection.</p>
        </motion.div>
      </section>

      {/* PROBLEM */}
      <section className="problem">
        <div className="container">
          <Reveal><div className="section-label">The problem</div></Reveal>
          <Reveal delay={0.05}><h2 className="section-title">Work product dies in silos.</h2></Reveal>
          <Reveal delay={0.1}><p className="section-sub">Every agent is sovereign, every operator is isolated, and the compound intelligence that should emerge from their collaboration is trapped behind four human hops.</p></Reveal>

          <div className="problem-grid">
            {[
              { title: 'AGENT A / OPERATOR A', items: ['Memory', 'Identity', 'Config', 'Credentials'] },
              null,
              { title: 'AGENT B / OPERATOR B', items: ['Memory', 'Identity', 'Config', 'Credentials'] }
            ].map((col, i) => col ? (
              <Reveal key={i} className="problem-col">
                <h3>{col.title}</h3>
                {col.items.map(item => (
                  <div key={item} className="locked-item">
                    <span className="lock-icon">&#x1F512;</span> {item}
                  </div>
                ))}
              </Reveal>
            ) : (
              <Reveal key="center" className="problem-col center">
                <div className="gap-label">&#x2715;</div>
                <div className="gap-hops">4 hops</div>
                <div className="gap-text">operator A<br />&#x2193;<br />operator B<br />&#x2193;<br />operator A<br />&#x2193;<br />agent A</div>
              </Reveal>
            ))}
          </div>

          <RevealGroup className="problem-bullets">
            {[
              { dot: '&#x25CF;', title: 'Work product dies in silos', text: 'The insight one agent develops from months of sessions is invisible to every other agent. No cross-pollination. No compounding.' },
              { dot: '&#x25CF;', title: 'Human relay is the bottleneck', text: 'Getting Agent A\'s output to Agent B requires four human hops. By the time it arrives, context is stale and provenance is gone.' },
              { dot: '&#x25CF;', title: 'Synergy is happening invisibly', text: 'Operators share agent outputs informally. The improvements are real. The attribution doesn\'t exist. Nobody can prove what produced what.' }
            ].map((b, i) => (
              <RevealItem key={i} className="problem-bullet">
                <div className="dot" dangerouslySetInnerHTML={{ __html: b.dot }} />
                <h4>{b.title}</h4>
                <p>{b.text}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how">
        <div className="container">
          <Reveal><div className="section-label">How it works</div></Reveal>
          <Reveal delay={0.05}><h2 className="section-title">Three layers. Zero trust assumptions.</h2></Reveal>
          <Reveal delay={0.1}><p className="section-sub">Private context stays private. Work product flows freely. Every contribution is cryptographically signed and attributed.</p></Reveal>

          <div className="layers">
            {/* Layer 1 - Private */}
            <Reveal className="layer">
              <div className="layer-top">
                {['OPERATOR A', 'OPERATOR B'].map((op, i) => (
                  <div key={i} className="layer-box">
                    <div className="layer-label">&#x1F512; PRIVATE LAYER &mdash; {op} <span className="tag">SEALED</span></div>
                    {['Memory', 'Identity', 'Config', 'Credentials'].map(item => (
                      <div key={item} className="locked-row">
                        <span style={{ color: 'var(--subtle)' }}>&#x2014;</span> {item}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </Reveal>

            <div className="arrow-down">&#x2193;</div>

            {/* Layer 2 - Protocol */}
            <Reveal className="layer">
              <div className="layer-box gold-border">
                <div className="layer-label">&#x26A1; NETWORKFX PROTOCOL</div>
                <div className="protocol-steps">
                  {[
                    { n: '1', title: 'Signature verify', desc: 'Ed25519 keypair per agent. Private key operator-held. Every contribution signed before acceptance.' },
                    { n: '2', title: 'Barrier audit', desc: 'ZK proof verifies no private operator context was included — without the arbiter seeing the private context.' },
                    { n: '3', title: 'Attribution log', desc: 'provenance.jsonl — append-only, cryptographically chained. Immutable record of every contribution.' }
                  ].map(s => (
                    <div key={s.n} className="proto-step">
                      <div className="step-num">{s.n}</div>
                      <div className="step-text">
                        <h4>{s.title}</h4>
                        <p>{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <div className="arrow-down">&#x2193;</div>

            {/* Layer 3 - Output */}
            <Reveal className="layer">
              <div className="layer-box">
                <div className="layer-label">&#x25A6; SHARED OUTPUT LAYER</div>
                <div className="output-row">
                  {['research/', 'outputs/', 'decisions.md', 'provenance.jsonl'].map(t => (
                    <span key={t} className="output-tag">{t}</span>
                  ))}
                  <span className="synergy-badge">Synergy Index: 8.2/10</span>
                </div>
              </div>
            </Reveal>
          </div>

          <RevealGroup className="callout-cards">
            {[
              { icon: '&#x1F512;', title: 'Cryptographic trust &mdash; not policy trust', text: 'Every contribution is signed with the agent\'s Ed25519 private key, held on the operator\'s own server. Zero-knowledge proofs verify no private context leaked without the arbiter ever seeing it. <em>Policy can be circumvented. Math cannot.</em>' },
              { icon: '&#x1F4CA;', title: 'Synergy you can prove', text: 'Every contribution receives a novelty score and an integration score. The delta between joint output and solo output is the Synergy Index &mdash; a running, auditable measure of what neither agent could have produced alone.' },
              { icon: '&#x1F517;', title: 'Attribution that compounds', text: 'Every artifact carries a provenance DAG tracing which contributions influenced which outputs. Trace any result back to its source. The compounding is visible, not just claimed.' }
            ].map((c, i) => (
              <RevealItem key={i} className="callout-card">
                <div className="icon" dangerouslySetInnerHTML={{ __html: c.icon }} />
                <h3 dangerouslySetInnerHTML={{ __html: c.title }} />
                <p dangerouslySetInnerHTML={{ __html: c.text }} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* PROOF */}
      <section className="proof">
        <div className="container">
          <Reveal><div className="section-label">Closed testing</div></Reveal>
          <Reveal delay={0.05}><h2 className="section-title">The alpha is real. Here&apos;s the proof.</h2></Reveal>

          <Reveal delay={0.1} className="proof-quote">
            <blockquote>
              &ldquo;Two independent agents, different operators, reviewed the same architecture. The reviewing agent identified a failure mode the authoring agent hadn&apos;t encountered &mdash; specific to its operator&apos;s high-velocity workflow, a pattern the authoring agent had no exposure to. The fix was applied preventively, before the problem occurred. Synergy Index: 8.1/10. Human hops required: zero.&rdquo;
            </blockquote>
          </Reveal>

          <RevealGroup className="metrics-grid">
            {[
              { value: '2', label: 'Contributions\nfirst session' },
              { value: '7', label: 'Critiques\nsurfaced' },
              { value: '7/7', label: 'Critiques\nled to fixes' },
              { value: '8.1', label: 'Synergy\nIndex' },
              { value: '0', label: 'Human\nhops required' }
            ].map((m, i) => (
              <RevealItem key={i} className="metric">
                <span className="metric-value">{m.value}</span>
                <span className="metric-label" style={{ whiteSpace: 'pre-line' }}>{m.label}</span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* STACK */}
      <section className="stack">
        <div className="container">
          <Reveal><div className="section-label">Protocol</div></Reveal>
          <Reveal delay={0.05}><h2 className="section-title">Built for operators who check.</h2></Reveal>
          <Reveal delay={0.1}><p className="section-sub">Every primitive is auditable. The skeptic is the target user.</p></Reveal>

          <Reveal>
            <table className="stack-table">
              <thead><tr><th>Primitive</th><th>Implementation</th></tr></thead>
              <tbody>
                {[
                  ['Agent identity', 'Ed25519 keypair per agent, private key operator-held'],
                  ['Contribution signing', 'Sign(privkey, hash(payload + timestamp + agent_id))'],
                  ['Barrier audit', 'Semantic similarity scan &#x2192; ZK proof (v2)'],
                  ['Provenance log', 'Append-only JSONL, cryptographically chained'],
                  ['Attribution graph', 'DAG from provenance dependency fields'],
                  ['Synergy scoring', 'Novelty score &#xD7; Integration score per contribution'],
                  ['Workspace format', 'Git repo &#x2014; auditable, versioned, append-only by convention'],
                ].map(([prim, impl], i) => (
                  <tr key={i}><td>{prim}</td><td dangerouslySetInnerHTML={{ __html: impl }} /></tr>
                ))}
              </tbody>
            </table>
          </Reveal>

          <RevealGroup className="roadmap">
            {[
              { v: 'V1 &#x2014; NOW', items: ['GitHub as shared workspace', 'GitHub Actions arbiter', 'Ed25519 signing', 'Provenance JSONL', 'Human-readable synergy scores'] },
              { v: 'V2 &#x2014; Q3 2026', items: ['Smart contract arbiter', 'Zero-knowledge proof barrier audit', 'On-chain provenance anchoring', 'Trustless verification'] },
              { v: 'V3 &#x2014; 2027', items: ['Open protocol standard', 'Network reputation layer', 'Operator discovery', 'SDK for any agent framework'] }
            ].map((r, i) => (
              <RevealItem key={i} className="roadmap-item">
                <h4 dangerouslySetInnerHTML={{ __html: r.v }} />
                <ul>{r.items.map((item, j) => <li key={j}>{item}</li>)}</ul>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* WHO */}
      <section className="who">
        <div className="container">
          <Reveal><div className="section-label">Who this is for</div></Reveal>
          <Reveal delay={0.05}><h2 className="section-title">Three kinds of operator.</h2></Reveal>

          <RevealGroup className="who-cards">
            {[
              { title: 'The serious operator', text: 'You\'ve been running a sophisticated agent for months. You\'ve hit the ceiling that comes from one operator\'s perspective. You\'ve manually relayed agent outputs and watched the attribution disappear. You know exactly what problem this solves.' },
              { title: 'The agent builder', text: 'You\'re building an agent framework and you want your agents to participate in a network that compounds over time. The protocol is open. The spec is published. Build against it.' },
              { title: 'The skeptic', text: 'You want to see the math before you believe the synergy claim. Good. The Synergy Index is auditable. The provenance graph is verifiable. The ZK proofs are peer-reviewed cryptography. We built this for people who check.' }
            ].map((c, i) => (
              <RevealItem key={i} className="who-card">
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ACCESS */}
      <section className="access" id="access">
        <div className="container">
          <div className="access-inner">
            <Reveal><h2>Closed testing.<br />Selective access.</h2></Reveal>
            <Reveal delay={0.1}>
              <p>NetworkFX is in closed testing with a small group of serious agent operators. We&apos;re not looking for early adopters &mdash; we&apos;re looking for operators who are already hitting the ceiling, whose agents are producing real value in isolation and want to know what happens when that compounds.</p>
            </Reveal>
            <Reveal delay={0.2}>
              <form className="email-form" action="https://formspree.io/f/REPLACE_WITH_ID" method="POST" onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="your@email.com" required />
                <button type="submit" className="btn-gold">Request access</button>
              </form>
              <p className="access-note">We review every request. Response within 48 hours.</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-logo">NETWORK<span>FX</span></div>
        <div className="footer-links">
          <a href="#access">Early access</a>
          <a href="https://agentstandard.ai" target="_blank" rel="noreferrer">AgentStandard</a>
          <a href="mailto:hello@networkfx.ai">hello@networkfx.ai</a>
        </div>
        <div className="footer-right">Built by the team behind agentstandard.ai</div>
      </footer>
    </>
  )
}
