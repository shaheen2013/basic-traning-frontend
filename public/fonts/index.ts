import localFont from "next/font/local";

export const neueHaasDisplay = localFont({
  src: [
    // Corrected weights (standard scale: 100-900)
    { path: "./NeueHaasDisplayXXThin.ttf", weight: "100", style: "normal" },
    {
      path: "./NeueHaasDisplayXXThinItalic.ttf",
      weight: "100",
      style: "italic",
    },
    { path: "./NeueHaasDisplayXThin.ttf", weight: "200", style: "normal" },
    {
      path: "./NeueHaasDisplayXThinItalic.ttf",
      weight: "200",
      style: "italic",
    },
    { path: "./NeueHaasDisplayThin.ttf", weight: "300", style: "normal" },
    { path: "./NeueHaasDisplayThinItalic.ttf", weight: "300", style: "italic" },
    { path: "./NeueHaasDisplayLight.ttf", weight: "400", style: "normal" },
    {
      path: "./NeueHaasDisplayLightItalic.ttf",
      weight: "400",
      style: "italic",
    },
    { path: "./NeueHaasDisplayRoman.ttf", weight: "500", style: "normal" },
    {
      path: "./NeueHaasDisplayRomanItalic.ttf",
      weight: "500",
      style: "italic",
    },
    { path: "./NeueHaasDisplayMediu.ttf", weight: "600", style: "normal" },
    {
      path: "./NeueHaasDisplayMediumItalic.ttf",
      weight: "600",
      style: "italic",
    },
    { path: "./NeueHaasDisplayBold.ttf", weight: "700", style: "normal" },
    { path: "./NeueHaasDisplayBoldItalic.ttf", weight: "700", style: "italic" },
    { path: "./NeueHaasDisplayBlack.ttf", weight: "900", style: "normal" },
    {
      path: "./NeueHaasDisplayBlackItalic.ttf",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-neue-haas-display",
  display: "swap",
});
