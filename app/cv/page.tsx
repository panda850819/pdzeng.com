import type { Metadata } from "next";
import { summary, experience, achievements, education, skills } from "@/lib/cv-data";

export const metadata: Metadata = {
  title: "CV",
  description: "Panda Zeng — operations and software development. In Web3 since 2017.",
};

export default function CvPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6" lang="en">
      <header>
        <h1 className="display-tracking font-display text-4xl font-semibold">Panda Zeng</h1>
        <p className="mt-2 text-bamboo">Operations · Software Development</p>
        <p className="mt-5 max-w-2xl text-muted">{summary}</p>
      </header>

      <section className="mt-14" aria-labelledby="cv-experience">
        <h2 id="cv-experience" className="display-tracking mb-6 font-display text-2xl font-semibold">
          Experience
        </h2>
        <ol className="space-y-8">
          {experience.map((job) => (
            <li key={`${job.company}-${job.role}`} className="border-b border-line pb-8 last:border-b-0">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <h3 className="font-display text-lg font-medium">
                  {job.role} <span className="text-muted">· {job.company}</span>
                </h3>
                <p className="shrink-0 text-sm text-faint tabular-nums">{job.period}</p>
              </div>
              <p className="mt-1 text-xs text-faint">{job.location}</p>
              <ul className="mt-3 space-y-1.5">
                {job.points.map((point) => (
                  <li key={point} className="text-sm text-muted">
                    {point}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-14" aria-labelledby="cv-achievements">
        <h2 id="cv-achievements" className="display-tracking mb-6 font-display text-2xl font-semibold">
          Achievements
        </h2>
        <ul className="space-y-3">
          {achievements.map((a) => (
            <li key={a.title} className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between">
              <span className="text-sm text-ink">{a.title}</span>
              <span className="shrink-0 text-sm text-faint tabular-nums">{a.year}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14" aria-labelledby="cv-education">
        <h2 id="cv-education" className="display-tracking mb-6 font-display text-2xl font-semibold">
          Education
        </h2>
        <ul className="space-y-4">
          {education.map((e) => (
            <li key={e.degree} className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between">
              <div>
                <p className="text-sm text-ink">{e.school}</p>
                <p className="text-sm text-muted">{e.degree}</p>
              </div>
              <span className="shrink-0 text-sm text-faint tabular-nums">{e.period}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14" aria-labelledby="cv-skills">
        <h2 id="cv-skills" className="display-tracking mb-6 font-display text-2xl font-semibold">
          Skills
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {skills.map((s) => (
            <div key={s.group}>
              <h3 className="text-sm font-medium text-ink">{s.group}</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {s.items.map((item) => (
                  <span key={item} className="surface-2 hairline rounded-full px-3 py-1 text-xs text-muted">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
