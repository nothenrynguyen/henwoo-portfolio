import Image from "next/image";
import { FiGithub, FiLinkedin, FiYoutube, FiArrowUpRight } from "react-icons/fi";
import { FaSoundcloud } from "react-icons/fa";
import { SiStrava, SiVsco } from "react-icons/si";
import profile from "@/data/profile.json";
import { featuredWork } from "@/data/featuredWork";
import PortfolioDetails from "@/components/PortfolioDetails";
import StudioMotion from "@/components/StudioMotion";
import PhotoGallery from "@/components/PhotoGallery";

const socialIcons = { github: FiGithub, linkedin: FiLinkedin, youtube: FiYoutube, soundcloud: FaSoundcloud, strava: SiStrava, vsco: SiVsco };
const socialNames: Record<string, string> = { github: "GitHub", linkedin: "LinkedIn", youtube: "YouTube", soundcloud: "SoundCloud", strava: "Strava", vsco: "VSCO" };

function SocialLinks() {
  return <nav className="social-icons" aria-label="Social links">{Object.entries(profile.socialLinks).map(([name, href]) => {
    const Icon = socialIcons[name as keyof typeof socialIcons];
    return <a key={name} href={href} target="_blank" rel="noreferrer" aria-label={socialNames[name]} title={socialNames[name]}><Icon aria-hidden="true" /></a>;
  })}</nav>;
}

export default function Home() {
  return <>
    <StudioMotion />
    <a className="skip-link" href="#work">Skip to work</a>
    <div className="portfolio-shell">
      <header className="site-nav"><a href="#" className="wordmark">henwoo.dev</a><nav aria-label="Main navigation"><a href="#work">Work</a><a href="#about">About</a><a href="#connect">Links</a></nav></header>
      <main>
        <section className="intro" aria-labelledby="intro-name">
          <div className="profile-heading"><span className="profile-portrait"><Image className="portrait-image" src={profile.portrait.src} alt={profile.portrait.alt} width={384} height={384} sizes="200px" priority /></span><div><h1 id="intro-name">{profile.name}</h1><p className="intro-role">Software engineer</p><SocialLinks /></div></div>
          <p className="intro-description">{profile.introduction}</p>
          <p className="education-line">UCLA Computer Science ’26 <span aria-hidden="true">/</span> USC MS Computer Science ’28</p>
        </section>
        <PortfolioDetails variant="experience" />
        <section id="work" className="work-section" aria-labelledby="work-title">
          <div className="section-heading"><h2 id="work-title">Selected work</h2><span>Two projects you can use.</span></div>
          <div className="work-grid">{featuredWork.map(project => <article className="work-card" id={project.slug} key={project.slug}>
            <a className="work-preview" href={project.url} target="_blank" rel="noreferrer" aria-label={`Visit ${project.name}`}><Image src={project.image} alt={project.imageAlt} width={1280} height={720} sizes="(max-width: 640px) 92vw, 440px" priority /></a>
            <div className="work-card-heading"><h3><a href={project.url} target="_blank" rel="noreferrer">{project.name} <FiArrowUpRight aria-hidden="true" /></a></h3><span>{project.category}</span></div>
            <p>{project.description}</p>
            {"engineering" in project && <p className="work-engineering">{project.engineering}</p>}
            <div className="work-links"><span>{project.technologies}</span><a href={project.secondaryUrl} target="_blank" rel="noreferrer">{project.secondaryLabel} ↗</a></div>
          </article>)}</div>
        </section>
        <PortfolioDetails variant="archive" />
        <section id="about" className="about-section"><h2>A little about me</h2><div><p>{profile.about[0]}</p><p>{profile.personalNote}</p><p>{profile.sideProjects.map((project, index) => <span key={project.name}>{index > 0 && " "}{project.prefix}<a href={project.url} target="_blank" rel="noreferrer">{project.name}</a>{project.description}</span>)}</p></div></section>
        <PhotoGallery />
      </main>
      <footer id="connect" className="site-footer"><a className="wordmark" href="#">henwoo.dev</a><SocialLinks /><a className="back-top" href="#">Back to top ↑</a></footer>
    </div>
  </>;
}
