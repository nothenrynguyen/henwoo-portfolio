import Image from "next/image";
import { FiGithub, FiLinkedin, FiYoutube } from "react-icons/fi";
import { FaSoundcloud } from "react-icons/fa";
import { SiStrava, SiVsco } from "react-icons/si";
import profile from "@/data/profile.json";
import PortfolioDetails from "@/components/PortfolioDetails";
import StudioMotion from "@/components/StudioMotion";

const socialIcons = { github: FiGithub, linkedin: FiLinkedin, youtube: FiYoutube, soundcloud: FaSoundcloud, strava: SiStrava, vsco: SiVsco };
const socialNames: Record<string, string> = { github: "GitHub", linkedin: "LinkedIn", youtube: "YouTube", soundcloud: "SoundCloud", strava: "Strava", vsco: "VSCO" };

export default function Home() {
  return <>
    <StudioMotion />
    <a className="skip-link" href="#work">Skip to work</a>
    <header className="site-nav"><a href="#" className="wordmark">henwoo.dev</a><nav aria-label="Main navigation"><a href="#work">Selected work <small>02</small></a><a href="#about">A little about me</a><a href="#connect">Connect ↗</a></nav></header>
    <main>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-topline"><span className="eyebrow">henwoo.dev / Portfolio</span></div>
        <h1 id="hero-title">Henry Nguyen<span className="hero-role">Software engineer.</span></h1>
        <div className="hero-note"><span aria-hidden="true">↳</span><p>Web experiences, side projects,<br />and things that bring people together.</p></div>
        <div className="object-field" aria-label="A collection of my work">
          <a href="#yolobun" className="floating sleeve" data-depth="-0.12"><div className="sleeve-title">YOLOBUN<br /><span>STUDIOS</span></div><div className="sleeve-orbit">✴</div><span className="sleeve-caption">MUSIC · COMMUNITY · CULTURE</span><div className="record"><div>y<br /><small>side a</small></div></div><span className="object-tag">For the love of making things ↗</span></a>
          <a href="#empluzzed" className="floating mini-browser" data-depth="0.14"><div className="browser-chrome"><span>● ● ●</span><span>empluzzed.fyi</span><span>↗</span></div><Image className="hero-project-image" src="/images/empluzzed-product-v2.png" alt="Empluzzed product visual" width={1280} height={720} sizes="(max-width: 760px) 260px, 380px" priority /><span className="object-tag">Built for the job hunt ↗</span></a>
          <div className="floating flower-object" data-depth="-0.2" aria-hidden="true"><svg viewBox="0 0 200 200"><g fill="currentColor">{Array.from({ length: 8 }, (_, i) => <ellipse key={i} cx="100" cy="52" rx="24" ry="43" transform={`rotate(${i * 45} 100 100)`} />)}<circle cx="100" cy="100" r="35" /></g><circle cx="100" cy="100" r="20" fill="#f4f1e9" /></svg></div>
          <div className="floating note-card" data-depth="0.08"><span>IN THE MIX</span><p>Code.<br />Culture.<br /><em>A little curiosity.</em></p><span className="note-star">✴</span></div>
        </div>
        <div className="hero-bottom"><span><i className="status-dot" /> UCLA CS ’26 · USC MSCS ’28</span><a href="#work">Take a scroll ↓</a><span className="small-aside">Always a work in progress.</span></div>
      </section>
      <section id="work" className="selected-work section-wrap">
        <div className="section-heading"><h2>Selected projects</h2><span className="eyebrow">01 / Live on the web</span></div>
        <article id="yolobun" className="project"><div className="project-copy"><div className="project-kicker">01 <span>Creative collective</span></div><h3>Yolobun<br /><em>Studios.</em></h3><p>A creative collective built on music, community, and culture. A home for the things I make beyond the code.</p><a className="round-link" href="https://yolobun.com" target="_blank" rel="noreferrer">Step inside <span>↗</span></a><div className="project-footnote">Music / Community / Culture</div></div><a href="https://yolobun.com" target="_blank" rel="noreferrer" className="project-visual yolo-visual" aria-label="Visit Yolobun Studios"><span className="visual-label">A SPACE TO MAKE SOME NOISE.</span><div className="visual-disc"><div>yolobun<br /><em>on repeat.</em></div></div><div className="screenshot-frame yolo-screen"><div className="browser-chrome"><span>● ● ●</span><span>yolobun.com</span><span>↗</span></div><Image src="/images/yolobun-product-v2.png" alt="Illustrative Yolobun Studios team visual based on the live member cards" width={1100} height={720} sizes="(max-width: 760px) 90vw, 55vw" /></div><span className="visual-caption">Independent spirit. Shared experiences. ↗</span></a></article>
        <article id="empluzzed" className="project project-empluzzed"><div className="project-copy"><div className="project-kicker">02 <span>Early-career job discovery</span></div><h3>Less searching.<br /><em>More starting.</em></h3><p>Empluzzed brings fresh U.S. internship and new-grad roles together, with verified listings and direct links to employer applications.</p><a className="round-link" href="https://empluzzed.fyi" target="_blank" rel="noreferrer">Explore Empluzzed <span>↗</span></a><div className="project-footnote">Next.js / TypeScript / Automated refreshes</div></div><a href="https://empluzzed.fyi" target="_blank" rel="noreferrer" className="project-visual empluzzed-visual" aria-label="Visit Empluzzed"><span className="visual-label">GOOD OPPORTUNITIES. LESS NOISE.</span><span className="giant-asterisk" aria-hidden="true">✳</span><div className="screenshot-frame empluzzed-screen"><div className="browser-chrome"><span>● ● ●</span><span>empluzzed.fyi</span><span>↗</span></div><Image src="/images/empluzzed-product-v2.png" alt="Illustrative Empluzzed product visual based on the live homepage" width={1100} height={720} sizes="(max-width: 760px) 90vw, 55vw" /></div><span className="visual-caption">A little help with your next big thing. ↗</span></a></article>
      </section>
      <section id="about" className="about-section section-wrap"><div className="about-intro"><span className="eyebrow">02 / About</span><h2>Henry Nguyen</h2><p>Software engineer<br />UCLA CS ’26 · USC MSCS ’28</p></div><div className="about-copy">{profile.about.map((text, i) => <p key={i}>{text}</p>)}<div className="social-links">{Object.entries(profile.socialLinks).map(([name, href]) => <a key={name} href={href} target="_blank" rel="noreferrer">{name} ↗</a>)}</div></div></section>
      <PortfolioDetails />
    </main>
    <footer id="connect" className="site-footer section-wrap"><div className="footer-bottom"><a className="wordmark" href="#">henwoo.dev</a><nav className="footer-socials" aria-label="Social links">{Object.entries(profile.socialLinks).map(([name, href]) => { const Icon = socialIcons[name as keyof typeof socialIcons]; return <a key={name} href={href} target="_blank" rel="noreferrer" aria-label={socialNames[name]} title={socialNames[name]}><Icon aria-hidden="true" /><span className="social-label">{socialNames[name]}</span></a>; })}</nav><a href="#">Back to top ↑</a></div></footer>
  </>;
}
