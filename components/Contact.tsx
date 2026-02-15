import profile from "@/data/profile.json";

export default function Contact() {
  return (
    <section id="contact" className="mb-24 scroll-mt-24">
      <h2 className="mb-8 text-sm font-bold uppercase tracking-widest text-lightest-slate lg:hidden">
        Contact
      </h2>
      <div className="max-w-lg">
        <h3 className="text-4xl font-bold text-lightest-slate">Get In Touch</h3>
        <p className="mt-4 leading-relaxed text-slate">
          {profile.contactMessage}
        </p>
        <a
          href={`mailto:${profile.contactEmail}`}
          className="mt-8 inline-block rounded-md border border-green px-7 py-4 text-sm font-medium text-green transition-colors hover:bg-green/10"
        >
          Say Hello
        </a>
      </div>
    </section>
  );
}
