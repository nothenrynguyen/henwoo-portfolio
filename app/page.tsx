import Sidebar from "@/components/Sidebar";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";

export default function Home() {
  return (
    <div className="relative z-10 min-h-screen">
      <div className="mx-auto max-w-screen-xl px-6 py-12 md:px-12 md:py-20 lg:grid lg:grid-cols-[45%_55%] lg:gap-10 lg:px-24 lg:py-0">
        <Sidebar />

        <main className="pt-24 lg:col-start-2 lg:w-full lg:pt-24 lg:pb-24">
          <About />
          <Experience />
          <Projects />

          <footer className="mt-24 pb-8 text-center text-sm text-slate">
            <p>made by henry</p>
          </footer>
        </main>
      </div>
    </div>
  );
}
