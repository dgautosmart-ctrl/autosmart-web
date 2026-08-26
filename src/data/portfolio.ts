export type PortfolioCase = {
  slug: string;
  category: string;
  icon: "crm" | "marketing" | "tracking" | "community";
  title: string;
  problem: string;
  solution: string;
  result: string;
};

export const portfolioCases: PortfolioCase[] = [
  {
    slug: "telemarketing-crm",
    category: "מכירות טלפוניות",
    icon: "crm",
    title: "CRM מלא לניהול טלפניות",
    problem:
      "בעל העסק קיבל מספק אחר הצעה לבניית CRM בסיסי בעלות של 6,500 ₪.",
    solution:
      "הצענו פתרון משודרג משמעותית - CRM מלא לניהול הטלפניות, עם תכנון להטמעת כל התפעול השוטף של העסק בתוכו.",
    result: "פתרון רחב יותר במחיר נמוך יותר, 4,500 ₪. הלקוח פעיל ונמצא בתהליך הרחבה מתמשך.",
  },
  {
    slug: "consultant-attribution-tracking",
    category: "ייעוץ עסקי",
    icon: "tracking",
    title: "דשבורד מעקב מקורות לידים",
    problem:
      "העסק פרסם במספר ערוצים בתשלום (חלקם לפי אחוזי הצלחה) ולא ידע לזהות מאיפה מגיע כל לקוח.",
    solution:
      "בנינו מערכת מעקב מקורות: הגדרת קוקיז לשמירת UTM באתר הוורדפרס, אוטומציה שמזינה כל כניסה חדשה לגוגל שיטס דרך Webhook, ודשבורד שמציג בזמן אמת מאיפה מגיע כל ליד.",
    result: "פרויקט ראשוני ששימש גם כבסיס לשיתוף פעולה עתידי.",
  },
  {
    slug: "nonprofit-donor-automation",
    category: "עמותה",
    icon: "community",
    title: "קליטת תורמים ורצף וואטסאפ אוטומטי",
    problem: "לעמותה לא הייתה דרך מסודרת לקלוט תורמים חדשים ולשמור איתם על קשר.",
    solution:
      "בנינו מערכת קליטת תורמים חדשים עם רצף וואטסאפ אוטומטי מתוזמן (הודעה בקליטת התרומה, תזכורת בבוקר שלמחרת, מגע נוסף בסוף השבוע ותזכורת בתחילת החודש הבא), חיבור ל-Green API, וטופס קליטת תורם + CRM ראשוני באיירטייבל.",
    result: "המשך שיח על הרחבת שיתוף הפעולה לעמותות נוספות.",
  },
];
