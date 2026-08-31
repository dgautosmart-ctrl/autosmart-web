import CtaButton from "@/components/lp/CtaButton";
import { Marker } from "@/components/lp/primitives";
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
        <span className="stage" style={s("0.2s")}>
          <Marker />
        </span>

        <h1
          className="stage display mt-7 text-[2.7rem] leading-[1.05] [text-shadow:0_0_60px_rgba(60,165,220,0.28)] sm:text-6xl lg:text-[5rem] lg:leading-[1.04]"
          style={s("0.5s")}
        >
          עברו אצלך בעסק{" "}
          <span className="lit-soft">יותר מ־100 לקוחות?</span>
        </h1>

        <span
          aria-hidden
          className="stage mt-8 h-px w-24 bg-gradient-to-l from-transparent via-accent-bright/70 to-transparent"
          style={s("0.9s")}
        />

        <p
          className="stage mt-8 max-w-2xl text-xl text-text-soft sm:text-2xl"
          style={s("1.05s")}
        >
          רשימת הלקוחות שלך{" "}
          <span className="lit font-semibold">שווה יותר</span>{" "}
          מכל קמפיין חדש.
        </p>

        <div className="stage relative mt-11" style={s("1.5s")}>
          <span
            aria-hidden
            className="anim-breathe absolute -inset-8 -z-10 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,var(--accent-glow),transparent_70%)] opacity-60"
            style={{ ["--dur" as string]: "6s" }}
          />
          <CtaButton size="xl">אני רוצה לבדוק את רשימת הלקוחות שלי</CtaButton>
        </div>

        <p
          className="stage mt-5 max-w-lg text-sm text-text-dim"
          style={s("1.85s")}
        >
          פנייה זו אינה כרוכה בהתחייבות. בשיחה קצרה נבחן יחד האם השירות מתאים
          לעסק שלך.
        </p>
      </div>
    </section>
  );
}
