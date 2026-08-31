import type { ReactNode } from "react";
import { Section, Container, Marker } from "@/components/lp/primitives";
import Reveal from "@/components/lp/Reveal";
import {
  VisualCustomerRows,
  VisualMailingUI,
  VisualEmailPreview,
  VisualDraftToSent,
  VisualSegments,
  VisualAutomationNodes,
  VisualAnalytics,
} from "@/components/lp/visuals/BentoVisuals";

type Item = {
  title: string;
  text: string;
  visual: ReactNode;
  span: string;
  visualH: string;
};

const ITEMS: Item[] = [
  {
    title: "בניית וסידור רשימת הלקוחות",
    text: "מרכזים את הלקוחות הקיימים שלך ומסדרים את הרשימה כך שאפשר יהיה באמת לעבוד איתה.",
    visual: <VisualCustomerRows />,
    span: "lg:col-span-3 lg:row-span-2",
    visualH: "h-44 sm:h-56 lg:h-72",
  },
  {
    title: "הקמת מערכת דיוור מקצועית",
    text: "מקימים עבורך את התשתית שממנה אפשר לנהל תקשורת מסודרת עם הלקוחות.",
    visual: <VisualMailingUI />,
    span: "lg:col-span-3",
    visualH: "h-40 sm:h-44",
  },
  {
    title: "כתיבת התוכן והמיילים",
    text: "אנחנו דואגים גם למה שיישלח — כדי שאתה לא תצטרך לשבת ולחשוב בכל פעם מה לכתוב.",
    visual: <VisualEmailPreview />,
    span: "lg:col-span-3",
    visualH: "h-40 sm:h-44",
  },
  {
    title: "עיצוב ושליחה",
    text: "מעצבים, מכינים ושולחים את התוכן בצורה מקצועית ומסודרת.",
    visual: <VisualDraftToSent />,
    span: "lg:col-span-2",
    visualH: "h-36",
  },
  {
    title: "חלוקה חכמה לקהלים",
    text: "לא כל לקוח צריך לקבל את אותו המסר. אנחנו מסדרים את הרשימה לקהלים כדי שאפשר יהיה לפנות לכל קבוצה בצורה רלוונטית יותר.",
    visual: <VisualSegments />,
    span: "lg:col-span-2",
    visualH: "h-36",
  },
  {
    title: "אוטומציות",
    text: "בונים תהליכים אוטומטיים שעוזרים לשמור על קשר עם הלקוחות בלי שכל פעולה תצטרך להתבצע ידנית.",
    visual: <VisualAutomationNodes />,
    span: "lg:col-span-2",
    visualH: "h-36",
  },
  {
    title: "מעקב אחרי התוצאות",
    text: "עוקבים אחרי מה שקורה בפועל — פתיחות, הקלקות ותגובות — ומשפרים את הפעילות בהתאם.",
    visual: <VisualAnalytics />,
    span: "lg:col-span-6",
    visualH: "h-40 sm:h-44",
  },
];

/** Section 9 — Bento Grid, deliberately mixed sizes. */
export default function BentoSection() {
  return (
    <Section className="bg-bg-2">
      <Container size="wide">
        <Reveal>
          <Marker />
        </Reveal>

        <div className="mt-10 grid auto-rows-min gap-4 sm:gap-5 lg:grid-cols-6">
          {ITEMS.map((item, i) => (
            <Reveal
              key={item.title}
              delay={(i % 3) * 0.06}
              className={`${item.span} group`}
            >
              <article className="card-glow relative flex h-full flex-col overflow-hidden rounded-3xl border border-hairline bg-navy/25 p-6 backdrop-blur-sm transition-colors hover:border-hairline-bright sm:p-8">
                <div
                  className={`${item.visualH} -mx-2 mb-6 overflow-hidden rounded-2xl border border-hairline bg-bg/50`}
                >
                  {item.visual}
                </div>
                <h3 className="text-lg font-semibold text-text sm:text-xl">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-text-dim sm:text-base">{item.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
