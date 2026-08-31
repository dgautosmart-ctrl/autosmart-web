import CtaButton from "@/components/lp/CtaButton";
import HeroBackdrop from "@/components/lp/visuals/HeroBackdrop";

const s = (delay: string) => ({ ["--delay" as string]: delay });

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[92svh] flex-col justify-center overflow-hidden pt-24 pb-16 sm:pt-28"
    >
      <HeroBackdrop />

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-4 text-center sm:px-8">
        {/* offer ribbon — first thing the eye lands on */}
        <p
          className="stage inline-flex items-center gap-2.5 rounded-full border border-accent-bright/60 bg-accent/15 px-5 py-2 text-sm font-semibold text-accent-bright shadow-[0_0_35px_-8px_var(--accent-glow)] sm:text-[0.95rem]"
          style={s("0.15s")}
        >
          <span aria-hidden className="pulse-ring h-2 w-2 rounded-full bg-accent-bright" />
          לסוגרים עד ראש השנה — הנחה משמעותית
        </p>

        <h1
          className="stage-zoom display mt-8 text-[2.7rem] leading-[1.05] [text-shadow:0_0_70px_rgba(60,165,220,0.35)] sm:text-6xl lg:text-[5rem] lg:leading-[1.04]"
          style={s("0.45s")}
        >
          עברו אצלך בעסק{" "}
          <span className="whitespace-nowrap">
            יותר מ־<span className="lit">100</span>{" "}
            <span className="lit-soft">לקוחות?</span>
          </span>
        </h1>

        <p
          className="stage mt-9 max-w-2xl text-xl text-text-soft sm:text-[1.6rem] sm:leading-snug"
          style={s("1s")}
        >
          רשימת הלקוחות שלך{" "}
          <span className="lit font-semibold">שווה יותר</span>{" "}
          מכל קמפיין חדש שתריץ.
        </p>

        <div className="stage relative mt-11" style={s("1.4s")}>
          <span
            aria-hidden
            className="anim-breathe absolute -inset-10 -z-10 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,var(--accent-glow),transparent_70%)] opacity-70"
            style={{ ["--dur" as string]: "6s" }}
          />
          <CtaButton size="xl">אני רוצה לבדוק את רשימת הלקוחות שלי</CtaButton>
        </div>
      </div>
    </section>
  );
}
