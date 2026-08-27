export type Service = {
  slug: string;
  title: string;
  description: string;
  icon: "marketing" | "systems" | "workflow" | "report";
};

export const services: Service[] = [
  {
    slug: "digital-marketing",
    title: "שיווק דיגיטלי שמביא לקוחות",
    description:
      "קמפיינים, דיוור ותוכן שמכוונים לקהל הנכון ומביאים פניות אמיתיות - עם מעקב שמראה מאיפה מגיע כל לקוח ומה באמת עובד.",
    icon: "marketing",
  },
  {
    slug: "smart-systems",
    title: "מערכות חכמות לניהול העסק",
    description:
      "CRM ומערכות מותאמות שמרכזות את כל המידע על הלקוחות והתהליכים במקום אחד - מהליד הראשון ועד הלקוח החוזר.",
    icon: "systems",
  },
  {
    slug: "workflow-automation",
    title: "אוטומציה שעובדת בשבילכם",
    description:
      "משימות חוזרות רצות לבד, המערכות מדברות זו עם זו, ומענה ראשוני נשלח אוטומטית - כך ששום ליד או משימה לא נופלים בין הכיסאות.",
    icon: "workflow",
  },
  {
    slug: "reports-and-insights",
    title: "דוחות ותובנות בזמן אמת",
    description:
      "רואים מאיפה מגיעים הלקוחות, מה מניב תוצאות ואיפה כדאי להשקיע - מקבלים החלטות לפי נתונים, לא לפי ניחוש.",
    icon: "report",
  },
];
