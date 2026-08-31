import CtaButton from "@/components/lp/CtaButton";
import HeroBackdrop from "@/components/lp/visuals/HeroBackdrop";

const s = (delay: string) => ({ ["--delay" as string]: delay });

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[86svh] flex-col justify-center overflow-hidden pt-24 pb-14 sm:pt-28"
    >
      <HeroBackdrop />

      <div className="relative z-10 mx-auto w-full max-w-4xl px-4 text-center sm:px-8">
        <h1
          className="stage display text-[2.7rem] leading-[1.05] sm:text-6xl lg:text-[5rem] lg:leading-[1.05]"
          style={s("0.5s")}
        >
          עברו אצלך בעסק{" "}
          <span className="lit-soft">יותר מ־100 לקוחות?</span>
        </h1>

        <p
          className="stage mx-auto mt-8 max-w-2xl text-lg text-text-soft sm:text-xl lg:text-2xl"
          style={s("1.05s")}
        >
          יכול להיות שיש לך{" "}
          <span className="lit font-semibold">מכירות שמחכות</span>{" "}
          בתוך רשימת הלקוחות שלך.
        </p>

        <div
          className="stage mt-10 flex flex-col items-center gap-4"
          style={s("1.5s")}
        >
          <CtaButton size="lg">אני רוצה לבדוק את רשימת הלקוחות שלי</CtaButton>
          <p className="max-w-md text-sm text-text-dim">
            שיחה קצרה, בלי התחייבות. קודם נבדוק אם זה בכלל מתאים לעסק שלך.
          </p>
        </div>
      </div>
    </section>
  );
}
