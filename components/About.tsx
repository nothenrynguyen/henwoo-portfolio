import profile from "@/data/profile.json";

export default function About() {
  return (
    <section id="about" className="mb-24 scroll-mt-24">
      <h2 className="mb-8 text-sm font-bold uppercase tracking-widest text-lightest-slate lg:hidden">
        About
      </h2>
      <div className="flex flex-col gap-4">
        {profile.about.map((paragraph, i) => (
          <p key={i} className="leading-relaxed text-slate">
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}
