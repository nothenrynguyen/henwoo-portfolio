import Sidebar from "@/components/Sidebar";
import CursorGlow from "@/components/CursorGlow";
import SparkleTrail from "@/components/SparkleTrail";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";

export default function Home() {
  return (
    <>
      <CursorGlow />
      <SparkleTrail />
      <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 md:px-12 md:py-20 lg:flex lg:gap-4 lg:px-24 lg:py-0">
        {/* Left Sidebar — sticky on desktop */}
        <Sidebar />

        {/* Right Content — scrollable */}
        <main className="pt-24 lg:ml-auto lg:w-[55%] lg:max-w-[700px] lg:pt-24 lg:pb-24">
          <About />
          <Experience />
          <Projects />

          {/* Footer */}
          <footer className="mt-24 pb-8 text-center text-sm text-slate">
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
