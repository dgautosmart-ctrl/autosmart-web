export const CONTACT = {
  whatsappNumber: "972544703739",
  whatsappDisplay: "054-4703739",
  email: "dgautosmart@gmail.com",
};

// כתובת האתר החי - הדומיין הרשמי.
// אם הדומיין יורד מ-Vercel מסיבה כלשהי: להחזיר זמנית ל-"https://autosmart-web.vercel.app"
// ולהסיר את ההפניה מ-vercel.app שב-next.config.ts.
export const SITE_URL = "https://www.autosmartbiz.co.il";

// ראוט שאלון פוטנציאל האוטומציה. הדף אינו מקושר מהאתר, אינו ב-sitemap וחסום
// לאינדוקס - הכניסה היחידה אליו היא הכתובת הישירה.
//
// הראוט באנגלית ולא בעברית בכוונה: שם תיקייה עברי (סגמנט סטטי) מפיל את
// `next build` עם InvalidCharacterError בשלב ה-prerender. סיומות עבריות
// עובדות רק בראוטים דינמיים ([slug]), שם הן ערך בזמן ריצה ולא שם תיקייה.
export const QUIZ_PATH = "/automation-check";

/** האם ה-pathname הנוכחי הוא דף השאלון. */
export function isQuizPath(pathname: string) {
  return pathname === QUIZ_PATH;
}
