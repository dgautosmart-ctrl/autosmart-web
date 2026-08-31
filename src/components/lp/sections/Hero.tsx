import { AUTOSMART_SITE } from "@/lib/lp-config";
import CtaButton from "@/components/lp/CtaButton";
import HeroBackdrop from "@/components/lp/visuals/HeroBackdrop";

const s = (delay: string) => ({ ["--delay" as string]: delay });

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-28 pb-20 sm:pt-32"
    >
      <HeroBackdrop />

      <div className="relative z-10 mx-auto w-full max-w-4xl px-4 text-center sm:px-8">
        <h1 className="display text-[2.6rem] leading-[1.02] sm:text-6xl lg:text-[5.5rem]">
          <span className="stage block" style={s("0.5s")}>
            עברו אצלך בעסק
          </span>
          <span className="stage lit-soft mt-1 block" style={s("0.95s")}>
            יותר מ־100 לקוחות?
          </span>
        </h1>

        <p
          className="stage mx-auto mt-8 max-w-2xl text-lg text-text-soft sm:text-xl lg:text-2xl"
          style={s("1.5s")}
        >
          יכול להיות שיש לך{" "}
          <span className="lit font-semibold">מכירות שמחכות</span>{" "}
          בתוך רשימת הלקוחות שלך.
        </p>

        <div
          className="stage mt-10 flex flex-col items-center gap-4"
          style={s("2.1s")}
        >
          <CtaButton size="lg">אני רוצה לבדוק את רשימת הלקוחות שלי</CtaButton>
          <p className="max-w-md text-sm text-text-dim">
            שיחה קצרה, בלי התחייבות. קודם נבדוק אם זה בכלל מתאים לעסק שלך.
          </p>
          <p className="text-sm text-text-dim">
            רוצה קודם להכיר אותנו?{" "}
            <a
              href={AUTOSMART_SITE}
              className="text-accent-bright underline underline-offset-4 transition-opacity hover:opacity-80"
            >
              לאתר AutoSmart
            </a>
          </p>
        </div>
      </div>

      <div
        aria-hidden
        className="stage absolute inset-x-0 bottom-7 flex justify-center"
        style={s("4.6s")}
      >
        <span className="flex h-9 w-6 items-start justify-center rounded-full border border-hairline-bright p-1.5">
          <span className="h-1.5 w-1 rounded-full bg-accent-bright anim-float" style={{ ["--dur" as string]: "1.8s" }} />
        </span>
      </div>
    </section>
  );
}
