import { normalizeAccentHex } from "@/themes/accents";

type Rgb = { r: number; g: number; b: number };
type Hsl = { h: number; s: number; l: number };

// HSL lightness band for sampled wallpaper accents. It sits a bit lighter than
// the stock manual accents so the default wallpaper-driven accent reads clearly
// in both Aqua light and dark mode chrome.
export const WALLPAPER_ACCENT_LIGHTNESS = {
  target: 0.56,
  min: 0.5,
  max: 0.6,
} as const;

export const WALLPAPER_ACCENT_SATURATION = {
  neutralMax: 0.12,
  neutralTint: 0.06,
  colorfulMin: 0.38,
  colorfulMax: 0.72,
} as const;

const FALLBACK = "#2765ca";

function relativeLuminance(r: number, g: number, b: number): number {
  const linear = (channel: number) => {
    const normalized = channel / 255;
    return normalized <= 0.03928
      ? normalized / 12.92
      : ((normalized + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * linear(r) + 0.7152 * linear(g) + 0.0722 * linear(b);
}

const NEUTRAL_SATURATION_MAX = 0.12;
const MIN_GLOW_LUMINANCE = 0.34;

/** Pick the most vivid palette color, falling back to the brightest neutral. */
function pickPrimaryColor(palette: string[]): string {
  if (palette.length === 0) return FALLBACK;
  const colors = palette.map((hex) => {
    const rgb = parseHex(hex);
    return {
      hex,
      hsl: rgbToHsl(rgb),
      luminance: relativeLuminance(rgb.r, rgb.g, rgb.b),
    };
  });
  const colorful = colors.filter(({ hsl }) => hsl.s > NEUTRAL_SATURATION_MAX);
  if (colorful.length === 0) {
    return colors.reduce((best, color) =>
      color.luminance > best.luminance ? color : best
    ).hex;
  }
  let best = colorful[0].hex;
  let bestScore = -1;
  for (const { hex, hsl, luminance } of colorful) {
    const luminanceBoost = Math.min(luminance / MIN_GLOW_LUMINANCE, 1);
    const lightnessBoost = 1 - Math.min(Math.abs(hsl.l - 0.62) / 0.62, 1);
    const score = hsl.s * 0.55 + luminanceBoost * 0.3 + lightnessBoost * 0.15;
    if (score > bestScore) {
      bestScore = score;
      best = hex;
    }
  }
  return best;
}

function parseHex(hex: string): Rgb {
  const clean = hex.replace("#", "");
  const value =
    clean.length === 3
      ? clean
          .split("")
          .map((c) => c + c)
          .join("")
      : clean;
  return {
    r: parseInt(value.slice(0, 2), 16),
    g: parseInt(value.slice(2, 4), 16),
    b: parseInt(value.slice(4, 6), 16),
  };
}

function clampByte(n: number): number {
  return Math.max(0, Math.min(255, Math.round(n)));
}

function rgbToHex({ r, g, b }: Rgb): string {
  return `#${clampByte(r).toString(16).padStart(2, "0")}${clampByte(g)
    .toString(16)
    .padStart(2, "0")}${clampByte(b).toString(16).padStart(2, "0")}`;
}

function rgbToHsl({ r, g, b }: Rgb): Hsl {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const delta = max - min;
  const lightness = (max + min) / 2;
  let hue = 0;

  if (delta !== 0) {
    if (max === rn) hue = ((gn - bn) / delta) % 6;
    else if (max === gn) hue = (bn - rn) / delta + 2;
    else hue = (rn - gn) / delta + 4;
    hue *= 60;
    if (hue < 0) hue += 360;
  }

  const saturation =
    delta === 0 ? 0 : delta / (1 - Math.abs(2 * lightness - 1));

  return { h: hue, s: saturation, l: lightness };
}

function hslToRgb({ h, s, l }: Hsl): Rgb {
  if (s === 0) {
    const value = clampByte(l * 255);
    return { r: value, g: value, b: value };
  }

  const hue2rgb = (p: number, q: number, t: number) => {
    let tt = t;
    if (tt < 0) tt += 1;
    if (tt > 1) tt -= 1;
    if (tt < 1 / 6) return p + (q - p) * 6 * tt;
    if (tt < 1 / 2) return q;
    if (tt < 2 / 3) return p + (q - p) * (2 / 3 - tt) * 6;
    return p;
  };

  const hn = h / 360;
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;

  return {
    r: clampByte(hue2rgb(p, q, hn + 1 / 3) * 255),
    g: clampByte(hue2rgb(p, q, hn) * 255),
    b: clampByte(hue2rgb(p, q, hn - 1 / 3) * 255),
  };
}

export function normalizeWallpaperAccentColor(
  hex: string | null | undefined
): string {
  const normalized = normalizeAccentHex(hex);
  if (!normalized) return FALLBACK;

  const hsl = rgbToHsl(parseHex(normalized));
  const { neutralMax, neutralTint, colorfulMin, colorfulMax } =
    WALLPAPER_ACCENT_SATURATION;
  const { min, max, target } = WALLPAPER_ACCENT_LIGHTNESS;

  if (hsl.s <= neutralMax) {
    return rgbToHex(
      hslToRgb({
        h: hsl.h,
        s: hsl.s <= 0 ? 0 : Math.min(hsl.s, neutralTint),
        l: Math.max(target, 0.58),
      })
    );
  }

  return rgbToHex(
    hslToRgb({
      h: hsl.h,
      s: Math.min(Math.max(hsl.s, colorfulMin), colorfulMax),
      l: hsl.l >= min && hsl.l <= max ? hsl.l : target,
    })
  );
}

export function resolveWallpaperAccentFromPalette(palette: string[]): string {
  if (palette.length === 0) return FALLBACK;
  return normalizeWallpaperAccentColor(pickPrimaryColor(palette));
}
