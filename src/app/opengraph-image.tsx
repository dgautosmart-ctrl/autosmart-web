import { ImageResponse } from "next/og";
import fs from "fs";
import path from "path";

export const alt = "AutoSmart - אוטומציה חכמה שמניעה את העסק שלך קדימה";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logoData = fs.readFileSync(path.join(process.cwd(), "public/logo.png"));
  const logoSrc = `data:image/png;base64,${logoData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0a2440 0%, #081b30 100%)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoSrc}
          width={440}
          height={440}
          style={{ borderRadius: 32 }}
          alt=""
        />
      </div>
    ),
    { ...size },
  );
}
