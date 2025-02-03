import type { Photo } from "react-photo-album";

import wisla_20250109 from "./assets/gallery/20250109_wisla.jpg";
import krakow_20250115 from "./assets/gallery/20250115_krakow-biegowki.jpg";
import pilsko_20250118 from "./assets/gallery/20250118_pilsko-babia.jpg";
import nowytarg_20250119 from "./assets/gallery/20250119_nowytarg.jpg";
import nowytarg2_20250119 from "./assets/gallery/20250119_nowytarg2.jpg";
import gora_20250123 from "./assets/gallery/20250123_gora.jpg";
import gondolki_20250126 from "./assets/gallery/20250126_gondolki.jpg";
import gondolki2_20250126 from "./assets/gallery/20250126_gondolki2.jpg";

const photos = [
  { asset: wisla_20250109, width: 4000, height: 3000, alt: "Widok na Wisłę z mostu Kotlarskiego" },
  { asset: krakow_20250115, width: 3000, height: 4000, alt: "Biegówki o poranku w Krakowie" },
  { asset: pilsko_20250118, width: 3000, height: 4000, alt: "" },
  { asset: nowytarg_20250119, width: 3000, height: 4000, alt: "" },
  { asset: nowytarg2_20250119, width: 3000, height: 4000, alt: "" },
  { asset: gora_20250123, width: 3000, height: 4000, alt: "" },
  { asset: gondolki_20250126, width: 3000, height: 4000, alt: "" },
  { asset: gondolki2_20250126, width: 4000, height: 3000, alt: "" },
].map(
  ({ asset, alt, width, height }) =>
    ({
      src: asset,
      alt,
      width,
      height,
    } as Photo)
);

export default photos;
