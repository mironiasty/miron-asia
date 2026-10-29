import type { Photo } from "react-photo-album";

import wisla_20250109 from "./assets/gallery/20250109_wisla.jpg";
import wisla_20250109_small from "./assets/gallery/small/20250109_wisla.jpg";
import krakow_20250115 from "./assets/gallery/20250115_krakow-biegowki.jpg";
import krakow_20250115_small from "./assets/gallery/small/20250115_krakow-biegowki.jpg";
import pilsko_20250118 from "./assets/gallery/20250118_pilsko-babia.jpg";
import pilsko_20250118_small from "./assets/gallery/small/20250118_pilsko-babia.jpg";
import nowytarg_20250119 from "./assets/gallery/20250119_nowytarg.jpg";
import nowytarg_20250119_small from "./assets/gallery/small/20250119_nowytarg.jpg";
import nowytarg2_20250119 from "./assets/gallery/20250119_nowytarg2.jpg";
import nowytarg2_20250119_small from "./assets/gallery/small/20250119_nowytarg2.jpg";
import gora_20250123 from "./assets/gallery/20250123_gora.jpg";
import gora_20250123_small from "./assets/gallery/small/20250123_gora.jpg";
import gondolki_20250126 from "./assets/gallery/20250126_gondolki.jpg";
import gondolki_20250126_small from "./assets/gallery/small/20250126_gondolki.jpg";
import gondolki2_20250126 from "./assets/gallery/20250126_gondolki2.jpg";
import gondolki2_20250126_small from "./assets/gallery/small/20250126_gondolki2.jpg";

export type GalleryPhoto = Photo & { date: string; description?: string };

const photos = [
  {
    asset: wisla_20250109,
    assetSmall: wisla_20250109_small,
    width: 4000,
    height: 3000,
    date: "2025-01-09",
    title: "Wisła",
    alt: "Widok na Wisłę z mostu Kotlarskiego",
  },
  {
    asset: krakow_20250115,
    assetSmall: krakow_20250115_small,
    width: 3000,
    height: 4000,
    date: "2025-01-15",
    title: "Kraków",
    alt: "Biegówki o poranku w Krakowie",
  },
  { asset: pilsko_20250118, assetSmall: pilsko_20250118_small, width: 3000, height: 4000, date: "2025-01-18", title: "Pilsko i Babia Góra", alt: "" },
  { asset: nowytarg_20250119, assetSmall: nowytarg_20250119_small, width: 4000, height: 3000, date: "2025-01-19", title: "Nowy Targ", alt: "" },
  { asset: nowytarg2_20250119, assetSmall: nowytarg2_20250119_small, width: 4000, height: 3000, date: "2025-01-19", title: "Nowy Targ", alt: "" },
  { asset: gora_20250123, assetSmall: gora_20250123_small, width: 4000, height: 3000, date: "2025-01-23", title: "Góra", alt: "" },
  { asset: gondolki_20250126, assetSmall: gondolki_20250126_small, width: 4000, height: 3000, date: "2025-01-26", title: "Gondolki", alt: "" },
  { asset: gondolki2_20250126, assetSmall: gondolki2_20250126_small, width: 4000, height: 3000, date: "2025-01-26", title: "Gondolki", alt: "" },
].map(
  ({ asset, assetSmall, alt, title, date, width, height }): GalleryPhoto => ({
    src: asset,
    alt: alt || title,
    title,
    description: alt || undefined,
    date,
    width,
    height,
    srcSet: [
      { src: assetSmall, width: 400, height: Math.round((400 * height) / width) },
      { src: asset, width, height },
    ],
  })
);

export default photos;

// newest first, the order used by the strip on the home page and by the photo list
export const latestPhotos = [...photos].reverse();
