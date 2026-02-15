import Sidebar from "@/components/Sidebar";
import CursorGlow from "@/components/CursorGlow";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <CursorGlow />
      <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 md:px-12 md:py-20 lg:flex lg:gap-4 lg:px-24 lg:py-0">
        {/* Left Sidebar — sticky on desktop */}
        <Sidebar />

        {/* Right Content — scrollable */}
        <main className="pt-24 lg:ml-auto lg:w-1/2 lg:max-w-[600px] lg:pt-24 lg:pb-24">
          <About />
          <Experience />
          <Projects />
          <Contact />

          {/* Footer */}
          <footer className="pb-8 text-sm text-slate">
            <p>
              Designed &amp; Built with{" "}
              <span className="text-green">Next.js</span>,{" "}
              <span className="text-green">Tailwind CSS</span>, and deployed on{" "}
              <span className="text-green">Vercel</span>.
            </p>
          </footer>
        </main>
      </div>
    </>
  );
}
