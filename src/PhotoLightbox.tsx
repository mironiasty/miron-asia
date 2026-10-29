import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

import type { GalleryPhoto } from "./photos";

export default function PhotoLightbox({
  slides,
  index,
  close,
}: {
  slides: GalleryPhoto[];
  index: number;
  close: () => void;
}) {
  return (
    <Lightbox
      slides={slides}
      open={index >= 0}
      index={index}
      close={close}
      plugins={[Captions, Fullscreen, Slideshow, Thumbnails, Zoom]}
    />
  );
}
