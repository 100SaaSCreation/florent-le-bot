/**
 * Favicon dynamique (W-2) — "F" sobre sur fond crème.
 */
import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#fdfcf0",
          fontFamily: "system-ui, sans-serif",
          fontSize: 20,
          fontWeight: 600,
          color: "#292524",
        }}
      >
        F
      </div>
    ),
    { ...size }
  );
}
