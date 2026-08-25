export type Service = {
  slug: string;
  title: string;
  description: string;
  icon: "workflow" | "integration" | "report" | "chat";
};

export const services: Service[] = [
  {
    slug: "workflow-automation",
    title: "אוטומציה לתהליכי עבודה",
    description:
      "מבטלים משימות ידניות וחוזרות, ומחברים את השלבים בעסק שלכם לזרימה אחת חכמה שרצה לבד.",
    icon: "workflow",
  },
  {
    slug: "system-integration",
    title: "חיבור בין מערכות",
    description:
      "CRM, גיליונות, וואטסאפ, מייל - כל המערכות שלכם מדברות אחת עם השנייה בלי הזנה כפולה.",
    icon: "integration",
  },
  {
    slug: "reports-and-data",
    title: "דוחות ונתונים אוטומטיים",
    description:
      "דוחות שמתעדכנים לבד, בזמן אמת, כדי שתקבלו החלטות לפי נתונים ולא לפי ניחוש.",
    icon: "report",
  },
  {
    slug: "customer-service-automation",
    title: "אוטומציה לשירות לקוחות",
    description:
      "מענה ראשוני אוטומטי, ניתוב פניות וטיפול בשאלות חוזרות - כדי שהצוות שלכם יתפנה למה שבאמת חשוב.",
    icon: "chat",
  },
];
