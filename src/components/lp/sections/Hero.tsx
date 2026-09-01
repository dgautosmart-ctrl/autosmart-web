import CtaButton from "@/components/lp/CtaButton";
import HeroBackdrop from "@/components/lp/visuals/HeroBackdrop";

const s = (delay: string) => ({ ["--delay" as string]: delay });

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[92svh] flex-col justify-center overflow-hidden pt-20 pb-12 sm:pt-24"
    >
      <HeroBackdrop />

      {/* gentle darkening of the area below the headline */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 top-[44%] z-0 bg-gradient-to-b from-transparent to-black/25"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-4 text-center sm:px-8">
        <h1
          className="stage-zoom display text-[2.5rem] leading-[1.05] [text-shadow:0_0_70px_rgba(60,165,220,0.35)] sm:text-5xl lg:text-[4.2rem] lg:leading-[1.05]"
          style={s("0.3s")}
        >
          עברו אצלך בעסק{" "}
          <span className="whitespace-nowrap">
            יותר מ־
            <span className="lit-soft inline-block font-extrabold [filter:drop-shadow(0_0_30px_rgba(110,201,232,0.5))] sm:text-[1.08em]">
              100 לקוחות?
            </span>
          </span>
        </h1>

        <p
          className="stage mt-6 max-w-2xl text-xl font-bold text-text-soft sm:text-2xl"
          style={s("0.8s")}
        >
          רוצה להזניק את העסק? רוצה לראות את היומן מתמלא?
        </p>

        <p
          className="stage mt-4 max-w-2xl text-2xl font-bold text-text sm:text-[1.9rem] sm:leading-snug"
          style={s("0.95s")}
        >
          רשימת הלקוחות שלך{" "}
          <span className="lit font-extrabold">שווה יותר</span>{" "}
          מכל קמפיין חדש שתריץ.
        </p>

        {/* limited-time offer */}
        <p
          className="stage mt-6 inline-flex items-center gap-2.5 rounded-full border border-accent-bright/25 bg-navy-2/80 px-5 py-2 text-sm font-semibold text-text-soft sm:text-[0.95rem]"
          style={s("1.2s")}
        >
          <span aria-hidden className="pulse-ring h-2 w-2 rounded-full bg-accent-bright" />
          לסוגרים עד ראש השנה — הנחה משמעותית
        </p>

        <div className="stage relative mt-8" style={s("1.4s")}>
          <span
            aria-hidden
            className="anim-breathe absolute -inset-10 -z-10 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,var(--accent-glow),transparent_70%)] opacity-70"
            style={{ ["--dur" as string]: "6s" }}
          />
          <div className="anim-float" style={{ ["--dur" as string]: "4s" }}>
            <CtaButton size="xl">אני רוצה לבדוק את רשימת הלקוחות שלי</CtaButton>
          </div>
        </div>
      </div>
    </section>
  );
}
